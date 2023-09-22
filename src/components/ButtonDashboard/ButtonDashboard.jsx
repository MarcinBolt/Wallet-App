import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ButtonsDashboard() {
  return (
    // <Stack spacing={2} direction="row">
    <Button
      variant="contained"
      sx={{
        width: 67,
        height: 26,
        backgroundColor: '#24CCA7',
        gap: 2,
        borderRadius: 18,
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      Delete
    </Button>
    // </Stack>
  );
}
