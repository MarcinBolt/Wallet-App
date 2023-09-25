// import LoginForm from "../../components/LoginForm/LoginForm";
import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.introWrapper}>
        <div className={css.img}></div>
        <p>Finance App</p>
      </div>
      <div className={css.formWrapper}>
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
