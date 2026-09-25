import {
  SUPPORTED_LOCALES,
  getCountryForLocale,
  getDirection,
  normalizeLocale,
  translate,
} from './locales';

test('supports the ten selected languages', () => {
  expect(SUPPORTED_LOCALES).toHaveLength(10);
  expect(SUPPORTED_LOCALES).toEqual(['en', 'zh', 'hi', 'es', 'fr', 'ar', 'bn', 'pt', 'ru', 'ur']);
});

test('normalizes regional language tags', () => {
  expect(normalizeLocale('zh-Hant-TW')).toBe('zh');
  expect(normalizeLocale('de-DE')).toBeNull();
});

test('uses the browser region to choose the data country', () => {
  expect(getCountryForLocale('en', ['en-GB'])).toBe('GBR');
  expect(getCountryForLocale('pt', ['pt-BR'])).toBe('BRA');
});

test('falls back to a country associated with the language', () => {
  expect(getCountryForLocale('ru', ['ru'])).toBe('RUS');
  expect(getCountryForLocale('ar', ['ar'])).toBe('SAU');
});

test('translates text and interpolates values', () => {
  expect(translate('ru', 'appTitle')).toBe('Мониторинг стран');
  expect(translate('fr', 'allCountriesForYear', { year: 2024 })).toBe('Tous les pays en 2024');
});

test('marks Arabic and Urdu as right-to-left locales', () => {
  expect(getDirection('ar')).toBe('rtl');
  expect(getDirection('ur')).toBe('rtl');
  expect(getDirection('en')).toBe('ltr');
});
