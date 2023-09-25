import React, { useEffect, useState } from 'react';
import { Switch, FormControlLabel,FormControl, TextField, Select, MenuItem, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// import { addTransaction } from '../../redux/transactions/transactions.operations'; 
import css from './ModalAddTransaction.module.css';
import plusbtn from '../../assets/icons/plusbtn.svg'
import minusbtn from '../../assets/icons/minusbtn.svg'

const switchStyles = {
  width: '80px', 
  height: '40px', 
};

const iconStyles = {
  width: '44px', 
  height: '44px', 
};

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
    comment: '-',
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

  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //   try {
      
      // await dispatch(
      //   addTransaction({
      //     isExpense: !formData.isChecked,
      //     amount: Number(formData.amount),
      //     date: formData.dateValue,
      //     category: formData.isChecked ? 'Income' : formData.selectedCategory,
      //     comment: formData.comment,
      //   }),
      // );

  //     toast.success('Transaction created successfully');
  //     closeModal(); 
  //     resetForm(); 
  //   } catch (error) {
  //     toast.error('Failed to create transaction');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <div>
      <div className={css.backdrop} onClick={closeModal}></div>
      <div className={css.overlay}>
        <h1>Add transaction</h1>

        <div className={css.switch}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isChecked}
                onChange={() =>
                  setFormData({
                    ...formData,
                    isChecked: !formData.isChecked,
                  })
                }
                name="transaction-type"
                style={switchStyles}
                icon={<img src={plusbtn} alt="plus Icon" style={iconStyles} />}
                checkedIcon={<img src={minusbtn} alt="minus Icon" style={iconStyles} />}
              />
            }
            label={formData.isChecked ? 'Expense' : 'Income'}
          />
        </div>
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
              <Field
                as={TextField}
                type="standard-basic"
                variant="standard"
                id="amount"
                name="amount"
                placeholder="0.0"
                className={css.input}
              />
              <ErrorMessage name="amount" component="div" />
              
              <Field
                as={TextField}
                type="date"
                id="dateValue"
                name="dateValue"
                className={css.datetime}
              />
              <ErrorMessage name="dateValue" component="div" />

              {formData.isChecked ? null : (
                <div>
                  <FormControl style={{ width: '100%' }}>
                    <Select
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

              {/* <Field
                as={TextField}
                type="date"
                id="dateValue"
                name="dateValue"
                className={css.datetime}
              />
              <ErrorMessage name="dateValue" component="div" /> */}

              <label className="label">
                <Field
                  as="textarea"
                  placeholder="Comment"
                  className={css.textarea}
                  rows={1}
                  name="comment"
                />
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
