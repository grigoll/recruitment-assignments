import React, { createContext, useContext, useState } from 'react';

const CacheContext = createContext<Map<string, any> | null>(null);

export const CacheProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [cache] = useState(() => new Map());

  return (
    <CacheContext.Provider value={cache}>{children}</CacheContext.Provider>
  );
};

export const useCache = () => {
  const value = useContext(CacheContext);

  if (!value) throw new Error("Can't use `useCache` outside of `CacheContext`");

  return value;
};
