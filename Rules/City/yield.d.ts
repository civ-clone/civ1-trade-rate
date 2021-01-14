import { AvailableTradeRateRegistry } from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import { PlayerTradeRatesRegistry } from '@civ-clone/core-trade-rate/PlayerTradeRatesRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { Yield as YieldRule } from '@civ-clone/core-city/Rules/Yield';
export declare const getRules: (
  availableTradeRateRegistry?: AvailableTradeRateRegistry,
  playerTradeRatesRegistry?: PlayerTradeRatesRegistry,
  rulesRegistry?: RuleRegistry
) => YieldRule[];
export default getRules;
