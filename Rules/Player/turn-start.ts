import {
  AvailableTradeRateRegistry,
  instance as availableTradeRateRegistryInstance,
} from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import {
  CityRegistry,
  instance as cityRegistryInstance,
} from '@civ-clone/core-city/CityRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import Effect from '@civ-clone/core-rule/Effect';
import High from '@civ-clone/core-rule/Priorities/High';
import { IConstructor } from '@civ-clone/core-registry/Registry';
import Player from '@civ-clone/core-player/Player';
import ProcessYield from '@civ-clone/core-city/Rules/ProcessYield';
import TradeRate from '@civ-clone/core-trade-rate/TradeRate';
import TurnStart from '@civ-clone/core-player/Rules/TurnStart';
import Yield from '@civ-clone/core-yield/Yield';
import { reduceYields } from '@civ-clone/core-yield/lib/reduceYields';

let cachedTradeRateYields: typeof Yield[] = [];

export const getRules: (
  ruleRegistry?: RuleRegistry,
  cityRegistry?: CityRegistry,
  availableTradeRateRegistry?: AvailableTradeRateRegistry
) => TurnStart[] = (
  ruleRegistry: RuleRegistry = ruleRegistryInstance,
  cityRegistry: CityRegistry = cityRegistryInstance,
  availableTradeRateRegistry: AvailableTradeRateRegistry = availableTradeRateRegistryInstance
): TurnStart[] => [
  new TurnStart(
    new High(),
    new Effect((player: Player): void => {
      if (cachedTradeRateYields.length === 0) {
        availableTradeRateRegistry
          .entries()
          .forEach((TradeRateType: IConstructor<TradeRate>): number =>
            cachedTradeRateYields.push(
              (TradeRateType as typeof TradeRate).tradeYield
            )
          );
      }

      cityRegistry.getByPlayer(player).forEach((city: City): void => {
        const cityYields = city.yields();

        reduceYields(cityYields, ...cachedTradeRateYields)
          .reduce(
            (yields: Yield[], yieldValue, index) => {
              yields[index].set(yieldValue, 'Consolidated');

              return yields;
            },
            cachedTradeRateYields.map(
              (YieldType: typeof Yield) => new YieldType()
            )
          )
          .forEach((cityYield: Yield) =>
            ruleRegistry.process(ProcessYield, cityYield, city, cityYields)
          );
      });
    })
  ),
];

export default getRules;
