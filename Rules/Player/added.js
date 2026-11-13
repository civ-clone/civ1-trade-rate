"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AvailableTradeRateRegistry_1 = require("@civ-clone/core-trade-rate/AvailableTradeRateRegistry");
const PlayerTradeRatesRegistry_1 = require("@civ-clone/core-trade-rate/PlayerTradeRatesRegistry");
const TradeRates_1 = require("../../TradeRates");
const Added_1 = require("@civ-clone/core-player/Rules/Added");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const playerTradeRates_1 = require("@civ-clone/base-trade-rate/lib/playerTradeRates");
const getRules = (availableTradeRateRegistry = AvailableTradeRateRegistry_1.instance, playerTradeRatesRegistry = PlayerTradeRatesRegistry_1.instance) => [
    // Every player starts at 50% tax, 50% research and no luxuries.
    new Added_1.default(new Effect_1.default((player) => (0, playerTradeRates_1.default)(player, [new TradeRates_1.Tax(50), new TradeRates_1.Research(50), new TradeRates_1.Luxuries(0)], availableTradeRateRegistry, playerTradeRatesRegistry))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=added.js.map