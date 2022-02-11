import { el } from 'redom';

function mainCurrencyConversions() {
  const mainCurrencyConversions = el('div', { class: 'currency-conversions' }, [
    el('section', { class: 'accounts-top container' }, [
      el(
        'div',
        { class: 'accounts-top__left' },
        el(
          'h1',
          { class: 'currency-conversions-title title' },
          'Валютный обмен'
        )
      ),
    ]),
    el(
      'section',
      {
        class:
          'currecy-conversions-window__container margin-top-window  container',
      },
      [
        el('div', { class: 'currecy-conversions-window__left' }, [
          el(
            'div',
            {
              class: 'currecy-conversions-window border-window box-shadow',
            },
            [el('h2', { class: 'window-title' }, 'Ваши валюты')]
          ),
          el(
            'div',
            {
              class:
                'currecy-conversions-window currecy-conversions-window__left-bottom margin-top-window border-window box-shadow',
            },
            [el('h2', { class: 'window-title' }, 'Обмен валюты')]
          ),
        ]),
        el(
          'div',
          {
            class:
              'currecy-conversions-window currecy-conversions-window__right border-window',
          },
          [
            el(
              'h2',
              { class: 'window-title' },
              'Изменение курсов в реальном времени'
            ),
          ]
        ),
      ]
    ),
  ]);
  return mainCurrencyConversions;
}

export { mainCurrencyConversions };
