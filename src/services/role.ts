import axios from 'axios';
import type { IRole } from '../interfaces/role';

interface RoleQueryParams {
  name?: string;
  description?: string;
  sortBy?: 'name' | 'description' | 'createdAt';
  order?: 'asc' | 'desc';
}

export const RoleServices = {
  roleQuery: async (params?: RoleQueryParams): Promise<Array<IRole>> => {
    const res = await axios.get(`http://localhost:4000/roles`, {
      params,
    });
    return res.data;
  },
  createRole: async (data: { name: string; description: string }): Promise<Array<IRole>> => {
    return await axios.post(`http://localhost:4000/roles`, data);
  },

  deleteRole: async (id: string): Promise<Array<IRole>> => {
    return await axios.delete(`http://localhost:4000/roles/${id}`);
  },

  updateRole: async (data: { id: string; name: string; description: string }): Promise<Array<IRole>> => {
    const { id, ...rest } = data;
    return await axios.patch(`http://localhost:4000/roles/${id}`, rest);
  },
};
