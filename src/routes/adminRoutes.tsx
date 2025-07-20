// routes/adminRoutes.ts

import { lazy, type JSX } from 'react';
import type { Role } from '../contexts/AuthContext';
import LoginPage from '../pages/Auth/Login';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Product = lazy(() => import('../pages/Product'));

export interface AppRoute {
  path: string;
  element: JSX.Element;
  allowedRoles: Role[];
}

export const adminRoutes: AppRoute[] = [
  {
    path: '/',
    element: <Dashboard />,
    allowedRoles: ['admin', 'staff'],
  },
  {
    path: '/product',
    element: <Product />,
    allowedRoles: ['admin'],
  },
  {
    path: '/login',
    element: <LoginPage />,
    allowedRoles: ['staff', 'admin'],
  },
];
