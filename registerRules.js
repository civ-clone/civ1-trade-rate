"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const yield_1 = require("./Rules/City/yield");
const action_1 = require("./Rules/Player/action");
const added_1 = require("./Rules/Player/added");
const turn_start_1 = require("./Rules/Player/turn-start");
RuleRegistry_1.instance.register(...(0, yield_1.default)(), ...(0, action_1.default)(), ...(0, added_1.default)(), ...(0, turn_start_1.default)());
//# sourceMappingURL=registerRules.js.map