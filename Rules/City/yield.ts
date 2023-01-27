import {
  AvailableTradeRateRegistry,
  instance as availableTradeRateRegistryInstance,
} from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import { Corruption, Trade } from '../../Yields';
import {
  PlayerTradeRatesRegistry,
  instance as playerTradeRatesRegistryInstance,
} from '@civ-clone/core-trade-rate/PlayerTradeRatesRegistry';
import City from '@civ-clone/core-city/City';
import Effect from '@civ-clone/core-rule/Effect';
import { IConstructor } from '@civ-clone/core-registry/Registry';
import TradeRate from '@civ-clone/core-trade-rate/TradeRate';
import Yield from '@civ-clone/core-yield/Yield';
import { Yield as YieldRule } from '@civ-clone/core-city/Rules/Yield';
import { reduceYield } from '@civ-clone/core-yield/lib/reduceYields';

export const getRules: (
  availableTradeRateRegistry?: AvailableTradeRateRegistry,
  playerTradeRatesRegistry?: PlayerTradeRatesRegistry
) => YieldRule[] = (
  availableTradeRateRegistry: AvailableTradeRateRegistry = availableTradeRateRegistryInstance,
  playerTradeRatesRegistry: PlayerTradeRatesRegistry = playerTradeRatesRegistryInstance
): YieldRule[] => [
  new YieldRule(
    new Effect((city: City, yields: Yield[]): Yield[] => {
      const playerRates = playerTradeRatesRegistry.getByPlayer(city.player()),
        total = Math.max(0, reduceYield(yields, Trade));

      let remaining = total;

      return availableTradeRateRegistry
        .entries()
        .map((TradeRateType: IConstructor<TradeRate>): Yield => {
          const TradeYield = (TradeRateType as typeof TradeRate).tradeYield,
            value = Math.min(
              Math.ceil(
                total *
                  (playerRates.get(TradeRateType as typeof TradeRate).value() /
                    100)
              ),
              remaining
            );

          remaining -= value;

          return new TradeYield(value, TradeRateType.name);
        });
    })
  ),
];

export default getRules;
