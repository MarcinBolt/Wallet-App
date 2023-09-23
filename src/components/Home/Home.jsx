import CurrencyTable from '../CurrencyTable/CurrencyTable';
import Chart from '../Chart/Chart';
import Transactions from '../Transactions/Transactions';

const Home = () => {
  return (
    <>
      <CurrencyTable />
      <Chart />
      <Transactions />
    </>
  );
};

export default Home;
