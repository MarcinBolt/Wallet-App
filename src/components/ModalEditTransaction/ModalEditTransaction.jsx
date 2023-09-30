import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import Datetime from 'react-datetime';
import CustomButton from '../CustomButton/CustomButton';
import 'react-datetime/css/react-datetime.css';
import css from './ModalEditTransaction.module.css';

export const MainButton = ({ type, text, className }) => (
  <button className={className} type={type}>
    {text}
  </button>
);

const ModalEditTransaction = ({ closeModal }) => {
  // Przykładowe dane
  const initialData = {
    isExpense: true,
    amount: '100.00',
    selectedCategory: 'Groceries',
    comment: 'Example comment',
    dateValue: new Date(),
  };
  const [isExpense, setIsExpense] = useState(initialData.isExpense);
  const [amount, setAmount] = useState(initialData.amount);
  const [selectedCategory, setSelectedCategory] = useState(initialData.selectedCategory);
  const [comment, setComment] = useState(initialData.comment);
  const [dateValue, setDateValue] = useState(initialData.dateValue);

  // Dostęp do funkcji z Redux, wykorzystanie hooka useDispatch
  const dispatch = useDispatch();

  // Funkcja obsługuje wysyłanie zmienionych danych do redux i informuje o błędzie lub sukcesie z wykorzystaniem Toast
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        updateTransactionById({
          id: 'exampleTransactionId', // ID przykładowej transakcji
          date: dateValue.toISOString(),
          category: isExpense ? selectedCategory : 'Income',
          comment: comment,
          sum: parseFloat(amount),
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

    const [formData, setFormData] = useState({
      isChecked: false,
      dateValue: new Date(),
      selectedCategory: 'Main expenses',
      comment: '',
      amount: '',
      dateinput: '',
    });
  
  return (
    <div>
      <div className={css.backdrop} onClick={closeModal}></div>
      <div className={`${css.overlay} edit-modal`}>
        <h1>Edit transaction</h1>
<div className={css.switch}>
          <div className={formData.isChecked ? css.text_green : css.text_defaultLeft}>Income</div>
            /
        
          {/* <button
            className={`${css.toggleButton} ${isExpense && css.active}`}
            onClick={() => setIsExpense(true)}
          >
            Expense
          </button> */}
           <div className={formData.isChecked ? css.text_defaultRight : css.text_pink}>Expense</div>
        </div>
        
        
        <div>
          <Formik initialValues={{ amount, dateValue, comment }} onSubmit={handleSubmit}>
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

              {isExpense && (
                <div>
                  {/* Statyczne opcje dla kategorii wydatków */}
                  <select
                    id="category"
                    name="category"
                    value={selectedCategory}
                    onChange={e => {
                      setSelectedCategory(e.target.value);
                    }}
                  >
                    <option value="Groceries">Groceries</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    {/* Dodaj inne opcje kategorii wydatków */}
                  </select>
                </div>
              )}
              <Field
                as={Datetime}
                dateFormat="DD-MM-YY"
                timeFormat={false}
                value={dateValue}
                className={css.datetime}
                onChange={newDate => {
                  setDateValue(newDate);
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
              <CustomButton type="button" color="primary" content="Save" className={`${css.logo_btn} ${css.main_btn}`}>
                Save
              </CustomButton>
            </Form>
          </Formik>
          <CustomButton type="button"  color="secondary" content="cancel" className={css.logo_btn} onClick={closeModal}>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ModalEditTransaction;
