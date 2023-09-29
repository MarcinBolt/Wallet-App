import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import css from './StatsTable.module.css';

function createData(color, category, sum) {
  return { color, category, sum };
}

const bgColor = [
  '#FED057',
  '#FFD8D0',
  '#FD9498',
  '#C5BAFF',
  '#6E78E8',
  '#4A56E2',
  '#81E1FF',
  '#24CCA7',
  '#00AD84',
];
const labels = [
  'Main expanses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Household products',
  'Education',
  'Leisure',
  'Other expenses',
];
const data = [120, 19, 35, 5, 15, 33, 45, 20, 11];

const rows = [
  createData('var(--color-category-main)', 'Main expenses', 120),
  createData('var(--color-category-products)', 'Products', 19),
  createData('var(--color-category-car)', 'Car', 35),
  createData('var(--color-category-selfcare)', 'Self care', 5),
  createData('var(--color-category-childcare)', 'Child care', 15),
  createData('var(--color-category-household)', 'Household products', 67890),
  createData('var(--color-category-education)', 'Education', 45),
  createData('var(--color-category-Leisure)', 'Leisure', 20),
  createData('var(--color-category-other)', 'Other expenses', 11000),
];

const StatsTable = () => {
  return (
    <TableContainer
      className={css.tableContainer}
      component={Paper}
      elevation={0}
      style={{ backgroundColor: 'transparent', maxWidth: '500px' }}
    >
      <Table
        aria-label="simple table"
        style={{ borderCollapse: 'unset', verticalAlign: 'baseline', width: '100%' }}
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
              Sum
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.category}>
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
                {row.category}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontSize: '16px',
                  fontFamily: 'var(--font-secondary)',
                  padding: '2px 20px 0 0',
                }}
              >
                {row.sum}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;

{
  /* <span style={{backgroundColor: row.color}} className={css.span}></span> */
}
