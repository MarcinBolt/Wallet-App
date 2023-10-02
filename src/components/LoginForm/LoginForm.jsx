import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/auth.operations.js';
import css from './LoginForm.module.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Logo from '../Logo/Logo.jsx';
import CustomButton from '../CustomButton/CustomButton.jsx';
import { useNavigate } from 'react-router-dom';
// import ModalVerifyAgain from '../ModalVerifyAgain/ModalVerifyAgain.jsx';

const validationSchema = Yup.object().shape({
  email: Yup.string('Please enter an e-mail')
    .email('Please enter a valid e-mail')
    .required('E-mail is required!'),
  password: Yup.string('Please enter a password')
    .min(6, 'Minimum 6 characters long')
    .max(12, 'Maximum 12 characters long')
    .required('Password is required!'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isModalVerifyAgainOpen, setIsModalVerifyAgainOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(
        logIn({
          email: values.email,
          password: values.password,
        }),
      );
      formik.resetForm();
    },
  });

  // handleModalVerifyAgain = () => {
  //   setIsModalVerifyAgainOpen(!isModalVerifyAgainOpen);
  // };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <div className={css.logo_wrapper}>
          <Logo />
        </div>
        <div className={css.container_field}>
          <div className={css.container_input}>
            <TextField
              name="email"
              type="email"
              label="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
              color="grey"
              className={css.email}
              sx={{
                border: 'none',
                borderColor: 'grey.400',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '20px',
                marginBottom: '0px',
                height: '80px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: 1,
                  width: '315px',
                },
                input: {
                  position: 'relative',
                  color: 'grey.600',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '45px',
                  marginTop: '0px',
                  marginBottom: '10px',
                  paddingLeft: '0px',
                  paddingTop: '8px',
                  paddingRight: '0px',
                  paddingBottom: '0px',
                  width: '270px',
                },
                label: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '30px',
                },
                p: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'start',
                  paddingLeft: '0px',
                },
                legend: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  marginLeft: '30px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  paddingLeft: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                },
                span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
              }}
            />

            <EmailIcon
              sx={{
                position: 'absolute',
                fill: 'lightgray',
                top: '10px',
                left: '10px',
              }}
            />
          </div>
          <div className={css.container_input}>
            <TextField
              name="password"
              type="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant="outlined"
              color="grey"
              className={css.password}
              sx={{
                border: 'none',
                borderColor: 'grey.400',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginTop: '0px',
                marginBottom: '0px',
                height: '80px',

                fieldset: {
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: 1,
                  width: '315px',
                },
                input: {
                  position: 'relative',
                  color: 'grey.600',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '45px',
                  marginTop: '0px',
                  marginBottom: '10px',
                  paddingLeft: '0px',
                  paddingTop: '8px',
                  paddingRight: '0px',
                  paddingBottom: '0px',
                  width: '270px',
                },
                label: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  fontSize: '18px',
                  marginLeft: '30px',
                },
                p: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'start',
                  paddingLeft: '0px',
                },
                legend: {
                  color: 'grey.400',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1,
                  marginLeft: '30px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  paddingLeft: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                },
                span: { color: 'grey.400', fontFamily: 'var(--font-primary)', lineHeight: 1 },
              }}
            />
            <LockIcon
              sx={{
                position: 'absolute',
                fill: 'lightgray',
                top: '10px',
                left: '10px',
              }}
            />
          </div>
        </div>
        <div className={css.button_container}>
          <CustomButton type="submit" color="primary" content="LOG IN" />
          <CustomButton
            type="button"
            color="secondary"
            content="REGISTER"
            onClick={() => navigate('/register', { replace: false })}
          />
        </div>
      </form>
      {/* <button type="button" className={css.verifyLink} onClick={toggleVerifyAgain}>
        <h3>I want to verify my account</h3>
      </button> */}
      {/* {isModalVerifyAgainOpen && <ModalVerifyAgain toggleModal={handleModalVerifyAgain} />} */}
    </>
  );
};
export default LoginForm;
