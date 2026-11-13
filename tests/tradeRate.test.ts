import { Luxuries, Research, Tax } from '../TradeRates';
import Action from '@civ-clone/core-player/Rules/Action';
import Added from '@civ-clone/core-player/Rules/Added';
import { AdjustTradeRates } from '../PlayerActions';
import AvailableTradeRateRegistry from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import City from '@civ-clone/core-city/City';
import CityRegistry from '@civ-clone/core-city/CityRegistry';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import PlayerTradeRatesRegistry from '@civ-clone/core-trade-rate/PlayerTradeRatesRegistry';
import ProcessYield from '@civ-clone/core-city/Rules/ProcessYield';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import TradeRate from '@civ-clone/core-trade-rate/TradeRate';
import TurnStart from '@civ-clone/core-player/Rules/TurnStart';
import Yield from '@civ-clone/core-yield/Yield';
import { Yield as YieldRule } from '@civ-clone/core-city/Rules/Yield';
import { Corruption, Trade } from '../Yields';
import { expect } from 'chai';
import action from '../Rules/Player/action';
import added from '../Rules/Player/added';
import cityYield from '../Rules/City/yield';
import turnStart from '../Rules/Player/turn-start';

class Other extends TradeRate {
  static tradeYield: typeof Yield = class OtherYield extends Yield {};
}

const setUp = (
    ...available: (typeof TradeRate)[]
  ): {
    availableTradeRateRegistry: AvailableTradeRateRegistry;
    player: Player;
    playerTradeRatesRegistry: PlayerTradeRatesRegistry;
    ruleRegistry: RuleRegistry;
  } => {
    const ruleRegistry = new RuleRegistry(),
      availableTradeRateRegistry = new AvailableTradeRateRegistry(),
      playerTradeRatesRegistry = new PlayerTradeRatesRegistry();

    availableTradeRateRegistry.register(...available);

    ruleRegistry.register(
      ...added(availableTradeRateRegistry, playerTradeRatesRegistry),
      ...cityYield(availableTradeRateRegistry, playerTradeRatesRegistry),
      ...action(playerTradeRatesRegistry)
    );

    return {
      availableTradeRateRegistry,
      player: new Player(ruleRegistry),
      playerTradeRatesRegistry,
      ruleRegistry,
    };
  },
  cityOf = (player: Player, yields: Yield[] = []): City =>
    ({
      player: (): Player => player,
      yields: (): Yield[] => yields,
    } as unknown as City),
  split = (
    ruleRegistry: RuleRegistry,
    city: City,
    yields: Yield[]
  ): [string, number, string][] =>
    ruleRegistry
      .process(YieldRule, city, yields)
      .flat()
      .map((tradeYield: Yield): [string, number, string] => [
        tradeYield.constructor.name,
        tradeYield.value(),
        tradeYield.values()[0][1],
      ]);

describe('civ1-trade-rate', (): void => {
  it('gives each player 50% tax, 50% research and no luxuries, in the order the rates are available', (): void => {
    const { player, playerTradeRatesRegistry } = setUp(Luxuries, Research, Tax),
      rates = playerTradeRatesRegistry.getByPlayer(player);

    expect(
      rates
        .all()
        .map((rate): [string, number] => [rate.constructor.name, rate.value()])
    ).to.deep.equal([
      ['Luxuries', 0],
      ['Research', 50],
      ['Tax', 50],
    ]);
    expect(rates.player()).to.equal(player);
  });

  it('starts a rate it has no default for at 0', (): void => {
    const { player, playerTradeRatesRegistry } = setUp(Tax, Other, Research);

    expect(
      playerTradeRatesRegistry
        .getByPlayer(player)
        .all()
        .map((rate): [string, number] => [rate.constructor.name, rate.value()])
    ).to.deep.equal([
      ['Tax', 50],
      ['Other', 0],
      ['Research', 50],
    ]);
  });

  it('splits trade by rate, rounding each share up in rate order, less corruption, so the last rate gets what is left', (): void => {
    const { player, ruleRegistry } = setUp(Luxuries, Research, Tax),
      yields = [new Trade(4), new Trade(3), new Corruption(2)];

    expect(split(ruleRegistry, cityOf(player), yields)).to.deep.equal([
      ['Luxuries', 0, 'Luxuries'],
      ['Research', 3, 'Research'],
      ['Gold', 2, 'Tax'],
    ]);
  });

  it('splits by the rates the player has set', (): void => {
    const { player, playerTradeRatesRegistry, ruleRegistry } = setUp(
      Luxuries,
      Research,
      Tax
    );

    playerTradeRatesRegistry.getByPlayer(player).setAll([
      [Luxuries, 30],
      [Research, 30],
      [Tax, 40],
    ]);

    expect(
      split(ruleRegistry, cityOf(player), [new Trade(10)]).map(
        ([, value]) => value
      )
    ).to.deep.equal([3, 3, 4]);
    expect(
      split(ruleRegistry, cityOf(player), [new Trade(11)]).map(
        ([, value]) => value
      )
    ).to.deep.equal([4, 4, 3]);
  });

  it('splits no trade when the trade is negative', (): void => {
    const { player, ruleRegistry } = setUp(Luxuries, Research, Tax);

    expect(
      split(ruleRegistry, cityOf(player), [new Trade(-5)]).map(
        ([, value]) => value
      )
    ).to.deep.equal([0, 0, 0]);
  });

  it('offers each player the adjustment of their own rates', (): void => {
    const { player, playerTradeRatesRegistry, ruleRegistry } = setUp(
        Luxuries,
        Research,
        Tax
      ),
      [actions] = ruleRegistry.process(Action, player);

    expect(actions).to.have.length(1);
    expect(actions[0]).to.be.instanceOf(AdjustTradeRates);
    expect(actions[0].player()).to.equal(player);
    expect(actions[0].value()).to.equal(
      playerTradeRatesRegistry.getByPlayer(player)
    );
  });

  it("at the start of a player's turn, processes each city's trade-rate yields, one of each type in rate order", (): void => {
    const { availableTradeRateRegistry, player, ruleRegistry } = setUp(
        Luxuries,
        Research,
        Tax
      ),
      LuxuriesYield = Luxuries.tradeYield,
      ResearchYield = Research.tradeYield,
      TaxYield = Tax.tradeYield,
      firstYields = [
        new TaxYield(2),
        new LuxuriesYield(1),
        new Trade(7),
        new TaxYield(3),
      ],
      secondYields = [new ResearchYield(5)],
      cities = [cityOf(player, firstYields), cityOf(player, secondYields)],
      cityRegistry = {
        getByPlayer: (cityPlayer: Player): City[] =>
          cityPlayer === player ? cities : [],
      } as unknown as CityRegistry,
      processed: [City, string, number, string, Yield[]][] = [];

    ruleRegistry.register(
      ...turnStart(ruleRegistry, cityRegistry, availableTradeRateRegistry),
      new ProcessYield(
        new Effect(
          (processedYield: Yield, city: City, yields: Yield[]): void => {
            processed.push([
              city,
              processedYield.constructor.name,
              processedYield.value(),
              processedYield.values()[0][1],
              yields,
            ]);
          }
        )
      )
    );

    ruleRegistry.process(TurnStart, player);

    expect(processed).to.deep.equal([
      [cities[0], 'Luxuries', 1, 'Consolidated', firstYields],
      [cities[0], 'Research', 0, 'Consolidated', firstYields],
      [cities[0], 'Gold', 5, 'Consolidated', firstYields],
      [cities[1], 'Luxuries', 0, 'Consolidated', secondYields],
      [cities[1], 'Research', 5, 'Consolidated', secondYields],
      [cities[1], 'Gold', 0, 'Consolidated', secondYields],
    ]);
  });
});
