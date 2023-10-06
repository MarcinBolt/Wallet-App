import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Media from 'react-media';
import {
  selectTransactions,
  selectUserFirstName,
  selectTransactionsIsLoading,
  selectTransactionsError,
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
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction';
import { updateSelectedId } from '../../redux/transactions/transactions.slice';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
import formatDate from '../../utils/format.date';
// import { updateSelectedCategory } from '../../redux/transactions/transactions.slice';

const HomeTab = () => {
  const dispatch = useDispatch();
  const transactionsAll = useSelector(selectTransactions);
  const isTransactionsLoading = useSelector(selectTransactionsIsLoading);
  const isTransactionsError = useSelector(selectTransactionsError);
  const selectedTransactionId = useSelector(selectTransactionId);
  // const categories = useSelector(selectTransactionsCategories);
  const selectedFilterCategory = useSelector(selectTransactionsFilterCategory);

  const [isModalEditTransactionOpen, setIsModalEditTransactionOpen] = useState();
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState();

  const { mobile } = mediaQueries;

  // useEffect(() => {
  //   dispatch(fetchTransactions());
  // }, []);

  // const getTransactionsFilteredByCategory = (transactions, category) => {
  //   console.log(`category:`, category);
  //   return category === 'All' ? transactions : transactions.filter(t => t.category === category);
  // };

  // const transactions = getTransactionsFilteredByCategory(transactionsAll, selectedFilterCategory);
  const transactions = transactionsAll;

  const userName = useSelector(selectUserFirstName);
  const sortedToNewestTransactions = transactions => {
    return transactions.length > 0
      ? [...transactions].sort((a, b) => formatDate(b.date).localeCompare(formatDate(a.date)))
      : [];
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  useEffect(() => {
    sortedToNewestTransactions(transactions);
  }, [transactions]);

  const toggleAddTransactionModal = () => {
    setIsAddTransactionModalOpen(!isAddTransactionModalOpen);
  };

  const toggleEditTransactionModal = () => {
    setIsModalEditTransactionOpen(!isModalEditTransactionOpen);
  };

  const handleEditButton = id => {
    dispatch(updateSelectedId(id));
    toggleEditTransactionModal();
  };

  const handleButtonDelete = id => {
    dispatch(deleteTransactionById(id));
  };

  // const handleSelectChange = ev => {
  //   ev.preventDefault;
  //   dispatch(updateSelectedCategory(ev.target.value));
  // };

  return (
    <>
      <div key={`${userName}homeWrapper`} className={css.homeTabWrapper}>
        <Media query={mobile} render={() => <Balance />} />
        <div key={`${userName}divHome`} className={css.homeTab}>
          <ul key={`${userName}ul`} className={css.tableBody}>
            <li key={`${userName}header`} className={css.tableItem}>
              <ul className={css.tableHeader}>
                <li key={`${userName}date`} className={css.tableHeaderItem}>
                  <p key={`${userName}p`} className={css.itemType}>
                    Date
                  </p>
                </li>
                <li key={`${userName}type`} className={css.tableHeaderItem}>
                  <p key={`${userName}p2`} className={css.itemType}>
                    Type
                  </p>
                </li>
                <li key={`${userName}category`} className={css.tableHeaderItem}>
                  <p key={`${userName}p3`} className={css.itemType}>
                    Category
                  </p>
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
                  <p key={`${userName}p4`} className={css.itemType}>
                    Comment
                  </p>
                </li>
                <li key={`${userName}sum`} className={css.tableHeaderItem}>
                  <p key={`${userName}p5`} className={css.itemType}>
                    Sum
                  </p>
                </li>
                <li key={`${userName}operations`} className={css.tableHeaderItem}></li>
              </ul>
            </li>
            {transactions.length === 0 && <h3>No transactions yet</h3>}
            {isTransactionsLoading && !isTransactionsError && <ElementsLoader />}
            {transactions.length > 0 &&
              sortedToNewestTransactions(transactions).map(
                ({ _id, date, type, category, comment, sum }) => (
                  <li key={`${_id}${sum}${comment}.transaction`} className={css.tableItem}>
                    {
                      <TransactionDetails
                        key={`${_id}.details`}
                        id={_id}
                        date={date}
                        type={type}
                        category={category}
                        comment={comment}
                        sum={sum}
                        handleEditBtn={handleEditButton}
                        handleDeleteBtn={handleButtonDelete}
                      />
                    }
                  </li>
                ),
              )}
          </ul>
        </div>
        <ButtonAddTransaction
          key={`${userName}.addButtonEditTrans`}
          onClick={toggleAddTransactionModal}
          className={css.buttonAddTransaction}
        />
      </div>
      {isModalEditTransactionOpen && (
        <ModalEditTransaction
          key={`${userName}.detailsModalEditTrans`}
          toggleModal={toggleEditTransactionModal}
        />
      )}
      {isAddTransactionModalOpen && (
        <ModalAddTransaction
          key={`${userName}.addTransModal`}
          toggleModal={toggleAddTransactionModal}
        />
      )}
    </>
  );
};

export default HomeTab;
