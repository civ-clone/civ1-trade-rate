"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AvailableTradeRateRegistry_1 = require("@civ-clone/core-trade-rate/AvailableTradeRateRegistry");
const CityRegistry_1 = require("@civ-clone/core-city/CityRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const High_1 = require("@civ-clone/core-rule/Priorities/High");
const TurnStart_1 = require("@civ-clone/core-player/Rules/TurnStart");
const processTradeRateYields_1 = require("@civ-clone/base-trade-rate/lib/processTradeRateYields");
// Kept for the life of the module, as it always has been: filled by the first turn start and shared by every
//  `getRules` call after that.
const cachedTradeRateYields = [];
const getRules = (ruleRegistry = RuleRegistry_1.instance, cityRegistry = CityRegistry_1.instance, availableTradeRateRegistry = AvailableTradeRateRegistry_1.instance) => [
    new TurnStart_1.default(new High_1.default(), new Effect_1.default((0, processTradeRateYields_1.default)(cachedTradeRateYields, ruleRegistry, cityRegistry, availableTradeRateRegistry))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=turn-start.js.map