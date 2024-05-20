import React, { useEffect, useState, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import css from './ModalAddTransaction.module.css';
import plusbtn from '../../assets/icons/plusbtn.svg';
import minusbtn from '../../assets/icons/minusbtn.svg';
import calendarIcon from '../../assets/icons/calendarIcon.svg';
import SelectIcon from '../../assets/icons/select-category.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addTransaction } from '../../redux/transactions/transactions.operations';
import CustomButton from '../CustomButton/CustomButton';
import closeIcon from '../../assets/icons/close.svg';
import { selectTransactionsCategories } from '../../redux/selectors';
import TitleComponent from '../TitleComponent/Title.Component';

const ModalAddTransaction = ({ toggleModal }) => {
  const [prevIsFormValid, setPrevIsFormValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const modalBackdropRef = useRef(null);
  const dispatch = useDispatch();
  const categories = useSelector(selectTransactionsCategories);
  const [formData, setFormData] = useState({
    isChecked: false,
    dateValue: new Date(),
    year: '',
    month: '',
    selectedCategory: 'Main expenses',
    comment: '',
    sum: '',
  });

  const [errors, setErrors] = useState({
    sum: '',
    date: '',
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

  let extraMargin = formData.isChecked ? '0' : '20px';

  const switchStyles = {
    width: '44px',
    marginLeft: extraMargin,
  };

  const iconStyles = {};

  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: 'none',
            height: 50,
          },
          colorPrimary: {
            '&.Mui-checked': {
              color: 'none',
            },
          },
          track: {
            '.Mui-checked.Mui-checked + &': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    },
  });

  const handleDateChange = date => {
    setFormData({
      ...formData,
      dateValue: date.toDate(),
      date: date.toDate(),
    });
    setErrors(prevErrors => ({ ...prevErrors, date: '' }));
    setSelectedDate(date.toDate());
  };

  const handleInputChange = ev => {
    ev.preventDefault;
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

      if (value > 0) {
        setPrevIsFormValid(true);
      }
    }
  };

  const closeOnBackdropClick = ev => {
    ev.preventDefault;
    if (modalBackdropRef.current === ev.target) {
      toggleModal();
    }
  };

  const handleAddTransaction = () => {
    toggleModal();
    const type = formData.isChecked ? 'Income' : 'Expense';
    const category = formData.isChecked ? 'Income' : formData.selectedCategory;
    const year = selectedDate.getFullYear();
    const month = selectedDate.toLocaleString('en-US', { month: 'long' });
    dispatch(
      addTransaction({
        date: new Date(selectedDate),
        year: year.toString(),
        month: month,
        type: type,
        category: category,
        comment: formData.comment ? formData.comment : '-',
        sum: Number(formData.sum) ? formData.sum : '-',
      }),
    );
  };

  const getButtonContent = () => {
    if (errors.sum) {
      return errors.sum;
    } else if (errors.date) {
      return errors.date;
    } else {
      return 'ADD';
    }
  };

  const isFormValid = errors.sum === '' && errors.date === '' && prevIsFormValid;

  return (
    <div className={css.backdrop} ref={modalBackdropRef} onClick={closeOnBackdropClick}>
      <div className={css.overlay}>
        <IconButton
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '16px',
            height: '16px',
            border: '0px solid #000',
            transform: 'rotate(90deg)',
          }}
          onClick={toggleModal}
        >
          <img src={closeIcon} alt="Close" viewBox="0 0 100% 4" />
        </IconButton>
        <TitleComponent text={'Add transaction'} />
        <div className={css.switch}>
          <div className={formData.isChecked ? css.text_green : css.text_defaultLeft}>Income</div>
          <ThemeProvider theme={theme}>
            <FormControlLabel
              control={
                <Switch
                  checked={!formData.isChecked}
                  sx={{
                    '&.MuiSwitch-root': {
                      border: '1px solid #e0e0e0',
                      borderRadius: 30,
                      p: 0,
                      mx: 2,
                      width: 80,
                      height: 40,
                      overflow: 'visible',
                    },

                    '& .MuiSwitch-thumb': {
                      backgroundColor: 'transparent',
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: 'transparent',
                      border: '0px solid transparent',
                      '& .MultiSwitch-thumb': {
                        backgroundColor: 'transparent',
                        border: '0px solid transparent',
                      },
                    },
                  }}
                  style={switchStyles}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      isChecked: !formData.isChecked,
                      selectedCategory: 'Main expenses',
                    })
                  }
                  name="transaction-type"
                  icon={
                    <img src={plusbtn} alt="plus Icon" viewBox="0 0 100% 4" style={iconStyles} />
                  }
                  checkedIcon={
                    <img src={minusbtn} alt="minus Icon" viewBox="0 0 100% 4" style={iconStyles} />
                  }
                />
              }
            />
          </ThemeProvider>
          <div className={formData.isChecked ? css.text_defaultRight : css.text_pink}>Expense</div>
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
            id="selectedCategory"
            name="selectedCategory"
            value={formData.selectedCategory}
            disabled={formData.isChecked ? true : false}
            onChange={e =>
              setFormData({
                ...formData,
                selectedCategory: e.target.value,
              })
            }
          >
            {categories.map(option => (
              <MenuItem key={`${option}.option`} value={option}>
                {option}
              </MenuItem>
            ))}
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
                className={css.input}
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
                    height: 32,
                    textAlign: 'left',
                    paddingTop: 0,
                    paddingLeft: '0',
                  },
                }}
                fullWidth
                input={true}
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
                value={formData.dateValue}
                onChange={date => handleDateChange(date)}
                renderInput={props => (
                  <TextField
                    {...props}
                    variant="standard"
                    id="dateValue"
                    name="dateValue"
                    fullWidth
                    onChange={e => {
                      const inputDate = e.target.value;
                      setFormData({
                        ...formData,
                        dateInput: inputDate,
                      });
                      if (inputDate === '') {
                        setErrors(prevErrors => ({ ...prevErrors, date: 'Date is required' }));
                      } else {
                        setErrors(prevErrors => ({ ...prevErrors, date: '' }));
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
                              viewBox="0 0 100% 4"
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
                style={{
                  paddingBottom: 0,
                  textAlign: 'left',
                  paddingInline: '15px',
                  paddingTop: 0,
                }}
                multiline
                rows={Math.max(1, formData.comment.split(' ').length / 4)}
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
              disabled={!isFormValid}
              onClick={isFormValid ? handleAddTransaction : null}
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

export default ModalAddTransaction;
