import React, {ReactNode, useCallback, useState} from 'react';

import {
  initialValue,
  ExchangeContext,
  TExchangeData,
  TSelectCurrency,
} from './context';

interface TExchangeProviderProps {
  children: ReactNode;
}

export function ExchangeProvider({children}: TExchangeProviderProps) {
  const [exchangeData, setExchangeData] = useState<TExchangeData>(
    initialValue.exchangeData,
  );

  const selectCurrency = useCallback<TSelectCurrency>(({data, type}) => {
    setExchangeData(prev => ({...prev, [type]: data}));
  }, []);

  const swapExchange = useCallback(() => {
    setExchangeData(prev => ({from: prev.to, to: prev.from}));
  }, []);

  return (
    <ExchangeContext.Provider
      value={{exchangeData, selectCurrency, swapExchange}}>
      {children}
    </ExchangeContext.Provider>
  );
}
