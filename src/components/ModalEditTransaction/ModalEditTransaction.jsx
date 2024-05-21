import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { updateTransactionById } from '../../redux/transactions/transactions.operations';
import CustomButton from '../CustomButton/CustomButton';
import closeIcon from '../../assets/icons/close.svg';
import calendarIcon from '../../assets/icons/calendarIcon.svg';
import { selectTransactionId, selectTransactions } from '../../redux/selectors';
import css from './ModalEditTransaction.module.css';

import {
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
    comment: '-',
    sum: '',
  });

  const [errors, setErrors] = useState({
    sum: '',
    date: '',
  });

  useEffect(() => {
    setFormData(
      prev =>
        (prev = {
          isIncome: transactionDetails.type === 'Income' ? true : false,
          date: new Date(transactionDetails.date),
          year: '',
          month: '',
          category: transactionDetails.category,
          comment: transactionDetails.comment ? transactionDetails.comment : '-',
          sum: parseFloat(transactionDetails.sum),
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
      date: date,
    });
    setErrors(prevErrors => ({ ...prevErrors, date: '' }));
  };

  const handleInputChange = ev => {
    const { name, value } = ev.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'sum') {
      if (value === '') {
        setErrors(prevErrors => ({ ...prevErrors, sum: 'Sum is required' }));
      } else if (parseFloat(value) <= 0) {
        setErrors(prevErrors => ({ ...prevErrors, sum: 'Sum must be greater than 0' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, sum: '' }));
      }
    }
  };

  const closeOnBackdropClick = ev => {
    ev.preventDefault;
    if (modalBackdropRef.current === ev.target) {
      toggleModal();
    }
  };

  const handleUpdateTransaction = ev => {
    ev.preventDefault;
    toggleModal();
    const type = formData.isIncome ? 'Income' : 'Expense';
    const category = formData.isIncome ? 'Income' : formData.category;
    const year = new Date(formData.date).getFullYear();
    const month = new Date(formData.date).toLocaleString('en-US', { month: 'long' });
    dispatch(
      updateTransactionById({
        id: transactionId,
        date: new Date(formData.date),
        year: year.toString(),
        month: month,
        type: type,
        category: category,
        comment: formData.comment ? formData.comment : '-',
        sum: Number(formData.sum) ? Number(formData.sum).toFixed(2) : '-',
      }),
    );
  };

  const getButtonContent = () => {
    if (!hasFormDataChanged()) {
      return 'CHANGE SOMETHING FIRST';
    }

    if (errors.sum) {
      return errors.sum;
    } else if (errors.date) {
      return errors.date;
    } else {
      return 'CONFIRM';
    }
  };

  const validateDateFormat = dateString => {
    const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    return dateRegex.test(dateString);
  };

  const isFormValid = errors.sum === '' && errors.date === '';

  const hasFormDataChanged = () => {
    const initialFormData = {
      // isIncome: transactionDetails.type === 'Income' ? true : false,
      date: new Date(transactionDetails.date),
      category: transactionDetails.category,
      comment: transactionDetails.comment ? transactionDetails.comment : '-',
      sum: parseFloat(transactionDetails.sum),
    };

    return (
      // formData.isIncome !== initialFormData.isIncome ||
      formData.date.toString() !== initialFormData.date.toString() ||
      formData.category !== initialFormData.category ||
      formData.comment !== initialFormData.comment ||
      formData.sum !== initialFormData.sum
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
            border: '0',
            padding: '10px',
            transform: 'rotate(90deg)',
          }}
          onClick={toggleModal}
        >
          <img src={closeIcon} alt="Close" viewBox="0 0 34px 4" />
        </IconButton>
        <TitleComponent text={'Edit transaction'} />
        <div className={css.switch}>
          <div className={formData.isIncome ? css.text_green : css.text_defaultLeft}>Income</div>
          <div className={css.text_defaultLeft}>/</div>
          <div className={formData.isIncome ? css.text_defaultRight : css.text_pink}>Expense</div>
        </div>
        <FormControl className={css.selectContainer}>
          <Select
            style={{
              borderWidth: 0,
              boxShadow: 'none',
              height: '32px',
              textAlign: 'left',
              paddingLeft: '15px',
            }}
            variant="standard"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            disabled={formData.isIncome}
          >
            {formData.isIncome ? (
              <MenuItem key={`Income.cat`} value={'Income'}>
                {'-'}
              </MenuItem>
            ) : (
              categories.map(option => (
                <MenuItem key={`${option}.cat`} value={option}>
                  {option}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <div className={css.form}>
          <div className={css.inputContainer}>
            <div className={css.inputWrapper}>
              <TextField
                inputProps={{
                  style: {
                    paddingBottom: 0,
                    height: 32,
                    textAlign: 'left',
                    paddingTop: 0,
                    paddingLeft: '15px',
                  },
                }}
                fullWidth
                type="number"
                variant="standard"
                id="sum"
                name="sum"
                onChange={handleInputChange}
                value={formData.sum}
                placeholder="0.00"
                className={css.sumInput}
                error={!!errors.sum}
                helperText={errors.sum}
              />
            </div>
            <div className={css.inputWrapper}>
              <Datetime
                className={css.tableDatetime}
                inputProps={{
                  style: {
                    paddingBottom: 0,
                    height: '32px',
                    textAlign: 'left',
                    paddingTop: 0,
                    paddingLeft: 0,
                  },
                }}
                fullWidth
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
                    onBlur={ev => {
                      const inputDate = ev.target.value;
                      if (inputDate === '') {
                        setErrors(prevErrors => ({ ...prevErrors, date: 'Date is required' }));
                      } else {
                        const isValidDate = validateDateFormat(inputDate);
                        if (!isValidDate) {
                          setErrors(prevErrors => ({ ...prevErrors, date: 'Invalid date format' }));
                        } else {
                          setErrors(prevErrors => ({ ...prevErrors, date: '' }));
                        }
                      }
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: '15px',
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => {}}>
                            <img
                              src={calendarIcon}
                              alt="Calendar"
                              viewBox="0 0 34px 4"
                              className={css.calendarIcon}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.date}
                    helperText={errors.date}
                  />
                )}
              />
            </div>
          </div>
          <label className="label">
            <div className={css.textareaWrapper}>
              <TextField
                inputProps={{
                  style: {
                    paddingBottom: 0,
                    textAlign: 'left',
                    paddingTop: 0,
                    paddingLeft: '15px',
                  },
                }}
                multiline
                maxRows={4}
                variant="standard"
                id="comment"
                placeholder="Comment"
                name="comment"
                value={formData.comment}
                className={css.comment}
                onChange={handleInputChange}
              />
            </div>
          </label>
          <div className={css.paddingButton}>
            <CustomButton
              type="submit"
              color="primary"
              content={getButtonContent()}
              disabled={!isFormValid || !hasFormDataChanged()}
              onClick={isFormValid && hasFormDataChanged() ? handleUpdateTransaction : null}
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
    </div>
  );
};

export default ModalEditTransaction;
