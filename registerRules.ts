import cityYield from './Rules/City/yield';
import playerAction from './Rules/Player/action';
import playerAdded from './Rules/Player/added';
import playerTurnStart from './Rules/Player/turn-start';
import { Game, defaultGame } from '@civ-clone/core-game';

export const register = (game: Game): void =>
  game.rules.register(
    ...cityYield(game.availableTradeRates, game.playerTradeRates),
    ...playerAction(game.playerTradeRates),
    ...playerAdded(game.availableTradeRates, game.playerTradeRates),
    ...playerTurnStart(game.rules, game.cities, game.availableTradeRates)
  );

// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
register(defaultGame);

export default register;
