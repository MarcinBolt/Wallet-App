import { useDispatch, useSelector } from 'react-redux';
import { selectCurrency } from '../../redux/selectors';
import css from './CurrencyTable.module.css';
import { useEffect } from 'react';
import { fetchCurrency } from '../../redux/currency/operations.js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
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
    createData('USD', currencies.USDPLN, currencies.USDPLN),
    createData('EUR', currencies.USDEUR, currencies.USDEUR),
  ];

  return (
    <div className={css.table}>
      <TableContainer
        component={Paper}
        sx={{ width: [280, 336, 393], height: [174, 182, 331] }}
      >
        <Table
          sx={{
            width: [280, 336, 393],
            height: [174, 182, 331],
          }}
          aria-label="currency table"
        >
          <TableHead sx={{ backgroundColor: '#6e78e8', '& td, & th': { border: 0 } }}>
            <TableRow>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '18',
                }}
              >
                Currency
              </TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: '700', fontSize: '18' }} align="right">
                Purchase
              </TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: '700', fontSize: '18' }} align="right">
                Sale
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              backgroundColor: '#4a56e2',
              backgroundImage: 'url(icons/currencyTable.svg)',
              backgroundSize: 'cover',
            }}
          >
            {rows.map(row => (
              <TableRow key={row.currency} sx={{ '& td, & th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: '#FFFFFF', fontWeight: '400', fontSize: '16' }}
                >
                  {row.currency}
                </TableCell>
                <TableCell
                  sx={{ color: '#FFFFFF', fontWeight: '400', fontSize: '16' }}
                  align="right"
                >
                  {row.purchase}
                </TableCell>
                <TableCell
                  sx={{ color: '#FFFFFF', fontWeight: '400', fontSize: '16' }}
                  align="right"
                >
                  {row.sale}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CurrencyTable;
