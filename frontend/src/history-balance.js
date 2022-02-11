import { el } from 'redom';

const arrow = el('span', {
  class: 'arrow btn-icon',
});
arrow.innerHTML =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13H20V11H7.83Z" fill="white"/></svg>';

function mainHistoryBalance() {
  const mainHistoryBalance = el('div', { class: 'viewing-accounts' }, [
    el('section', { class: 'accounts-top container' }, [
      el(
        'div',
        { class: 'accounts-top__left' },
        el('h1', { class: 'accounts-title title' }, 'История баланса')
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
        el('p', { class: 'viewing-account-number' }, `№ 12455242373623463`)
      ),
      el('div', { class: 'viewing-account-top__right' }, [
        el('span', { class: 'balance-text' }, 'Баланс'),
        '31 235',
      ]),
    ]),
    el('section', { class: 'margin-top-window container' }, [
      el(
        'div',
        {
          class:
            'history-balanse-window margin-top-window border-window box-shadow',
        },
        [el('h2', { class: 'window-title' }, 'Динамика баланса')]
      ),
      el(
        'div',
        {
          class:
            'history-balanse-window margin-top-window border-window box-shadow',
        },
        [
          el(
            'h2',
            { class: 'window-title' },
            'Соотношение входящих исходящих транзакций'
          ),
        ]
      ),
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
                el('th', { class: 'colRecipiet' }, 'Счёт отправителя'),
                el('th', { class: 'colSender' }, 'Счёт получателя'),
                el('th', { class: 'colSumm' }, 'Сумма'),
                el('th', { class: 'colDate' }, 'Дата'),
              ]),
            ]),
            el('tbody', { class: 'table-body' })
          ),
        ]
      ),
    ]),
  ]);
  return mainHistoryBalance;
}

export { mainHistoryBalance };
