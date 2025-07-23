const API_URL = process.env.REACT_APP_API_URL || '';

export const buildUrl = (path?: string) => {
  if (!path) return API_URL;
  return `${API_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
};
