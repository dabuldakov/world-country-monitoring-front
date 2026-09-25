import { normalizePopulation } from './Population';

describe('normalizePopulation', () => {
  test('maps World Bank values, removes missing records, and sorts years', () => {
    const data = [
      { date: '2024', value: 2000000 },
      { date: '2022', value: null },
      { date: '2023', value: 1000000 },
    ];

    expect(normalizePopulation(data).map(({ date, population }) => ({ date, population }))).toEqual([
      { date: '2023', population: 1 },
      { date: '2024', population: 2 },
    ]);
  });

  test('normalizes backend records in millions', () => {
    const data = [
      { date: '2025-12-01', population: 143513328, countryCode: 'RUS' },
      { date: '2020-12-01', population: '145245148', countryCode: 'RUS' },
    ];

    expect(normalizePopulation(data).map(({ date, population }) => ({ date, population }))).toEqual([
      { date: '2020', population: 145.245148 },
      { date: '2025', population: 143.513328 },
    ]);
  });

  test('supports legacy population records and extracts the year from dates', () => {
    const data = [
      { date: '2020-01-01', population: 3000000 },
      { year: '2021', population: '4000000' },
    ];

    expect(normalizePopulation(data).map(({ date, population }) => ({ date, population }))).toEqual([
      { date: '2020', population: 3 },
      { date: '2021', population: 4 },
    ]);
  });

  test('filters malformed values without mutating the source', () => {
    const data = [
      { date: '2024', population: 'not-a-number' },
      { date: '2023', population: 0 },
      { date: '2022', population: 1000000 },
    ];

    expect(normalizePopulation(data).map(({ date, population }) => ({ date, population }))).toEqual([
      { date: '2022', population: 1 },
      { date: '2023', population: 0 },
    ]);
    expect(data[0]).toEqual({ date: '2024', population: 'not-a-number' });
  });
});
