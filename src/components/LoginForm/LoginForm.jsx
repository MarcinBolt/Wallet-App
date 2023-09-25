import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/auth.operations.js';
import css from './LoginForm.module.css';
// import btn from './MainButton.module.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { NavLink } from 'react-router-dom';
// import MainButton from './MainButton';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Logo from '../Logo/Logo.jsx';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';

const validationSchema = Yup.object().shape({
  email: Yup.string('Please enter an e-mail')
    .email('Please enter a valid e-mail')
    .required('Email is required!'),
  password: Yup.string('Please enter a password')
    .min(6, 'The password must be at least 6 characters long')
    .max(12, 'The password must not be longer then 12 characters')
    .required('Password is required!'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(
        logIn({
          email: values.email,
          password: values.password,
        }),
      );
      formik.resetForm();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <div className={css.logo_wrapper}>
          <Logo />
        </div>
        <div className={css.container_input}>
          <TextField
            name="email"
            type="email"
            label="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            color="primary"
            className={css.test}
            sx={{
              '& fieldset': { border: 'none' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: 1,
              borderColor: 'grey.300',
              padding: 0,
            }}
          />

          <TextField
            name="password"
            type="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            color="primary"
            className={css.test}
            sx={{
              '& fieldset': { border: 'none' },
              borderBottom: 1,
              borderColor: 'grey.300',
              padding: 0,
            }}
          />
        </div>
        <div className={css.button_container}>
          <Button
            type="submit"
            sx={{
              mt: 3,
              mb: 2,
              width: 280,
              background: '#24cca7',
              '&:hover': {
                background: '#35a78e',
              },
              color: '#ffffff',
              fontSize: 18,
              borderRadius: 20,
            }}
          >
            LOG IN
          </Button>
          <Button
            type="button"
            href="#/register"
            sx={{
              width: 280,
              background: '#ffffff',
              border: 1,
              borderColor: '#4a56e2',
              '&:hover': {
                background: '#4a56e2',
                color: '#ffffff',
              },
              color: '#4a56e2',
              fontSize: 18,
              borderRadius: 20,
            }}
          >
            REGISTER
          </Button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
