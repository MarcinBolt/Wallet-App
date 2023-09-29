// import React from 'react';
import css from './ButtonAddTransaction.module.css';
export const ButtonAddTransaction = ({ handleClick }) => {
  return (
    <>
      <button className={css.openModal} onClick={handleClick} />
    </>
  );
};
