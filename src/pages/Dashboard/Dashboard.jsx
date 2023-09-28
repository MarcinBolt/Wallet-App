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
    <PageContainer>
      <div className={css.navMobileWrapper}>
        <TempNavi />
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </PageContainer>
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
        </Suspense>
      </div>
    </PageContainer>
  );
};
const DashboardDesktop = () => {
  return (
    <PageContainer>
      <div className={css.dashboardDesktopWrapper}>
        <div className={css.navBalCurrDesktopWrapper}>
          <TempNavi />
          <TempBalance />
          <CurrencyTable />
        </div>
        <div className={css.desktopSeparator}></div>
        <div className={css.homeTabDesktopWrapper}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </PageContainer>
  );
};

const Dashboard = () => {
  const { mobile, tablet, desktop } = mediaQueries;

  return (
    <>
      <Header />
      <Media
        queries={{
          small: mobile,
          medium: tablet,
          large: desktop,
        }}
      >
        {matches => (
          <div className={css.dashboard}>
            {matches.small && <DashboardMobile />}
            {matches.medium && <DashboardTablet />}
            {matches.large && <DashboardDesktop />}
          </div>
        )}
      </Media>
    </>
  );
};

export default Dashboard;