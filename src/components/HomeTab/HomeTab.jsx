import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectTransactions } from '../../redux/selectors';
import TempTransactionDetails from '../temporary/TempTransactionDetails';
import { fetchTransactions } from '../../redux/transactions/transactions.operations';

const HomeTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const transactions = useSelector(selectTransactions);
  const sortedToNewestTransactions = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <div className={css.homeTab}>
        <div></div>
        <ul>
          {sortedToNewestTransactions.map(({ id, date, type, category, comment, sum }) => (
            <li key={id}>{<TempTransactionDetails />}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomeTab;
