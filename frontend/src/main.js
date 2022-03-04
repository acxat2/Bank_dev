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
  sortTransaction,
  createArrMonths,
} from './helpsFunctions';

import { isValidAuth } from './validations';

import { myChart } from './charts';
// eslint-disable-next-line no-unused-vars
import normalize from './styles/normalize.css';
// eslint-disable-next-line no-unused-vars
import style from './styles/style.css';
// import { doc } from 'prettier';

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

    authForm[0].classList.remove('error');
    authForm[1].classList.remove('error');
    if (!isValidAuth(authForm[0].value)) {
      authForm[0].classList.add('error');
    }

    if (!isValidAuth(authForm[1].value)) {
      authForm[1].classList.add('error');
    }

    if (!authForm.querySelector('.error')) {
      console.log('spinner');
      getToken('http://localhost:3000/login', AUTH_DATA).then((result) => {
        if (result.error === 'No such user') {
          console.log('end spinner');
          alert('Данного пользователя не существует');
        }

        if (result.error === 'Invalid password') {
          console.log('end spinner');
          alert('Не правильный пароль');
        }

        if (result.payload) {
          const TOKEN = result.payload.token;
          renderWindowAccounts(TOKEN, main, nav, accounts, atms, currency);

          accounts.addEventListener('click', () => {
            console.log('spinner');
            renderWindowAccounts(TOKEN, main, nav, accounts, atms, currency);
          });

          currency.addEventListener('click', () => {
            console.log('spinner');
            reloadWindow(main, nav, accounts, atms, currency);
            renderCurrencyConversions(TOKEN, main, currency);
          });

          atms.addEventListener('click', () => {
            console.log('spinner');
            reloadWindow(main, nav, accounts, atms, currency);
            renderAtmcMap(TOKEN, main, atms);
          });

          exit.addEventListener('click', () => enter());
        }
      });
    }
  });
}
enter();

function renderWindowAccounts(TOKEN, main, nav, accounts, atms, currency) {
  reloadWindow(main, nav, accounts, atms, currency);
  main.append(mainAccounts());
  accounts.classList.add('open');

  const select = document.querySelector('.select');

  const createAccount = document.getElementById('createAccount');
  const cardContainer = document.querySelector('.accounts-card-container');
  getData('http://localhost:3000/accounts', TOKEN).then((result) => {
    select.addEventListener('change', () => {
      cardContainer.innerHTML = '';
      switch (select.value) {
        case 'По номеру':
          result = result.sort((a, b) => {
            if (a.account > b.account) {
              return 1;
            }
            if (a.account < b.account) {
              return -1;
            }
            return 0;
          });
          break;
        case 'По балансу':
          result = result.sort((a, b) => {
            if (a.balance > b.balance) {
              return 1;
            }
            if (a.balance < b.balance) {
              return -1;
            }
            return 0;
          });
          break;

        case 'По последней транзакции':
          result = result.sort((a, b) => {
            let a1;
            let b1;
            if (a.transactions.length) {
              a1 = a.transactions[0].date;
            } else a1 = 0;
            if (b.transactions.length) {
              b1 = b.transactions[0].date;
            } else b1 = 0;

            if (new Date(a1) > new Date(b1)) {
              return 1;
            }
            if (new Date(a1) < new Date(b1)) {
              return -1;
            }
            return 0;
          });

          break;
      }

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
    console.log('end spinner');

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
    console.log('spinner');

    createAccountApi('http://localhost:3000/create-account', TOKEN).then(
      (result) => {
        console.log('end spinner');
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
    console.log('spinner');
    reloadWindow(main, nav, accounts, atms, currency);
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

function transactionsTable(
  transactionTable,
  resultTransactionsLength,
  result,
  n
) {
  for (let i = 1; i <= n; i++) {
    const transaction = result.transactions[resultTransactionsLength - i];
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
      main.append(
        mainViewingAccount(result.account, formatSumm(result.balance))
      );
      myChart(
        'dinamicViewing',
        sortTransaction(result, createArrMonths(6)).magorKey,
        sortTransaction(result, createArrMonths(6)).magorValue
      );
      console.log('end spinner');

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
      if (localStorage.getItem('to'))
        newTransitionForm[0].value = localStorage.getItem('to');

      newTransitionForm[0].addEventListener('focus', () => {
        newTransitionForm[0].classList.remove('error');
      });

      newTransitionForm[1].addEventListener('focus', () => {
        newTransitionForm[1].classList.remove('error');
      });

      btnMail.addEventListener('click', (e) => {
        e.preventDefault();
        let to = newTransitionForm[0].value;
        const amount = newTransitionForm[1].value;
        newTransitionForm[0].classList.remove('error');
        newTransitionForm[1].classList.remove('error');
        if (to.length < 16) {
          newTransitionForm[0].classList.add('error');
        }
        if (amount <= 0) {
          newTransitionForm[1].classList.add('error');
        }
        if (amount > result.balance) {
          newTransitionForm[1].classList.add('error');
          alert('На карте нет такой суммы');
        }

        if (!newTransitionForm.querySelector('.error')) {
          const transitilnData = {
            from: result.account,
            to: to,
            amount: amount,
          };

          transferFunds(
            `http://localhost:3000/transfer-funds`,
            TOKEN,
            transitilnData
          ).then((result) => {
            if (result.error === 'Invalid account to') {
              newTransitionForm[0].classList.add('error');
              alert('Не указан счёт зачисления, или этого счёта не существует');
            } else {
              localStorage.setItem('to', transitilnData.to);
            }
          });
          getData(
            `http://localhost:3000/account/${result.account}`,
            TOKEN
          ).then((result) => {
            deleteTrs(transactionTable);
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
          newTransitionForm[0].value = '';
          newTransitionForm[1].value = '';
        }
      });

      const btnBack = document.getElementById('back');
      btnBack.addEventListener('click', () => {
        console.log('spinner');
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
  reloadWindow(main, nav, accounts, atms, currency);
  main.append(mainHistoryBalance(result.account, formatSumm(result.balance)));

  myChart(
    'dinamicHistory',
    sortTransaction(result, createArrMonths(12)).magorKey,
    sortTransaction(result, createArrMonths(12)).magorValue
  );
  myChart(
    'diferentHistory',
    sortTransaction(result, createArrMonths(12)).minorKey,
    sortTransaction(result, createArrMonths(12)).minorValue
  );
  const transactionTable = document.getElementById('transactionTable');
  renderTransactionTable25(transactionTable, result, 25);
  const btnBack = document.getElementById('back');
  btnBack.addEventListener('click', () => {
    reloadWindow(main, nav, accounts, atms, currency);
    renderViewingAccount(TOKEN, result, main, nav, accounts, atms, currency);
  });
}

function renderCurrencyConversions(TOKEN, main, currency) {
  currency.classList.add('open');
  main.append(mainCurrencyConversions());

  const currencyOnlineList = main.querySelector('.currency-online-list');
  const currencyList = main.querySelector('.your-currency-list');

  const changeFrom = document.getElementById('selectCurrencyFrom');
  const changeTo = document.getElementById('selectCurrencyTo');
  const changeAmount = document.getElementById('inputCurrencyAmount');
  const FORM = document.getElementById('currencyChangeForm');
  const btnChange = FORM.querySelector('button');

  getData(`http://localhost:3000/all-currencies`, TOKEN).then((result) => {
    for (let value of result) {
      changeFrom.append(createSelectCurrencyOption(value));
      changeTo.append(createSelectCurrencyOption(value));
    }

    btnChange.addEventListener('click', (e) => {
      e.preventDefault();
      let from = changeFrom.value;
      let to = changeTo.value;
      let amount = changeAmount.value;
      changeFrom.classList.remove('error');
      changeTo.classList.remove('error');
      changeAmount.classList.remove('error');

      if (from === '') {
        changeFrom.classList.add('error');
      }
      if (to === '') {
        changeTo.classList.add('error');
      }
      if (amount <= 0) {
        changeAmount.classList.add('error');
      }
      if (!FORM.querySelector('.error')) {
        changeFrom.classList.remove('error');
        changeTo.classList.remove('error');
        changeAmount.classList.remove('error');

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
          console.log(result);
          if (result.payload) {
            const list = document.querySelector('.your-currency-list');
            const trTo = list.querySelectorAll('.currency-online-tr');

            for (let tr of trTo) {
              if (tr.firstChild.textContent === from) {
                tr.lastChild.innerHTML = formatAmouth(
                  result.payload[from].amount
                );
              }
              if (tr.firstChild.textContent === to) {
                tr.lastChild.innerHTML = formatAmouth(
                  result.payload[to].amount
                );
              }
            }
          } else {
            changeAmount.classList.add('error');
            alert('Недостаточно средств данной валюты');
          }
        });
        changeFrom.value = '';
        changeTo.value = '';
        changeAmount.value = '';
      }
    });
  });

  getData(`http://localhost:3000/currencies`, TOKEN).then((result) => {
    // console.log(result);
    // console.log(Object.keys(result));
    // console.log(Object.values(result));
    console.log('end spinner');

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

function renderAtmcMap(TOKEN, main, atms) {
  atms.classList.add('open');
  main.append(mainAtmcMap());
  getData(`http://localhost:3000/banks`, TOKEN).then((result) => {
    yandexMap(result);
  });
}

function deleteTrs(transactionTable) {
  const trs = transactionTable.querySelectorAll('tr');
  for (let tr of trs) {
    tr.remove();
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

function renderTransactionTable25(transactionTable, result, n) {
  let resultTransactionsLength = result.transactions.length;
  if (resultTransactionsLength > 0) {
    let m = n;
    if (n >= resultTransactionsLength) {
      n = resultTransactionsLength;
    }
    // console.
    if (resultTransactionsLength > n) {
      transactionTable.addEventListener('mousedown', (e) => {
        if (e.which == 4) {
          if (resultTransactionsLength - m > 0) {
            resultTransactionsLength = resultTransactionsLength - m;

            if (m >= resultTransactionsLength) {
              m = resultTransactionsLength;
            }

            deleteTrs(transactionTable);
            transactionsTable(
              transactionTable,
              resultTransactionsLength,
              result,
              m
            );
            m = n;
          }
        }
        // } else {
        if (e.which == 5) {
          if (resultTransactionsLength + m <= result.transactions.length) {
            resultTransactionsLength = resultTransactionsLength + m;

            if (m >= resultTransactionsLength) {
              m = resultTransactionsLength;
            }

            deleteTrs(transactionTable);
            transactionsTable(
              transactionTable,
              resultTransactionsLength,
              result,
              m
            );
            m = n;
          }
        }
      });
    }
    transactionsTable(transactionTable, resultTransactionsLength, result, n);
  }
}
