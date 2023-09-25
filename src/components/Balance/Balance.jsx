import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Balance() {
  return (
    <Container
      sx={{
        '@media (min-width: 780px)': {
          width: '360px',
          padding: '8px 40px 11px',
        },
        '@media (min-width: 1200px)': {
          width: '395px',
        },
        width: '280px',
        backgroundColor: 'white',
        borderRadius: 30,
        height: 80,
        textTransform: 'uppercase',
        padding: '8px 32px 11px',
      }}
    >
      <Box
        sx={{
          fontSize: 12,
          fontWeight: 400,
          color: '#a6a6a6',

          display: 'flex',
          alignItems: 'start',
        }}
      >
        Your Balance
      </Box>
      <Box
        sx={{
          fontSize: 30,
          fontWeight: 700,
          color: 'black',

          display: 'flex',
          alignItems: 'start',
        }}
      >
        ₴
      </Box>
    </Container>
  );
}
