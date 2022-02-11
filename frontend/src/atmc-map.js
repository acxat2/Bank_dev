import { el } from 'redom';

function mainAtmcMap() {
  const mainAtmcMap = el('div', { class: 'atms-map' }, [
    el('section', { class: 'accounts-top container' }, [
      el(
        'div',
        { class: 'accounts-top__left' },
        el(
          'h1',
          { class: 'currency-conversions-title title' },
          'Карта банкоматов'
        )
      ),
    ]),
    el(
      'section',
      {
        class: ' margin-top-window  container',
      },
      el('div', { class: 'atms-map-window__container' })
    ),
  ]);
  return mainAtmcMap;
}

export { mainAtmcMap };
