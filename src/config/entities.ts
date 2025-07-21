import type { ColumnsType } from 'antd/es/table';
import type { IRole } from '../interfaces/role';

export interface EntityConfig<T> {
  columns: ColumnsType<T>;
  filterKeys: (keyof T)[];
}

export const EntityConfigs: {
  roles: EntityConfig<IRole>;
  users: EntityConfig<any>;
} = {
  roles: {
    columns: [
      { title: 'Name', dataIndex: 'name' },
      { title: 'Description', dataIndex: 'description' },
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
