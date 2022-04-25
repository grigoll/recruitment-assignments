import { useMemo } from 'react';

const networkIp = 'localhost'; // <== please set your IP explicitly if running on emulator. eg: 192.168.100.1

export function useConfig() {
  const config = useMemo(
    () => ({
      pinLength: 4,
      baseUrl: `http://${networkIp}:3000`,
    }),
    []
  );

  return config;
}
