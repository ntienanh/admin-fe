// Loại bỏ các field rỗng/null/undefined
export function cleanObject(obj: Record<string, any>) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== ''));
}
