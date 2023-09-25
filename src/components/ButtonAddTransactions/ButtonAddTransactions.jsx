import React from 'react';
import css from './ButtonAddTransactions.module.css';
export const ButtonAddTransactions = ({ handleClick }) => {
  return (
    <>
      <button className={css.openModal} onClick={handleClick} />
    </>
  );
};

//trzeba zaimportowac ten komponent do HomeTab import { ButtonAddTransactions } from '../../components/buttonAddTransactions/buttonAddTransactions'
//cos takiego    <ButtonAddTransactions
//   handleClick={() => {
//     dispatch(openModal('isModalAddTransactionOpen'));
//     const scrollToTop = () => {
//       window.scrollTo(0, 0);
//     };
//     scrollToTop();
//   }}
// />
