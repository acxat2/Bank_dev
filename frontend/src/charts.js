import { el } from 'redom';
import { Chart } from 'chart.js';

const script = el('script', { src: 'https://cdn.jsdelivr.net/npm/chart.js' });

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
  // const ctx = document.getElementById('diferentHistory');
  // const myCharts = new Chart(ctx, {
  //   type: 'bar',
  //   data: {
  //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //     datasets: [
  //       {
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)',
  //         ],
  //         borderColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)',
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   },
  // });
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {},
  };
  const dinamicHistory = new Chart(document.getElementById(id), config);
  return dinamicHistory;
}

export {
  createScriptMyChart,
  script,
  innerHTMLMyChartViewing,
  innerHTMLDinamicHistory,
  myChart,
};
