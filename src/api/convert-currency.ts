import {API_URL} from '@env';

import {formatDate} from '@/helpers';

type TConvertCurrencyParams = {
  from: string;
  to: string;
  amount: number;
};

export type TConvertCurrencyResponse = {
  success?: boolean;
  query: {
    from?: string;
    to?: string;
    amount: number;
    date?: string;
  };
  info?: {
    rate: number;
    timestamp: number;
  };
  result: number;
};

export async function convertCurrency({
  from,
  to,
  amount,
}: TConvertCurrencyParams) {
  try {
    const response = await fetch(
      `${API_URL}/convert/?` +
        new URLSearchParams({
          from,
          to,
          amount: String(amount),
          data: formatDate(),
          format: 'json',
        }).toString(),
    );
    const contentType = response.headers.get('Content-Type') || '';

    if (!response.ok) {
      const errorBody = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      const errorMessage =
        typeof errorBody === 'string'
          ? errorBody
          : errorBody?.description || errorBody?.error || 'Unknown error';

      throw new Error(errorMessage);
    }

    return (await response.json()) as TConvertCurrencyResponse;
  } catch (error) {
    const errorMessage = error as {message: string};
    throw new Error(errorMessage?.message || 'Currency conversion failed');
  }
}
