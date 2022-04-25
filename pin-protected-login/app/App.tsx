import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GlobalErrorHandler } from './containers';
import { ApiClientProvider } from './providers';
import { HomeScreen, LoginScreen } from './screens';
import { useAppStore } from './store';

export default function App() {
  const isSignedIn = useAppStore(({ token }) => !!token);

  return (
    <ErrorBoundary FallbackComponent={GlobalErrorHandler}>
      <SafeAreaProvider>
        <ApiClientProvider>{isSignedIn ? <HomeScreen /> : <LoginScreen />}</ApiClientProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
