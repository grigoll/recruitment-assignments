import { ApiError } from '../lib';

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;
