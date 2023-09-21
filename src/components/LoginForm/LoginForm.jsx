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
 
import * as Yup from "yup";
import { object, string } from 'yup';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';

const theme = createTheme();

const LoginForm = () => {
  const dispatch = useDispatch();

  const validationsSchema = Yup.object().shape({
    email: Yup.string("Please enter an e-mail")
    .email("Please enter a valid e-mail")
    .required("Email is required!"),
    password: Yup.string("Please enter a password")
      .min(6, "The password must be at least 6 characters long")
      .max(12, "The password must not be longer then 12 characters")
      .required("Passsword is required!"),
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
     >  
       {({ errors, touched }) => ( 
         <Form>  

        <div> 
           <img src={logo} alt="Logo" />
           <Field name="email" type="email" /> 
           {errors.email && touched.email ? <div>{errors.email}</div> : null} 
          
           <Field name="password" /> 
           {errors.password && touched.password ? ( 
             <div>{errors.password}</div> 
           ) : null} 

        <button type="submit">LOG IN</button>  
        {/* <button  type="button" href="#/register">REGISTER</button>   */} 
        <NavLink to="/register" className="main_btn">
                  REGISTER
                </NavLink> 
        </div>
          
         </Form> 
       )} 
     </Formik> 
   </div>
  );
};
export default LoginForm;
