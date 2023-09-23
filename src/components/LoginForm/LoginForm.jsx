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
             variant="outlined" color="primary" label="Email" /> 
             {errors.email && touched.email ? <div>{errors.email}</div> : null}  

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
 
            {/* <Field name="email" type="email" className={css.input} placeholder="E-mail"/> 
             {errors.email && touched.email ? <div>{errors.email}</div> : null}  
             <Field name="password" className={css.input} placeholder="Password"/> 
             {errors.password && touched.password ? ( 
             <div>{errors.password}</div> 
             ) : null}   */}
           </div> 
           <div className={btn.button_container}>
            {/* <Button>LOG IN</Button> */}
             <MainButton
                type="submit"       
                text="LOG IN"  
                className={`${btn.button} ${btn.logo_btn}`}    
             />
           </div> 
           <NavLink to="/register" className={`${btn.button} ${btn.main_btn}`}>REGISTER
           </NavLink>  
         </Form> 
       )} 
     </Formik> 
   </div>
  );
};
export default LoginForm;
