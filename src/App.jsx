import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from './utils/hooks/user.auth.js';
import { refreshUser } from './redux/auth/auth.operations.js';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import Loader from './components/Loader/Loader.jsx';
import './App.css';
import SharedLayout from './components/SharedLayout/SharedLayout.jsx';
import CurrencyTable from './components/CurrencyTable/CurrencyTable.jsx';
import DiagramTab from './components/DiagramTab/DiagramTab.jsx';
import HomeTab from './components/HomeTab/HomeTab.jsx';

const Login = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const Register = lazy(() => import('./pages/RegisterPage/RegisterPage.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail.jsx'))

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const { isRefreshing } = useAuth();

  return isRefreshing ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<PublicRoute redirectTo={<Navigate to="/dashboard" replace />} component={<Login />} />} />
          <Route path="/register" element={<PublicRoute component={<Register />} redirectTo={<Navigate to="/dashboard" replace />} />} />
          <Route path="/login" element={<PublicRoute redirectTo={<Navigate to="/dashboard" replace />} component={<Login />} />} />
          <Route path="/dashboard" element={<PrivateRoute redirectTo={<Navigate to="/login" replace />} component={<Dashboard />} />} />
          <Route path={`/users/verify/:verificationToken`} element={<PublicRoute component={<VerifyEmail />} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
