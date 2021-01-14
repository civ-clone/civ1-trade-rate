"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TradeRates_1 = require("./TradeRates");
const AvailableTradeRateRegistry_1 = require("@civ-clone/core-trade-rate/AvailableTradeRateRegistry");
AvailableTradeRateRegistry_1.instance.register(TradeRates_1.Luxuries, TradeRates_1.Research, TradeRates_1.Tax);
//# sourceMappingURL=registerAvailableTradeRates.js.map