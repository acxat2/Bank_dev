import { el } from 'redom';

export function createUlFromText(item) {
  return el(
    'ul',
    item.map((item) => el('li', item))
  );
}
