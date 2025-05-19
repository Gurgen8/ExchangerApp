import {formatDate} from '@/helpers';

import {EApiRoutes} from './keys';
import {makeRequest} from './make-request';

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
  result: number | null;
};

export async function convertCurrency({
  from,
  to,
  amount,
}: TConvertCurrencyParams) {
  return await makeRequest<TConvertCurrencyResponse>({
    url: EApiRoutes.convert,
    params: {
      from,
      to,
      amount: amount.toString(),
      data: formatDate(),
      format: 'json',
    },
  });
}
