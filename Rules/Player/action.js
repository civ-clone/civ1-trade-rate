"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerTradeRatesRegistry_1 = require("@civ-clone/core-trade-rate/PlayerTradeRatesRegistry");
const Action_1 = require("@civ-clone/core-player/Rules/Action");
const PlayerActions_1 = require("../../PlayerActions");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const getRules = (playerTradeRateRegistry = PlayerTradeRatesRegistry_1.instance) => [
    new Action_1.default(new Effect_1.default((player) => [
        new PlayerActions_1.AdjustTradeRates(playerTradeRateRegistry.getByPlayer(player)),
    ])),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=action.js.map