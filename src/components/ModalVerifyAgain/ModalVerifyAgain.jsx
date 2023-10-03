import { useEffect, useRef, useState } from 'react';
import closeIcon from '../../assets/icons/close.svg';
import CustomButton from '../CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import TitleComponent from '../TitleComponent/Title.Component';
import { TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import css from './ModalVerifyAgain.module.css';
import { sendVerificationEmailAgain } from '../../redux/auth/auth.operations';

const validationSchema = Yup.object().shape({
  email: Yup.string('Please enter an e-mail')
    .email('Please enter a valid e-mail')
    .required('E-mail is required!'),
});

const ModalVerifyAgain = ({ toggleModal }) => {
  const dispatch = useDispatch();

  const modalBackdropRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(
        resendEmailWithVerificationToken({
          email: values.email,
        }),
      );
      formik.resetForm();
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

  const handleUserResendEmail = ev => {
    ev.preventDefault;
    toggleModal();
    dispatch(sendVerificationEmailAgain({ email }));
  };

  return (
    <div className={css.backdrop} ref={modalBackdropRef} onClick={closeOnBackdropClick}>
      <div className={css.modalContainer}>
        <div className={css.closeIconContainer}>
          <img src={closeIcon} alt="Close" className={css.closeIcon} onClick={toggleModal} />
        </div>

        <TitleComponent text={`Verify your email`} />
        <div className={css.textWrapper}>
          <span className={css.logoutInfo}>Missed out verification?</span>
          <span className={css.logoutInfo}>Enter your email address</span>
        </div>
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
            type="button"
            color="primary"
            content="Resend email"
            onClick={handleUserResendEmail}
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
      </div>
    </div>
  );
};

export default ModalVerifyAgain;

// <button type="button" className={css.verifyLink} onClick={toggleModal}>
//   <h3>I want to verify my account</h3>
// </button>;
