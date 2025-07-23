import { Navigate } from 'react-router-dom';
import { useAuth, type Role } from './AuthContext';

const RequireRole = ({ allowed, children }: { allowed: Role[]; children: React.ReactNode }) => {
  const { role } = useAuth();

  if (!allowed.includes(role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <>{children}</>;
};

export default RequireRole;
