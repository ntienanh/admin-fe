import { Route, Routes } from 'react-router-dom';
import RequireRole from '../components/RequireRole';
import MainLayout from '../layouts/MainLayout';
import { adminRoutes } from './adminRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {adminRoutes.map(({ path, element, allowedRoles }) => (
          <Route key={path} path={path} element={<RequireRole allowed={allowedRoles}>{element}</RequireRole>} />
        ))}

        <Route path='/unauthorized' element={<div>403 - Unauthorized</div>} />
        <Route path='*' element={<div>404 - Not Found</div>} />
      </Route>
    </Routes>
  );
};
