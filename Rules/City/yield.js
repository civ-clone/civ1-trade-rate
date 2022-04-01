"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AvailableTradeRateRegistry_1 = require("@civ-clone/core-trade-rate/AvailableTradeRateRegistry");
const PlayerTradeRatesRegistry_1 = require("@civ-clone/core-trade-rate/PlayerTradeRatesRegistry");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Yields_1 = require("@civ-clone/civ1-world/Yields");
const Yield_1 = require("@civ-clone/core-city/Rules/Yield");
const getRules = (availableTradeRateRegistry = AvailableTradeRateRegistry_1.instance, playerTradeRatesRegistry = PlayerTradeRatesRegistry_1.instance) => [
    new Yield_1.Yield(new Effect_1.default((city, yields) => {
        const playerRates = playerTradeRatesRegistry.getByPlayer(city.player()), total = yields
            .filter((cityYield) => cityYield instanceof Yields_1.Trade)
            .reduce((total, cityYield) => total + cityYield.value(), 0);
        let remaining = total;
        return availableTradeRateRegistry
            .entries()
            .map((TradeRateType) => {
            const TradeYield = TradeRateType.tradeYield, value = Math.min(Math.ceil(total *
                playerRates.get(TradeRateType).value()), remaining);
            remaining -= value;
            return new TradeYield(value, TradeRateType.name);
        });
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=yield.js.map