import { el } from 'redom';

const arrow = el('span', {
  class: 'arrow btn-icon',
});
arrow.innerHTML =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13H20V11H7.83Z" fill="white"/></svg>';

const mail = el('span', {
  class: 'arrow btn-icon',
});
mail.innerHTML =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z" fill="white"/></svg>';

function mainViewingAccount(account, balance) {
  const mainViewingAccount = el('div', { class: 'viewing-accounts' }, [
    el('section', { class: 'accounts-top container' }, [
      el(
        'div',
        { class: 'accounts-top__left' },
        el('h1', { class: 'accounts-title title' }, 'Просмотр счёта')
      ),
      el('div', { class: 'accounts-top__right' }, [
        el('button', { class: 'btn btn-icons', id: 'back' }, [
          arrow,
          'Вернуться назад',
        ]),
      ]),
    ]),
    el('section', { class: 'viewing-account-top accounts-top container' }, [
      el(
        'div',
        { class: 'viewing-account-top__left' },
        el('p', { class: 'viewing-account-number' }, `№ ${account}`)
      ),
      el('div', { class: 'viewing-account-top__right balance-amount' }, [
        el('span', { class: 'balance-text' }, 'Баланс'),
        balance,
      ]),
    ]),
    el('section', { class: 'margin-top-window container' }, [
      el('div', { class: 'viewing-account-window_top' }, [
        el(
          'div',
          {
            class:
              'viewing-account-window window-form__new-transition border-window',
          },
          [
            el('h2', { class: 'window-title' }, 'Новый перевод'),
            el(
              'form',
              {
                name: 'newTransitionForm',
                class: 'new-transition-form form ',
                id: 'newTransitionForm',
              },
              [
                el('div', { class: 'form-input__container' }, [
                  el('div', { class: 'input-block block-number-recipient' }, [
                    el('label', { class: 'label' }, 'Номер счёта получателя'),
                    el('input', {
                      type: 'number',
                      class: 'input-account-to input',
                      id: 'inputAccountTo',
                      minlength: '16',
                      placeholder: 'Placeholder',
                    }),
                  ]),
                  el('div', { class: 'input-block block-summ' }, [
                    el('label', { class: 'label' }, 'Сумма перевода'),
                    el('input', {
                      type: 'number',
                      class: 'input-amount input',
                      id: 'inputAmount',
                      placeholder: 'Placeholder',
                    }),
                  ]),
                ]),
                el('button', { class: 'btn btn-icons btn-mail' }, [
                  mail,
                  'Отправить',
                ]),
              ]
            ),
          ]
        ),
        el(
          'div',
          {
            class:
              'viewing-account-window window-form__balance-dinamic border-window box-shadow',
            id: 'balance-dinamic',
          },
          [
            el('h2', { class: 'window-title' }, 'Динамика баланса'),
            el(
              'div',
              { class: 'chart-container' },
              el('canvas', {
                class: 'myChart',
                id: 'dinamicViewing',
                height: '195px',
              })
            ),
          ]
        ),
      ]),
      el(
        'div',
        {
          class:
            'viewing-account-window window-form__history-transition border-window',
        },
        [
          el('h2', { class: 'window-title' }, 'История преводов'),
          el(
            'table',
            { class: 'table' },
            el('thead', { class: 'table-header' }, [
              el('tr', [
                el('th', { class: 'colFrom' }, 'Счёт отправителя'),
                el('th', { class: 'colTo' }, 'Счёт получателя'),
                el('th', { class: 'colAmount' }, 'Сумма'),
                el('th', { class: 'colDate' }, 'Дата'),
              ]),
            ]),
            el('tbody', { class: 'table-body', id: 'transactionTable' })
          ),
        ]
      ),
    ]),
  ]);
  return mainViewingAccount;
}

function createLineTable(from, to, amount, date) {
  const line = el('tr', [
    el('td', from),
    el('td', to),
    el('td', amount),
    el('td', date),
  ]);
  return line;
}

export { mainViewingAccount, createLineTable };
