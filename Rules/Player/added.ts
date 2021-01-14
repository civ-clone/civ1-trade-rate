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
import { IConstructor } from '@civ-clone/core-registry/Registry';
import PlayerTradeRates from '@civ-clone/core-trade-rate/PlayerTradeRates';
import TradeRate from '@civ-clone/core-trade-rate/TradeRate';

export const getRules: (
  availableTradeRateRegistry?: AvailableTradeRateRegistry,
  playerTradeRatesRegistry?: PlayerTradeRatesRegistry
) => Added[] = (
  availableTradeRateRegistry: AvailableTradeRateRegistry = availableTradeRateRegistryInstance,
  playerTradeRatesRegistry: PlayerTradeRatesRegistry = playerTradeRatesRegistryInstance
): Added[] => [
  new Added(
    new Effect((player) => {
      const defaultRates = [new Tax(0.5), new Research(0.5), new Luxuries(0)],
        availableRates = availableTradeRateRegistry.entries(),
        playerTradeRates = new PlayerTradeRates(
          player,
          ...availableRates.map(
            (TradeRateType: IConstructor<TradeRate>): TradeRate => {
              const [defaultRate] = defaultRates.filter(
                (rate: TradeRate): boolean => rate instanceof TradeRateType
              );

              return new TradeRateType(defaultRate || 0);
            }
          )
        );
      playerTradeRatesRegistry.register(playerTradeRates);
    })
  ),
];

export default getRules;
