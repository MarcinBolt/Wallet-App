import Chart from './Chart/Chart';
import StatsSelectList from './StatsSelectList/StatsSelectList';
import StatsSummary from './StatsSummary/StatsSummary';
import StatsTable from './StatsTable/StatsTable';
import css from './Statistics.module.css';
import TitleComponent from '../TitleComponent/Title.Component.jsx';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTransactions,
  selectTransactionsIsLoading,
  selectTransactionsError,
  selectTransactionsFilterYear,
  selectTransactionsFilterMonth,
} from '../../redux/selectors.js';
import { fetchTransactions } from '../../redux/transactions/transactions.operations.js';
import transactions from './StatsTable/transactions';
import transactionsAll from './StatsTable/transactions';

const Statistics = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTransactions());
  // }, [dispatch]);
  // useEffect(() => {
  //   const fetchTransactionsBeforeComponentMount = async () => {
  //     try {
  //       const response = await dispatch(fetchTransactions());
  //       const transactionsAll = response.payload.transactions;
  //       console.log(transactionsAll);
  //       getUserFinancesStatsFromTransactions(
  //         filterTransactionsByYearAndMonth(transactionsAll, selectedYear, selectedMonth),
  //       );
  //     } catch (e) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchTransactionsBeforeComponentMount();
  // }, []);
  const transactions = transactionsAll;
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  //**** tymaczas, dopóki nie ma HomeTab */
  // const transactions = useSelector(selectTransactions);
  //console.log(transactions);
  // const isTransactionsLoading = useSelector(selectTransactionsIsLoading);
  // const isTransactionsError = useSelector(selectTransactionsError);
  // const balance = useSelector(selectTransactionsBalance);
  // const incomesSum = useSelector(selectTransactionsIncomesSum);
  // const expansesSum = useSelector(selectTransactionsExpanseSum);
  const actualYear = useSelector(selectTransactionsFilterYear);
  const actualMonth = useSelector(selectTransactionsFilterMonth);
  // console.log(transactions);
  // console.log(actualYear);
  // console.log(actualMonth);

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
    { name: 'Main expanses', sum: 0 },
    { name: `Products`, sum: 0 },
    { name: `Car`, sum: 0 },
    { name: 'Self care', sum: 0 },
    { name: 'Child care', sum: 0 },
    { name: 'Household products', sum: 0 },
    { name: `Education`, sum: 0 },
    { name: `Leisure`, sum: 0 },
    { name: 'Other expenses', sum: 0 },
  ]);

  const [incomesSum, setIncomesSum] = useState(0);
  const [expensesSum, setExpensesSum] = useState(0);
  const [monthBalance, setMonthBalance] = useState(0);

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
    [...transactions].filter(t => t.year === year && t.month === month);

  const refreshSums = transactions => {
    setMonthBalance(0);
    setExpensesSum(0);
    setIncomesSum(0);
    setCategoriesSums([
      { name: 'Main expanses', sum: 0 },
      { name: `Products`, sum: 0 },
      { name: `Car`, sum: 0 },
      { name: 'Self care', sum: 0 },
      { name: 'Child care', sum: 0 },
      { name: 'Household products', sum: 0 },
      { name: `Education`, sum: 0 },
      { name: `Leisure`, sum: 0 },
      { name: 'Entertainment', sum: 0 },
      { name: 'Other expenses', sum: 0 },
    ]);
    console.log(transactions);
    const incomes = [...transactions]
      .filter(t => t.type === 'Income')
      .reduce((acc, e) => acc + e.sum, 0);
    console.log('incomes:', incomes);
    setIncomesSum(incomes);
    if ([...transactions].filter(t => t.type !== 'Income').length > 0) {
      const expenses = [...transactions].filter(t => t.type !== 'Income');

      const expeSum = [...expenses].reduce((acc, e) => acc + e.sum, 0);
      const expByCategories = [...expenses].forEach(t => {
        const categoryName = t.category;
        const amount = t.sum;
        const updatedCategories = [...categoriesSums];
        const categoryIndex = updatedCategories.findIndex(
          category => category.name === categoryName,
        );
        if (categoryIndex !== -1) {
          updatedCategories[categoryIndex].sum += amount;
        }
      });
      console.log('expSum:', expeSum);
      const newBalance = incomes - expeSum;
      setExpensesSum(expeSum);
      setMonthBalance(newBalance);
      setCategoriesSums(expByCategories);
    }
    console.log(`balance:`, monthBalance);
    console.log(`categoriesSums:`, categoriesSums);
    console.log(`expenseeSum:`, expensesSum);
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
    console.log(`newFilterTransactions:`, newFilterTransactions);
    setFilteredTransactions(newFilterTransactions);
    console.log('categoriesSums before update:', categoriesSums);
    refreshSums(newFilterTransactions);
    console.log('categoriesSums after update:', categoriesSums);
  }, [transactions, selectedFilter.year, selectedFilter.month]);

  const handleFilterChange = ev => {
    ev.preventValue;
    console.log('selctedfiler przed wyborem:', selectedFilter);
    console.log('transactions:', transactions);
    const { name, value } = ev.target;
    setSelectedFilter(
      prevSelectedFilter => (prevSelectedFilter = { ...selectedFilter, [name]: value }),
    );
    console.log('selctedfiler po wyborze:', selectedFilter);
  };

  // const [filteredTransactions, setFilteredTransactions] = useState([]);
  // const [incomesSum, setIncomesSum] = useState(0);
  // const [expansesSum, setExpanseSum] = useState(0);
  // const [balance, setBalance] = useState(0);
  // const [categoriesIncomesSums, setCategoriesIncomesSums] = useState({});

  // const filterTransactionsByYearAndMonth = (transactions, year, month) => {
  // console.log(`year: ${year}`);
  // console.log(`month: ${month}`);
  // console.log(`transactionsAll: ${transactionsAll}`);

  // const getUserFinancesStatsFromTransactions = async transactions => {
  //   let actualBalance = 0;
  //   let totalIncome = 0;
  //   let totalExpanse = 0;
  //   let categoriesSums = {};
  //   transactions.forEach(t => {
  //     const category = t.category;
  //     const sum = parseFloat(t.sum);
  //     if (t.type === 'Income') {
  //       if (!categoriesSums[category]) {
  //         categoriesSums[category] = sum;
  //         totalIncome += sum;
  //       } else {
  //         categoriesSums[category] += sum;
  //         totalIncome += sum;
  //       }
  //     } else {
  //       totalExpanse += sum;
  //     }

  //     actualBalance = totalIncome - totalExpanse;

  //     setBalance(actualBalance.toFixed(2));

  //     setIncomesSum(totalIncome.toFixed(2));
  //     setExpanseSum(totalExpanse.toFixed(2));
  //     setCategoriesIncomesSums({ ...categoriesSums });
  // ! Nie ustawia stanów, zanim elementy się załadją w DOM...
  //   });

  //   console.log(`categoriesSums, actualBalance, totalIncome:`);
  //   console.log(categoriesSums);
  //   console.log(actualBalance);
  //   console.log(totalIncome);

  //   console.log(`after set categoriesIncomesSums:`);
  //   console.log({ categoriesIncomesSums }); // tu na początu jest undefined, a potem pokazuje się tablica w stanie...
  // };

  // useEffect(() => {
  //   // dispatch(fetchTransactions());
  //   filterTransactionsByYearAndMonth(selectedYear, selectedMonth);
  //   getUserFinancesStatsFromTransactions(filteredTransactions);
  // }, [selectedYear, selectedMonth]);

  return (
    <>
      {/* {isTransactionsLoading && isTransactionsError && ( */}
      {/* {!isTransactionsLoading && ( */}
      <div className={css.wrapper}>
        <div className={css.container}>
          <TitleComponent text="Statistics" />
          <div className={css.chart}>
            <Chart categoriesSums={categoriesSums} balance={monthBalance} />
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
          {/* <StatsSelectList /> */}
          <StatsTable /*categoriesSums={categoriesIncomesSums}*/ />
          {/* <StatsTable /> */}
          <div className={css.statisticsSummary}>
            <StatsSummary
            // incomesSum={incomesSum}
            // expansesSum={expansesSum}
            />
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Statistics;
