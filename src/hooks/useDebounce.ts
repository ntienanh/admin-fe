import { useEffect, useState } from 'react';

interface IUseDebounceProps<T> {
  value: T;
  delayMs?: number;
}

export const useDebounce = <T>(props: IUseDebounceProps<T>): T => {
  const { value, delayMs = 500 } = props;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [JSON.stringify(value), delayMs]);

  return debouncedValue;
};
