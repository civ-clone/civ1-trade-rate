import {
  AvailableTradeRateRegistry,
  instance as availableTradeRateRegistryInstance,
} from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import {
  PlayerTradeRatesRegistry,
  instance as playerTradeRatesRegistryInstance,
} from '@civ-clone/core-trade-rate/PlayerTradeRatesRegistry';
import Effect from '@civ-clone/core-rule/Effect';
import { Trade } from '../../Yields';
import { Yield as YieldRule } from '@civ-clone/core-city/Rules/Yield';
import splitTrade from '@civ-clone/base-trade-rate/lib/splitTrade';

export const getRules: (
  availableTradeRateRegistry?: AvailableTradeRateRegistry,
  playerTradeRatesRegistry?: PlayerTradeRatesRegistry
) => YieldRule[] = (
  availableTradeRateRegistry: AvailableTradeRateRegistry = availableTradeRateRegistryInstance,
  playerTradeRatesRegistry: PlayerTradeRatesRegistry = playerTradeRatesRegistryInstance
): YieldRule[] => [
  // Each rate's share is rounded up, in the order the rates are available, so the last rate gets what is left.
  new YieldRule(
    new Effect(
      splitTrade(
        Trade,
        Math.ceil,
        availableTradeRateRegistry,
        playerTradeRatesRegistry
      )
    )
  ),
];

export default getRules;
