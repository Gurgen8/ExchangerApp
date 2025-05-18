import {MMKV, useMMKVString} from 'react-native-mmkv';

import {EStorageKeys} from './keys';

export const storage = new MMKV();

export const useLatestCurrencyRatesState = () =>
  useMMKVString(EStorageKeys.latestCurrencyRates, storage);
