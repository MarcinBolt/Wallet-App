import formatMoney from '../../../utils/formatMoney';
import css from './StatsSummary.module.css';

// const StatsSummary = (incomesSum, expansesSum) => {
const StatsSummary = ({ expenses, incomes }) => {
  return (
    <>
      <div className={css.summaryContainer}>
        <p className={css.statsSummary}>Expanses:</p>
        {/* <p className={css.expenses}>{expansesSum}</p> */}
        <p className={css.expenses}>{formatMoney(expenses / 100)}</p>
      </div>
      <div className={css.summaryContainer}>
        <p className={css.statsSummary}>Income:</p>
        {/* <p className={css.income}>{incomesSum}</p> */}
        <p className={css.income}>{formatMoney(incomes / 100)}</p>
      </div>
    </>
  );
};

export default StatsSummary;
