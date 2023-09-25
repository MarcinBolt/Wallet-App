import { Container } from '@mui/material';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.introWrapper}>
        <div className={css.img}></div>
        <p>Finance App</p>
      </div>
      <div className={css.formWrapper}>
        <RegisterForm />
      </div>
    </div>
  );
};
export default RegisterPage;
