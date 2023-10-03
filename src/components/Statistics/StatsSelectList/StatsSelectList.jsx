import css from './StatsSelectList.module.css';

const StatsSelectList = ({ yearFilter, monthFilter, months, years, handleFilter }) => {
  return (
    <div className={css.selectContainer}>
      <label htmlFor="month"></label>
      <select
        name="month"
        id="monthSelect"
        className={css.select}
        onChange={handleFilter}
        value={monthFilter}
      >
        {months.map(m => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <label htmlFor="year"></label>
      <select
        name="year"
        id="yearSelect"
        className={css.select}
        onChange={handleFilter}
        value={yearFilter}
      >
        {years.map(y => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatsSelectList;
