import { useDispatch, useSelector } from 'react-redux';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MoneyIcon from '@mui/icons-material/Money';
import { updateUser } from '../../../redux/auth/auth.operations.js';
import {
  selectUserCurrency,
  selectUserEmail,
  selectUserFirstName,
} from '../../../redux/selectors.js';
import CustomButton from '../../CustomButton/CustomButton.jsx';
import css from './UpdateUserModal.module.css';

const validationSchema = Yup.object().shape({
  password: Yup.string('Please enter a password')
    .min(6, 'Minimum 6 characters long')
    .max(12, 'Maximum 12 characters long'),
  confirmPassword: Yup.string('Please repeat the password').oneOf(
    [Yup.ref('password')],
    'Passwords do not match',
  ),
  firstName: Yup.string('Please enter Your name')
    .min(1, 'Minimum 1 character long')
    .max(12, 'Maximum 12 characters long')
    .required('First Name is required!'),
  userCurrency: Yup.string('Please enter Your currency'),
});

const UpdateUserModal = ({ closeUpdateUserModal }) => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const userFirstName = useSelector(selectUserFirstName);
  const userCurrencyFromState = useSelector(selectUserCurrency);

  const formik = useFormik({
    initialValues: {
      email: userEmail,
      password: '',
      confirmPassword: '',
      firstName: userFirstName,
      userCurrency: userCurrencyFromState === '' ? 'PLN' : userCurrencyFromState,
    },
    validationSchema,
    onSubmit: values => {
      dispatch(
        updateUser({
          email: values.email,
          password: values.password.length === 0 ? 'samePass' : values.password,
          firstName: values.firstName.length === 0 ? userFirstName : values.firstName,
          userCurrency: values.userCurrency.length === 0 ? 'PLN' : values.userCurrency,
        }),
      );
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <div className={css.container_form}>
          <div className={css.container_input}>
            <TextField
              disabled={true}
              name="email"
              type="email"
              label="Your e-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
              color="grey"
              className={css.email}
              style={{ width: '315px', display: 'flex' }}
              sx={{
                border: 'none',
                borderColor: 'grey.400',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '20px',
                marginBottom: '0px',
                height: '60px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  width: '315px',
                },
                input: {
                  position: 'relative',
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '45px',
                  marginTop: '0px',
                  marginBottom: '10px',
                  paddingLeft: '0px',
                  paddingTop: '8px',
                  paddingRight: '0px',
                  paddingBottom: '0px',
                  width: '270px',
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
              label="Could change password"
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
                height: '50px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: 1,
                  width: '315px',
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
                  paddingRight: '0px',
                  paddingBottom: '0px',
                  width: '270px',
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

            <PasswordStrengthBar
              password={formik.values.password}
              shortScoreWord="Password strength"
              scoreWords={['Weak', 'Weak', 'Good', 'Very Good', 'Strong']}
              style={{
                width: '100%',
                marginTop: '-9px',
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
              label="Confirm if new password"
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
                height: '80px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: 1,
                  width: '315px',
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
                  paddingRight: '0px',
                  paddingBottom: '0px',
                  width: '270px',
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
                height: '80px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: 1,
                  width: '315px',
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
                  paddingRight: '0px',
                  paddingBottom: '0px',
                  width: '270px',
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

          <div className={css.container_input}>
            <TextField
              name="userCurrency"
              type="text"
              label="User currency"
              value={formik.values.userCurrency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userCurrency && Boolean(formik.errors.userCurrency)}
              helperText={formik.touched.userCurrency && formik.errors.userCurrency}
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
                height: '80px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: 1,
                  width: '175px',
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
                  paddingRight: '0px',
                  paddingBottom: '0px',
                  width: '120px',
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
            <MoneyIcon
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
          <CustomButton
            type="submit"
            color="primary"
            content="UPDATE ACCOUNT"
            onClick={closeUpdateUserModal}
          />
          <CustomButton
            type="button"
            color="secondary"
            content="Cancel"
            onClick={closeUpdateUserModal}
          ></CustomButton>
        </div>
      </form>
    </>
  );
};
export default UpdateUserModal;
