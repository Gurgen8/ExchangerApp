import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {EExchangePosition} from '@/context';

export type TStackRoutNavigationParams = {
  [EStackNavigationRoutes.SelectCurrency]: {
    exchangePosition: EExchangePosition;
  };
  [EStackNavigationRoutes.ConvertCurrency]: undefined;
};

export enum EStackNavigationRoutes {
  ConvertCurrency = 'ConvertCurrency',
  SelectCurrency = 'SelectCurrency',
}

export type TStackNavigationScreenProps<
  T extends keyof TStackRoutNavigationParams,
> = NativeStackScreenProps<TStackRoutNavigationParams, T>;
