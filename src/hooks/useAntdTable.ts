import { useQuery, type QueryKey } from '@tanstack/react-query';
import type { TablePaginationConfig, TableProps } from 'antd';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useCallback, useMemo, useState } from 'react';
import { cleanObject } from '../utils/common';

export interface ApiResponse<T> {
  data: T[];
  total: number;
}

export interface UseAntdTableProps<T> {
  queryKey: QueryKey;
  apiFn: (params: any) => Promise<ApiResponse<T>> | any;
  defaultParams?: Record<string, any>;
  enabled?: boolean;
  staleTime?: number;
}

export function useAntdTable<T>({
  queryKey,
  apiFn,
  defaultParams = {},
  enabled = true,
  staleTime = 1000 * 60,
}: UseAntdTableProps<T>) {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const [sorter, setSorter] = useState<SorterResult<T>>({});
  const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
  const [searchInputFilters, setSearchInputFilters] = useState<Record<string, any>>({});

  // ⚠️ Memo hóa defaultParams nếu từ ngoài vào không ổn định
  const stableDefaultParams = useMemo(() => defaultParams, []);

  const params = useMemo(() => {
    return cleanObject({
      page: pagination.current,
      limit: pagination.pageSize,
      sortBy: searchInputFilters.sortBy ?? (typeof sorter.field === 'string' ? sorter.field : undefined),
      order:
        searchInputFilters.order ??
        (sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : undefined),
      ...filters,
      ...stableDefaultParams,
      ...cleanObject(searchInputFilters),
    });
  }, [pagination, sorter, filters, searchInputFilters, stableDefaultParams]);

  const { data, isLoading, isFetching, refetch } = useQuery<ApiResponse<T>>({
    queryKey: useMemo(() => [...queryKey, params], [queryKey, params]),
    queryFn: () => apiFn(params),
    enabled,
    staleTime,
  });

  const handleTableChange: TableProps<T>['onChange'] = useCallback(
    (
      newPagination: TablePaginationConfig,
      newFilters: Record<string, FilterValue | null>,
      newSorter: SorterResult<T> | SorterResult<T>[],
    ) => {
      const normalizedSorter = Array.isArray(newSorter) ? newSorter[0] : newSorter;

      setPagination(prev => ({
        ...prev,
        current: newPagination.current ?? 1,
        pageSize: newPagination.pageSize ?? 10,
      }));

      setSorter(normalizedSorter);
      setFilters(newFilters);
    },
    [],
  );

  const handleSearchInputFilters = useCallback(
    (newFilters: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => {
      setSearchInputFilters(prev =>
        typeof newFilters === 'function' ? { ...prev, ...newFilters(prev) } : { ...prev, ...newFilters },
      );

      setPagination(prev => ({
        ...prev,
        current: 1,
      }));
    },
    [],
  );

  return {
    data: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading || isFetching,
    refetch,
    setSearchInputFilters: handleSearchInputFilters,
    setPagination,
    isFetching,
    tableProps: {
      dataSource: data?.data ?? [],
      loading: isLoading || isFetching,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: data?.total ?? 0,
        showSizeChanger: true,
        showTotal: total => `Total: ${total}`,
      },
      onChange: handleTableChange,
    } satisfies TableProps<T>,
  };
}
