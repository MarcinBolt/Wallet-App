import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/auth.operations.js';
import css from './RegisterForm.module.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Logo from '../Logo/Logo.jsx';

const validationSchema = Yup.object().shape({
  email: Yup.string('Please enter an e-mail')
    .email('Please enter a valid e-mail')
    .required('E-mail is required!'),
  password: Yup.string('Please enter a password')
    .min(6, 'Minimum 6 characters long')
    .max(12, 'Maximum 12 characters long')
    .required('Password is required!'),
  confirmPassword: Yup.string('Please repeat the password')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirmation is required!'),
  firstName: Yup.string('Please enter Your name')
    .min(1, 'Minimum 1 character long')
    .max(12, 'Maximum 12 characters long')
    .required('First Name is required!'),
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
        <div className={css.container_form}>
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
              className={css.email}
              sx={{
                border: 'none',
                borderColor: 'grey.400',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '20px',
                marginBottom: '0px',
                width: '100%',
                height: '80px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: 1,
                },
                input: {
                  position: 'relative',
                  color: 'grey.600',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '45px',
                  marginTop: '0px',
                  marginBottom: '10px',
                  paddingLeft: '0px',
                  paddingTop: '8px',
                  paddingBottom: '0px',
                },
                label: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '30px',
                },
                p: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'start',
                  paddingLeft: '0px',
                },
                legend: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  marginLeft: '30px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  paddingLeft: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                },
                span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
              }}
            />

            <EmailIcon
              sx={{
                position: 'absolute',
                fill: 'lightgray',
                top: '10px',
                left: '10px',
              }}
            />
          </div>
          <div className={css.container_input}>
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
              className={css.textField}
              sx={{
                border: 'none',
                borderColor: 'grey.400',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '0px',
                marginBottom: '0px',
                width: '100%',
                height: '80px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: 1,
                },
                input: {
                  position: 'relative',
                  color: 'grey.600',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '45px',
                  marginTop: '0px',
                  marginBottom: '10px',
                  paddingLeft: '0px',
                  paddingTop: '8px',
                  paddingBottom: '0px',
                },
                label: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '30px',
                },
                p: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'start',
                  paddingLeft: '0px',
                },
                legend: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  marginLeft: '30px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  paddingLeft: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                },
                span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
              }}
            />
            <LockIcon
              sx={{
                position: 'absolute',
                fill: 'lightgray',
                top: '10px',
                left: '10px',
              }}
            />
          </div>
          <div className={css.container_input}>
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
              className={css.password}
              sx={{
                border: 'none',
                borderColor: 'grey.400',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '0px',
                marginBottom: '0px',
                width: '100%',
                height: '80px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: 1,
                },
                input: {
                  position: 'relative',
                  color: 'grey.600',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '45px',
                  marginTop: '0px',
                  marginBottom: '10px',
                  paddingLeft: '0px',
                  paddingTop: '8px',
                  paddingBottom: '0px',
                },
                label: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '30px',
                },
                p: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'start',
                  paddingLeft: '0px',
                },
                legend: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  marginLeft: '30px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  paddingLeft: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                },
                span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
              }}
            />
            <LockIcon
              sx={{
                position: 'absolute',
                fill: 'lightgray',
                top: '10px',
                left: '10px',
              }}
            />
          </div>

          <div className={css.container_input}>
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
                border: 'none',
                borderColor: 'grey.400',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '0px',
                marginBottom: '0px',
                width: '100%',
                height: '80px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: 1,
                },
                input: {
                  position: 'relative',
                  color: 'grey.600',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '45px',
                  marginTop: '0px',
                  marginBottom: '10px',
                  paddingLeft: '0px',
                  paddingTop: '8px',
                  paddingBottom: '0px',
                },
                label: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '30px',
                },
                p: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'start',
                  paddingLeft: '0px',
                },
                legend: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  marginLeft: '30px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  paddingLeft: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                },
                span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
              }}
            />
            <AccountBoxIcon
              sx={{
                position: 'absolute',
                fill: 'lightgray',
                top: '12px',
                left: '10px',
              }}
            />
          </div>
        </div>
        <div className={css.button_container}>
          <Button
            type="submit"
            sx={{
              mt: 3,
              mb: 2,
              width: 280,
              marginTop: '5px',
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
