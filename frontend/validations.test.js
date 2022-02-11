import { isValidEmail } from './validations';

test('Проверка email должна пропускать корректнык значения', () => {
  expect(isValidEmail('email@email.com')).toBe(true);
});

test('проверка email не должна пропускать пробельные символы', () => {
  expect(isValidEmail('emale @emale.com')).toBe(false);
});
