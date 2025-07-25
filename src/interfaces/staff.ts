export interface IStaff {
  id: string;
  email: string;
  name: string | null;
  password: string;
  provider: string | null;
  providerId: string | null;
  avatar: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  roleId: string | null;
  shopId: string | null;
}

export interface CreateStaffDto {
  email: string;
  password: string;
  name: string | null;
  avatar?: string;
  provider?: string;
  providerId?: string;
  roleId?: string;
  shopId?: string;
}

export interface UpdateStaffDto {
  id: string;
  name: string | null;
  email: string;
  avatar?: string;
  provider?: string;
  providerId?: string;
  roleId?: string;
  shopId?: string;
}
