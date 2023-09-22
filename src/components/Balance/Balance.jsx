import * as React from 'react';
import Box from '@mui/material/Box';

export default function Balance() {
  return (
    <Box
      sx={{
        width: 336,
        height: 80,
        backgroundColor: 'white',
        borderRadius: 30,
        marginBottom: 10,
      }}
    >
      Your Balance ₴
    </Box>
  );
}
