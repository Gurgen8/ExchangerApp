import {API_URL} from '@env';

type TGetRequestOptions = {
  method?: 'GET';
  params?: Record<string, string>;
};
type TOtherRequestOptions = {
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: object;
};

type TMakeRequestConfigs = {
  url?: string;
  headers?: RequestInit['headers'];
} & (TGetRequestOptions | TOtherRequestOptions);

export async function makeRequest<TResponse>(
  configs: TMakeRequestConfigs,
): Promise<TResponse | undefined> {
  const method = configs.method ?? 'GET';

  const params =
    method === 'GET' && (configs as TGetRequestOptions).params
      ? `?${new URLSearchParams((configs as TGetRequestOptions).params).toString()}`
      : '';

  const body = (configs as {body?: object})?.body;

  try {
    const response = await fetch(API_URL + configs.url + params, {
      method,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (
      response.status.toString().startsWith('4') ||
      response.status.toString().startsWith('5')
    ) {
      throw await response.json();
    }

    if (method === 'DELETE') {
      return;
    }

    return response.json();
  } catch (error) {
    if (typeof error === 'string') {
      throw new Error(error);
    }

    throw error;
  }
}
