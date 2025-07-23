import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import type { IRole } from '../interfaces/role';

export interface EntityConfig<T> {
  columns: ColumnsType<T>; // for table
  filterKeys: (keyof T)[]; // for search input
}

export enum EntityKey {
  Roles = 'roles',
  Users = 'users',
}

export const EntityConfigs: {
  roles: EntityConfig<IRole>;
  users: EntityConfig<any>;
} = {
  roles: {
    columns: [
      { title: 'Name', dataIndex: 'name' },
      { title: 'Description', dataIndex: 'description' },
      { title: 'CreatedAt', dataIndex: 'createdAt', render: (text: string) => dayjs(text).format('DD/MM/YYYY HH:mm') },
      { title: 'UpdatedAt', dataIndex: 'updatedAt', render: (text: string) => dayjs(text).format('DD/MM/YYYY HH:mm') },
    ],
    filterKeys: ['name', 'description'],
  },
  users: {
    columns: [
      { title: 'Username', dataIndex: 'username' },
      { title: 'Email', dataIndex: 'email' },
    ],
    filterKeys: ['username', 'email'],
  },
};
