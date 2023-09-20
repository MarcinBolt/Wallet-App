import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => navigate(-1, { replace: true }), 3000);
    return () => clearTimeout(timerId);
  }, [navigate]);

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
      <h3>Redirecting...</h3>
    </Container>
  );
};
export default NotFound;
