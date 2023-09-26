import Media from 'react-media';
import { mediaQueries } from '../../utils/constants';
import Container from '@mui/material/Container';
import Header from '../../components/Header/Header';
import TempNavi from '../../components/temporary components/TempNavi';

const DashboardMobile = () => {
  return (
    <>
      <TempNavi />
      
    </>
  );
};
const DashboardTablet = () => {
  return (
    <>
      <h1>Dashboard Tablet</h1>
    </>
  );
};
const DashboradDesktop = () => {
  return (
    <>
      <h1>Dashboard Desktop</h1>
    </>
  );
};

const Dashboard = () => {
  const { mobile, tablet, desktop } = mediaQueries;

  return (
    <div>
      <Header />
      /* PageContainer
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
    </div>
  );
};

export default Dashboard;
