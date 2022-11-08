import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import cityYield from './Rules/City/yield';
import playerAction from './Rules/Player/action';
import playerAdded from './Rules/Player/added';
import playerTurnStart from './Rules/Player/turn-start';

ruleRegistryInstance.register(
  ...cityYield(),
  ...playerAction(),
  ...playerAdded(),
  ...playerTurnStart()
);
