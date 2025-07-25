import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import type { ApiResponse } from '../interfaces/api';

interface UseCRUDServicesOptions<T, CreateDto, UpdateDto> {
  queryKey: string;
  createFn: (data: CreateDto) => Promise<ApiResponse<T>>;
  updateFn: (data: UpdateDto) => Promise<ApiResponse<T>>;
  deleteFn: (id: string) => Promise<ApiResponse<T>>;
  messages?: {
    createSuccess?: string;
    createError?: string;
    updateSuccess?: string;
    updateError?: string;
    deleteSuccess?: string;
    deleteError?: string;
  };
  logics?: {
    createSuccess?: (data: T) => void;
    createError?: (error: unknown) => void;
    updateSuccess?: (data: T) => void;
    updateError?: (error: unknown) => void;
    deleteSuccess?: (id: string) => void;
    deleteError?: (error: unknown) => void;
  };
}

export const useCRUDServices = <T, CreateDto, UpdateDto>(options: UseCRUDServicesOptions<T, CreateDto, UpdateDto>) => {
  const queryClient = useQueryClient();
  const { queryKey, createFn, updateFn, deleteFn, messages = {}, logics = {} } = options;

  const {
    createSuccess: createSuccessMsg = 'Create success!',
    createError: createErrorMsg = 'Create failed!',
    updateSuccess: updateSuccessMsg = 'Update success!',
    updateError: updateErrorMsg = 'Update failed!',
    deleteSuccess: deleteSuccessMsg = 'Delete success!',
    deleteError: deleteErrorMsg = 'Delete failed!',
  } = messages;

  const createMutation = useMutation({
    mutationFn: createFn,
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      notification.success({ message: createSuccessMsg });
      logics.createSuccess?.(res.data);
    },
    onError: error => {
      notification.error({ message: createErrorMsg });
      logics.createError?.(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateFn,
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      notification.success({ message: updateSuccessMsg });
      logics.updateSuccess?.(res.data);
    },
    onError: error => {
      notification.error({ message: updateErrorMsg });
      logics.updateError?.(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: (_res, id) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      notification.success({ message: deleteSuccessMsg });
      logics.deleteSuccess?.(id);
    },
    onError: error => {
      notification.error({ message: deleteErrorMsg });
      logics.deleteError?.(error);
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
