import React, { useState, useEffect } from 'react';
import css from './Chart.module.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { selectTransactionsIsLoading } from '../../../redux/selectors';
import { useSelector } from 'react-redux';
import TitleComponent from '../../TitleComponent/Title.Component';
import Loader from '../../Loader/Loader';
import formatMoney from '../../../utils/formatMoney';

ChartJS.register(Tooltip, Legend, ArcElement);

const Chart = ({ categoriesSums, balance }) => {
  const positiveSums = [...categoriesSums].filter(s => s.sum > 0);
  const actualLabels = positiveSums.map(c => c.name);
  const actualSums = positiveSums.map(c => c.sum);
  const actualColors = positiveSums.map(c => c.color);

  const data = {
    labels: actualLabels,
    datasets: [
      {
        labels: actualLabels,
        data: actualSums,
        backgroundColor: actualColors,
        borderColor: actualColors,
        borderWidth: 1,
        cutout: '70%',
      },
    ],
  };

  const options = {
    aspectRatio: 1,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          boxWidth: 12,
          generateLabels: chart => {
            const datasets = chart.data.datasets;
            return datasets[0].data.map((data, i) => ({
              text: `${chart.data.labels[i]} ${data}`,
              fillStyle: datasets[0].backgroundColor[i],
            }));
          },
        },
      },
    },
    elements: {
      point: {
        backgroundColor: 'green',
      },
    },
  };

  const labelStyle = {
    display: 'flex',
    justifyContent: 'space-around',
  };

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOption) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = '24px Arial Bold';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        `PLN ${formatMoney(balance / 100)}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y,
      );
    },
  };

  const isTransactionsLoading = useSelector(selectTransactionsIsLoading);

  return (
    <>
      {isTransactionsLoading ? (
        <Loader />
      ) : actualLabels.length > 0 ? (
        <Doughnut
          data={data}
          options={options}
          plugins={[textCenter]}
          className={css.doughnutChart}
        />
      ) : (
        <h4 className={css.noTransactionsInfo}>
          You don't have any expenses <br />
          in this period of time. <br />
          Choose another month.
        </h4>
      )}
    </>
  );
};

export default Chart;
