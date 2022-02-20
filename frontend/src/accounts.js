import { el } from 'redom';

const plus = el('span', {
  class: 'plus btn-icon',
});
plus.innerHTML =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.00001L12 12M12 12L12 20M12 12L20 12M12 12L4 12" stroke="white" stroke-width="2"/></svg>';

function mainAccounts() {
  const mainAccounts = el('div', { class: 'accounts' }, [
    el('section', { class: 'accounts-top container' }, [
      el('div', { class: 'accounts-top__left' }, [
        el('h1', { class: 'accounts-title title' }, 'Ваши счета'),
        el(
          'form',
          { class: 'accounts-form form' },
          el(
            'select',
            {
              class: 'select celect-accounts input',
              placeholder: 'Сортировка',
            },
            [
              el('option', { class: 'option' }, 'Сортировка'),
              el(
                'option',
                { class: 'option', value: 'По номеру' },
                'По номеру'
              ),
              el(
                'option',
                { class: 'option', value: 'По балансу' },
                'По балансу'
              ),
              el(
                'option',
                { class: 'option', value: 'По последней транзакции' },
                'По последней транзакции'
              ),
            ]
          )
        ),
      ]),
      el('div', { class: 'accounts-top__right' }, [
        el('button', { class: 'btn btn-icons', id: 'createAccount' }, [
          plus,
          'Создать новый счёт',
        ]),
      ]),
    ]),

    el('section', { class: 'accounts-card-container container' }),
  ]);
  return mainAccounts;
}

function accountCard(account, balance, date) {
  const balanceElement = el('div', { class: 'balance' });
  balanceElement.innerHTML = balance;
  const elem = el(
    'div',
    { class: 'account-card card' },
    el('div', { class: 'account-card__left' }, [
      el('div', { class: 'account-card__left-top' }, [
        el('div', { class: 'account-number-card' }, account),
        el('div', { class: 'account-number-balance' }, [balanceElement]),
      ]),
      el('div', { class: 'account-number-transaction' }, [
        el(
          'div',
          { class: 'account-number-transaction__text' },
          'Последняя транзакция:'
        ),
        el('div', { class: 'account-number-transaction__date' }, [
          el('span', { class: 'day' }, date.day + ' '),
          el('span', { class: 'manth' }, date.month + ' '),
          el('span', { class: 'year' }, date.year),
        ]),
      ]),
    ]),
    el(
      'div',
      { class: 'account-card__right' },
      el('button', { class: 'btn account-card-btn', id: account }, 'Открыть')
    )
  );
  return elem;
}

export { mainAccounts, accountCard };
