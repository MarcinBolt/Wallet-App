import Container from '@mui/material/Container';
import { Grid } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Container
      maxWidth="sx"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Grid
        height="80"
        width="80"
        color="#6e78e8"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Container>
  );
};

export default Loader;
