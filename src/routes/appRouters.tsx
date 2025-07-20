import { Route, Routes } from 'react-router-dom';
import RequireRole from '../components/RequireRole';
import MainLayout from '../layouts/MainLayout';
import NotFoundPage from '../pages/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import { adminRoutes } from './adminRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {adminRoutes.map(({ path, element, allowedRoles }) => (
          <Route key={path} path={path} element={<RequireRole allowed={allowedRoles}>{element}</RequireRole>} />
        ))}

        <Route path='/unauthorized' element={<UnauthorizedPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
