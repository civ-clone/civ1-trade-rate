import {
  AvailableTradeRateRegistry,
  instance as availableTradeRateRegistryInstance,
} from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import {
  PlayerTradeRatesRegistry,
  instance as playerTradeRatesRegistryInstance,
} from '@civ-clone/core-trade-rate/PlayerTradeRatesRegistry';
import { Research, Tax, Luxuries } from '../../TradeRates';
import Added from '@civ-clone/core-player/Rules/Added';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import addPlayerTradeRates from '@civ-clone/base-trade-rate/lib/playerTradeRates';

export const getRules: (
  availableTradeRateRegistry?: AvailableTradeRateRegistry,
  playerTradeRatesRegistry?: PlayerTradeRatesRegistry
) => Added[] = (
  availableTradeRateRegistry: AvailableTradeRateRegistry = availableTradeRateRegistryInstance,
  playerTradeRatesRegistry: PlayerTradeRatesRegistry = playerTradeRatesRegistryInstance
): Added[] => [
  // Every player starts at 50% tax, 50% research and no luxuries.
  new Added(
    new Effect((player: Player): void =>
      addPlayerTradeRates(
        player,
        [new Tax(50), new Research(50), new Luxuries(0)],
        availableTradeRateRegistry,
        playerTradeRatesRegistry
      )
    )
  ),
];

export default getRules;
