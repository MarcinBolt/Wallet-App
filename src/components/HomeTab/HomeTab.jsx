import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectTransactions } from '../../redux/selectors';

import { fetchTransactions } from '../../redux/transactions/transactions.operations';
import css from './HomeTab.module.css';
import TransactionDetails from './TransactionDetails/TransactionDetails';

const HomeTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const transactions = useSelector(selectTransactions);
  console.log(transactions)

  const sortedToNewestTransactions = (transactions.length > 0)
    ? [...transactions].sort((a, b) => b.date.localeCompare(a.date))
    : null;

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
        <ul className={css.tableBody}>
          {transactions && sortedToNewestTransactions.map(({ id, date, type, category, comment, sum }) => (
            <li key={id}>{<TransactionDetails id={id} date={date} type={type} category={category} comment={comment} sum={sum} />}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomeTab;
