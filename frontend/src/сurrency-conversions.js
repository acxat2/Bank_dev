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
          'currency-conversions-window__container margin-top-window  container',
      },
      [
        el('div', { class: 'currency-conversions-window__left' }, [
          el(
            'div',
            {
              class:
                'currency-conversions-window__left-top currency-conversions-window border-window box-shadow',
            },
            [
              el('h2', { class: 'window-title' }, 'Ваши валюты'),
              el('div', { class: 'your-currency-list currency-list' }),
            ]
          ),
          el(
            'div',
            {
              class:
                'currency-conversions-window currency-conversions-window__left-bottom border-window box-shadow',
            },
            [
              el('h2', { class: 'window-title' }, 'Обмен валюты'),
              el('div', { class: 'currency-change-container' }, [
                el(
                  'form',
                  {
                    class: 'form currency-change-form',
                    name: 'currencyChangeForm',
                    id: 'currencyChangeForm',
                  },
                  [
                    el(
                      'div',
                      { class: 'form-input__container currency-form' },
                      [
                        el('div', { class: 'form-input__container-top' }, [
                          el('div', { class: 'input-block block-left' }, [
                            el(
                              'label',
                              { class: 'label label-currency' },
                              'Из'
                            ),
                            el('select', {
                              class: 'input-currency select-currency',
                              id: 'selectCurrencyFrom',
                            }),
                          ]),
                          el('div', { class: 'input-block block-rigth' }, [
                            el('label', { class: 'label label-currency' }, 'в'),
                            el('select', {
                              class: 'input-currency select-currency',
                              id: 'selectCurrencyTo',
                            }),
                          ]),
                        ]),
                        el('div', { class: 'form-input__container-bottom' }, [
                          el('div', { class: 'input-block block-bottom' }, [
                            el(
                              'label',
                              { class: 'label label-currency_amount' },
                              'Сумма'
                            ),
                            el('input', {
                              class: 'input input-currency__amount',
                              id: 'inputCurrencyAmount',
                            }),
                          ]),
                        ]),
                      ]
                    ),
                    el('button', { class: 'btn btn-Change' }, 'Обменять'),
                  ]
                ),
              ]),
            ]
          ),
        ]),
        el(
          'div',
          {
            class:
              'currency-conversions-window currency-conversions-window__right border-window',
          },
          [
            el(
              'h2',
              { class: 'window-title' },
              'Изменение курсов в реальном времени'
            ),
            el('div', { class: 'currency-online-list currency-list' }),
          ]
        ),
      ]
    ),
  ]);
  return mainCurrencyConversions;
}

function createCurrencyOnlineTr(from, to, rate, dashedColor, vector) {
  const createCurrencyOnlineTr = el('div', { class: 'currency-online-tr' }, [
    el('span', { class: 'td_currency' }, `${from}/${to}`),
    el(
      'span',
      { class: 'td_dashed' },
      el('div', { class: `div_dashed-line ${dashedColor}` }, '')
    ),
    el('span', { class: 'td_price' }, `${rate}`),
    el('span', vector),
  ]);
  return createCurrencyOnlineTr;
}

function createVectorGreen() {
  const vector = el('span', {
    class: 'vector',
  });
  vector.innerHTML =
    '<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 10L10 0L0 10L20 10Z" fill="#76CA66"/></svg>';
  return vector;
}

function createVectorRed() {
  const vector = el('span', {
    class: 'vector',
  });
  vector.innerHTML =
    '<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L10 10L20 0H0Z" fill="#FD4E5D"/></svg>';
  return vector;
}

function createYourCurrencyItem(code, amount) {
  const createYourCurrencyItem = el('div', { class: 'currency-online-tr' }, [
    el('span', { class: 'td_currency' }, `${code}`),
    el(
      'span',
      { class: 'td_dashed' },
      el('div', { class: `div_dashed-line` }, '')
    ),
    el('span', { class: 'td_price' }, `${amount}`),
  ]);
  return createYourCurrencyItem;
}

function createSelectCurrencyOption(option) {
  const element = el('option', { class: 'option' }, option);
  return element;
}

export {
  mainCurrencyConversions,
  createCurrencyOnlineTr,
  createVectorRed,
  createVectorGreen,
  createYourCurrencyItem,
  createSelectCurrencyOption,
};
