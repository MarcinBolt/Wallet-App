// import AppBar from '../AppBar/AppBar';
import CurrencyTable from '../CurrencyTable/CurrencyTable.jsx';
import Statistics from '../Statistics/Statistics';
import Transactions from '../Transactions/Transactions.jsx';

const Dashboard = () => {
  return (
    <>
      {/* <AppBar /> */}
      <CurrencyTable />
      <Statistics />
      <Transactions />
    </>
  );
};

export default Dashboard;
