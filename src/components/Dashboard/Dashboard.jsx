import AppBar from '../AppBar/AppBar';
import CurrencyTable from '../CurrencyTable/CurrencyTable.jsx';
import Chart from '../Chart/Chart.jsx';
import Transactions from '../Transactions/Transactions.jsx';
import StatsLabels from '../StatsLables/StatsLabels';

const Dashboard = () => {
  return (
    <>
      <AppBar />
      <CurrencyTable />
      <Chart />
      <StatsLabels/>
      <Transactions />
    </>
  );
};

export default Dashboard;
