import {createContext, useContext} from 'react';

import currenciesData from '@/assets/data/currencies.json';

export type TCurrencyData = (typeof currenciesData)[number];

export enum EExchangePosition {
  'from' = 'from',
  'to' = 'to',
}
export type TExchangeData = Record<EExchangePosition, TCurrencyData | null>;
export type TSelectCurrency = (args: {
  data: TCurrencyData;
  type: EExchangePosition;
}) => void;

export type TAvailableCurrencyItem = {
  code: string;
  name: string;
  decimal_digits: number;
  name_plural: string;
  rounding: number;
  symbol: string;
  symbol_native: string;
};

type TExchangeContext = {
  exchangeData: TExchangeData;
  selectCurrency: TSelectCurrency;
  swapExchange: () => void;
};

export const initialValue: TExchangeContext = {
  exchangeData: {from: null, to: null},
  selectCurrency: () => {},
  swapExchange: () => {},
};

export const ExchangeContext = createContext<TExchangeContext>(initialValue);
export const useExchangeContext = () => useContext(ExchangeContext);
