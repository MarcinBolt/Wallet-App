import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Balance() {
  return (
    <Container
      sx={{
        maxWidth: 395,
        backgroundColor: 'white',
     
        borderRadius: 30,
        height: 'auto',
        textTransform: 'up  percase',
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
        }}
      >
        Your Balance
        <Box
          sx={{
            fontSize: 30,

            fontWeight: 400,

            color: 'black',

            fontWeight: 'bold',
          }}
        >
          ₴
        </Box>
      </Box>
    </Container>
  );
}
