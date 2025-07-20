import { createContext, useContext, useState } from 'react';

export type Role = 'admin' | 'staff' | 'all';

interface AuthContextType {
  token: string | null;
  role: Role;
  login: (token: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<Role>((localStorage.getItem('role') as Role) || 'staff');

  const login = (t: string, r: Role) => {
    localStorage.setItem('token', t);
    localStorage.setItem('role', r);
    setToken(t);
    setRole(r);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole('staff');
  };

  return <AuthContext.Provider value={{ token, role, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext)!;
