import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { updateTransactionById } from '../../redux/transactions/transactions.operations';
import CustomButton from '../CustomButton/CustomButton';
import Notiflix from 'notiflix';
import { toast } from 'react-toastify';
import closeIcon from '../../assets/icons/close.svg';
import calendaricon from '../../assets/icons/calendaricon.svg';
import SelectIcon from '../../assets/icons/select-category.svg';
import { selectTransactionId, selectTransactions } from '../../redux/selectors';
import css from './ModalEditTransaction.module.css';

import {
  Switch,
  FormControlLabel,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from '@mui/material';

import { selectTransactionsCategories } from '../../redux/selectors';
import TitleComponent from '../TitleComponent/Title.Component';

const ModalEditTransaction = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const transactionId = useSelector(selectTransactionId);
  const transactionDetailsTab = [...transactions].filter(t => t._id === transactionId);
  const transactionDetails = transactionDetailsTab[0];
  const categories = useSelector(selectTransactionsCategories);
  const modalBackdropRef = useRef(null);
  const [formData, setFormData] = useState({
    isIncome: false,
    date: '',
    year: '',
    month: '',
    category: '',
    comment: '',
    sum: '',
  });

  useEffect(() => {
    setFormData(
      prev =>
        (prev = {
          isIncome: transactionDetails.type === 'Income' ? true : false,
          date: transactionDetails.date,
          year: '',
          month: '',
          category: transactionDetails.category,
          comment: transactionDetails.comment,
          sum: transactionDetails.sum,
        }),
    );
  }, []);

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

  const handleDateChange = date => {
    setFormData({
      ...formData,
      date: date.toDate(),
    });
  };

  const handleInputChange = ev => {
    ev.preventDefault;
    const { name, value } = ev.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const closeOnBackdropClick = ev => {
    ev.preventDefault;
    if (modalBackdropRef.current === ev.target) {
      toggleModal();
    }
  };

  const handleUpdateTransaction = ev => {
    ev.preventDefault;
    const type = formData.isChecked ? 'Income' : 'Expense';
    const year = formData.date.getFullYear();
    const month = formData.date.toLocaleString('en-US', { month: 'long' });
    toggleModal();
    dispatch(
      updateTransactionById({
        id: transactionId,
        date: formData.date,
        year: year.toString(),
        month: month,
        type: type,
        category: formData.category,
        comment: formData.comment,
        sum: formData.sum,
      }),
    );
  };

  return (
    <div className={css.backdrop} ref={modalBackdropRef} onClick={closeOnBackdropClick}>
      <div className={css.overlay}>
        <IconButton
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            display: 'flex',
            width: '16px',
            height: '16px',
            border: '0px solid #000',
            transform: 'rotate(90deg)',
          }}
          onClick={toggleModal}
        >
          <img src={closeIcon} alt="Close" />
        </IconButton>
        <TitleComponent text={'Edit transaction'} />

        {/* Typ transakcji */}
        <div className={css.switch}>
          <div className={formData.isIncome ? css.text_green : css.text_defaultLeft}>Income</div>
          <div className={css.text_defaultLeft}>/</div>

          <div className={formData.isIncome ? css.text_defaultRight : css.text_pink}>Expense</div>
        </div>

        {/* Lista kategorii */}
        {formData.isIncome ? null : (
          <FormControl className={css.selectContainer}>
            <Select
              sx={{
                borderWidth: 0,
                boxShadow: 'none',
                height: '32px',
                textAlign: 'left',
                borderBottom: '1px solid var(--color-border-bottom-btn-form)',
                '&:hover': { borderBottom: '1px solid var(--color-border-bottom-btn-form)' },

                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none !important',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none !important',
                },
                '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none !important',
                },
              }}
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              IconComponent={() => (
                <img
                  src={SelectIcon}
                  alt="Select Icon"
                  className={`${css.selectCategoryIcon} ${css.iconMarginLeft}`}
                />
              )}
            >
              {categories.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Formik
          initialValues={formData}
          validationSchema={Yup.object({
            sum: Yup.number().required('Required').positive('Must be a positive number'),
            dateValue: Yup.date().required('Required'),
            selectedCategory: Yup.string().when('isChecked', {
              is: false,
              then: Yup.string().required('Required'),
              otherwise: Yup.string(),
            }),
            comment: Yup.string(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleAddTransaction(values, dispatch);
            setSubmitting(false);
          }}
        >
          <Form className={css.form}>
            <div className={css.inputContainer}>
              <div className={css.inputWrapper}>
                <Field
                  inputProps={{
                    style: {
                      paddingBottom: 0,
                      height: 32,
                    },
                  }}
                  as={TextField}
                  type="standard-basic"
                  variant="standard"
                  id="sum"
                  name="sum"
                  onChange={handleInputChange}
                  value={formData.sum}
                  placeholder="0.00"
                  className={css.input}
                />
              </div>
              <div className={css.inputWrapper}>
                {/* Pole daty */}
                <Datetime
                  className={css.tableDatetime}
                  inputProps={{
                    style: {
                      height: 32,
                      width: 181,
                    },
                  }}
                  input={true}
                  dateFormat="DD.MM.YYYY"
                  timeFormat={false}
                  value={formData.date}
                  onChange={date => handleDateChange(date)}
                  renderInput={props => (
                    <TextField
                      {...props}
                      variant="standard"
                      id="date"
                      name="date"
                      fullWidth
                      onChange={e => {
                        const inputDate = e.target.value;
                        setFormData({
                          ...formData,
                          date: inputDate,
                        });
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => {}}>
                              <img src={calendaricon} alt="Calendar" className={css.calendarIcon} />
                            </IconButton>
                          </InputAdornment>
                        ),
                        classes: { underline: css.Underline },
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <ErrorMessage name="sum" component="div" />
            <ErrorMessage name="date" component="div" />
            <label className="label">
              <div className={css.textareaWrapper}>
                <Field
                  as="textarea"
                  placeholder="Comment"
                  rows={1}
                  name="comment"
                  value={formData.comment}
                  className={css.textarea}
                  onChange={handleInputChange}
                />
              </div>
            </label>{' '}
          </Form>
        </Formik>
        <div className={css.paddingButton}>
          <CustomButton
            type="button"
            color="primary"
            content="confirm"
            onClick={handleUpdateTransaction}
          ></CustomButton>
          <CustomButton
            type="button"
            color="secondary"
            content="Cancel"
            onClick={toggleModal}
          ></CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ModalEditTransaction;