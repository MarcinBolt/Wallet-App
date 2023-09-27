import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verify } from '../redux/auth/auth.operations.js';
import Button from '@mui/material/Button';

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
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
      }}
    >
      <h2>Email verification</h2>
      // TODO - change to a stylized button component (green)
      <Button
        type="button"
        onClick={handleClick}
        fullWidth
        variant="outlined"
        sx={{ mt: 3, mb: 2, maxWidth: '200px' }}
      >
        Verify email.
      </Button>
    </Container>
  );
};
export default VerifyEmail;
