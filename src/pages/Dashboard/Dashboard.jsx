import { Suspense } from 'react';
import Media from 'react-media';
import { mediaQueries } from '../../utils/constants';
import Header from '../../components/Header/Header';
import TempNavi from '../../components/temporary components/TempNavi';
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import CurrencyTable from '../../components/CurrencyTable/CurrencyTable';
import TempBalance from '../../components/temporary components/TempBalance';
import Loader from '../../components/Loader/Loader';
import PageContainer from '../../components/PageContainer/PageContainer ';

const DashboardMobile = () => {
  return (
    <>
      <Header />
      <TempNavi />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
const DashboardTablet = () => {
  return (
    <>
      <Header />
      <div className={css.dashboardTabletWrapper}>
        <div>
          <TempNavi />
          <TempBalance />
        </div>
        <div>
          <CurrencyTable />
        </div>
      </div>
      <div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};
const DashboradDesktop = () => {
  return (
    <>
      <Header />
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
    <div>
      <Header />
      <PageContainer>
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
              {matches.large && <DashboradDesktop />}
            </div>
          )}
        </Media>
      </PageContainer>
    </div>
  );
};

export default Dashboard;
