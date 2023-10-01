import Box from '@mui/material/Box';
import css from './Balance.module.css';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectBalance, selectTransactions } from '../../redux/selectors';
import { updateBalance } from '../../redux/transactions/transactions.slice';

const Balance = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const balance = useSelector(selectBalance);

  useEffect(() => {
    const incomesSum = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'Income') {
        return acc + transaction.sum;
      }
      return acc;
    }, 0);
    const expensesSum = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'Expense') {
        return acc + transaction.sum;
      }
      return acc;
    }, 0);
    dispatch(updateBalance(incomesSum - expensesSum));
  }, [transactions]);

  return (
    <div className={css.balanceContainer}>
      <Box className={css.balanceText}>Your Balance</Box>
      <Box className={css.balanceBox}>₴ {balance}</Box>
    </div>
  );
};

export default Balance;
