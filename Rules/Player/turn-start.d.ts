import { AvailableTradeRateRegistry } from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import { CityRegistry } from '@civ-clone/core-city/CityRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import TurnStart from '@civ-clone/core-player/Rules/TurnStart';
export declare const getRules: (
  ruleRegistry?: RuleRegistry,
  cityRegistry?: CityRegistry,
  availableTradeRateRegistry?: AvailableTradeRateRegistry
) => TurnStart[];
export default getRules;
