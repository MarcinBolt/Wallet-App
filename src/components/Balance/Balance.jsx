import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import css from './Balance.module.css';

export default function Balance() {
  return (
    <Container className={css.BalanceContainer}>
      <Box className={css.BalanceText}>Your Balance</Box>
      <Box className={css.BalanceBox}>₴</Box>
    </Container>
  );
}
