import EditButton from '../../buttons/EditButton/EditButton';
import css from './TransactionDetails.module.css';

const TransactionDetails = ({ id, date, type, category, comment, sum }) => {
  
  const isIncome = () => (type === 'Income' ? true : false);
  
  const listClassName = `${css.transactionDetailsList} ${
    isIncome() ? css.incomeBorder : css.expanseBorder
  }`;
  const textClassName = `${css.itemValue} ${isIncome() ? css.incomeText : css.expanseText}`;
  
  const typeOperator = type => {
    return type === 'Income' ? '+' : '-';
  };
  
  var unifiedDate = new Date(date);

  // Pobieramy dzień, miesiąc i rok z daty
  var day = unifiedDate.getDate();
  var month = unifiedDate.getMonth() + 1; // Miesiące są indeksowane od 0, więc dodajemy 1
  var year = unifiedDate.getFullYear() % 100; // Pobieramy tylko dwie ostatnie cyfry roku
  
  // Formatujemy datę w formacie "dd.mm.yy"
  var formattedDate = (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + (year < 10 ? '0' : '') + year;

  const handleEdit = ev => {
    ev.preventDefault;
    //TODO
  };
  
  const handleDelete = ev => {
    ev.preventDefault;
    //TODO
  };
  
  return (

    <ul className={listClassName}>
      <li key={`${id}date`} className={css.transactionDetailsItem}>
        <p className={css.itemType}>Date</p>
        <p className={css.itemValue}>{formattedDate}</p>
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

// TODO
// logika edycji i usuwania transakcji
