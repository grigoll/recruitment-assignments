import { useCallback } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import { useAppStore } from '../store';
import { ApiErrorName } from '../types';
import { isApiError } from '../utils';

/**
 * This is only a simple implementation.
 * This way handling errors i.e. sending them to global error boundary will only catch JS errors.
 * To catch native errors we'd use other native libraries that Expo does not support unfortunately.
 */
export function useGlobalErrorHandler() {
  const handleError = useErrorHandler();
  const setPinError = useAppStore((state) => state.setPinError);

  const handler = useCallback(
    (error: unknown) => {
      // we only have dedicated error component for incorrect pin
      // rest of them are sent to the generic error component
      if (isApiError(error) && error.name === ApiErrorName.IncorrectPin) {
        setPinError(error.name);
        return;
      }

      handleError(error);
    },
    [handleError, setPinError]
  );

  return handler;
}
