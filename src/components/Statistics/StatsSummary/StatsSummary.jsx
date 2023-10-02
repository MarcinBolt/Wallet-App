import css from './StatsSummary.module.css';

// const StatsSummary = (incomesSum, expansesSum) => {
const StatsSummary = ({ expenses, incomes }) => {
  return (
    <>
      <div className={css.summaryContainer}>
        <p className={css.statsSummary}>Expenses:</p>
        {/* <p className={css.expenses}>{expansesSum}</p> */}
        <p className={css.expenses}>{expenses}</p>
      </div>
      <div className={css.summaryContainer}>
        <p className={css.statsSummary}>Income:</p>
        {/* <p className={css.income}>{incomesSum}</p> */}
        <p className={css.income}>{incomes}</p>
      </div>
    </>
  );
};

export default StatsSummary;
