type CurrencyRates = Record<string, number>;

export function offlineConvertCurrency(
  rates: CurrencyRates,
  from: string,
  to: string,
  amount: number,
): number {
  if (!rates[from] || !rates[to]) {
    throw new Error(`Invalid currency code: ${from} or ${to}`);
  }

  const usdAmount = amount / rates[from];
  const converted = usdAmount * rates[to];

  return converted;
}
