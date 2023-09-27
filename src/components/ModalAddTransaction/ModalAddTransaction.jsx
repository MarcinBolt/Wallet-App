import React, { useEffect, useState } from 'react';
import {
  Switch,
  FormControlLabel,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// import { addTransaction } from '../../redux/transactions/transactions.operations';
import css from './ModalAddTransaction.module.css';
import plusbtn from '../../assets/icons/plusbtn.svg';
import minusbtn from '../../assets/icons/minusbtn.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const switchStyles = {
  width: '44px',
};

const iconStyles = {};

const ModalAddTransaction = ({ closeModal }) => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(categories());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    isChecked: false,
    dateValue: new Date(),
    selectedCategory: 'Main expenses',
    comment: '',
    amount: '',
  });

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
                    '& .Mui-checked': {
                      transform: 'translateX(25px)',
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
                    // "MuiSwitch-track": {
                    //  color: "purple",
                    //  backgroundColor: "purple",
                    //  display: 'none'
                    // }
                  }}
                  style={switchStyles}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      isChecked: !formData.isChecked,
                    })
                  }
                  name="transaction-type"
                  icon={<img src={plusbtn} alt="plus Icon" style={iconStyles} />}
                  checkedIcon={<img src={minusbtn} alt="minus Icon" style={iconStyles} />}
                />
              }
              // label={formData.isChecked ? 'Expense' : 'Income'}
            />
          </ThemeProvider>
          <div className={formData.isChecked ? css.text_defaultRight : css.text_pink}>Expense</div>
        </div>
        {formData.isChecked ? null : (
          <div>
            <FormControl
              // style={{ width: '100%' }}
              className={css.selectContainer}
            >
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
              selectedCategory: Yup.string().required('Required'),
              comment: Yup.string(),
            })}
            // onSubmit={handleSubmit}
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
                    className={css.datetime}
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
                    className={css.textarea}
                    rows={1}
                    name="comment"
                  />
                </div>
              </label>
              <Button type="submit" fullWidth variant="contained" className={css.logo_btn}>
                ADD
              </Button>
            </Form>
          </Formik>
          <Button onClick={closeModal} fullWidth variant="outlined" className={css.main_btn}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
