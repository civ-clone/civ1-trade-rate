import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import cityYield from './Rules/City/yield';
import playerAdded from './Rules/Player/added';

ruleRegistryInstance.register(...cityYield(), ...playerAdded());
