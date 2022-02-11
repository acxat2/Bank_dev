import { el } from 'redom';

const header = el(
  'header',
  { class: 'header' },
  el('div', { class: 'container header-container' }, [
    el('div', { class: 'header-logo' }, el('p', { class: 'logo' }, 'Coin.')),
    el('div', { class: 'header-nav' }, [
      el('button', { class: 'btn hedder-btn', id: 'atms' }, 'Банкоматы'),
      el('button', { class: 'btn hedder-btn', id: 'accounts' }, 'Счета'),
      el('button', { class: 'btn hedder-btn', id: 'currency' }, 'Валюта'),
      el('button', { class: 'btn hedder-btn', id: 'exit' }, 'Выйти'),
    ]),
  ])
);

const main = el('main', { class: 'main' });
export { header, main };
