import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

export const useCrudService = <T>(
  service: {
    create: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
  },
  queryKey: string[],
) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      notification.success({ message: 'Create success' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: service.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      notification.success({ message: 'Update success' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: service.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      notification.success({ message: 'Delete success' });
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};

// const { createMutation, updateMutation, deleteMutation } = useCrudService<IRole>(RoleServices, ['roles']);
