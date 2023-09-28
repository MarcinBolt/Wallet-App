import React, { useEffect, useState } from 'react';
import {
  Switch,
  FormControlLabel,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Datetime from 'react-datetime'; // bedzie potrzebne , probowalem juz, - robilem wykorzytsujac biblioteke datetime ustawienie bieżacej daty ale raz dzialalo raz nie dzialalo (nie wiem czemu) w dodatku uzycie biblioteki zakrywalo iconę kalendarza . ,
import 'react-datetime/css/react-datetime.css';
import css from './ModalAddTransaction.module.css';
import plusbtn from '../../assets/icons/plusbtn.svg';
import minusbtn from '../../assets/icons/minusbtn.svg';
import vectorIcon from '../../assets/icons/vector.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addTransaction } from '../../redux/transactions/transactions.operations';
import { updateIsModalAddTransactionOpen } from '../../redux/global/global.slice';
import CustomButton from '../CustomButton/CustomButton';

const ModalAddTransaction = ({ closeModal }) => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  //funkcja obslugujaca dodawanie transakcji , próbuje wykonac operację addTransaction za pomocą dispatch.  przekazuje dane z formularza transakcji. Jesli zakonczy sie sukcesem ma zostac wywolana akcja Redux updateIsModalAddTransactionOpen(false) i nastepuje zamkniecie modala
  const handleAddTransaction = async (formData, dispatch) => {
    try {
      const response = await dispatch(
        addTransaction({
          date: formData.dateValue,
          year: formData.year,
          month: formData.month,
          type: formData.type,
          category: formData.selectedCategory,
          comment: formData.comment,
          sum: formData.amount,
        }),
      );

      if (addTransaction.fulfilled.match(response)) {
        dispatch(updateIsModalAddTransactionOpen(false));
      } else {
      }
    } catch (error) {}
  };

  // daje dostep do funkcji dispatch Redux,
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);

  const [formData, setFormData] = useState({
    isChecked: false,
    dateValue: new Date(),
    selectedCategory: 'Main expenses',
    comment: '',
    amount: '',
  });

  let extraMargin = formData.isChecked ? '0' : '20px';

  const switchStyles = {
    width: '44px',
    marginLeft: extraMargin,
  };

  const iconStyles = {};

  //useSelector  ma byc uzyte do pobierania danych z Redux Store w tym kategorie
  const categories = useSelector(state => state.categories);
  const categoriesOptions = categories
    ? Object.values(categories)
        .filter(({ name }) => name !== 'Income')
        .map(({ id, name }) => ({
          value: id,
          label: name,
        }))
    : [];

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

  //funkcja jest uzywana do aktualizacji daty na podstawie wybranej daty, [BUG] - problem : kalendarz da sie ywbrac date ale nie zapisuje sie w formularzu wybrana
  const handleDateChange = dateString => {
    const selectedDate = new Date(dateString);
    setFormData({
      ...formData,
      dateValue: selectedDate,
    });
  };

  return (
    <div>
      <div className={css.backdrop} onClick={closeModal}></div>
      <div className={css.overlay}>
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
          <div>
            <FormControl className={css.selectContainer}>
              <Select
                sx={{
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 0,
                    borderBottom: 1,
                    borderRadius: 0,
                    borderColor: 'rgb(150, 150, 150)',
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
                {categoriesOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}

        <div>
          <Formik
            initialValues={formData}
            validationSchema={Yup.object({
              amount: Yup.number().required('Required').positive('Must be a positive number'),
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
                    id="amount"
                    name="amount"
                    placeholder="0.00"
                    className={css.input}
                  />
                </div>
                <div className={css.inputWrapper}>
                  {/* Pole daty */}
                  <Field
                    inputProps={{
                      style: {
                        height: 36,
                        padding: 0,
                        
                      },
                    }}
                    as={TextField}
                    type="date"
                    id="dateValue"
                    variant="standard"
                    name="dateValue"
                    fullWidth
                    // value={formData.dateValue}//
                    onChange={e => {
                      handleDateChange(e.target.value);
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
                    className={css.textarea}
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
              onClick={closeModal}
            ></CustomButton>
            <CustomButton
              type="button"
              color="secondary"
              content="Cancel"
              onClick={'#'}
            ></CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
