import { ApiErrorName, ApiErrorResponse, HttpClient, RequestOptions } from '../types';

export class ApiError extends Error {
  constructor(public name: ApiErrorName, message?: string) {
    super(message);
    this.name = name;
  }
}

export class ApiClient implements HttpClient {
  constructor(private baseUrl: string) {}

  post<R = void>(url: string, options?: RequestOptions) {
    return this.request<R>(url, { ...options, method: 'POST' });
  }

  private async request<R = void>(url: string, options: RequestOptions): Promise<R> {
    try {
      const headers = new Headers(options.headers);

      if (options.json) {
        headers.set('content-type', 'application/json');
      }

      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        headers,
        body: options.json ? JSON.stringify(options.json) : options.body,
      });

      if (!response.ok) {
        throw response;
      }

      if (response.headers.get('content-type')?.includes('application/json')) {
        return response.json();
      }

      return response.text() as unknown as Promise<R>;
    } catch (err) {
      if (err instanceof Response) {
        const { error, message }: ApiErrorResponse = await err.json();

        throw new ApiError(error, message);
      }

      throw err;
    }
  }
}
