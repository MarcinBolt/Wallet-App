import React from 'react';
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

const data = {
    labels: ["Main expanses", "Products", "Car", "Self care", "Child care", "Household products", "Education", "Leisure", "Other expenses"],
    datasets: [
    {
      label: 'Expanses',
      data: [120, 19, 35, 5, 15, 33,45, 20, 11],
      backgroundColor: [
        '#FED057',
        '#FFD8D0',
        '#FD9498',
        '#C5BAFF',
        '#6E78E8',
        '#4A56E2',
        '#81E1FF',
        '#24CCA7',
        '#00AD84'
      ],
      borderColor: [
        '#FED057',
        '#FFD8D0',
        '#FD9498',
        '#C5BAFF',
        '#6E78E8',
        '#4A56E2',
        '#81E1FF',
        '#24CCA7',
        '#00AD84'
      ],
        borderWidth: 1,
        weight: 300,
    }],  
}

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 12,
      }
    },
  }
};

const Chart = () => {
    return(
      <div style={{ width: '50vw', height: '50vh' }}>
        <Labels />
        <Doughnut
            data={data}
            width={300}
            height={300}
            options={options}
        />
        </div>
    )
};

export default Chart;