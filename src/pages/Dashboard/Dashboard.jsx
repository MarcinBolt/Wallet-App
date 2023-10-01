import { Suspense } from 'react';
import Media from 'react-media';
import { mediaQueries } from '../../utils/constants';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import CurrencyTable from '../../components/CurrencyTable/CurrencyTable';
import TempBalance from '../../components/temporary components/TempBalance';
import Loader from '../../components/Loader/Loader';
import PageContainer from '../../components/PageContainer/PageContainer ';
import css from './Dashboard.module.css';
import Navigation from '../../components/Navigation/Navigation';
import UserPanel from '../../components/UserPanel/UserPanel';
import { Box } from '@mui/system'; 
 import Balance from '../../components/Balance/Balance';

const DashboardMobile = () => {
  return (
    <PageContainer>
      <UserPanel/>
      <div className={css.navMobileWrapper}>
        <Navigation />
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
      <UserPanel/>
      <div className={css.dashboardTablet}>
        <div className={css.dashboardTabletWrapper}>
          <div className={css.navBalTabletWrapper}>
            <Navigation />
            <Balance />
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
      <Box
      // sx={{
      //   backgroundColor: "pink",
      //   width: 30,
      //   height: 30,
      //   animation: `${spin} 1s infinite ease`
      // }}
      >
  <UserPanel/>

      </Box>
    
      <div className={css.dashboardDesktopWrapper}>
        <div className={css.navBalCurrDesktopWrapper}>
          <Navigation />
          <Balance />
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
