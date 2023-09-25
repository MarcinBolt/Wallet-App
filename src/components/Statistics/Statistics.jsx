import Chart from "./Chart/Chart";
import StatsSelectList from "./StatsSelectList/StatsSelectList";
import StatsSummary from "./StatsSummary/StatsSummary";
import StatsTable from "./StatsTable/StatsTable";

const Statistics = () => {
  return (
    <div className={css.statisticsContainer}>
      <div>
        {/* <StatsHeader/> to zaimportowania z innego brancha */}
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