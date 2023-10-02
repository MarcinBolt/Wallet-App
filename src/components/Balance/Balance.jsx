import Box from '@mui/material/Box';
import css from './Balance.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBalance, selectTransactions } from '../../redux/selectors';
import { updateBalance } from '../../redux/transactions/transactions.slice';
import { formatMoney } from '../../utils/formatMoney';
import { fetchTransactions } from '../../redux/transactions/transactions.operations';

const Balance = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const balance = useSelector(selectBalance);
  
    useEffect(() => {
      dispatch(fetchTransactions());
      console.log(transactions)
      dispatch(updateBalance(countBalance(transactions)))
    }, []);

  const countBalance = transactions => {
    const incomesSum = [...transactions].reduce((acc, transaction) => {
      if (transaction.type === 'Income') {
        acc + transaction.sum;
      }
      return acc;
    }, 0);
    console.log('incomes from func:', incomesSum);
    const expensesSum = [, , , transactions].reduce((acc, transaction) => {
      if (transaction.type === 'Expense') {
        acc + transaction.sum;
      }
      return acc;
    }, 0);
    console.log('expenses from func:', expensesSum);
    const newBalance = incomesSum - expensesSum;
    console.log('typeof balance from func:', typeof newBalance);
    console.log('balance from func:', newBalance);
    return newBalance;
  };

  useEffect(() => {
    const actualBalance = countBalance(transactions);
    console.log('typeof actualBalance:', typeof actualBalance);
    dispatch(updateBalance(actualBalance));
  }, [transactions]);

  console.log('typeof balance:', typeof balance);

  return (
    <div className={css.balanceContainer}>
      <Box className={css.balanceText}>Your Balance</Box>
      <Box className={css.balanceBox}>₴ {formatMoney(balance)}</Box>
    </div>
  );
};

export default Balance;
