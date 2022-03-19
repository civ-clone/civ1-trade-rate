import {
  AvailableTradeRateRegistry,
  instance as availableTradeRateRegistryInstance,
} from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import {
  PlayerTradeRatesRegistry,
  instance as playerTradeRatesRegistryInstance,
} from '@civ-clone/core-trade-rate/PlayerTradeRatesRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  Yield as YieldRule,
  IYieldRegistry,
} from '@civ-clone/core-city/Rules/Yield';
import City from '@civ-clone/core-city/City';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import { IConstructor } from '@civ-clone/core-registry/Registry';
import { Trade } from '@civ-clone/civ1-world/Yields';
import TradeRate from '@civ-clone/core-trade-rate/TradeRate';
import Yield from '@civ-clone/core-yield/Yield';
import Low from '@civ-clone/core-rule/Priorities/Low';

export const getRules: (
  availableTradeRateRegistry?: AvailableTradeRateRegistry,
  playerTradeRatesRegistry?: PlayerTradeRatesRegistry,
  rulesRegistry?: RuleRegistry
) => YieldRule[] = (
  availableTradeRateRegistry: AvailableTradeRateRegistry = availableTradeRateRegistryInstance,
  playerTradeRatesRegistry: PlayerTradeRatesRegistry = playerTradeRatesRegistryInstance,
  rulesRegistry: RuleRegistry = ruleRegistryInstance
): YieldRule[] => [
  new YieldRule(
    new Low(),
    new Criterion((cityYield: Yield): boolean => cityYield instanceof Trade),
    new Effect((cityYield: Yield, city: City, yields: Yield[]): void => {
      const playerRates = playerTradeRatesRegistry.getByPlayer(city.player()),
        total = cityYield.value();

      let remaining = total;

      availableTradeRateRegistry
        .entries()
        .forEach((TradeRateType: IConstructor<TradeRate>): void => {
          let [tradeYield] = yields.filter(
            (existingYield: Yield) =>
              existingYield instanceof
              (TradeRateType as typeof TradeRate).tradeYield
          );

          if (!tradeYield) {
            tradeYield = new (TradeRateType as typeof TradeRate).tradeYield();
            yields.push(tradeYield);
          }

          const value = Math.min(
            Math.ceil(
              total * playerRates.get(TradeRateType as typeof TradeRate).value()
            ),
            remaining
          );

          tradeYield.add(value);

          remaining -= value;

          (rulesRegistry as IYieldRegistry).process(
            YieldRule,
            tradeYield,
            city,
            yields
          );
        });
    })
  ),
];

export default getRules;
