export type LoginResponse = { token: string };

export type LogoutResponse = { message: string };

export type ApiErrorResponse = {
  error: ApiErrorName;
  message: string;
};

export enum ApiErrorName {
  IncorrectPin = 'INCORRECT_PIN',
  InvalidRequest = 'INVALID_REQUEST',
  TokenMissing = 'TOKEN_MISSING',
  BadToken = 'BAD_TOKEN',
}

export enum Route {
  LOGIN = '/login',
  LOGOUT = '/logout',
}

export type RequestOptions = RequestInit & { json?: Record<string, unknown> };

export interface HttpClient {
  post<R>(url: string, options?: RequestOptions): Promise<R>;
}
