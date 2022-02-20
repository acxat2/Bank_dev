import { mainEnter } from './enter';
import { setChildren } from 'redom';
import { header, main } from './header';
import { mainAccounts, accountCard } from './accounts';
import { mainViewingAccount, createLineTable } from './viewing-account';
import { mainHistoryBalance } from './history-balance';
import {
  mainCurrencyConversions,
  createCurrencyOnlineTr,
  createVectorRed,
  createVectorGreen,
  createYourCurrencyItem,
  createSelectCurrencyOption,
} from './сurrency-conversions';
import { mainAtmcMap, yandexMap } from './atmc-map';
import { getToken, getData, createAccountApi, transferFunds } from './api';
import {
  formatSumm,
  dateTransform,
  dateTransformForTable,
  formatSummColor,
  definSign,
  formatAmouth,
} from './helpsFunctions';

import {
  createScriptMyChart,
  script,
  innerHTMLMyChartViewing,
  innerHTMLDinamicHistory,
  myChart,
} from './charts';
import normalize from './styles/normalize.css';
import style from './styles/style.css';

// const head = document.head;
// head.append(script);

const body = window.document.body;

setChildren(body, header, main);
const atms = document.getElementById('atms');
const accounts = document.getElementById('accounts');
const currency = document.getElementById('currency');
const exit = document.getElementById('exit');

function enter() {
  const nav = document.querySelector('.header-nav');
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.append(mainEnter());

  const authForm = document.getElementById('authForm');
  const btnEnter = document.querySelector('.btn-enter');
  nav.classList.add('none');

  btnEnter.addEventListener('click', (e) => {
    e.preventDefault();
    const AUTH_DATA = {
      login: authForm[0].value,
      password: authForm[1].value,
    };
    getToken('http://localhost:3000/login', AUTH_DATA).then((result) => {
      const TOKEN = result;
      if (!TOKEN) {
        return;
      } else {
        renderWindowAccounts(TOKEN, main, nav, accounts, atms, currency);

        accounts.addEventListener('click', () => {
          renderWindowAccounts(TOKEN, main, nav, accounts, atms, currency);
        });

        currency.addEventListener('click', () => {
          renderCurrencyConversions(TOKEN, main, nav, accounts, atms, currency);
        });

        atms.addEventListener('click', () => {
          renderAtmcMap(TOKEN, main, nav, accounts, atms, currency);
        });

        exit.addEventListener('click', () => enter());
      }
    });
  });
}
enter();

function renderWindowAccounts(TOKEN, main, nav, accounts, atms, currency) {
  reloadWindow(main, nav, accounts, atms, currency);
  main.append(mainAccounts());
  accounts.classList.add('open');

  const createAccount = document.getElementById('createAccount');
  const cardContainer = document.querySelector('.accounts-card-container');
  getData('http://localhost:3000/accounts', TOKEN).then((result) => {
    createAccountCard(
      TOKEN,
      cardContainer,
      result,
      main,
      nav,
      accounts,
      atms,
      currency
    );
  });

  createAccount.addEventListener('click', () => {
    createAccountApi('http://localhost:3000/create-account', TOKEN).then(
      (result) => {
        createAccountCard(
          TOKEN,
          cardContainer,
          result,
          main,
          nav,
          accounts,
          atms,
          currency
        );
      }
    );
  });
}

function transitionToAccounts(
  TOKEN,
  result,
  main,
  nav,
  accounts,
  atms,
  currency
) {
  const btnOpenAccount = document.getElementById(`${result.account}`);
  btnOpenAccount.addEventListener('click', () => {
    renderViewingAccount(TOKEN, result, main, nav, accounts, atms, currency);
  });
}

function reloadWindow(main, nav, accounts, atms, currency) {
  main.innerHTML = '';
  nav.classList.remove('none');
  accounts.classList.remove('open');
  atms.classList.remove('open');
  currency.classList.remove('open');
}

function createAccountCard(
  TOKEN,
  cardContainer,
  result,
  main,
  nav,
  accounts,
  atms,
  currency
) {
  if (result.length) {
    for (let item of result) {
      let result = item;
      const date = dateTransform(result);
      cardContainer.append(
        accountCard(result.account, formatSumm(result.balance), date)
      );
      transitionToAccounts(TOKEN, result, main, nav, accounts, atms, currency);
    }
  } else {
    const date = dateTransform(result);
    cardContainer.append(
      accountCard(result.account, formatSumm(result.balance), date)
    );
    transitionToAccounts(TOKEN, result, main, nav, accounts, atms, currency);
  }
}

function renderTransactionTable(transactionTable, result, n) {
  if (result.transactions.length > 0) {
    if (n > result.transactions.length) {
      n = result.transactions.length;
    }
    for (let i = 1; i <= n; i++) {
      const transaction = result.transactions[result.transactions.length - i];
      transactionTable.append(
        createLineTable(
          transaction.from,
          transaction.to,
          formatSummColor(formatSumm(definSign(transaction, result.account))),
          dateTransformForTable(transaction.date)
        )
      );
      const amount = transactionTable.children[i - 1].children[2];
      if (amount.textContent.includes('+')) {
        amount.classList.add('positive');
      } else amount.classList.add('negative');
    }
  }
}

function renderViewingAccount(
  TOKEN,
  result,
  main,
  nav,
  accounts,
  atms,
  currency
) {
  getData(`http://localhost:3000/account/${result.account}`, TOKEN).then(
    (result) => {
      reloadWindow(main, nav, accounts, atms, currency);
      main.append(
        mainViewingAccount(result.account, formatSumm(result.balance))
      );

      // myChart('dinamicViewing');
      // const canvas = `${document.getElementById('myChart')}`;

      // function createScript() {
      //   const dat = '[65, 59, 80, 30, 56, 55, 40]';
      //   const arr = `['January', 'February', 'March', 'April', 'May', 'June']`;

      //   const scriptMyChart = createScriptMyChart();
      //   scriptMyChart.innerHTML = innerHTMLMyChartViewing(arr, dat);
      //   // if (body.querySelector)
      //   body.append(scriptMyChart);
      // }
      // createScript();
      const balanceAmount = document.querySelector('.balance-amount');

      const balanceDinamic = document.getElementById('balance-dinamic');
      const transactionTable = document.getElementById('transactionTable');
      renderTransactionTable(transactionTable, result, 10);

      balanceDinamic.addEventListener('click', () => {
        renderHistoryBalance(
          TOKEN,
          result,
          main,
          nav,
          accounts,
          atms,
          currency
        );
      });

      transactionTable.parentNode.parentNode.addEventListener('click', () => {
        renderHistoryBalance(
          TOKEN,
          result,
          main,
          nav,
          accounts,
          atms,
          currency
        );
      });

      const newTransitionForm = document.getElementById('newTransitionForm');
      const btnMail = newTransitionForm.querySelector('button');

      newTransitionForm[0].addEventListener('blur', () => {
        newTransitionForm[0].classList.remove('error');
      });

      newTransitionForm[1].addEventListener('blur', () => {
        newTransitionForm[1].classList.remove('error');
      });

      btnMail.addEventListener('click', (e) => {
        e.preventDefault();
        const amount = newTransitionForm[1].value;
        const to = newTransitionForm[0].value;
        newTransitionForm[0].classList.remove('error');
        newTransitionForm[1].classList.remove('error');

        if (to.length < 16) {
          newTransitionForm[0].classList.add('error');
        }
        if (amount > 0) {
          const transitilnData = {
            from: result.account,
            to: newTransitionForm[0].value,
            amount: amount,
          };

          transferFunds(
            `http://localhost:3000/transfer-funds`,
            TOKEN,
            transitilnData
          ).then((result) => {
            if (result.error === 'Invalid account to') {
              newTransitionForm[0].classList.add('error');
              // alert('Не указан счёт зачисления, или этого счёта не существует');
            }
          });
          getData(
            `http://localhost:3000/account/${result.account}`,
            TOKEN
          ).then((result) => {
            console.log(result);

            const trs = transactionTable.querySelectorAll('tr');
            for (let tr of trs) {
              tr.remove();
            }
            renderTransactionTable(transactionTable, result, 10);
            balanceAmount.textContent = formatSumm(result.balance);
            balanceDinamic.addEventListener('click', () => {
              renderHistoryBalance(
                TOKEN,
                result,
                main,
                nav,
                accounts,
                atms,
                currency
              );
            });

            transactionTable.parentNode.parentNode.addEventListener(
              'click',
              () => {
                renderHistoryBalance(
                  TOKEN,
                  result,
                  main,
                  nav,
                  accounts,
                  atms,
                  currency
                );
              }
            );
          });
        } else {
          newTransitionForm[1].classList.add('error');
          // alert('Не указана сумма перевода, или она отрицательная');
        }
      });

      const btnBack = document.getElementById('back');
      btnBack.addEventListener('click', () => {
        renderWindowAccounts(TOKEN, main, nav, accounts, atms, currency);
      });
    }
  );
}

function renderHistoryBalance(
  TOKEN,
  result,
  main,
  nav,
  accounts,
  atms,
  currency
) {
  // body.querySelector('script').remove();

  myChart('diferentHistory');
  // const arr = `['January', 'February', 'March', 'April', 'May', 'June']`;
  // const canvas = document.createElement('canvas');
  // canvas.setAttribute('id', 'dinamicHistory');
  // canvas.setAttribute('height', '195px');
  // canvas.setAttribute('class', 'myChart');
  // canvas.append(Chart);

  //  очищаю скрипт, и так понимаю, идентификаторы уже объявлены
  // body.querySelector('script').innerHTML = `${innerHTMLDinamicHistory(arr)}`;

  reloadWindow(main, nav, accounts, atms, currency);
  main.append(mainHistoryBalance(result.account, formatSumm(result.balance)));
  const transactionTable = document.getElementById('transactionTable');
  renderTransactionTable(transactionTable, result, 25);
  const btnBack = document.getElementById('back');
  btnBack.addEventListener('click', () => {
    reloadWindow(main, nav, accounts, atms, currency);
    renderViewingAccount(TOKEN, result, main, nav, accounts, atms, currency);
  });
}

function renderCurrencyConversions(TOKEN, main, nav, accounts, atms, currency) {
  reloadWindow(main, nav, accounts, atms, currency);
  currency.classList.add('open');
  main.append(mainCurrencyConversions());

  const currencyOnlineList = main.querySelector('.currency-online-list');
  const currencyList = main.querySelector('.your-currency-list');

  const changeFrom = document.getElementById('selectCurrencyFrom');
  const changeTo = document.getElementById('selectCurrencyTo');
  const changeAmount = document.getElementById('inputCurrencyAmount');
  const form = document.getElementById('currencyChangeForm');
  const btnChange = form.querySelector('button');

  getData(`http://localhost:3000/all-currencies`, TOKEN).then((result) => {
    for (let value of result) {
      changeFrom.append(createSelectCurrencyOption(value));
      changeTo.append(createSelectCurrencyOption(value));
    }

    btnChange.addEventListener('click', (e) => {
      e.preventDefault();

      const from = changeFrom.value;
      const to = changeTo.value;
      const amount = changeAmount.value;

      if (amount > 0) {
        const transitilnData = {
          from: from,
          to: to,
          amount: amount,
        };

        transferFunds(
          `http://localhost:3000/currency-buy`,
          TOKEN,
          transitilnData
        ).then((result) => {
          const list = document.querySelector('.your-currency-list');
          const trTo = list.querySelectorAll('.currency-online-tr');
          console.log(trTo);
          changeFrom.value = '';
          changeTo.value = '';
          changeAmount.value = '';

          for (let tr of trTo) {
            if (tr.firstChild.textContent === from) {
              tr.lastChild.innerHTML = formatAmouth(
                result.payload[from].amount
              );
            }
            if (tr.firstChild.textContent === to) {
              tr.lastChild.innerHTML = formatAmouth(result.payload[to].amount);
            }
            // console.log(tr.firstChild);
          }
          // }
          // console.log(result);
          // console.log(result.payload[from]);
          // console.log(result.payload[to]);
        });
      }
    });
  });

  getData(`http://localhost:3000/currencies`, TOKEN).then((result) => {
    // console.log(result);
    // console.log(Object.keys(result));
    // console.log(Object.values(result));

    for (let item of Object.values(result)) {
      const code = item.code;
      // const amount = item.amount;
      const amount = formatAmouth(item.amount);
      currencyList.append(createYourCurrencyItem(code, amount));
    }
  });

  let socket = new WebSocket('ws://localhost:3000/currency-feed');

  let currencyOnline = [];
  socket.onmessage = function (event) {
    currencyOnlineList.innerHTML = '';
    const data = event.data.replace(/[{}"]/g, '');
    const dataObj = {
      type: data.split('type:')[1].split(',')[0],
      from: data.split('from:')[1].split(',')[0],
      to: data.split('to:')[1].split(',')[0],
      rate: data.split('rate:')[1].split(',')[0],
      change: data.split('change:')[1].split(',')[0],
    };

    if (currencyOnline.length >= 12) {
      currencyOnline.splice(0, 1);
    }
    currencyOnline.push(dataObj);

    for (let i = currencyOnline.length - 1; i >= 0; i--) {
      const from = currencyOnline[i].from;
      const to = currencyOnline[i].to;
      const rate = currencyOnline[i].rate;
      const change = currencyOnline[i].change;
      let dashedColor, vector;
      if (change === '1') {
        dashedColor = 'dashed-green';
        vector = createVectorGreen();
      } else {
        dashedColor = 'dashed-red';
        vector = createVectorRed();
      }
      currencyOnlineList.append(
        createCurrencyOnlineTr(from, to, rate, dashedColor, vector)
      );
    }
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
      );
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      console.log('[close] Соединение прервано');
    }
  };

  socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
  };
}

function renderAtmcMap(TOKEN, main, nav, accounts, atms, currency) {
  reloadWindow(main, nav, accounts, atms, currency);
  atms.classList.add('open');
  main.append(mainAtmcMap());
  getData(`http://localhost:3000/banks`, TOKEN).then((result) => {
    yandexMap(result);
  });
}
