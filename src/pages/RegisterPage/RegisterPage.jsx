// import LoginForm from "../../components/LoginForm/LoginForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import css from "./RegisterPage.module.css";
 

  //      import LoginForm from "../components/LoginForm/LoginForm_altt";
const RegisterPage = () => {
    return (
    <div>  
      <div className={css.page_wrapper}> 
      <div className={css.subBackround}></div> 
        <div className={css.form_wrapper}>  
          <p className={css.page_text}>Finance App</p>
          <div className={css.frame}></div>
          <div className={css.form}>
            <RegisterForm/>
          </div> 
        </div> 
      </div> 
    </div>
    )
  };
  export default RegisterPage;