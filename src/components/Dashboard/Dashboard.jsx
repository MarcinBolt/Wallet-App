import AppBar from '../AppBar/AppBar';
import Navigation from '../Navigation/Navigation';
import { Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <>
      <AppBar />
      <Navigation />
      <Outlet />
    </>
  );
};

export default Dashboard;
