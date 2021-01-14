"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const yield_1 = require("./Rules/City/yield");
const added_1 = require("./Rules/Player/added");
RuleRegistry_1.instance.register(...yield_1.default(), ...added_1.default());
//# sourceMappingURL=registerRules.js.map