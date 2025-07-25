import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import type { IRole } from '../interfaces/role';
import type { IStaff } from '../interfaces/staff';

export interface EntityConfig<T> {
  columns: ColumnsType<T>; // for table
  filterKeys: (keyof T)[]; // for search input
}

export enum EntityKey {
  Roles = 'roles',
  Staff = 'staff',
}

export const EntityConfigs: {
  roles: EntityConfig<IRole>;
  staff: EntityConfig<IStaff>;
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
  staff: {
    columns: [
      { title: 'Username', dataIndex: 'name' },
      { title: 'Email', dataIndex: 'email' },
      { title: 'Provider', dataIndex: 'provider', render: (text: string) => text || 'Account' },
      { title: 'Avatar', dataIndex: 'avatar', render: (text: string) => text || '-', align: 'center' },
    ],
    filterKeys: ['name'],
  },
};
