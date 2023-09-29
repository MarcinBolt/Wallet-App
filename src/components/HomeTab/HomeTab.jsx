import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Media from 'react-media';
import {
  selectGlobalIsModalAddTransactionOpen,
  selectTransactions,
  selectUserFirstName,
} from '../../redux/selectors';

import { fetchTransactions } from '../../redux/transactions/transactions.operations';
import css from './HomeTab.module.css';
import TransactionDetails from './TransactionDetails/TransactionDetails';
import { updateIsModalAddTransactionOpen } from '../../redux/global/global.slice';
import { mediaQueries } from '../../utils/constants';
import TempBalance from '../temporary components/TempBalance';

const formatDate = date => {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day
    .toString()
    .padStart(2, '0')}`;
  return formattedDate;
};

const HomeTab = () => {
  const dispatch = useDispatch();
  const { mobile } = mediaQueries;

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const transactions = useSelector(selectTransactions);
  const userName = useSelector(selectUserFirstName);
  const isAddTransactionModalOpen = useSelector(selectGlobalIsModalAddTransactionOpen);

  const sortedToNewestTransactions =
    transactions.length > 0 ? [...transactions].sort((a, b) => b.date.localeCompare(a.date)) : null;

  const handleOpenAddTransactionModal = ev => {
    ev.preventDefault;
    dispatch(updateIsModalAddTransactionOpen(true));
  };
  const handleCloseAddTransactionModal = ev => {
    ev.preventDefault;
    dispatch(updateIsModalAddTransactionOpen(false));
  };

  return (
    <>
      <div className={css.homeTabWrapper}>
        <Media query={mobile} render={() => <TempBalance />} />
        <div className={css.homeTab}>
          <ul className={css.tableBody}>
            <li key={`${userName}header`} className={css.tableItem}>
              <ul className={css.tableHeader}>
                <li key={`${userName}date`} className={css.tableHeaderItem}>
                  <p className={css.itemType}>Date</p>
                </li>
                <li key={`${userName}type`} className={css.tableHeaderItem}>
                  <p className={css.itemType}>Type</p>
                </li>
                <li key={`${userName}category`} className={css.tableHeaderItem}>
                  <p className={css.itemType}>Category</p>
                </li>
                <li key={`${userName}comment`} className={css.tableHeaderItem}>
                  <p className={css.itemType}>Comment</p>
                </li>
                <li key={`${userName}sum`} className={css.tableHeaderItem}>
                  <p className={css.itemType}>Sum</p>
                </li>
                <li key={`${userName}operations`} className={css.tableHeaderItem}></li>
              </ul>
            </li>
            {transactions.length > 0 &&
              sortedToNewestTransactions.map(({ id, date, type, category, comment, sum }) => (
                <li key={id} className={css.tableItem}>
                  {
                    <TransactionDetails
                      id={id}
                      date={date}
                      type={type}
                      category={category}
                      comment={comment}
                      sum={sum}
                    />
                  }
                </li>
              ))}
          </ul>
        </div>
        <button type="button" onClick={handleOpenAddTransactionModal}>
          Button AddTransaction
        </button>
        {isAddTransactionModalOpen && (
          <div>
            <p>Add Transaction Modal is open</p>
            <button type="button" onClick={handleCloseAddTransactionModal}>
              Close AddTransaction
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeTab;
