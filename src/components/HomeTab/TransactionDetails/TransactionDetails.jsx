import DeleteButton from '../../buttons/DeleteButton/DeleteButton';
import EditButton from '../../buttons/EditButton/EditButton';
import css from './TransactionDetails.module.css';
import formatMoney from '../../../utils/formatMoney';
import React, { memo, useEffect, useState } from 'react';

const TransactionDetails = memo(
  ({ id, date, type, category, comment, sum, handleEditBtn, handleDeleteBtn }) => {
    const isIncome = () => (type === 'Income' ? true : false);
    const listClassName = `${css.transactionDetailsList} ${
      isIncome() ? css.incomeBorder : css.expanseBorder
    }`;
    const textClassName = `${css.itemValue} ${isIncome() ? css.incomeText : css.expanseText}`;
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const typeOperator = type => {
      return type === 'Income' ? '+' : '-';
    };

    const formatDate = date => {
      const dateObject = new Date(date);
      const year = dateObject.getFullYear() % 100;
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      const formattedDate =
        (day < 10 ? '0' : '') +
        day +
        '.' +
        (month < 10 ? '0' : '') +
        month +
        '.' +
        (year < 10 ? '0' : '') +
        year;
      return formattedDate;
    };

    useEffect(() => {
      const handleResize = () => {
        setScreenHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleEditClick = () => {
      if (screenHeight <= 750) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
      handleEditBtn(id);
    };

    return (
      <>
        <ul className={listClassName}>
          <li key={`${id}date`} className={css.transactionDetailsItem}>
            <p className={css.itemType}>Date</p>
            <p className={css.itemValue}>{formatDate(date)}</p>
          </li>
          <li key={`${id}type`} className={css.transactionDetailsItem}>
            <p className={css.itemType}>Type</p>
            <div>
              <p className={css.typeString}>{type}</p>
              <p className={css.typeOperator}>{typeOperator(type)}</p>
            </div>
          </li>
          <li key={`${id}category`} className={css.transactionDetailsItem}>
            <p className={css.itemType}>Category</p>
            <p className={css.itemValue}>{category}</p>
          </li>
          <li key={`${id}comment`} className={css.transactionDetailsItem}>
            <p className={css.itemType}>Comment</p>
            <p className={`${css.itemValue} ${css.comment}`}>{comment}</p>
          </li>
          <li key={`${id}sum`} className={css.transactionDetailsItem}>
            <p className={css.itemType}>Sum</p>
            <p className={textClassName}>{formatMoney(sum)}</p>
          </li>
          <li key={`${id}operations`} className={css.transactionDetailsItem}>
            <DeleteButton id={`${id}.del`} type="button" onClick={() => handleDeleteBtn(id)} />
            <EditButton id={`${id}.edit`} type="button" onClick={() => handleEditClick(id)} />
          </li>
        </ul>
      </>
    );
  },
);

export default TransactionDetails;
