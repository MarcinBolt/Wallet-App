import css from './StatsSummary.module.css';

const StatsSummary = (expenses, income) => {
    return (
        <>
            <div className={css.summaryContainer}>
                <p className={css.statsSummary}>Expenses:</p>
                <p className={css.expenses}>0000000.00</p>
            </div>
            <div className={css.summaryContainer}>
                <p className={css.statsSummary}>Income:</p>
                <p className={css.income}> 0000000.00</p>
            </div>
        </>
    )
} 

export default StatsSummary;