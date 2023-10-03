import Chart from './Chart/Chart';
import StatsSelectList from './StatsSelectList/StatsSelectList';
import StatsSummary from './StatsSummary/StatsSummary';
import StatsTable from './StatsTable/StatsTable';
import css from './Statistics.module.css';
import TitleComponent from '../TitleComponent/Title.Component.jsx';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectTransactions,
  selectTransactionsIsLoading,
  selectTransactionsFilterYear,
  selectTransactionsFilterMonth,
} from '../../redux/selectors.js';

const Statistics = () => {
  // const dispatch = useDispatch();

  const transactions = useSelector(selectTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const isTransactionsLoading = useSelector(selectTransactionsIsLoading);

  const actualYear = useSelector(selectTransactionsFilterYear);
  const actualMonth = useSelector(selectTransactionsFilterMonth);

  /******* obsługa filtra **/
  const [selectedFilter, setSelectedFilter] = useState({
    month: actualMonth,
    year: actualYear,
  });

  const [filterChoice, setFilterChoice] = useState({
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    years: [],
  });

  const [categoriesSums, setCategoriesSums] = useState([
    { color: '#FED057', name: 'Main expenses', sum: 0 },
    { color: '#FFD8D0', name: `Products`, sum: 0 },
    { color: '#FD9498', name: `Car`, sum: 0 },
    { color: '#C5BAFF', name: 'Self care', sum: 0 },
    { color: '#6E78E8', name: 'Child care', sum: 0 },
    { color: '#4A56E2', name: 'Household products', sum: 0 },
    { color: '#81E1FF', name: `Education`, sum: 0 },
    { color: '#24CCA7', name: `Leisure`, sum: 0 },
    { color: '#00AD84', name: 'Entertainment', sum: 0 },
    { color: '#008263', name: 'Other expenses', sum: 0 },
  ]);

  const [incomesSum, setIncomesSum] = useState(0);
  const [expensesSum, setExpensesSum] = useState(0);
  const [balance, setBalance] = useState(0);

  const setFilterChoiceYears = transactions => {
    setFilterChoice(
      prevFilterChoice =>
        (prevFilterChoice = {
          ...filterChoice,
          years: [
            ...transactions
              .map(t => t.year)
              .filter((year, index, array) => array.indexOf(year) === index),
          ],
        }),
    );
  };

  const refreshTransactions = (transactions, year, month) =>
    [...transactions].filter(t => t.year == year && t.month == month);

  const refreshBalance = transactions => {
    const inc = [...transactions]
      .filter(t => t.type === 'Income')
      .reduce((acc, t) => {
        return (acc * 100 + t.sum * 100) / 100;
      }, 0);
    const exp = [...transactions]
      .filter(t => t.type === 'Expense')
      .reduce((acc, e) => {
        return (acc * 100 + e.sum * 100) / 100;
      }, 0);
    const bal = (inc * 100 - exp * 100) / 100;
    setIncomesSum(prev => (prev = inc));

    setExpensesSum(prev => (prev = exp));

    setBalance(prev => (prev = bal));
  };

  const transactionsReducer = (transactions, category) => {
    return [...transactions]
      .filter(t => t.category === category)
      .reduce((acc, t) => {
        return (acc * 100 + t.sum * 100) / 100;
      }, 0);
  };

  const refreshCategoriesSum = transactions => {
    const newCategoriesSums = [
      { color: '#FED057', name: 'Main expenses', sum: 0 },
      { color: '#FFD8D0', name: `Products`, sum: 0 },
      { color: '#FD9498', name: `Car`, sum: 0 },
      { color: '#C5BAFF', name: 'Self care', sum: 0 },
      { color: '#6E78E8', name: 'Child care', sum: 0 },
      { color: '#4A56E2', name: 'Household products', sum: 0 },
      { color: '#81E1FF', name: `Education`, sum: 0 },
      { color: '#24CCA7', name: `Leisure`, sum: 0 },
      { color: '#00AD84', name: 'Entertainment', sum: 0 },
      { color: '#008263', name: 'Other expenses', sum: 0 },
    ];
    const refreshedCategoriesSums = newCategoriesSums.map(cS => ({
      ...cS,
      sum: transactionsReducer(transactions, cS.name),
    }));
    setCategoriesSums(prev => (prev = refreshedCategoriesSums));
  };

  // const setFilterChoiceMonths = (transactions, year) => {
  //   setFilterChoice({
  //     ...filterChoice,
  //     months: [
  //       ...transactions
  //         .filter(t => t.year === year)
  //         .map(t => t.month)
  //         .filter((month, index, array) => array.indexOf(month) === index),
  //     ],
  //   });
  // };

  // useEffect(() => {
  //   setFilterChoiceMonths(transactions, selectedFilter.year);
  // }, [transactions, selectedFilter.year]);

  useEffect(() => {
    setFilterChoiceYears(transactions);
  }, [transactions]);

  useEffect(() => {
    setFilteredTransactions(
      prev => (prev = refreshTransactions(transactions, selectedFilter.year, selectedFilter.month)),
    );
  }, [selectedFilter.year, selectedFilter.month]);

  useEffect(() => {
    refreshCategoriesSum(filteredTransactions);
  }, [filteredTransactions]);

  useEffect(() => {
    refreshBalance(filteredTransactions);
  }, [categoriesSums]);

  const handleFilterChange = ev => {
    const { name, value } = ev.target;
    setSelectedFilter(prev => (prev = { ...selectedFilter, [name]: value }));
  };

  return (
    <>
      {!isTransactionsLoading && (
        <div className={css.wrapper}>
          <div className={css.container}>
            <TitleComponent text="Statistics" />
            <div className={css.chart}>
              <Chart categoriesSums={categoriesSums} balance={balance} />
            </div>
          </div>
          <div className={css.statisticsContainer}>
            <StatsSelectList
              yearFilter={selectedFilter.year}
              monthFilter={selectedFilter.month}
              months={filterChoice.months}
              years={filterChoice.years}
              handleFilter={handleFilterChange}
            />
            <StatsTable categoriesSums={categoriesSums} />
            <div className={css.statisticsSummary}>
              <StatsSummary incomes={incomesSum} expenses={expensesSum} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Statistics;
