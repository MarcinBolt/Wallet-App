import React from 'react';
import css from './Chart.module.css';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
);



const Chart = () => {
  const bgColor = ['#FED057', '#FFD8D0', '#FD9498', '#C5BAFF', '#6E78E8', '#4A56E2', '#81E1FF', '#24CCA7', '#00AD84'];
  const borderColor = ['#FED057', '#FFD8D0', '#FD9498', '#C5BAFF', '#6E78E8', '#4A56E2', '#81E1FF', '#24CCA7', '#00AD84'];
  
  const data = {
    labels: ["Main expanses", "Products", "Car", "Self care", "Child care", "Household products", "Education", "Leisure", "Other expenses"],
    datasets: [
    {
      label: 'Expanses',
      data: [120, 19, 35, 5, 15, 33,45, 20, 11],
      backgroundColor: [...bgColor],
      borderColor: [...borderColor],
        borderWidth: 1,
        cutout: '70%',
    }],  
}

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
    ctx.fond = '40px';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Balance', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
  }}
  
  return (
      <>
          <Doughnut
            data={data}
            options={options}
            plugins={[textCenter]}
            className={css.doughnutChart}
        />
      </>
    )
};

export default Chart;