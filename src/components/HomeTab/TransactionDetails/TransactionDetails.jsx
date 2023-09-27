import { useDispatch } from 'react-redux';
import EditButton from '../../buttons/EditButton/EditButton';
import css from './TransactionDetails.module.css';

const TransactionDetails = (/*{ id, date, type, category, comment, sum }*/) => {
  const props = {
    id: 212,
    date: '22.07.2023',
    type: 'Income',
    category: 'asdfg',
    comment: 'so many expances',
    sum: 12345,
  };
  const { id, date, type, category, comment, sum } = props;

  const isIncome = () => (type === 'Income' ? true : false);

  const listClassName = `${css.transactionDetailsList} ${
    isIncome() ? css.incomeBorder : css.expanseBorder
  }`;
  const textClassName = `${css.itemValue} ${isIncome() ? css.incomeText : css.expanseText}`;

  const typeOperator = type => {
    return type === 'Income' ? '+' : '-';
  };

  const handleEdit = ev => {
    ev.preventDefault;
    //TODO
  };

  return (
    <ul className={listClassName}>
      <li key={`${id}date`} className={css.transactionDetailsItem}>
        <p className={css.itemType}>Date</p>
        <p className={css.itemValue}>{date}</p>
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
        <p className={css.itemValue}>{comment}</p>
      </li>
      <li key={`${id}sum`} className={css.transactionDetailsItem}>
        <p className={css.itemType}>Sum</p>
        <p className={textClassName}>{sum}</p>
      </li>
      <li key={`$[id]operations`} className={css.transactionDetailsItem}>
        <div>DeleteBtn</div>
        <EditButton onClick={handleEdit} />
      </li>
    </ul>
  );
};

export default TransactionDetails;
