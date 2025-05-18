import {API_URL} from '@env';

type TGetLatestCurrenciesResponse = {rates: {[key: string]: number}};

export async function getLatestCurrencies() {
  try {
    const response = await fetch(`${API_URL}/latest`);
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

    return (await response.json()) as TGetLatestCurrenciesResponse;
  } catch (error) {
    const errorMessage = error as {message: string};
    throw new Error(errorMessage?.message || 'Currency conversion failed');
  }
}
