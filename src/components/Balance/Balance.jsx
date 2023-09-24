import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import css from '../../utils/css-variables.css';

import { formatMoney } from '../../utils/formatMoney';
import { selectBalance } from '../../redux/store';

export default function Balance() {
  const balance = useSelector(selectBalance);
  return (
    <Container
      sx={{
        '@media (min-width: 780px)': {
          width: '360px',
        },
        '@media (min-width: 1200px)': {
          width: '395px',
        },
        width: '280px',
        backgroundColor: 'white',
        borderRadius: 30,
        height: 'auto',
        textTransform: 'uppercase',
        marginBottom: 32,
        fontSize: 12,
      }}
    >
      <Box
        sx={{
          fontSize: 12,
          fontWeight: 400,
          color: '#a6a6a6',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'start',
          padding: '10px',
        }}
      >
        Your Balance
      </Box>
      <Box
        sx={{
          fontSize: 30,
          fontWeight: 400,
          color: 'black',
          fontWeight: 'bold',
          paddingBottom: '15px',
          paddingLeft: '15px',
          display: 'flex',
          alignItems: 'start',
        }}
      >
        ₴ {formatMoney(balance)}
      </Box>
    </Container>
  );
}
