import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function myChart(id, label, dat) {
  const labels = label;

  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        // barPercentage: 1,
        barThickness: 50,
        // minBarThickness: 60,
        // maxBarThickness: 60,
        minBarLength: 5,
        data: dat,
        backgroundColor: 'rgba(17, 106, 204, 1)',
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      // indexAxis: 'y',
      // grouped: false,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          grid: {
            offset: false,
          },
        },
      },
      elements: {},
    },
  };
  const myCharts = new Chart(document.getElementById(id), config);
  return myCharts;
}

export { myChart };
