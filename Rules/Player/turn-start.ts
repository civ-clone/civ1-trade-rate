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
import Effect from '@civ-clone/core-rule/Effect';
import High from '@civ-clone/core-rule/Priorities/High';
import TurnStart from '@civ-clone/core-player/Rules/TurnStart';
import Yield from '@civ-clone/core-yield/Yield';
import processTradeRateYields from '@civ-clone/base-trade-rate/lib/processTradeRateYields';

// Kept for the life of the module, as it always has been: filled by the first turn start and shared by every
//  `getRules` call after that.
const cachedTradeRateYields: (typeof Yield)[] = [];

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
    new Effect(
      processTradeRateYields(
        cachedTradeRateYields,
        ruleRegistry,
        cityRegistry,
        availableTradeRateRegistry
      )
    )
  ),
];

export default getRules;
