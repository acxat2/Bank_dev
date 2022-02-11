import { el } from 'redom';

function mainEnter() {
  const mainEnter = el(
    // 'div',
    // { class: 'main' },
    // el(
    'div',
    { class: 'main-container container window-enter' },
    el('div', { class: 'window-enter__enter border-window' }, [
      el('h1', { class: 'enter-title title' }, 'Вход в аккаунт'),
      el('form', { name: 'enter', class: 'enter-form form', id: 'authForm' }, [
        el('div', { class: 'form-input__container' }, [
          el('div', { class: 'input-block input-block-enter block-login' }, [
            el('label', { class: 'label label-enter' }, 'Логин'),
            el('input', {
              class: 'input-enter input-login input',
              id: 'input-login',
              placeholder: 'Логин',
              value: 'developer',
            }),
          ]),
          el('div', { class: 'input-block input-block-enter block-password' }, [
            el('label', { class: 'label label-enter' }, 'Пароль'),
            el('input', {
              class: 'input-enter input-password input',
              id: 'input-password',
              placeholder: 'Пароль',
              value: 'skillbox',
            }),
          ]),
        ]),
        el('button', { class: 'btn btn-enter' }, 'Войти'),
      ]),
    ])
    // )
  );
  return mainEnter;
}

export { mainEnter };
