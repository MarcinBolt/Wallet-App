// import AppBar from '../AppBar/AppBar';
import CurrencyTable from '../CurrencyTable/CurrencyTable.jsx';
import Chart from '../Chart/Chart.jsx';
import Transactions from '../Transactions/Transactions.jsx';
import StatsHeader from '../Statistics/StatsHeader/StatsHeader';

const Dashboard = () => {
  return (
    <>
      {/* <AppBar /> */}
      <CurrencyTable />
      <StatsHeader/>
      <Chart />
      <Transactions />
    </>
  );
};

export default Dashboard;
