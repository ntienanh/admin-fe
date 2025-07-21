import { useQuery, type QueryKey } from '@tanstack/react-query';
import type { TablePaginationConfig, TableProps } from 'antd';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useCallback, useMemo, useState } from 'react';
import { cleanObject } from '../utils/common';

// Kết quả API dạng chuẩn: items + total
export interface ApiResponse<T> {
  data: T[];
  total: number;
}

// Props truyền vào hook
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
  staleTime = 1000 * 60, // mặc định cache trong 1 phút
}: UseAntdTableProps<T>) {
  // Pagination: current page + size
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  // Sorter: sort field + order
  const [sorter, setSorter] = useState<SorterResult<T>>({});

  // Filters: dùng cho cột filter
  const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
  // External filters: dùng search Input
  const [searchInputFilters, setSearchInputFilters] = useState<Record<string, any>>({});

  const params = useMemo(() => {
    const rawParams = {
      page: pagination.current,
      limit: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
      ...defaultParams,
      ...searchInputFilters,
    };

    return cleanObject(rawParams);
  }, [pagination, sorter, filters, defaultParams, searchInputFilters]);

  const { data, isLoading, isFetching, refetch } = useQuery<ApiResponse<T>>({
    queryKey: [...queryKey, params],
    queryFn: () => apiFn(params),
    enabled,
    staleTime,
  });

  // Xử lý khi table change
  const handleTableChange: TableProps<T>['onChange'] = useCallback(
    (
      newPagination: TablePaginationConfig,
      newFilters: Record<string, FilterValue | null>,
      newSorter: SorterResult<T> | SorterResult<T>[],
    ) => {
      const normalizedSorter = Array.isArray(newSorter) ? newSorter[0] : newSorter;

      setPagination({
        current: newPagination.current ?? 1,
        pageSize: newPagination.pageSize ?? 10,
      });
      setSorter(normalizedSorter);
      setFilters(newFilters);
    },
    [],
  );

  return {
    data: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading || isFetching,
    refetch,
    setSearchInputFilters,
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
