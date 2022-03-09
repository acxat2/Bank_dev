import { isValidAuth } from '../src/validations';
import {
  formatSummColor,
  formatSumm,
  formatAmouth,
} from '../src/helpsFunctions';

test('Проверка логина и пароля должна пропускать значения длинной >= 6 символов', () => {
  expect(isValidAuth('deve')).toBe(false);
});

test('проверка логина и пароля не должна пропускать пробельные символы', () => {
  expect(isValidAuth('skil lbox')).toBe(false);
});

test('проверка положжительного значения должна в начале содержать "+ "', () => {
  expect(formatSummColor('12')).toBe(`+ 12`);
});

test('проверка отрицатеьльного значения должна в начале содержать "- "', () => {
  expect(formatSummColor('-12')).toBe(`- 12`);
});

test('проверка формата суммы должна в конце содержать " ₽"', () => {
  expect(formatSumm('123')).toBe(`123 ₽`);
});

test('проверка формата суммы должна выводить значение разделённое пробелом через каждые 3 знака', () => {
  expect(formatAmouth('123456789')).toBe(`123&nbsp;456&nbsp;789`);
});
