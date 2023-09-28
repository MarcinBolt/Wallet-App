import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { updateTransactionById } from '../../redux/transactions/operations';
import css from './ModalEditTransaction.module.css';

export const MainButton = ({ type, text, className }) => (
  <button className={className} type={type}>
    {text}
  </button>
);

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

  const initialValues = {
    amount: transaction.amount,
    date: transaction.date,
    comment: transaction.comment,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const date = new Date(dateValue);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      await dispatch(
        updateTransactionById({
          id: transaction._id,
          date: dateValue,
          year: year,
          month: month,
          category: isChecked ? selectedCategory : 'Income',
          comment: comment,
          sum: Number(amount),
        }),
      );

      toast.success('Transaction edited successfully');
      closeModal();
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
          <label htmlFor="check1" className={`toggle-label ${isChecked ? 'income' : 'expense'}`}>
            Income
          </label>
          <input
            type="checkbox"
            id="check1"
            className="toggle"
            name="transaction-type"
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
              setSelectedCategory('Main Expense');
            }}
          />
          <label htmlFor="check1" className={`toggle-label ${isChecked ? 'expense' : 'income'}`}>
            Expense
          </label>
        </div>
        <div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={css.form}>
              <Field
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
                    options={[
                      { value: 'Main Expense', label: 'Main Expense' },
                      // Dodaj inne opcje kategorii wydatków
                    ]}
                    placeholder="Main Expense"
                    id="category"
                    name="category"
                    onChange={option => {
                      setSelectedCategory(option.label);
                    }}
                    isSearchable={false}
                    value={{ value: selectedCategory, label: selectedCategory }}
                  />
                </div>
              ) : null}
              <Field
                as={Datetime}
                dateFormat="DD-MM-YY"
                timeFormat={false}
                value={dateValue}
                className={css.datetime}
                onChange={newDate => {
                  const isoDate = new Date(newDate._d).toISOString();
                  setDateValue(isoDate);
                }}
              />
              <ErrorMessage name="date" component="div" />

              <label className={css.label2}>
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
              <MainButton type="submit" text="Save" className={`${css.logo_btn} ${css.main_btn}`} />
            </Form>
          </Formik>
          <MainButton type="button" text="Cancel" className={css.logo_btn} onClick={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default ModalEditTransaction;
