import { Input } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchInputProps {
  filterKey: string | string[];
  delayMs?: number;
  placeholder?: string;
  onSearch: (value: Record<string, string>) => void;
  className?: string;
}

const SearchInput = ({
  filterKey,
  delayMs = 500,
  placeholder = 'Search...',
  onSearch,
  className,
}: SearchInputProps) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce({ value, delayMs });

  useEffect(() => {
    if (!debouncedValue && debouncedValue !== '') return;

    const keys = Array.isArray(filterKey) ? filterKey : [filterKey];
    const searchValues = keys.reduce(
      (acc, key) => {
        acc[key] = debouncedValue;
        return acc;
      },
      {} as Record<string, string>,
    );

    onSearch(searchValues);
  }, [debouncedValue, filterKey, onSearch]);

  return (
    <Input.Search
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={placeholder}
      allowClear
      className={clsx('w-[320px]', className)}
    />
  );
};

export default SearchInput;
