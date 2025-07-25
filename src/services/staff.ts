import axios from 'axios';
import type { ApiResponse } from '../interfaces/api';
import type { CreateStaffDto, IStaff, UpdateStaffDto } from '../interfaces/staff';

interface StaffQueryParams {
  name?: string;
  description?: string;
  sortBy?: 'name' | 'description' | 'createdAt';
  order?: 'asc' | 'desc';
}

export const StaffServices = {
  staffQuery: async (params?: StaffQueryParams): Promise<ApiResponse<IStaff>> => {
    const res = await axios.get(`http://localhost:4000/users`, {
      params,
    });

    return {
      data: res.data,
      total: res.data.length,
    };
  },
  createStaff: async (data: CreateStaffDto): Promise<ApiResponse<IStaff>> => {
    return await axios.post('http://localhost:4000/users', data);
  },

  updateStaff: async (data: UpdateStaffDto): Promise<ApiResponse<IStaff>> => {
    const { id, ...rest } = data;
    return await axios.patch(`http://localhost:4000/users/${id}`, rest);
  },

  deleteStaff: async (id: string): Promise<ApiResponse<IStaff>> => {
    return await axios.delete(`http://localhost:4000/users/${id}`);
  },
};
