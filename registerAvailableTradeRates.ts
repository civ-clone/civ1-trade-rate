import { Luxuries, Research, Tax } from './TradeRates';
import { instance as availableTradeRatesRegistryInstance } from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';

availableTradeRatesRegistryInstance.register(Luxuries, Research, Tax);
