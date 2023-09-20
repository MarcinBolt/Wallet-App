//TODO
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import logo from '../../assets/images/apple-touch-icon.png';

const theme = createTheme();

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(event.currentTarget);
    dispatch(
      logIn({
        email: data.get('email'),
        password: data.get('password'),
      }),
    );

    form.reset();
  };

  return (






    
    <Container
      maxWidth="sx"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <img src={logo} alt="Logo" />
      <ThemeProvider theme={theme}>
        <h1>Wallet</h1>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" validate="true" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                title="Username must have at least 7 characters"
                pattern=".{7,}"
                name="email"
                autoComplete="email"
                variant="standard"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                title="Password must be at least 7 characters"
                pattern=".{7,}"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                LOG IN
              </Button>
              <Button
                type="button"
                href="#/register"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                REGISTER
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  );
};
export default LoginForm;
