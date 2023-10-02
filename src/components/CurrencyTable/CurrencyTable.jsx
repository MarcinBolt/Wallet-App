import { useEffect, useState } from 'react';
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
import css from './CurrencyTable.module.css';

const CurrencyTable = () => {
  const [usdData, setUsdData] = useState(null);
  const [eurData, setEurData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currencyToFetch = currency =>
    `https://api.nbp.pl/api/exchangerates/rates/c/${currency}/last/?format=json`;

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(currencyToFetch('usd'), setUsdData);
    fetchData(currencyToFetch('eur'), setEurData);
  }, []);

  return (
    <>
      {!isLoading && (
        <div className={css.table}>
          <TableContainer
            component={Paper}
            sx={{
              width: [280, 336, 393],
              height: '174px',
              borderRadius: '30px',
              marginTop: '20px',
              '@media screen and (min-width: 1280px)': {
                height: '182px',
              },
              '@media screen and (min-width: 1280px)': {
                height: '300px',
              },
            }}
          >
            <Table
              sx={{
                width: [280, 336, 393],
                height: '174px',
                '@media screen and (min-width: 1280px)': {
                  height: '182px',
                },
                '@media screen and (min-width: 1280px)': {
                  height: '300px',
                },
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
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: '400',
                      fontSize: '18',
                      fontFamily: 'var(--font-secondary)',
                    }}
                    align="left"
                  >
                    Currency
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-primary)',
                      fontSize: '18px',
                      fontWeight: '400',
                      fontSize: '18',
                    }}
                    align="center"
                  >
                    Purchase
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-primary)',
                      fontSize: '18px',
                      fontWeight: '400',
                      fontSize: '18',
                    }}
                    align="right"
                  >
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
                <TableRow
                  key={'currency1'}
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
                    sx={{
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-primary)',
                      fontSize: '18px',
                      fontWeight: '400',
                      fontSize: '16',
                    }}
                    align="center"
                  >
                    USD
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-primary)',
                      fontSize: '18px',
                      fontWeight: '400',
                      fontSize: '16',
                    }}
                    align="center"
                  >
                    {usdData && usdData.rates.length > 0 ? usdData.rates[0].bid.toFixed(2) : '-'}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-primary)',
                      fontSize: '18px',
                      fontWeight: '400',
                      fontSize: '16',
                    }}
                    align="center"
                  >
                    {usdData && usdData.rates.length > 0 ? usdData.rates[0].ask.toFixed(2) : '-'}
                  </TableCell>
                </TableRow>

                <TableRow
                  key={'currency2'}
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
                    sx={{
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-primary)',
                      fontSize: '18px',
                      fontWeight: '400',
                      fontSize: '16',
                    }}
                    align="center"
                  >
                    EUR
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-primary)',
                      fontSize: '18px',
                      fontWeight: '400',
                      fontSize: '16',
                    }}
                    align="center"
                  >
                    {eurData && eurData.rates.length > 0 ? eurData.rates[0].bid.toFixed(2) : '-'}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-primary)',
                      fontSize: '18px',
                      fontWeight: '400',
                      fontSize: '16',
                    }}
                    align="center"
                  >
                    {eurData && eurData.rates.length > 0 ? eurData.rates[0].ask.toFixed(2) : '-'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};
export default CurrencyTable;
