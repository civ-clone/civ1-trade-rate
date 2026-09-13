"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const yield_1 = require("./Rules/City/yield");
const action_1 = require("./Rules/Player/action");
const added_1 = require("./Rules/Player/added");
const turn_start_1 = require("./Rules/Player/turn-start");
const core_game_1 = require("@civ-clone/core-game");
const register = (game) => game.rules.register(...(0, yield_1.default)(game.availableTradeRates, game.playerTradeRates), ...(0, action_1.default)(game.playerTradeRates), ...(0, added_1.default)(game.availableTradeRates, game.playerTradeRates), ...(0, turn_start_1.default)(game.rules, game.cities, game.availableTradeRates));
exports.register = register;
// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
(0, exports.register)(core_game_1.defaultGame);
exports.default = exports.register;
//# sourceMappingURL=registerRules.js.map