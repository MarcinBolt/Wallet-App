import React from 'react';
import css from './Chart.module.css';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { selectTransactionsCategories, selectTransactionsIsLoading } from '../../../redux/selectors';
import { useSelector } from 'react-redux';

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
);



const Chart = ({ categoriesSums, balance }) => {
const categories = useSelector(selectTransactionsCategories);

// const Chart = () => {
  const bgColor = ['#FED057', '#FFD8D0', '#FD9498', '#C5BAFF', '#6E78E8', '#4A56E2', '#81E1FF', '#24CCA7', '#00AD84'];
  const borderColor = ['#FED057', '#FFD8D0', '#FD9498', '#C5BAFF', '#6E78E8', '#4A56E2', '#81E1FF', '#24CCA7', '#00AD84'];
  
  console.log('categoriesSums w chart:', categoriesSums);
  console.log('balance w chart:',balance);
  
  const data = {
    // labels: Object.keys(categoriesSums.categorySums),
    labels: [
      'Main expanses',
      'Products',
      'Car',
      'Self care',
      'Child care',
      'Household products',
      'Education',
      'Leisure',
      'Other expenses',
    ],
    datasets: [
      {
        label: 'Expenses',
        // data: Object.values(categoriesSums.categorySums),
        data: [120, 19, 35, 5, 15, 33, 45, 20, 11],
        backgroundColor: [...bgColor],
        borderColor: [...borderColor],
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
        generateLabels: (chart) => {
        const datasets = chart.data.datasets;
        return datasets[0].data.map((data, i) => ({
          text: `${chart.data.labels[i]} ${data}`,
          fillStyle: datasets[0].backgroundColor[i],
        }))
      }
      }
    },
    },
    elements: {
      point: {
      backgroundColor: 'green',
    }
  }
};

const labelStyle = {
  display: 'flex',
  justifyContent: 'space-around',
}

const textCenter = {
  id: 'textCenter',
  beforeDatasetsDraw(chart, args, pluginOption) {
    const { ctx, data } = chart;

    ctx.save();
    ctx.font = '24px Arial Bold';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // ctx.fillText({'₴'}{balance}, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
    ctx.fillText('₴ Balance', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
  }}
  
  const isTransactionsLoading = useSelector(selectTransactionsIsLoading);

  return (
    <>
      {!isTransactionsLoading && (
        <Doughnut
          data={data}
          options={options}
          plugins={[textCenter]}
          className={css.doughnutChart}
        />
      )}
    </>
  );
};

export default Chart;