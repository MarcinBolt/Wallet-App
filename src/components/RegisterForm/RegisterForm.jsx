import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/auth.operations.js';
import css from './RegisterForm.module.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Logo from '../Logo/Logo.jsx';
import { background } from '@chakra-ui/react';

const validationSchema = Yup.object().shape({
  email: Yup.string('Please enter an e-mail')
    .email('Please enter a valid e-mail')
    .required('Email is required!'),
  password: Yup.string('Please enter a password')
    .min(6, 'The password must be at least 6 characters long')
    .max(12, 'The password must not be longer then 12 characters')
    .required('Password is required!'),
  confirmPassword: Yup.string('Please repeat the password')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Password is required!'),
  firstName: Yup.string('Please enter Your name')
    .min(1, 'The password must be at least 1 character long')
    .max(12, 'The password must not be longer then 12 characters')
    .required('Password is required!'),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(
        register({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
        }),
      );
      formik.resetForm();
    },
  });

  return (
    <>
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
            color="grey"
            className={css.test}
            sx={{
              position: 'relative',
              border: 0,
              borderColor: 'grey.400',
              paddingTop: '0px',
              paddingBottom: '0px',
              marginTop: '20px',
              marginBottom: '0px',
              width: '280px',

              fieldset: {
                borderRadius: 0,
                border: 'none',
                borderBottom: 1,
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '0px',
                marginBottom: '0px',
                borderColor: 'grey.400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              },
              input: {
                color: 'grey.700',
                fontFamily: 'var(--font-primary)',
                fontSize: '18px',
                marginLeft: '40px',
                paddingLeft: '0px',
                paddingTop: '8px',
                paddingBottom: '11px',
                marginTop: '0px',
                marginBottom: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              },
              label: {
                color: 'grey.400',
                paddingLeft: '35px',
              },
              p: {
                color: 'grey.400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              legend: { color: 'grey.400' },
              span: { color: 'grey.400' },
              '&::before': {
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                display: 'block',
                content: '""',
                backgroundImage: 'URL("../../assets/icons/sprite.svg#icon-email")',
                backgroundSize: 'contain',
                width: '20px',
                height: '16px',
              },
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
            color="grey"
            className={css.test}
            sx={{
              position: 'relative',
              border: 0,
              borderColor: 'grey.400',
              paddingTop: '0px',
              paddingBottom: '0px',
              marginTop: '20px',
              marginBottom: '0px',
              width: '280px',

              fieldset: {
                borderRadius: 0,
                border: 'none',
                borderBottom: 1,
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '0px',
                marginBottom: '0px',
                borderColor: 'grey.400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              },
              input: {
                color: 'grey.700',
                fontFamily: 'var(--font-primary)',
                fontSize: '18px',
                marginLeft: '40px',
                paddingLeft: '0px',
                paddingTop: '8px',
                paddingBottom: '11px',
                marginTop: '0px',
                marginBottom: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              },
              label: {
                color: 'grey.400',
                paddingLeft: '35px',
              },
              p: {
                color: 'grey.400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              legend: { color: 'grey.400' },
              span: { color: 'grey.400' },
              '&::before': {
                position: 'absolute',
                bottom: '34px',
                left: '12px',
                display: 'block',
                content: '""',
                backgroundImage: 'URL("../../assets/icons/sprite.svg#icon-lock")',
                backgroundSize: 'contain',
                width: '16px',
                height: '21px',
              },
            }}
          />

          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            variant="outlined"
            color="grey"
            className={css.test}
            sx={{
              position: 'relative',
              border: 0,
              borderColor: 'grey.400',
              paddingTop: '0px',
              paddingBottom: '0px',
              marginTop: '20px',
              marginBottom: '0px',
              width: '280px',

              fieldset: {
                borderRadius: 0,
                border: 'none',
                borderBottom: 1,
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '0px',
                marginBottom: '0px',
                borderColor: 'grey.400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              },
              input: {
                color: 'grey.700',
                fontFamily: 'var(--font-primary)',
                fontSize: '18px',
                marginLeft: '40px',
                paddingLeft: '0px',
                paddingTop: '8px',
                paddingBottom: '11px',
                marginTop: '0px',
                marginBottom: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              },
              label: {
                color: 'grey.400',
                paddingLeft: '35px',
              },
              p: {
                color: 'grey.400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              legend: { color: 'grey.400' },
              span: { color: 'grey.400' },
              '&::before': {
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                display: 'block',
                content: '""',
                backgroundImage: 'URL("../../assets/icons/sprite.svg#icon-name")',
                backgroundSize: 'contain',
                width: '16px',
                height: '21px',
              },
            }}
          />

          <TextField
            name="firstName"
            type="text"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            variant="outlined"
            color="grey"
            className={css.test}
            sx={{
              position: 'relative',
              border: 0,
              borderColor: 'grey.400',
              paddingTop: '0px',
              paddingBottom: '0px',
              marginTop: '20px',
              marginBottom: '0px',
              width: '280px',

              fieldset: {
                borderRadius: 0,
                border: 'none',
                borderBottom: 1,
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '0px',
                marginBottom: '0px',
                borderColor: 'grey.400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              },
              input: {
                color: 'grey.700',
                fontFamily: 'var(--font-primary)',
                fontSize: '18px',
                marginLeft: '40px',
                paddingLeft: '0px',
                paddingTop: '8px',
                paddingBottom: '11px',
                marginTop: '0px',
                marginBottom: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              },
              label: {
                color: 'grey.400',
                paddingLeft: '35px',
              },
              p: {
                color: 'grey.400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              legend: { color: 'grey.400' },
              span: { color: 'grey.400' },
              '&::before': {
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                display: 'block',
                content: '""',
                backgroundImage: 'URL("../../assets/icons/sprite.svg#icon-name")',
                backgroundSize: 'contain',
                width: '18px',
                height: '18px',
              },
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
            REGISTER
          </Button>
          <Button
            type="button"
            href="#/login"
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
            LOG IN
          </Button>
        </div>
      </form>
    </>
  );
};
export default RegisterForm;
