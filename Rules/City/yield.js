"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AvailableTradeRateRegistry_1 = require("@civ-clone/core-trade-rate/AvailableTradeRateRegistry");
const PlayerTradeRatesRegistry_1 = require("@civ-clone/core-trade-rate/PlayerTradeRatesRegistry");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Yields_1 = require("../../Yields");
const Yield_1 = require("@civ-clone/core-city/Rules/Yield");
const splitTrade_1 = require("@civ-clone/base-trade-rate/lib/splitTrade");
const getRules = (availableTradeRateRegistry = AvailableTradeRateRegistry_1.instance, playerTradeRatesRegistry = PlayerTradeRatesRegistry_1.instance) => [
    // Each rate's share is rounded up, in the order the rates are available, so the last rate gets what is left.
    new Yield_1.Yield(new Effect_1.default((0, splitTrade_1.default)(Yields_1.Trade, Math.ceil, availableTradeRateRegistry, playerTradeRatesRegistry))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=yield.js.map