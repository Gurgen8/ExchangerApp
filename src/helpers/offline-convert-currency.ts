import {EStorageKeys, storage} from '@/storage';

export function offlineConvertCurrency(
  from: string,
  to: string,
  amount: number,
): number {
  const ratesString = storage.getString(EStorageKeys.latestCurrencyRates);

  if (!ratesString) {
    throw new Error('Please connect your phone to Internet!');
  }

  const rates = JSON.parse(ratesString);

  if (!rates[from] || !rates[to]) {
    throw new Error(`Invalid currency code: ${from} or ${to}`);
  }

  return (amount * rates[to]) / rates[from];
}
