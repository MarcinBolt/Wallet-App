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
import vectorIcon from '../../assets/icons/vector.svg';
import SelectIcon from '../../assets/icons/select-category.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addTransaction } from '../../redux/transactions/transactions.operations';
import CustomButton from '../CustomButton/CustomButton';
import closeIcon from '../../assets/icons/close.svg';
import Notiflix from 'notiflix';
import { selectTransactionsCategories } from '../../redux/selectors';

const ModalAddTransaction = ({ toggleModal }) => {
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

  /* tymczasowa funkcja - przyjdzie z propsów*/
  // const toggleModal = () => {
  //   console.log('modal do zamknięcia');
  // };

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
    setSelectedDate(date.toDate());
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

  const handleAddTransaction = () => {
    toggleModal();
    const type = formData.isChecked ? 'Income' : 'Expense';
    const category = formData.isChecked ? 'Income' : formData.selectedCategory;
    const year = selectedDate.getFullYear();
    const month = selectedDate.toLocaleString('en-US', { month: 'long' });
    dispatch(
      addTransaction({
        date: selectedDate,
        year: year.toString(),
        month: month,
        type: type,
        category: category,
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
            width: '16px',
            height: '16px',
            border: '0px solid #000',
            transform: 'rotate(90deg)',
          }}
          onClick={toggleModal}
        >
          <img src={closeIcon} alt="Close" />
        </IconButton>
        <h1>Add transaction</h1>

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
                  icon={<img src={plusbtn} alt="plus Icon" style={iconStyles} />}
                  checkedIcon={<img src={minusbtn} alt="minus Icon" style={iconStyles} />}
                />
              }
            />
          </ThemeProvider>
          <div className={formData.isChecked ? css.text_defaultRight : css.text_pink}>Expense</div>
        </div>
        {formData.isChecked ? null : (
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
              id="selectedCategory"
              name="selectedCategory"
              value={formData.selectedCategory}
              onChange={e =>
                setFormData({
                  ...formData,
                  selectedCategory: e.target.value,
                })
              }
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
                      height: 36,
                      width: 181,
                    },
                  }}
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
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => {}}>
                              <img src={vectorIcon} alt="Calendar" className={css.calendarIcon} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <ErrorMessage name="amount" component="div" />
            <ErrorMessage name="dateValue" component="div" />
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
            content="ADD"
            onClick={handleAddTransaction}
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

export default ModalAddTransaction;
