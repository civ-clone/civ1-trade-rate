"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerTradeRatesRegistry_1 = require("@civ-clone/core-trade-rate/PlayerTradeRatesRegistry");
const Action_1 = require("@civ-clone/core-player/Rules/Action");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const adjustTradeRates_1 = require("@civ-clone/base-trade-rate/lib/adjustTradeRates");
const getRules = (playerTradeRateRegistry = PlayerTradeRatesRegistry_1.instance) => [
    new Action_1.default(new Effect_1.default((0, adjustTradeRates_1.default)(playerTradeRateRegistry))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=action.js.map