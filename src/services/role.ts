import axios from 'axios';
import type { IRole } from '../interfaces/role';

export const RoleServices = {
  roleQuery: async (): Promise<Array<IRole>> => {
    return await axios.get(`http://localhost:4000/roles`);
  },

  createRole: async (data: { name: string; description: string }): Promise<Array<IRole>> => {
    return await axios.post(`http://localhost:4000/roles`, data);
  },

  deleteRole: async (id: string): Promise<Array<IRole>> => {
    return await axios.delete(`http://localhost:4000/roles/${id}`);
  },
};
