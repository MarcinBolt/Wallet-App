import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { deleteUser } from '../../redux/auth/auth.operations';
import { selectUserEmail, selectUserFirstName } from '../../redux/selectors';
import CustomButton from '../CustomButton/CustomButton';
import css from './ModalDeleteUser.module.css';

const ModalDeleteUser = ({ closeDeleteUserModal }) => {
  const dispatch = useDispatch();
  const userFirstName = useSelector(selectUserFirstName);
  const modalBackdropRef = useRef(null);
  const userEmail = useSelector(selectUserEmail);

  const validationSchema = Yup.object().shape({
    password: Yup.string('Please enter a password')
      .min(6, 'Minimum 6 characters long')
      .max(12, 'Maximum 12 characters long')
      .required('Password is required!'),
  });

  const formik = useFormik({
    initialValues: {
      email: userEmail,
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(
        deleteUser({
          email: values.email,
          password: values.password,
        }),
      );
    },
  });

  return (
    <div className={css.backdrop} ref={modalBackdropRef}>
      <div className={css.overlay}>
        <div className={css.deleteUserModalContainer}>
          <span className={css.deleteUserTitle}>Confirm Account Deletion</span>
          <span className={css.deleteUserInfo}>All of your data will be deleted!</span>
          <span className={css.deleteUserInfo}>Are you sure, {userFirstName}?</span>
          <form onSubmit={formik.handleSubmit} className={css.form}>
            <div className={css.container_form}>
              <div className={css.container_input}>
                <TextField
                  disabled={true}
                  name="email"
                  type="email"
                  label="Your e-mail"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  variant="outlined"
                  color="grey"
                  className={css.email}
                  style={{ width: '315px', display: 'flex' }}
                  sx={{
                    border: 'none',
                    borderColor: 'grey.400',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    marginTop: '20px',
                    marginBottom: '0px',
                    height: '60px',

                    fieldset: {
                      borderRadius: 0,
                      border: 'none',
                      width: '300px',
                    },
                    input: {
                      position: 'relative',
                      color: 'grey.400',
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
                  className={css.textField}
                  sx={{
                    border: 'none',
                    borderColor: 'grey.400',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    marginTop: '0px',
                    marginBottom: '30px',
                    height: '50px',

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

            <div className={css.confirmButtons}>
              <CustomButton
                type="submit"
                color="red"
                content="Delete User"
                sx={{
                  width: '240px',
                  padding: '30px',
                }}
                className={`${css.logo} ${css.delete_button}`}
              />

              <CustomButton
                type="button"
                color="secondary"
                content="CANCEL"
                onClick={closeDeleteUserModal}
                className={css.delete_button}
                sx={{
                  width: '240px',
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteUser;
