"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AvailableTradeRateRegistry_1 = require("@civ-clone/core-trade-rate/AvailableTradeRateRegistry");
const PlayerTradeRatesRegistry_1 = require("@civ-clone/core-trade-rate/PlayerTradeRatesRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Yield_1 = require("@civ-clone/core-city/Rules/Yield");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Yields_1 = require("@civ-clone/civ1-world/Yields");
const Low_1 = require("@civ-clone/core-rule/Priorities/Low");
const getRules = (availableTradeRateRegistry = AvailableTradeRateRegistry_1.instance, playerTradeRatesRegistry = PlayerTradeRatesRegistry_1.instance, rulesRegistry = RuleRegistry_1.instance) => [
    new Yield_1.Yield(new Low_1.default(), new Criterion_1.default((cityYield) => cityYield instanceof Yields_1.Trade), new Effect_1.default((cityYield, city, yields) => {
        const playerRates = playerTradeRatesRegistry.getByPlayer(city.player());
        availableTradeRateRegistry
            .entries()
            .forEach((TradeRateType) => {
            let [tradeYield] = yields.filter((existingYield) => existingYield instanceof
                TradeRateType.tradeYield);
            if (!tradeYield) {
                tradeYield = new TradeRateType.tradeYield();
                yields.push(tradeYield);
            }
            tradeYield.add(cityYield.value() *
                playerRates.get(TradeRateType).value());
            rulesRegistry.process(Yield_1.Yield, tradeYield, city, yields);
        });
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=yield.js.map