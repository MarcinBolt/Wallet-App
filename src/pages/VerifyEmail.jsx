import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verify } from '../redux/auth/auth.operations.js';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  useEffect(() => {
    dispatch(verify(verificationToken));
    const timerId = setTimeout(() => navigate('/login', { replace: true }), 3000);
    return () => clearTimeout(timerId);
  }, [verificationToken]);

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
      <h2>Email verified!</h2>
      <h3>Redirecting to Login page...</h3>
    </Container>
  );
};
export default VerifyEmail;
