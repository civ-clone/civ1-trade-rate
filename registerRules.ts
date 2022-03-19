import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import cityYield from './Rules/City/yield';
import playerAction from './Rules/Player/action';
import playerAdded from './Rules/Player/added';

ruleRegistryInstance.register(
  ...cityYield(),
  ...playerAction(),
  ...playerAdded()
);
