"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AvailableTradeRateRegistry_1 = require("@civ-clone/core-trade-rate/AvailableTradeRateRegistry");
const CityRegistry_1 = require("@civ-clone/core-city/CityRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const High_1 = require("@civ-clone/core-rule/Priorities/High");
const ProcessYield_1 = require("@civ-clone/core-city/Rules/ProcessYield");
const TurnStart_1 = require("@civ-clone/core-player/Rules/TurnStart");
const reduceYields_1 = require("@civ-clone/core-yield/lib/reduceYields");
let cachedTradeRateYields = [];
const getRules = (ruleRegistry = RuleRegistry_1.instance, cityRegistry = CityRegistry_1.instance, availableTradeRateRegistry = AvailableTradeRateRegistry_1.instance) => [
    new TurnStart_1.default(new High_1.default(), new Effect_1.default((player) => {
        if (cachedTradeRateYields.length === 0) {
            availableTradeRateRegistry
                .entries()
                .forEach((TradeRateType) => cachedTradeRateYields.push(TradeRateType.tradeYield));
        }
        cityRegistry.getByPlayer(player).forEach((city) => {
            const cityYields = city.yields();
            (0, reduceYields_1.reduceYields)(cityYields, ...cachedTradeRateYields)
                .reduce((yields, yieldValue, index) => {
                yields[index].set(yieldValue, 'Consolidated');
                return yields;
            }, cachedTradeRateYields.map((YieldType) => new YieldType()))
                .forEach((cityYield) => ruleRegistry.process(ProcessYield_1.default, cityYield, city, cityYields));
        });
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=turn-start.js.map