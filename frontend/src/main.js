import { mainEnter } from './enter';
import { setChildren } from 'redom';
import { header, main } from './header';
import { mainAccounts, accountCard } from './accounts';
import { mainViewingAccount, createLineTable } from './viewing-account';
import { mainHistoryBalance } from './history-balance';
import { mainCurrencyConversions } from './сurrency-conversions';
import { mainAtmcMap } from './atmc-map';
import {
  getToken,
  getDataAccounts,
  createAccountApi,
  getDataAccount,
} from './api';
import {
  formatSumm,
  dateTransform,
  dateTransformForTable,
  formatSummColor,
} from './helpsFunctions';
import normalize from './styles/normalize.css';
import style from './styles/style.css';

const body = window.document.body;

// setChildren(body, header, main);
// main.append(mainAtmcMap());

setChildren(body, header, main);
const atms = document.getElementById('atms');
const accounts = document.getElementById('accounts');
const currency = document.getElementById('currency');
const exit = document.getElementById('exit');

exit.addEventListener('click', () => enter());

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
        renderWindow(TOKEN, main, nav, accounts, atms, currency);
      }
    });
  });
}
enter();

function renderWindow(TOKEN, main, nav, accounts, atms, currency) {
  reloadWindow(main, nav, accounts, atms, currency);
  main.append(mainAccounts());
  accounts.classList.add('open');

  const createAccount = document.getElementById('createAccount');
  const cardContainer = document.querySelector('.accounts-card-container');
  getDataAccounts('http://localhost:3000/accounts', TOKEN).then((result) => {
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

function renderViewingAccount(
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
    getDataAccount(
      `http://localhost:3000/account/${result.account}`,
      TOKEN
    ).then((result) => {
      reloadWindow(main, nav, accounts, atms, currency);
      main.append(
        mainViewingAccount(result.account, formatSumm(result.balance))
      );
      const transactionTable = document.getElementById('transactionTable');
      if (result.transactions.length > 0) {
        for (let i = 1; i <= 10; i++) {
          const transaction =
            result.transactions[result.transactions.length - i];
          transactionTable.append(
            createLineTable(
              transaction.from,
              transaction.to,
              formatSummColor(formatSumm(transaction.amount)),
              dateTransformForTable(transaction.date)
            )
          );
          const amount = transactionTable.children[i - 1].children[2];
          if (amount.textContent.includes('+')) {
            amount.classList.add('positive');
          } else {
            amount.classList.add('negative');
          }
        }
      }

      const btnBack = document.getElementById('back');
      btnBack.addEventListener('click', () => {
        renderWindow(TOKEN, main, nav, accounts, atms, currency);
      });
    });
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
  const date = dateTransform(result);
  cardContainer.append(
    accountCard(result.account, formatSumm(result.balance), date)
  );

  renderViewingAccount(TOKEN, result, main, nav, accounts, atms, currency);
}
