export type SortField = 'name' | 'createdAt' | 'updatedAt';
export const FIELD_LABELS: Record<SortField, string> = {
  name: 'Name',
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt',
};

export const ORDER_LABELS: Record<SortOrder, string> = {
  asc: 'A-Z',
  desc: 'Z-A',
};
export type SortOrder = 'asc' | 'desc';

export type SortKey = `${SortField}_${SortOrder}`;
