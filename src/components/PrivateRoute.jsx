import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks/user.auth.js';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component, redirect = '/' }) => {
  const { isAuthorized, isRefreshing } = useAuth();
  const shouldRedirect = isAuthorized && !isRefreshing;

  return shouldRedirect ? component : <Navigate to={redirect} replace />;
};

export default PrivateRoute;
