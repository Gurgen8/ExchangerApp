import {EApiRoutes} from './keys';
import {makeRequest} from './make-request';

type TGetLatestCurrenciesResponse = {rates: {[key: string]: number}};

export async function getLatestCurrencies() {
  return await makeRequest<TGetLatestCurrenciesResponse>({
    url: EApiRoutes.latest,
  });
}
