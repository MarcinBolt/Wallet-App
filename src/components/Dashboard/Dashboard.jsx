import Media from 'react-media';
import { mediaQueries } from '../../utils/constants';
import Container from '@mui/material/Container';
import Header from '../Header/Header';
import TempNavi from '../temporary components/TempNavi';

const DashboardMobile = () => {
  <>
    <h1>Dashboard Mobile</h1>
  </>;
};
const DashboardTablet = () => {
  <>
    <h1>Dashboard Tablet</h1>
  </>;
};
const DashboradDesktop = () => {
  <>
    <h1>Dashboard Desktop</h1>
  </>;
};

const Dashboard = () => {
  const { mobile, tablet, desktop } = mediaQueries;

  return (
    <div>
      <Header />
      <Media
        queries={{
          small: `${mobile}`,
          medium: `${tablet}`,
          large: `${desktop}`,
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
