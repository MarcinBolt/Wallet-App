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
import '../../stylesheet/vars.css';

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
    createData('EUR', currencies.PLN, currencies.PLN),
  ];

  return (
    <div className={css.table}>
      <TableContainer
        component={Paper}
        sx={{ width: [280, 336, 393], height: [174, 182, 331], borderRadius: '30px' }}
      >
        <Table
          sx={{
            width: [280, 336, 393],
            height: [174, 182, 331],
          }}
          aria-label="currency table"
        >
          <TableHead
            sx={{
              backgroundColor: 'var(--color-category-childcare)',
              '& td, & th': { border: 0 },
              height: '50px',
             
              '@media screen and (min-width: 1280px)': {
                height: '60px',
              },
            }}
          >
            <TableRow
              sx={{ display: 'flex',  justifyContent: 'space-between', alignItems: 'center' }}
            >
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: '400',
                  fontSize: '18',
                  fontFamily: "var(--font-secondary)",
                }}
                align="left"
              >
                Currency
              </TableCell>
              <TableCell
                sx={{ color: '#FFFFFF', fontFamily: "var(--font-primary)",
              fontSize: "18px", fontWeight: '400', fontSize: '18' }}
                align="center"
              >
                Purchase
              </TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontFamily: "var(--font-primary)",
              fontSize: "18px", fontWeight: '400', fontSize: '18' }} align="right">
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
              <TableRow
                key={row.currency}
                sx={{
                  '& td, & th': { border: 0 },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: '#FFFFFF', fontFamily: "var(--font-primary)",
                  fontSize: "18px", fontWeight: '400', fontSize: '16' }}
                  align="center"
                >
                  {row.currency}
                </TableCell>
                <TableCell
                  sx={{ color: '#FFFFFF', fontFamily: "var(--font-primary)",
                  fontSize: "18px", fontWeight: '400', fontSize: '16' }}
                  align="center"
                >
                  {row.purchase}
                </TableCell>
                <TableCell
                  sx={{ color: '#FFFFFF', fontFamily: "var(--font-primary)",
                  fontSize: "18px", fontWeight: '400', fontSize: '16' }}
                  align="center"
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
