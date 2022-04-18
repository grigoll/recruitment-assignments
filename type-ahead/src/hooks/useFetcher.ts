import { useEffect, useState } from 'react';

import { useCache } from '../providers';

/**
 * After some time cached instances will obviously become stale and
 * in real-world use-case revalidation will be necessary at times (tab refocus, interval, etc.)
 */
export function useFetcher<Data = any>(
  key: string,
  fetcher: (...args: any[]) => Data | Promise<Data>
) {
  const cache = useCache();
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (cache.has(key)) {
      setData(cache.get(key));
      return;
    }

    (async function runFetcher() {
      try {
        const resp = await fetcher(key);

        cache.set(key, resp);
        setData(resp);
      } catch (error) {
        setError(error);
      }
    })();
  }, [key, fetcher, cache]);

  return { data, error };
}
