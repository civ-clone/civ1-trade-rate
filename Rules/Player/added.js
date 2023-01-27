"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AvailableTradeRateRegistry_1 = require("@civ-clone/core-trade-rate/AvailableTradeRateRegistry");
const PlayerTradeRatesRegistry_1 = require("@civ-clone/core-trade-rate/PlayerTradeRatesRegistry");
const TradeRates_1 = require("../../TradeRates");
const Added_1 = require("@civ-clone/core-player/Rules/Added");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const PlayerTradeRates_1 = require("@civ-clone/core-trade-rate/PlayerTradeRates");
const getRules = (availableTradeRateRegistry = AvailableTradeRateRegistry_1.instance, playerTradeRatesRegistry = PlayerTradeRatesRegistry_1.instance) => [
    new Added_1.default(new Effect_1.default((player) => {
        const defaultRates = [new TradeRates_1.Tax(50), new TradeRates_1.Research(50), new TradeRates_1.Luxuries(0)], availableRates = availableTradeRateRegistry.entries(), playerTradeRates = new PlayerTradeRates_1.default(player, ...availableRates.map((TradeRateType) => {
            const [defaultRate] = defaultRates.filter((rate) => rate instanceof TradeRateType);
            return new TradeRateType(defaultRate || 0);
        }));
        playerTradeRatesRegistry.register(playerTradeRates);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=added.js.map