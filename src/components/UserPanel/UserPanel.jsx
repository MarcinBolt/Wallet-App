import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'; 
import { createTheme,  ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../utils/hooks/user.auth'; 
import css from './UserPanel.module.css';
import { Collapse, DialogTitle, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox'; 
import MoneyIcon from '@mui/icons-material/Money';
import CloseIcon from '@mui/icons-material/Close';
import { deleteUser, updateUser } from '../../redux/auth/auth.operations'; 
import PersonOffIcon from '@mui/icons-material/PersonOff'; 
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; 
import { selectGlobalIsUserPanelOpen, selectTransactionsCurrency } from '../../redux/selectors'; 

 const theme = createTheme();

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
  userCurrency: Yup.string('Please enter Your currency')
});
   
const UserPanel = () => {
 
   
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      userCurrency: '',
    },
    validationSchema,
    onSubmit: values => { 
      dispatch(
        updateUser({  
          email: values.email,
          password: values.password,
          firstName: values.firstName,
        }),
        selectTransactionsCurrency(values.userCurrency) 
      );
      formik.resetForm();
    },
  });
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 

  React.useEffect(() => {
    window.addEventListener("keyup", handleKeyDown);
    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  });
 
  const handleKeyDown = (event) => { 
    if (event.code === "Escape") {
      handleClose();
    }
  };
  
  const userName = useAuth().userName;
  const userEmail = useAuth().userEmail; 
  const IsUserPanelOpen = useAuth().isUserPanelOpen;
  const onClickDeleteUser = () => { 
    dispatch(deleteUser())
    ;
  } 
  
   
  return ( 
    <Box  
      sx={{ 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '92vh',
        maxWidth: '450px',
        background: 'white',
        position: 'fixed',
        top: 0, 
        right: 0, 
        ...IsUserPanelOpen && {
          //  right: 0, 
        },  
      }}
    > 
 
      <Collapse orientation="horizontal" in={IsUserPanelOpen} > 
        <h1>Hello {userName} </h1>
        <p>Your E-mail is {userEmail}</p> 
        <div className={css.container_input}>
          <ManageAccountsIcon 
            sx={{ 
              fill: '#24cca7', 
              fontSize: '35px',
              marginTop: '4px',
              marginLeft: '24px',
            }}
          />

          <Button
            type="button"
            onClick={handleOpen}
            sx={{ 
              width: 200, 
              marginLeft: '10px',
              marginRight: '30px',
              background: '#24cca7',
              '&:hover': {
                background: '#35a78e',
              },
              color: '#ffffff',
              fontSize: 18,
              borderRadius: 20,
            }}
          >
            UPDATE ACCOUNT
          </Button>
        </div>
        <div className={css.container_input}>
          <PersonOffIcon 
            sx={{ 
              fill: 'red', 
              fontSize: '35px',
              marginTop: '4px',
              marginLeft: '24px',
            }}
          />
          <Button
            type="button"
            onClick={onClickDeleteUser}
            sx={{  
              width: 200, 
              marginLeft: '10px',
              marginRight: '30px', 
              background: '#ffffff',
              border: 1,
              borderColor: '#FF0000',
              '&:hover': {
                background: '#FF0000',
                color: '#ffffff',
              },
              color: '#FF0000',
              fontSize: 18,
              borderRadius: 20,
            }}
          >
            DELETE ACCOUNT
          </Button>
        </div>
        <Dialog 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            maxWidth: '200px', 
            background: 'transparent', 
            left: '70%', 
          }}  
          className="mui-fixed" 
          open={open} 
        > 

        <DialogTitle sx={{ display: 'flex', alignItems: 'center',
           p: '20', pr: '20', pb: '0'  }}> 
          <IconButton sx={{ ml: 'auto', pb: '0' }} onClick={handleClose}>
              <CloseIcon sx={{ ml: 'auto' }}/>
          </IconButton>
        </DialogTitle>
 
     <form onSubmit={formik.handleSubmit} className={css.form}>
        
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
                width: '80%',
                marginLeft: '25px', 
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
                top: '82px',
                left: '30px',
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
                marginLeft: '25px',
                marginTop: '0px',
                marginBottom: '0px',
                width: '80%',
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
                top: '160px',
                left: '30px',
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
                width: '80%',
                marginLeft: '25px',
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
                top: '240px',
                left: '30px',
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
                width: '80%',
                marginLeft: '25px',
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
                top: '320px',
                left: '30px',
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
                width: '80%',
                marginLeft: '25px',
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
            <MoneyIcon
              sx={{
                position: 'absolute',
                fill: 'lightgray',
                top: '400px',
                left: '30px',
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
              width: 240,
              marginTop: '5px',
              marginLeft: '40px',
              marginRight: '40px', 
              marginBottom: '30px',
              background: '#24cca7',
              '&:hover': {
                background: '#35a78e',
              },
              color: '#ffffff',
              fontSize: 18,
              borderRadius: 20,
            }}
          >
            UPDATE INFORMATION
          </Button> 
        </div>
      </form>  
    </Dialog> 
  </Collapse> 
  </Box>
  );
 }
  
 ;
export default UserPanel;
