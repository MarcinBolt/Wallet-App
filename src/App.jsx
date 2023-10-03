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
import HomeTab from './components/HomeTab/HomeTab.jsx';
import CurrencyTable from './components/CurrencyTable/CurrencyTable.jsx';

const Login = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const Register = lazy(() => import('./pages/RegisterPage/RegisterPage.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail.jsx'));
const Statistics = lazy(() => import('./components/Statistics/Statistics.jsx'));

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
          <Route exact path={`/dashboard`} element={<PrivateRoute component={<Dashboard />} />}>
            <Route exact index element={<PrivateRoute component={<HomeTab />} />} />
            <Route
              exact
              path={'statistics'}
              element={<PrivateRoute component={<Statistics />} />}
            />
            <Route
              exact
              path={'currency'}
              element={<PrivateRoute component={<CurrencyTable />} />}
            />
          </Route>
          <Route exact index element={<PublicRoute component={<Login />} />} />
          <Route exact path={`/login`} element={<PublicRoute component={<Login />} />} />
          <Route exact path={`/register`} element={<PublicRoute component={<Register />} />} />
          <Route path={`/users/verify/:verificationToken`} element={<PublicRoute component={<VerifyEmail />} />} />
          <Route path="*" element={<PublicRoute component={<NotFound />} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
