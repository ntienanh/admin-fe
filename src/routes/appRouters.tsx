import { Route, Routes } from 'react-router-dom';
import RequireRole from '../contexts/RequireRole';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/Auth/Login';
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
      </Route>

      <Route path='/login' element={<LoginPage />} />
      {/* <Route path='/register' element={<RegisterPage />} /> */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
