import { useState } from 'react';
import {
  selectTransactionsFilterMonth,
  selectTransactionsFilterYear,
} from '../../../redux/selectors';
import css from './StatsSelectList.module.css';

const StatsSelectList = ({ onChange }) => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedMonth, setSelectedMonth] = useState('September');

  const handleMonthChange = e => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
    onChange(selectedMonth, selectedYear);
  };

  const handleYearChange = e => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear);
    onChange(selectedMonth, selectedYear);
  };

  return (
    <div className={css.selectContainer}>
      <label htmlFor="month"></label>
      <select
        name="month"
        id="monthSelect"
        className={css.select}
        onChange={handleMonthChange}
        value={selectedMonth}
      >
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>

      <label htmlFor="year"></label>
      <select
        name="year"
        id="yearSelect"
        className={css.select}
        onChange={handleYearChange}
        value={selectedYear}
      >
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>
    </div>
  );
};

export default StatsSelectList;
