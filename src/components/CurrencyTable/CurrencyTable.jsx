import { useDispatch, useSelector } from 'react-redux';
import { selectCurrency } from '../../redux/selectors';
import css from './CurrencyTable.module.css';
import { useEffect } from 'react';
import { fetchCurrency } from '../../redux/currency/operations.js';
import { ExchangeRate } from '../ExchangeRate/ExchangeRate';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const CurrencyTable = () => {
  const dispatch = useDispatch();
  const currencies = useSelector(selectCurrency);

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  const createData = (currency, purchase, sale) => {
    return { currency, purchase, sale };
  };
  const rows = [
    createData('USD', currencies.USD, currencies.USD),
    createData('EUR', currencies.EUR, currencies.EUR),
  ];

  return (
    <div className={css.table}>
      <Table
        sx={{
          width: [280, 336, 393],
          height: [174, 182, 331],
        }}
        aria-label="currency table"
      >
        <TableHead sx={{ backgroundColor: '#6e78e8' }}>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Purchase</TableCell>
            <TableCell align="right">Sale</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: '#4a56e2' }}>
          {rows.map(row => (
            <TableRow key={row.currency} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.currency}
              </TableCell>
              <TableCell align="right">{row.purchase}</TableCell>
              <TableCell align="right">{row.sale}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CurrencyTable;
