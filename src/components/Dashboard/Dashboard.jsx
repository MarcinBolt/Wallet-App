import AppBar from '../AppBar/AppBar';
import CurrencyTable from '../CurrencyTable/CurrencyTable.jsx';
import Chart from '../Chart/Chart.jsx';
import Transactions from '../Transactions/Transactions.jsx';
import Balance from '../Balance/Balance';

const Dashboard = () => {
  return (
    <>
      <AppBar />
      <Balance></Balance>
      <CurrencyTable />
      <Chart />
      <Transactions />
    </>
  );
};

export default Dashboard;
