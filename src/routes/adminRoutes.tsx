// routes/adminRoutes.ts

import { lazy, type JSX } from 'react';
import type { Role } from '../contexts/AuthContext';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const RolePage = lazy(() => import('../pages/Role'));
const Product = lazy(() => import('../pages/Product'));
const StaffPage = lazy(() => import('../pages/Staff'));

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
    path: '/role',
    element: <RolePage />,
    allowedRoles: ['admin'],
  },
  {
    path: '/staff',
    element: <StaffPage />,
    allowedRoles: ['admin'],
  },
];
