import { Button, Container } from '@mui/material';

const NotFound = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
      }}
    >
      <h2>404 Page Not Found</h2>
      <Button
        type="button"
        href="/"
        fullWidth
        variant="outlined"
        sx={{ mt: 2, mb: 2, width: '250px' }}
      >
        GO BACK
      </Button>
    </Container>
  );
};
export default NotFound;
