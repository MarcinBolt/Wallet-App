import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import css from './UpdateUserModal.module.css';
import { Collapse, DialogTitle, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MoneyIcon from '@mui/icons-material/Money';
import CloseIcon from '@mui/icons-material/Close';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useAuth } from '../../../utils/hooks/user.auth.js';
import { deleteUser, updateUser } from '../../../redux/auth/auth.operations.js';
import {
  selectGlobalIsUserPanelOpen,
  selectTransactionsCurrency,
  selectUserEmail,
  selectUserFirstName,
} from '../../../redux/selectors.js';
import CustomButton from '../../CustomButton/CustomButton';
// import TitleComponent from '../TitleComponent/Title.Component';

import closeIcon from '../../../assets/icons/close.svg';

const validationSchema = Yup.object().shape({
  password: Yup.string('Please enter a password')
    .min(6, 'Minimum 6 characters long')
    .max(12, 'Maximum 12 characters long'),
  confirmPassword: Yup.string('Please repeat the password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
  firstName: Yup.string('Please enter Your name')
    .min(1, 'Minimum 1 character long')
    .max(12, 'Maximum 12 characters long')
    .required('First Name is required!'),
  userCurrency: Yup.string('Please enter Your currency'),
});

const UpdateUserModal = ({ closeUpdateUserModal }) => {
  const userEmail = useSelector(selectUserEmail);
  const userFirstName = useSelector(selectUserFirstName);

  const formik = useFormik({
    initialValues: {
      email: userEmail,
      password: '',
      confirmPassword: '',
      firstName: userFirstName,
      userCurrency: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(
        updateUser({
          email: values.userEmail,
          password: values.password,
          firstName: values.firstName,
        }),
        selectTransactionsCurrency(values.userCurrency),
      );
      // formik.resetForm();
    },
  });

  return (
    // <>
    //   <form onSubmit={formik.handleSubmit} className={css.form}>
    //     <div className={css.container_form}>
    //       <div className={css.container_input}>
    //         <TitleComponent text="Account settings" />
    //         <div className={css.container_input}>
    //           <TextField
    //             name="email"
    //             type="email"
    //             label="E-mail"
    //             value={formik.values.email}
    //             onChange={formik.handleChange}
    //             onBlur={formik.handleBlur}
    //             error={formik.touched.email && Boolean(formik.errors.email)}
    //             helperText={formik.touched.email && formik.errors.email}
    //             variant="outlined"
    //             color="grey"
    //             disabled="true"
    //             className={css.email}
    //             sx={{
    //               border: 'none',
    //               borderColor: 'grey.400',
    //               paddingTop: '0px',
    //               paddingBottom: '0px',
    //               // paddingBlock: '0px',
    //               // marginTop: '20px',
    //               marginBottom: '0px',
    //               width: '85%',
    //               // marginLeft: '0px',
    //               height: '80px',
    //               '@media (min-width: 768px)': {
    //                 width: '100%',
    //               },

    //               fieldset: {
    //                 borderRadius: 0,
    //                 border: 'none',
    //                 borderBottom: 1,
    //               },
    //               input: {
    //                 position: 'relative',
    //                 left: '-20px',
    //                 color: 'grey.600',
    //                 fontFamily: 'var(--font-primary)',
    //                 lineHeight: 1,
    //                 fontSize: '18px',
    //                 marginLeft: '45px',
    //                 marginTop: '0px',
    //                 marginBottom: '10px',
    //                 paddingLeft: '0px',
    //                 paddingTop: '8px',
    //                 paddingBottom: '0px',
    //               },
    //               label: {
    //                 color: 'grey.400',
    //                 fontFamily: 'var(--font-primary)',
    //                 lineHeight: 1,
    //                 fontSize: '18px',
    //                 marginLeft: '30px',
    //               },
    //               p: {
    //                 color: 'grey.400',
    //                 fontFamily: 'var(--font-primary)',
    //                 lineHeight: 1,
    //                 display: 'flex',
    //                 justifyContent: 'start',
    //                 alignItems: 'start',
    //                 paddingLeft: '0px',
    //               },
    //               legend: {
    //                 color: 'grey.400',
    //                 fontFamily: 'var(--font-primary)',
    //                 lineHeight: 1,
    //                 marginLeft: '30px',
    //                 marginTop: '0px',
    //                 marginBottom: '0px',
    //                 paddingLeft: '0px',
    //                 paddingTop: '0px',
    //                 paddingBottom: '0px',
    //               },
    //               span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
    //             }}
    //           />

    //           <EmailIcon
    //             sx={{
    //               position: 'absolute',
    //               fill: 'lightgray',
    //               top: '62px',
    //               left: '30px',
    //             }}
    //           />
    //         </div>
    //         <TextField
    //           name="password"
    //           type="password"
    //           label="Password"
    //           value={formik.values.password}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           error={formik.touched.password && Boolean(formik.errors.password)}
    //           helperText={formik.touched.password && formik.errors.password}
    //           variant="outlined"
    //           color="grey"
    //           className={css.textField}
    //           sx={{
    //             border: 'none',
    //             borderColor: 'grey.400',
    //             paddingTop: '0px',
    //             paddingBottom: '0px',
    //             // marginLeft: '25px',
    //             marginTop: '0px',
    //             marginBottom: '0px',
    //             width: '80%',
    //             height: '80px',

    //             fieldset: {
    //               borderRadius: 0,
    //               border: 'none',
    //               borderBottom: 1,
    //             },
    //             input: {
    //               position: 'relative',
    //               color: 'grey.600',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               fontSize: '18px',
    //               marginLeft: '45px',
    //               marginTop: '0px',
    //               marginBottom: '10px',
    //               paddingLeft: '0px',
    //               paddingTop: '8px',
    //               paddingBottom: '0px',
    //             },
    //             label: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               fontSize: '18px',
    //               marginLeft: '30px',
    //             },
    //             p: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               display: 'flex',
    //               justifyContent: 'start',
    //               alignItems: 'start',
    //               paddingLeft: '0px',
    //             },
    //             legend: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               marginLeft: '30px',
    //               marginTop: '0px',
    //               marginBottom: '0px',
    //               paddingLeft: '0px',
    //               paddingTop: '0px',
    //               paddingBottom: '0px',
    //             },
    //             span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
    //           }}
    //         />
    //         <LockIcon
    //           sx={{
    //             position: 'absolute',
    //             top: '140px',
    //             left: '30px',
    //           }}
    //         />
    //       </div>
    //       <div className={css.container_input}>
    //         <TextField
    //           name="confirmPassword"
    //           type="password"
    //           label="Confirm password"
    //           value={formik.values.confirmPassword}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
    //           helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
    //           variant="outlined"
    //           color="grey"
    //           className={css.password}
    //           sx={{
    //             border: 'none',
    //             borderColor: 'grey.400',
    //             paddingTop: '0px',
    //             paddingBottom: '0px',
    //             marginTop: '0px',
    //             marginBottom: '0px',
    //             width: '80%',
    //             // marginLeft: '25px',
    //             height: '80px',

    //             fieldset: {
    //               borderRadius: 0,
    //               border: 'none',
    //               borderBottom: 1,
    //             },
    //             input: {
    //               position: 'relative',
    //               color: 'grey.600',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               fontSize: '18px',
    //               marginLeft: '45px',
    //               marginTop: '0px',
    //               marginBottom: '10px',
    //               paddingLeft: '0px',
    //               paddingTop: '8px',
    //               paddingBottom: '0px',
    //             },
    //             label: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               fontSize: '18px',
    //               marginLeft: '30px',
    //             },
    //             p: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               display: 'flex',
    //               justifyContent: 'start',
    //               alignItems: 'start',
    //               paddingLeft: '0px',
    //             },
    //             legend: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               marginLeft: '30px',
    //               marginTop: '0px',
    //               marginBottom: '0px',
    //               paddingLeft: '0px',
    //               paddingTop: '0px',
    //               paddingBottom: '0px',
    //             },
    //             span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
    //           }}
    //         />
    //         <LockIcon
    //           sx={{
    //             position: 'absolute',
    //             fill: 'lightgray',
    //             top: '220px',
    //             left: '30px',
    //           }}
    //         />
    //       </div>

    //       <div className={css.container_input}>
    //         <TextField
    //           name="firstName"
    //           type="text"
    //           label="First Name"
    //           value={formik.values.firstName}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           error={formik.touched.firstName && Boolean(formik.errors.firstName)}
    //           helperText={formik.touched.firstName && formik.errors.firstName}
    //           variant="outlined"
    //           color="grey"
    //           className={css.test}
    //           sx={{
    //             border: 'none',
    //             borderColor: 'grey.400',
    //             paddingTop: '0px',
    //             paddingBottom: '0px',
    //             marginTop: '0px',
    //             marginBottom: '0px',
    //             width: '80%',
    //             // marginLeft: '25px',
    //             height: '80px',

    //             fieldset: {
    //               borderRadius: 0,
    //               border: 'none',
    //               borderBottom: 1,
    //             },
    //             input: {
    //               position: 'relative',
    //               color: 'grey.600',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               fontSize: '18px',
    //               marginLeft: '45px',
    //               marginTop: '0px',
    //               marginBottom: '10px',
    //               paddingLeft: '0px',
    //               paddingTop: '8px',
    //               paddingBottom: '0px',
    //             },
    //             label: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               fontSize: '18px',
    //               marginLeft: '30px',
    //             },
    //             p: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               display: 'flex',
    //               justifyContent: 'start',
    //               alignItems: 'start',
    //               paddingLeft: '0px',
    //             },
    //             legend: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               marginLeft: '30px',
    //               marginTop: '0px',
    //               marginBottom: '0px',
    //               paddingLeft: '0px',
    //               paddingTop: '0px',
    //               paddingBottom: '0px',
    //             },
    //             span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
    //           }}
    //         />
    //         <AccountBoxIcon
    //           sx={{
    //             position: 'absolute',
    //             fill: 'lightgray',
    //             top: '300px',
    //             left: '30px',
    //           }}
    //         />
    //       </div>

    //       <div className={css.container_input}>
    //         <TextField
    //           name="userCurrency"
    //           type="text"
    //           label="User currency"
    //           value={formik.values.userCurrency}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           helperText={formik.touched.userCurrency && formik.errors.userCurrency}
    //           variant="outlined"
    //           color="grey"
    //           className={css.test}
    //           sx={{
    //             border: 'none',
    //             borderColor: 'grey.400',
    //             paddingTop: '0px',
    //             paddingBottom: '0px',
    //             marginTop: '0px',
    //             marginBottom: '0px',
    //             width: '80%',
    //             // marginLeft: '25px',
    //             height: '80px',

    //             fieldset: {
    //               borderRadius: 0,
    //               border: 'none',
    //               borderBottom: 1,
    //             },
    //             input: {
    //               position: 'relative',
    //               color: 'grey.600',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               fontSize: '18px',
    //               marginLeft: '45px',
    //               marginTop: '0px',
    //               marginBottom: '10px',
    //               paddingLeft: '0px',
    //               paddingTop: '8px',
    //               paddingBottom: '0px',
    //             },
    //             label: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               fontSize: '18px',
    //               marginLeft: '30px',
    //             },
    //             p: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               display: 'flex',
    //               justifyContent: 'start',
    //               alignItems: 'start',
    //               paddingLeft: '0px',
    //             },
    //             legend: {
    //               color: 'grey.400',
    //               fontFamily: 'var(--font-primary)',
    //               lineHeight: 1,
    //               marginLeft: '30px',
    //               marginTop: '0px',
    //               marginBottom: '0px',
    //               paddingLeft: '0px',
    //               paddingTop: '0px',
    //               paddingBottom: '0px',
    //             },
    //             span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
    //           }}
    //         />
    //         <MoneyIcon
    //           sx={{
    //             position: 'absolute',
    //             fill: 'lightgray',
    //             top: '380px',
    //             left: '30px',
    //           }}
    //         />
    //       </div>
    //         <div className={css.button_container}>
    //           <CustomButton type="submit" color="primary" content="UPDATE ACCOUNT"></CustomButton>
    //         </div>
    //     </div>

    //     {/* <Button
    //       type="submit"
    //       sx={{
    //         mt: 3,
    //         mb: 2,
    //         width: 240,
    //         marginTop: '5px',
    //         marginLeft: '40px',
    //         marginRight: '40px',
    //         marginBottom: '30px',
    //         background: '#24cca7',
    //         '&:hover': {
    //           background: '#35a78e',
    //         },
    //         color: '#ffffff',
    //         fontSize: 18,
    //         borderRadius: 20,
    //       }}
    //     >
    //       UPDATE ACCOUNT
    //     </Button> */}
    //   </form>
    // </>
    <>
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <IconButton
          style={{
            position: 'absolute',
            padding: '15px',
            top: '16px',
            right: '16px',
            width: '16px',
            height: '16px',
          }}
          onClick={closeUpdateUserModal}
        >
          <img src={closeIcon} alt="Close" viewBox="0 0 100% 4" />
        </IconButton>
        <div className={css.container_form}>
          <div className={css.container_input}>
            <TextField
              disabled={true}
              name="email"
              type="email"
              label="E-mail"
              value={formik.values.email}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // error={formik.touched.email && Boolean(formik.errors.email)}
              // helperText={formik.touched.email && formik.errors.email}
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
                  // borderBottom: 1,
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
              label="New password"
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
              label="Confirm new password"
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
          <CustomButton type="submit" color="primary" content="UPDATE ACCOUNT" />
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
