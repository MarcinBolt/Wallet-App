import * as React from 'react';
import Button from '@mui/material/Button';

export default function ContainedButtons() {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#24CCA7',
        borderRadius: '18px',
        width: '43',
        height: '18',
        textTransform: 'capitalize',

        '&:hover': {
          backgroundColor: '#FF6596',
        },
      }}
    >
      Delete
    </Button>
  );
}
