import AppBar from '../AppBar/AppBar';
import CurrencyTable from '../CurrencyTable/CurrencyTable.jsx';
import Chart from '../Chart/Chart.jsx';
import Transactions from '../Transactions/Transactions.jsx';

const Dashboard = () => {
  return (
    <>
      <AppBar />
      <CurrencyTable />
      <Chart />
      
      <Transactions />
    </>
  );
};

export default Dashboard;
