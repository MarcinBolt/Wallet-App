import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';
import Loader from '../Loader/Loader';

const SharedLayout = () => {
  return (
    <main className={css.main}>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default SharedLayout;
