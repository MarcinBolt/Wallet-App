import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik, Form, Field } from 'formik';
import './ModalAddTransaction.css';
import 'react-datetime/css/react-datetime.css';
import { selectCategories } from '../../redux/selectors';
import { addTransaction, fetchCategories } from '../../redux/transactions/operations';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

const ModalAddTransaction = ({ closeModal }) => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    isChecked: false,
    dateValue: new Date(),
    selectedCategory: 'Main expenses',
    comment: '-',
    amount: '',
  });

  const categories = useSelector(selectCategories);

  const categoriesOptions = Object.values(categories)
    .filter(({ name }) => name !== 'Income')
    .map(({ id, name }) => ({
      value: id,
      label: name,
    }));

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      addTransaction({
        isExpense: !formData.isChecked,
        amount: Number(formData.amount),
        date: formData.dateValue,
        category: formData.isChecked ? 'Income' : formData.selectedCategory,
        comment: formData.comment,
      }),
    );

    form.reset();
  };

  return (
    <div>
      <div className="backdrop" onClick={closeModal}></div>
      <div className="overlay">
        <h1>Add transaction</h1>

        <div className="switch">
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isChecked}
                onChange={() =>
                  setFormData({
                    ...formData,
                    isChecked: !formData.isChecked,
                  })
                }
                name="transaction-type"
              />
            }
            label={formData.isChecked ? 'Income' : 'Expense'}
          />
        </div>
        <div>
          <Formik initialValues={formData}>
            <Form onSubmit={e => handleSubmit(e)} className="form">
              <Field
                as={TextField} // Zamiast TextInput użyto TextField
                type="text"
                id="amount"
                name="amount"
                placeholder="0.0"
                value={formData.amount}
                className="input"
                onChange={e => {
                  const input = e.target.value;
                  const regex = /^(\d+)?(\.\d{0,2})?$/;

                  if (regex.test(input)) {
                    setFormData({
                      ...formData,
                      amount: input,
                    });
                  }
                }}
              />
              {formData.isChecked ? null : (
                <div>
                  <FormControl style={{ width: '100%' }}>
                    <Select
                      id="category"
                      name="category"
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
              <Field
                as={Datetime}
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
                value={formData.dateValue}
                className="datetime"
                onChange={newDate =>
                  setFormData({
                    ...formData,
                    dateValue: newDate,
                  })
                }
              />
              <label className="label">
                <Field
                  as="textarea"
                  placeholder="Comment"
                  className="textarea"
                  rows={3}
                  onChange={comment =>
                    setFormData({
                      ...formData,
                      comment: comment.target.value,
                    })
                  }
                />
              </label>
              <Button type="submit" fullWidth variant="contained" className="logo_btn">
                ADD
              </Button>
            </Form>
          </Formik>
          <Button onClick={closeModal} fullWidth variant="outlined" className="main_btn">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

ModalAddTransaction.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalAddTransaction;
