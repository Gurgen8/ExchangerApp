import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {getLatestCurrencies} from '@/api';
import {ConvertCurrencyScreen, SelectCurrencyScreen} from '@/screens';
import {useLatestCurrencyRatesState} from '@/storage';

import {navigationConfig} from './config';
import {EStackNavigationRoutes, TStackRoutNavigationParams} from './types';

const Stack = createNativeStackNavigator<TStackRoutNavigationParams>();

export const AppNavigation = () => {
  const [_, setLatestCurrencyRatesState] = useLatestCurrencyRatesState();

  useEffect(() => {
    const initLatestCurrencies = async () => {
      try {
        const res = await getLatestCurrencies();

        setLatestCurrencyRatesState(JSON.stringify(res.rates));
      } catch (error) {
        console.log(error);
      }
    };

    initLatestCurrencies();
  }, [setLatestCurrencyRatesState]);

  return (
    <Stack.Navigator screenOptions={navigationConfig}>
      <Stack.Screen
        name={EStackNavigationRoutes.ConvertCurrency}
        component={ConvertCurrencyScreen}
      />
      <Stack.Screen
        name={EStackNavigationRoutes.SelectCurrency}
        component={SelectCurrencyScreen}
      />
    </Stack.Navigator>
  );
};
