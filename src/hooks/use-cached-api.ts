import { useState, useEffect, useCallback } from 'react';

export function useCachedApi<T extends object>(name: string, fetchData: () => Promise<T>, initialData: T): T {
  const [data, setData] = useState<T>(initialData);
  const cacheKey = `jfv-map-pdf-${name}-v1`;

  const getCached = useCallback((): T | null => {
    const json = localStorage.getItem(cacheKey);

    if (!json) {
      return null;
    }

    let cached = null;

    try {
      cached = JSON.parse(json);
    } catch (e) {
      // no op
    }

    return cached;
  }, [cacheKey]);

  useEffect(() => {
    const cached = getCached() ?? initialData;
    setData(cached);

    if (!import.meta.env.PROD) {
      return;
    }

    fetchData().then(d => {
      localStorage.setItem(cacheKey, JSON.stringify(d));
      setData(d);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}
