import { Suspense } from 'react';
import Media from 'react-media';
import { mediaQueries } from '../../utils/constants';
import Header from '../../components/Header/Header';
import TempNavi from '../../components/temporary components/TempNavi';
import { Outlet } from 'react-router-dom';
import CurrencyTable from '../../components/CurrencyTable/CurrencyTable';
import TempBalance from '../../components/temporary components/TempBalance';
import Loader from '../../components/Loader/Loader';
import PageContainer from '../../components/PageContainer/PageContainer ';
import css from './Dashboard.module.css';

const DashboardMobile = () => {
  return (
    <>
      <div className={css.navMobileWrapper}>
        <TempNavi />
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
const DashboardTablet = () => {
  return (
    <PageContainer>
      <div className={css.dashboardTablet}>
        <div className={css.dashboardTabletWrapper}>
          <div className={css.navBalTabletWrapper}>
            <TempNavi />
            <TempBalance />
          </div>
          <div className={css.currTabletWrapper}>
            <CurrencyTable />
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>{' '}
      </div>
    </PageContainer>
  );
};
const DashboardDesktop = () => {
  return (
    <>
      <div>
        <TempNavi />
        <TempBalance />
        <CurrencyTable />
      </div>
      <div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

const Dashboard = () => {
  const { mobile, tablet, desktop } = mediaQueries;

  return (
    <div className={css.dashboard}>
      <Header />
      <Media
        queries={{
          small: mobile,
          medium: tablet,
          large: desktop,
        }}
      >
        {matches => (
          <div>
            {matches.small && <DashboardMobile />}
            {matches.medium && <DashboardTablet />}
            {matches.large && <DashboardDesktop />}
          </div>
        )}
      </Media>
    </div>
  );
};

export default Dashboard;
