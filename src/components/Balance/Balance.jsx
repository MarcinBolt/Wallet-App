import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBalance, selectTransactions } from '../../redux/selectors';
import { updateBalance } from '../../redux/transactions/transactions.slice';
import formatMoney from '../../utils/formatMoney';
import { fetchTransactions } from '../../redux/transactions/transactions.operations';
import css from './Balance.module.css';

const Balance = () => {
  const transactions = useSelector(selectTransactions);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const incomesSum = [...transactions]
      .filter(t => t.type === 'Income')
      .reduce((acc, t) => {
        return acc + t.sum * 100;
      }, 0);
    const expensesSum = [...transactions]
      .filter(t => t.type === 'Expense')
      .reduce((acc, t) => {
        return acc + t.sum * 100;
      }, 0);
    const newBalance = (incomesSum - expensesSum) / 100;
    setBalance(prev => (prev = newBalance));
  }, [transactions]);

  return (
    <div className={css.balanceContainer}>
      <Box className={css.balanceText}>Your Balance</Box>
      <Box className={css.balanceBox}>
        PLN<span className={css.balanceSum}>{formatMoney(balance)}</span>
      </Box>
    </div>
  );
};

export default Balance;
