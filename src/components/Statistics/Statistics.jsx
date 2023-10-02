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
    { color: '#FED057', name: 'Main expanses', sum: 0 },
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

  const refreshSums = transactions => {
    setExpensesSum(prev => (prev = 0));
    setIncomesSum(prev => (prev = 0));
    setCategoriesSums(
      prev =>
        (prev = [
          { color: '#FED057', name: 'Main expanses', sum: 0 },
          { color: '#FFD8D0', name: `Products`, sum: 0 },
          { color: '#FD9498', name: `Car`, sum: 0 },
          { color: '#C5BAFF', name: 'Self care', sum: 0 },
          { color: '#6E78E8', name: 'Child care', sum: 0 },
          { color: '#4A56E2', name: 'Household products', sum: 0 },
          { color: '#81E1FF', name: `Education`, sum: 0 },
          { color: '#24CCA7', name: `Leisure`, sum: 0 },
          { color: '#00AD84', name: 'Entertainment', sum: 0 },
          { color: '#008263', name: 'Other expenses', sum: 0 },
        ]),
    );

    const incomes = [...transactions]
      .filter(t => t.type === 'Income')
      .reduce((acc, e) => acc + e.sum * 100, 0);

    setIncomesSum(prev => (prev = incomes));
    if ([...transactions].filter(t => t.type !== 'Income').length > 0) {
      const expenses = [...transactions].filter(t => t.type !== 'Income');

      const expeSum = [...expenses].reduce((acc, e) => acc + e.sum * 100, 0);
      const newBalance = (incomes - expeSum);
      setBalance(prev => (prev = newBalance));
      const expByCategories = [...expenses].forEach(t => {
        const categoryName = t.category;
        const amount = t.sum;
        const updatedCategories = [...categoriesSums];
        const categoryIndex = updatedCategories.findIndex(
          category => category.name === categoryName,
        );
        if (categoryIndex !== -1) {
          setCategoriesSums(
            prev => (prev = [...categoriesSums, (categoriesSums[categoryIndex].sum += amount*100)]),
          );
        }
      });

      setExpensesSum(prev => (prev = expeSum));
    }
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
    const newFilterTransactions = refreshTransactions(
      transactions,
      selectedFilter.year,
      selectedFilter.month,
    );
    setFilteredTransactions(prev => (prev = newFilterTransactions));
    refreshSums(newFilterTransactions);
  }, [transactions, selectedFilter.year, selectedFilter.month]);

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
