import { el } from 'redom';
import { Chart } from 'chart.js';

// const script = el('script', { src: 'https://cdn.jsdelivr.net/npm/chart.js' });
const script = el('script');

function createScriptMyChart() {
  const scriptMyChart = el('script', { class: 'viewing' });
  // scriptMyChart.innerHTML = `
  // const data = {
  //   labels: ${arr},
  //   datasets: [
  //     {
  //       label: 'My First Dataset',
  //       data: ${dat},
  //       backgroundColor:
  //         'rgba(17, 106, 204, 1)',
  //     }
  //   ],
  // };
  // const config = {
  //   type: 'bar',
  //   data: data,
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     }
  //   },
  // };
  // const myChart = new Chart(
  //   document.getElementById('myChart'),
  //   config
  // );`;
  return scriptMyChart;
}

function innerHTMLMyChartViewing(arr, dat) {
  const MyChartViewing = `
  const labels = ${arr};
  const data = {
    labels: ${arr},
      datasets: [
        {
          label: 'My First Dataset',
          data: ${dat},
          backgroundColor:
            'rgba(17, 106, 204, 1)',
        }
      ],
    };
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          /*y: {
            beginAtZero: true
          }*/
        }
      },
    };
    const myChart = new Chart(
      document.getElementById('dinamicViewing'),
      config
    );`;
  return MyChartViewing;
}

function innerHTMLDinamicHistory(arr) {
  const MyChartViewing = `
  const labels = ${arr};
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1}
      ]
    };
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };
    const myChart = new Chart(
      document.getElementById('dinamicHistory'),
      config
    );`;
  return MyChartViewing;
}

function myChart(id) {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: [80000, 311552, 85450, 478124, 81000, 328500],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 0, 0, 0.2)',
          'rgba(0, 0, 255, 1)',
          'rgba(75, 192, 0, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(10, 0, 0, 0.2)',
        ],
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
        show: false,
      },
      grid: {},
      tooltip: {
        show: false,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        fontColor: '#000000',
        object: null,
      },
    },
  };
  const myCharts = new Chart(document.getElementById(id), config);
  return myCharts;
}

export {
  createScriptMyChart,
  script,
  innerHTMLMyChartViewing,
  innerHTMLDinamicHistory,
  myChart,
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [0, 10, 5, 2, 20, 30, 45],
//     },
//   ],
// };

// const config = {
//   type: 'bar',
//   data: data,
//   options: {},
// };
// const dinamicHistory = new Chart(document.getElementById(id), config);
// return dinamicHistory;
