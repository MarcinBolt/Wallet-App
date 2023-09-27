import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectTransactions } from '../../redux/selectors';
import TempTransactionDetails from '../temporary/TempTransactionDetails';
import { fetchTransactions } from '../../redux/transactions/transactions.operations';
import css from './HomeTab.module.css'

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
        <ul className={css.tableHeader}>
          <li key={`date`} className={css.tableHeaderItem}>
            <p className={css.itemType}>Date</p>
          </li>
          <li key={`type`} className={css.tableHeaderItem}>
            <p className={css.itemType}>Type</p>
          </li>
          <li key={`category`} className={css.tableHeaderItem}>
            <p className={css.itemType}>Category</p>
          </li>
          <li key={`comment`} className={css.tableHeaderItem}>
            <p className={css.itemType}>Comment</p>
          </li>
          <li key={`sum`} className={css.tableHeaderItem}>
            <p className={css.itemType}>Sum</p>
          </li>
          <li key={`operations`} className={css.tableHeaderItem}></li>
        </ul>
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
