// import LoginForm from "../../components/LoginForm/LoginForm";
import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';
import { Container } from '@mui/material';

const LoginPage = () => {
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
      {/* <div className={css.page_wrapper}> */}
        <div className={css.subBackround}></div>
        <div className={css.form_wrapper}>
          <p className={css.page_text}>Finance App</p>
          <div className={css.frame}></div>
          <div className={css.form}>
            <LoginForm />
          </div>
        </div>
      {/* </div> */}
    </Container>
  );
};
export default LoginPage;
