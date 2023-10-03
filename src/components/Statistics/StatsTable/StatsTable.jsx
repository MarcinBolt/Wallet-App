import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import css from './StatsTable.module.css';
import formatMoney from '../../../utils/formatMoney';

const StatsTable = ({ categoriesSums }) => {
  const positiveSums = [...categoriesSums].filter(c => c.sum > 0);

  return (
    <TableContainer
      className={css.tableContainer}
      component={Paper}
      elevation={0}
      style={{ backgroundColor: 'transparent', width: '100%' }}
    >
      <Table
        aria-label="simple table"
        style={{ borderCollapse: 'unset', verticalAlign: 'baseline' }}
      >
        <TableHead
          sx={{
            '&:first-of-type td, &:first-of-type th': {
              backgroundColor: 'white',
              width: '100%',
              border: 0,
              fontSize: '18px',
              fontFamily: 'var(--font-secondary-bold)',
              padding: '16px 20px 15px 20px',
            },
            '&:first-of-type td': {
              padding: '16px 0px 15px 0px',
            },
          }}
        >
          <TableRow
            className={css.tableRow}
            style={{
              fontFamily: 'var(--font-secondary-bold)',
              padding: '0',
            }}
          >
            <TableCell align="left" className={css.headerCategory}>
              Category
            </TableCell>
            <TableCell align="right" className={css.headerSum}>
              Subtotals
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positiveSums.map((row, i) => (
            <TableRow key={i}>
              <TableCell
                component="th"
                scope="row"
                className={css.tableCategoryCell}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: '10px',
                  alignItems: 'flex-end',
                  width: '100%',
                  fontSize: '16px',
                  fontFamily: 'var(--font-secondary)',
                  padding: '14px 0 14px 20px',
                }}
              >
                <span
                  style={{
                    backgroundColor: row.color,
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}
                  className={css.span}
                ></span>
                {row.name}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontSize: '16px',
                  fontFamily: 'var(--font-secondary)',
                  padding: '2px 20px 0 0',
                }}
              >
                {formatMoney(row.sum / 100)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
