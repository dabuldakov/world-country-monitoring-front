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
});
