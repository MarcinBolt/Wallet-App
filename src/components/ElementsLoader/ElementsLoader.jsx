import Container from '@mui/material/Container';
import { Grid, ThreeDots } from 'react-loader-spinner';

const ElementsLoader = () => {
  return (
    <Container
      maxWidth="sx"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        padding: '50px',
      }}
    >
      <ThreeDots
        height="80"
        width="80"
        color="#6e78e8"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Container>
  );
};

export default ElementsLoader;
