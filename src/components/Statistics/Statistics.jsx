import Chart from "./Chart/Chart";

const Statistics = () => {
  return (
    <div className={css.statisticsContainer}>
      <div>
        <StatsHeader/>
        <Chart />
      </div>
      <div>
        <StatsSelectList/>
        <StatsTable />
        <StatsSummary />
        </div>
    </div>
  );
};

export default Statistics;