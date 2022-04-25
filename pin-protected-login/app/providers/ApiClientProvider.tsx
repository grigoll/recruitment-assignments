import React, { createContext, useContext, useState } from 'react';

import { useConfig } from '../hooks/useConfig';
import { ApiClient } from '../lib';
import { HttpClient } from '../types';

const HttpClientContext = createContext<HttpClient | null>(null);

export const ApiClientProvider: React.FC<{ value?: HttpClient }> = ({ children, value }) => {
  const { baseUrl } = useConfig();
  const [client] = useState(() => (value ? value : new ApiClient(baseUrl)));

  return <HttpClientContext.Provider value={client}>{children}</HttpClientContext.Provider>;
};

export const useApiClient = () => {
  const value = useContext(HttpClientContext);

  if (!value)
    throw new Error(`Can't use '${useApiClient.name}' outside of '${ApiClientProvider.name}'`);

  return value;
};
