import Chart from './Chart/Chart';
import StatsSelectList from './StatsSelectList/StatsSelectList';
import StatsSummary from './StatsSummary/StatsSummary';
import StatsTable from './StatsTable/StatsTable';
import css from './Statistics.module.css';
import TitleComponent from '../TitleComponent/Title.Component.jsx';

const Statistics = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <TitleComponent text='Statistics' />
        <div className={css.chart}>
          <Chart />
        </div>
      </div>
      <div className={css.statisticsContainer}>
        <StatsSelectList />
        <StatsTable />
        <div className={css.statisticsSummary}>
          <StatsSummary />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
