import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Media from 'react-media';
import {
  selectGlobalIsModalAddTransactionOpen,
  selectTransactions,
  selectUserFirstName,
  selectTransactionsIsLoading,
  selectTransactionsError,
  selectGlobalIsModalEditTransactionOpen,
  selectTransactionId,
  // selectTransactionsCategories,
  selectTransactionsFilterCategory,
} from '../../redux/selectors';
import {
  fetchTransactions,
  deleteTransactionById,
} from '../../redux/transactions/transactions.operations';
import css from './HomeTab.module.css';
import TransactionDetails from './TransactionDetails/TransactionDetails';
import {
  updateIsModalAddTransactionOpen,
  updateIsModalEditTransactionOpen,
} from '../../redux/global/global.slice';
import { mediaQueries } from '../../utils/constants';
import Balance from '../Balance/Balance.jsx';
import ElementsLoader from '../ElementsLoader/ElementsLoader';
import { ButtonAddTransaction } from '../ButtonAddTransactions/ButtonAddTransaction';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
// import { updateSelectedCategory } from '../../redux/transactions/transactions.slice';

const HomeTab = () => {
  const dispatch = useDispatch();
  const transactionsAll = useSelector(selectTransactions);
  const isModalEditTransactionOpen = useSelector(selectGlobalIsModalEditTransactionOpen);
  const isAddTransactionModalOpen = useSelector(selectGlobalIsModalAddTransactionOpen);
  const isTransactionsLoading = useSelector(selectTransactionsIsLoading);
  const isTransactionsError = useSelector(selectTransactionsError);
  const selectedTransactionId = useSelector(selectTransactionId);
  // const categories = useSelector(selectTransactionsCategories);
  const selectedFilterCategory = useSelector(selectTransactionsFilterCategory);
  const { mobile } = mediaQueries;

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  const formatDate = date => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear() % 100;
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const formattedDate =
      (year < 10 ? '0' : '') + year + (month < 10 ? '0' : '') + month + (day < 10 ? '0' : '') + day;
    return formattedDate;
  };

  // const getTransactionsFilteredByCategory = (transactions, category) => {
  //   console.log(`category:`, category);
  //   return category === 'All' ? transactions : transactions.filter(t => t.category === category);
  // };

  // const transactions = getTransactionsFilteredByCategory(transactionsAll, selectedFilterCategory);
  const transactions = transactionsAll;

  const userName = useSelector(selectUserFirstName);
  const sortedToNewestTransactions =
    transactions.length > 0
      ? [...transactions].sort((a, b) => formatDate(b.date).localeCompare(formatDate(a.date)))
      : [];

  const toggleAddTransactionModal = () => {
    dispatch(updateIsModalAddTransactionOpen(!isAddTransactionModalOpen));
  };

  const toggleEditTransactionModal = () => {
    dispatch(updateIsModalEditTransactionOpen(!isModalEditTransactionOpen));
  };

  const handleButtonDelete = id => {
    dispatch(deleteTransactionById(id));
  };

  const handleSelectChange = ev => {
    ev.preventDefault;
    dispatch(updateSelectedCategory(ev.target.value));
  };

  return (
    <>
      <div className={css.homeTabWrapper}>
        <Media query={mobile} render={() => <Balance />} />
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
                  {/* <div className={css.selectContainer}>
                    <select
                      name="category"
                      id="category"
                      className={css.select}
                      value={selectedFilterCategory}
                      onChange={handleSelectChange}
                    >
                      <option value="All">All</option>
                      {categories.map((e, index) => (
                        <option key={index} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div> */}
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
            {transactions.length === 0 && <h3>No transactions yet</h3>}
            {isTransactionsLoading && !isTransactionsError && <ElementsLoader />}
            {transactions.length > 0 &&
              sortedToNewestTransactions.map(({ _id, date, type, category, comment, sum }) => (
                <li key={_id} className={css.tableItem}>
                  {
                    <TransactionDetails
                      id={_id}
                      date={date}
                      type={type}
                      category={category}
                      comment={comment}
                      sum={sum}
                      toggleEditModal={toggleEditTransactionModal}
                      handleDeleteBtn={handleButtonDelete}
                    />
                  }
                </li>
              ))}
          </ul>
        </div>
        <ButtonAddTransaction
          onClick={toggleAddTransactionModal}
          className={css.buttonAddTransaction}
        />
      </div>
      {isModalEditTransactionOpen && (
        <div>
          <p>Edit Transaction Modal is open</p>
          <p>TransactionId {selectedTransactionId}</p>

          <button type="button" onClick={toggleEditTransactionModal}>
            Close EditTransaction
          </button>
        </div>
      )}
      {isAddTransactionModalOpen && <ModalAddTransaction toggleModal={toggleAddTransactionModal} />}
    </>
  );
};

export default HomeTab;
