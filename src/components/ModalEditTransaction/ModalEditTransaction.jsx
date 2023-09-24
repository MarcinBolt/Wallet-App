import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { editTransaction } from '../../redux/transactions/operations';
import css from './ModalEditTransaction.module.css'; 


export const MainButton = ({ type, onSubmit = null, text, className }) => (
  <button className={className} type={type} onSubmit={onSubmit}>
    {text}
  </button>
);

export const TextInput = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={field.name} className="label">
        {label}
        <input {...field} {...props} autoComplete="off" />
      </label>
    </>
  );
};

const ModalEditTransaction = ({ closeModal, transaction }) => {
  const [isChecked, setIsChecked] = useState(transaction.isExpense);
  const [amount, setAmount] = useState(transaction.amount);
  const [selectedCategory, setSelectedCategory] = useState(transaction.category);
  const [comment, setComment] = useState(transaction.comment);
  const [dateValue, setDateValue] = useState(transaction.date);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    scrollToTop();
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categories());
  }, [dispatch]);

  const formatDate = dateString => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  };

  const initialValues = {
    _id: transaction._id,
    amount: transaction.amount,
    category: transaction.category,
    date: transaction.date,
    comment: transaction.comment,
    isExpense: transaction.isExpense,
  };

  const categories = useSelector(selectCategories);

  const categoriesOptions = Object.values(categories)
    .filter(({ name }) => name !== 'Income')
    .map(({ id, name }) => ({
      value: id,
      label: name,
    }));

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(
        editTransaction({
          _id: transaction._id,
          isExpense: isChecked,
          amount: Number(amount),
          date: dateValue,
          category: isChecked ? selectedCategory : 'Income',
          comment: comment,
        }),
      );

      toast.success('Transaction edited successfully');
      closeModal();
      resetForm();
    } catch (error) {
      toast.error('Failed to edit transaction');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className={css.backdrop} onClick={closeModal}></div>
      <div className={`${css.overlay} edit-modal`}>
        <h1>Edit transaction</h1>

        <div className={css.switch}>
          <label htmlFor="check1" className={`toggle-label ${!isChecked ? 'income' : 'expense'}`}>
            Expense
          </label>
          <input
            type="checkbox"
            id="check1"
            className="toggle"
            name="transaction-type"
            defaultChecked={!isChecked}
            onClick={() => {
              setIsChecked(!isChecked);
              setSelectedCategory('Main Expense');
            }}
          />
          <label htmlFor="check1" className={`toggle-label ${!isChecked ? 'expense' : 'income'}`}>
            Income
          </label>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={editValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={css.form}>
              <Field
                as={TextInput}
                type="text"
                id="amount"
                name="amount"
                value={amount}
                className={css.input}
                onChange={e => {
                  const input = e.target.value;
                  const regex = /^(\d+)?(\.\d{0,2})?$/;

                  if (regex.test(input)) {
                    setAmount(input);
                  }
                }}
              />
              <ErrorMessage name="amount" component="div" />

              {isChecked ? (
                <div>
                  <Select
                    options={categoriesOptions}
                    placeholder="Main expenses"
                    id="category"
                    name="category"
                    onChange={option => {
                      setSelectedCategory(option.label);
                    }}
                    isSearchable={false}
                    defaultValue={initialValues.category}
                  />
                </div>
              ) : null}
              <Field
                as={Datetime}
                id="date"
                name="date"
                dateFormat="DD-MM-YY"
                timeFormat={false}
                value={formatDate(dateValue)}
                className={css.datetime}
                onChange={newDate => {
                  const isoDate = new Date(newDate._d).toISOString();
                  setDateValue(isoDate);
                }}
              />
              <ErrorMessage name="date" component="div" />

              <label className="label">
                <Field
                  as="textarea"
                  placeholder="Comment"
                  className={css.textarea}
                  rows={3}
                  name="comment"
                  value={comment}
                  onChange={e => {
                    setComment(e.target.value);
                  }}
                />
              </label>
              <MainButton type="submit" text="CHANGE" className={css.logo_btn} />
            </Form>
          </Formik>
          <button onClick={closeModal} className={css.main_btn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditTransaction;
