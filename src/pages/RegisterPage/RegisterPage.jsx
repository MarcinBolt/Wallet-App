import { Container } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import css from "./RegisterPage.module.css";
 
const RegisterPage = () => {
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
      {/* <div className={css.page_wrapper}>  */}
      <div className={css.subBackround}></div> 
        <div className={css.form_wrapper}>  
          <p className={css.page_text}>Finance App</p>
          <div className={css.frame}></div>
          <div className={css.form}>
            <RegisterForm/>
          </div> 
        </div> 
     {/* </div> */}
      </Container> 
    )
  };
  export default RegisterPage;