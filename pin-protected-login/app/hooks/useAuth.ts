import { useCallback } from 'react';

import { useApiClient } from '../providers';
import { useAppStore } from '../store';
import { LoginResponse, LogoutResponse, Route } from '../types';
import { useGlobalErrorHandler } from './useGlobalErrorHandler';

export function useAuth() {
  const handleError = useGlobalErrorHandler();
  const apiClient = useApiClient();
  const { token, setToken } = useAppStore(({ token, setToken }) => ({ token, setToken }));

  const login = useCallback(
    async (pin: string) => {
      try {
        const { token } = await apiClient.post<LoginResponse>(Route.LOGIN, { json: { pin } });

        setToken(token);
      } catch (error) {
        handleError(error);
      }
    },
    [apiClient, handleError, setToken]
  );

  const logout = useCallback(async () => {
    try {
      if (!token) {
        throw new Error(`Failed to log out: token is not set`);
      }

      await apiClient.post<LogoutResponse>(Route.LOGOUT, {
        headers: { Authorization: token },
      });

      setToken(null);
    } catch (error) {
      handleError(error);
    }
  }, [apiClient, handleError, setToken, token]);

  return { login, logout };
}
