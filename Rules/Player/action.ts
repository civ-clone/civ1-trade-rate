import {
  PlayerTradeRatesRegistry,
  instance as playerTradeRateRegistryInstance,
} from '@civ-clone/core-trade-rate/PlayerTradeRatesRegistry';
import Action from '@civ-clone/core-player/Rules/Action';
import { AdjustTradeRates } from '../../PlayerActions';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import PlayerAction from '@civ-clone/core-player/PlayerAction';

export const getRules: (
  playerTradeRateRegistry?: PlayerTradeRatesRegistry
) => Action[] = (
  playerTradeRateRegistry: PlayerTradeRatesRegistry = playerTradeRateRegistryInstance
): Action[] => [
  new Action(
    new Effect((player: Player): PlayerAction[] => [
      new AdjustTradeRates(player, playerTradeRateRegistry.getByPlayer(player)),
    ])
  ),
];

export default getRules;
