import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TitleComponent from '../components/TitleComponent/Title.Component';
import CustomButton from '../components/CustomButton/CustomButton';
import css from './Pages.module.css';

const NotFound = () => {
  const navigate = useNavigate();

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
      <TitleComponent text="Status 404" />
      <TitleComponent text="Page Not Found" />
      <TitleComponent text="Redirecting..." />
      <div className={css.buttonContainer}>
        <CustomButton
          type="button"
          color="primary"
          content="homepage"
          onClick={() => navigate('/', { replace: false })}
        />
        <CustomButton
          type="button"
          color="secondary"
          content="<<< go back"
          onClick={() => navigate(-1, { replace: false })}
        />
      </div>
    </Container>
  );
};
export default NotFound;
