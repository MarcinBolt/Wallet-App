import css from './StatsSummary.module.css';

// const StatsSummary = (incomesSum, expansesSum) => {
const StatsSummary = () => {
  return (
    <>
      <div className={css.summaryContainer}>
        <p className={css.statsSummary}>Expenses:</p>
        {/* <p className={css.expenses}>{expansesSum}</p> */}
        <p className={css.expenses}>56465465</p>
      </div>
      <div className={css.summaryContainer}>
        <p className={css.statsSummary}>Income:</p>
        {/* <p className={css.income}>{incomesSum}</p> */}
        <p className={css.income}>6546546</p>
      </div>
    </>
  );
};

export default StatsSummary;
