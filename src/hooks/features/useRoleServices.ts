import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import type { IRole } from '../../interfaces/role';
import { RoleServices } from '../../services/role';

export const useRoleServices = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: RoleServices.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      notification.success({ message: 'Role created successfully!' });
    },
    onError: () => {
      notification.error({ message: `Role created failed!` });
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: IRole) => RoleServices.updateRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      notification.success({ message: 'Role updated successfully!' });
    },
    onError: () => {
      notification.error({ message: `Role updated failed!` });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: RoleServices.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      notification.success({ message: 'Role deleted successfully!' });
    },
    onError: () => {
      notification.error({ message: `Role deleted failed!` });
    },
  });

  return {
    createMutation,
    editMutation,
    deleteMutation,
  };
};
