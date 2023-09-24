// import LoginForm from "../../components/LoginForm/LoginForm";
import LoginForm from "../../components/LoginForm/LoginForm_alt";
import css from "./LoginPage.module.css";
 

  //      import LoginForm from "../components/LoginForm/LoginForm_altt";
const LoginPage = () => {
    return (
    <div>  
      <div className={css.page_wrapper}> 
      <div className={css.subBackround}></div> 
        <div className={css.form_wrapper}>  
          <p className={css.page_text}>Finance App</p>
          <div className={css.frame}></div>
          <div className={css.form}>
            <LoginForm/>
          </div> 
        </div> 
      </div> 
    </div>
    )
  };
  export default LoginPage;