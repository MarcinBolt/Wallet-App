import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verify } from '../redux/auth/auth.operations.js';
import TitleComponent from '../components/TitleComponent/Title.Component.jsx';
import CustomButton from '../components/CustomButton/CustomButton.jsx';
import css from './Pages.module.css';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  const handleClick = event => {
    dispatch(verify(verificationToken));
    navigate('/login', { replace: true });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: 'transparent',
      }}
    >
      <TitleComponent text="Email verification" />
      <div className={css.buttonContainer}>
        <CustomButton type="button" color="primary" content="Verify email" onClick={handleClick} />
      </div>
    </Container>
  );
};
export default VerifyEmail;
