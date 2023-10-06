import { useEffect, useRef, useState } from 'react';
import closeIcon from '../../assets/icons/close.svg';
import CustomButton from '../CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import TitleComponent from '../TitleComponent/Title.Component';
import { TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { resendVerificationEmail } from '../../redux/auth/auth.operations';
import css from './ModalVerifyAgain.module.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string('Please enter an e-mail')
    .email('Please enter a valid e-mail')
    .required('E-mail is required!'),
});

const ModalVerifyAgain = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalBackdropRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(
        resendVerificationEmail({
          email: values.email,
        }),
      );
    },
  });

  useEffect(() => {
    const handleEscapeKey = ev => {
      if (ev.key === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const closeOnBackdropClick = ev => {
    if (modalBackdropRef.current === ev.target) {
      toggleModal();
    }
  };

  // const handleUserResendEmail = ev => {
  //   ev.preventDefault;
  //   toggleModal();
  //   dispatch(resendVerificationEmail({ email }));
  // };

  return (
    <div className={css.backdrop} ref={modalBackdropRef} onClick={closeOnBackdropClick}>
      <form onSubmit={formik.handleSubmit} className={css.modalContainer}>
        <div className={css.closeIconContainer}>
          <img src={closeIcon} alt="Close" className={css.closeIcon} onClick={toggleModal} />
        </div>

        <TitleComponent className={css.title} text={`Resending verification email`} />

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

        <div className={css.confirmButtons}>
          <CustomButton
            type="submit"
            color="primary"
            content="Resend"
            onClick={() => navigate('/login', { replace: false })}
            className={`${css.logo} ${css.logout_button}`}
          />

          <CustomButton
            type="button"
            color="secondary"
            content="cancel"
            onClick={toggleModal}
            className={css.main_btn}
          />
        </div>
      </form>
    </div>
  );
};

export default ModalVerifyAgain;

// <button type="button" className={css.verifyLink} onClick={toggleModal}>
//   <h3>I want to verify my account</h3>
// </button>;
