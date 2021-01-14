import { AvailableTradeRateRegistry } from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import { PlayerTradeRatesRegistry } from '@civ-clone/core-trade-rate/PlayerTradeRatesRegistry';
import Added from '@civ-clone/core-player/Rules/Added';
export declare const getRules: (
  availableTradeRateRegistry?: AvailableTradeRateRegistry,
  playerTradeRatesRegistry?: PlayerTradeRatesRegistry
) => Added[];
export default getRules;
