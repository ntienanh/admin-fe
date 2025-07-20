import { Input } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchInputProps {
  delayMs?: number;
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
}

const SearchInput = ({ delayMs = 500, placeholder = 'Search...', onSearch, className }: SearchInputProps) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce({ value, delayMs });

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

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
