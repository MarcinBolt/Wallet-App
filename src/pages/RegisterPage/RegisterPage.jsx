import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.introWrapper}>
        <div className={css.img}></div>
        <p className={css.text}>Finance App</p>
      </div>
      <div className={css.formWrapper}>
        <RegisterForm />
      </div>
    </div>
  );
};
export default RegisterPage;
