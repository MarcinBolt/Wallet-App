//TODO
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import logo from '../../assets/images/apple-touch-icon.png';
import css from "./LoginForm.module.css";
import btn from "./MainButton.module.css"; 
import * as Yup from "yup"; 
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import MainButton from './MainButton'; 
     
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputAdornment } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

 
const LoginForm = () => {
  const dispatch = useDispatch();

  const validationsSchema = Yup.object().shape({
    email: Yup.string("Please enter an e-mail")
      .email("Please enter a valid e-mail")
      .required("Email is required!"),
    password: Yup.string("Please enter a password")
      .min(6, "The password must be at least 6 characters long")
      .max(12, "The password must not be longer then 12 characters")
      .required("Password is required!"),
  });
 
  const handleSubmit =  values  => {
    // event.preventDefault();
    // const form = event.currentTarget;
    // const data = new FormData(event.currentTarget);
    console.log(values)
    dispatch(logIn({ email: values.email, password: values.password })); 
    // form.reset();
  }; 
  return (
    <div >  
     <Formik 
       initialValues={{ 
        password: '',  
         email: '', 
       }} 
       validationSchema={validationsSchema}
        onSubmit={handleSubmit}

      //  onSubmit={[handleSubmit, (formikHelpers => {
      //   formikHelpers.resetForm();
      //   })]}


     >  
       {({ errors, touched }) => ( 
         <Form className={css.form}>   
           <div className={css.logo_wrapper}> 
              <img src={logo} alt="Logo" className={css.logo}/>
              <h1 className={css.logo_text} >Wallet</h1>
           </div>
           <div className={css.container_input}>

             <Field name="email" type="email" as={TextField} 
             className={css.test} 
             
             InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddCircleIcon />
                </InputAdornment>
              ),
            }}
 

            sx={{
              "& fieldset": { border: 'none' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center', 
              borderBottom: 1,
              borderColor: 'grey.300',
              padding: 0, 
            }} 
             variant="outlined" color="primary" label="E-mail" /> 
             {errors.email && touched.email ? <div>{errors.email}</div> : null}  
 
            <Field name="password" type="password" as={TextField} 
             className={css.test} 
             
            sx={{
              "& fieldset": { border: 'none' }, 
              borderBottom: 1,
              borderColor: 'grey.300',
              padding: 0, 
            }} 
             variant="outlined" color="primary" label="Password" /> 
             {errors.password && touched.password ? ( 
             <div>{errors.password}</div> 
             ) : null} 
  
           </div> 
           <div className={btn.button_container}> 
              <Button type="submit"  
               sx={{ mt: 3, mb: 2 , width: 280,
                background: '#24cca7',
                "&:hover": {
                  background: '#35a78e'
                },
                color: '#ffffff',
                fontSize: 18,
                borderRadius: 20
               }}
              >LOG IN
              </Button>
              <Button  
               type="button"
               href="#/register" 
               sx={{  width: 280,
                background: '#ffffff',
                "&:hover": {
                  background: '#4a56e2',
                  color: '#ffffff',
                },
                color: '#4a56e2',
                fontSize: 18,
                borderRadius: 20
               }}
              >REGISTER
              </Button> 
{/* <NavLink to="/register" className={`${btn.button} ${btn.main_btn}`}>REGISTER
           </NavLink>  */} 
           </div>  
         </Form> 
       )} 
     </Formik> 
   </div>
  );
};
export default LoginForm;
