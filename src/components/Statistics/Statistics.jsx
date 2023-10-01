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

const Statistics = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);
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

  //**** tymaczas, dopóki nie ma HomeTab */

  const transactions = useSelector(selectTransactions);

  // const isTransactionsLoading = useSelector(selectTransactionsIsLoading);
  // const isTransactionsError = useSelector(selectTransactionsError);
  // const balance = useSelector(selectTransactionsBalance);
  // const incomesSum = useSelector(selectTransactionsIncomesSum);
  // const expansesSum = useSelector(selectTransactionsExpanseSum);
  // const actualYear = useSelector(selectTransactionsFilterYear);
  // const actualMonth = useSelector(selectTransactionsFilterMonth);
  // console.log(transactions);
  // console.log(actualYear);
  // console.log(actualMonth);

  // /******* obsługa filtra **/
  // const [selectedFilter, setSelectedFilter] = useState({
  //   month: actualMonth,
  //   year: actualYear,
  // });

  // const [filterChoice, setFilterChoice] = useState({
  //   months: [],
  //   years: [],
  // });

  // console.log(filterChoice);
  // console.log(selectedFilter);

  // const setFilterChoiceYears = transactions => {
  //   setFilterChoice({
  //     ...filterChoice,
  //     years: [
  //       ...transactions
  //         .map(t => t.year)
  //         .filter((year, index, array) => array.indexOf(year) === index),
  //     ],
  //   });
  // };

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
  //   setFilterChoiceMonths(transactions, actualYear);
  // }, [transactions, actualYear]);
  // useEffect(() => {
  //   setFilterChoiceYears(transactions);
  // }, [transactions]);

  // const handleFilterChange = ev => {
  //   ev.preventValue;
  //   const { name, value } = ev.target;
  //   setFilter({ ...selectedFilter, [name]: value });
  //   if (name === 'year') {
  //     setFilterChoiceMonths(transactions, value);
  //   }
  // };

  // const [filteredTransactions, setFilteredTransactions] = useState([]);
  // const [incomesSum, setIncomesSum] = useState(0);
  // const [expansesSum, setExpanseSum] = useState(0);
  // const [balance, setBalance] = useState(0);
  // const [categoriesIncomesSums, setCategoriesIncomesSums] = useState({});

  // const filterTransactionsByYearAndMonth = (transactions, year, month) => {
  // console.log(`year: ${year}`);
  // console.log(`month: ${month}`);
  // console.log(`transactionsAll: ${transactionsAll}`);

  // const filteredTransactions = transactions.filter(t => t.year === year && t.month === month);
  // console.log(filteredTransactions);
  // return filteredTransactions;
  // setFilteredTransactions(
  //   transactionsAll.filter(t => t.year === year && t.month === month),
  //   );
  // };

  // let categoriesSums = {
  //   'Main expanses': 0,
  //   Products: 0,
  //   Car: 0,
  //   'Self care': 0,
  //   'Child care': 0,
  //   'Household products': 0,
  //   Education: 0,
  //   Leisure: 0,
  //   'Other expenses': 0,
  // };
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
              <Chart /*categorySums={{ ...categoriesIncomesSums }} balance={balance}*/ />
            </div>
          </div>
          <div className={css.statisticsContainer}>
            {/* <StatsSelectList
              yearFilter={selectedFilter.year}
              monthFilter={selectedFilter.month}
              months={filterChoice.months}
              years={filterChoice.years}
              handleFilter={handleFilterChange}
            /> */}
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
