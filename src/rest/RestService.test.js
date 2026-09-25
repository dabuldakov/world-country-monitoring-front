import { fetchDataPopulation } from './RestService';

describe('fetchDataPopulation', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test('loads the complete World Bank population history', async () => {
    const records = [
      { date: '2025', value: 143513328 },
      { date: '1960', value: 119897000 },
    ];
    const response = [
      { page: 1, pages: 1, total: 2 },
      records,
    ];
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(response),
    });

    await expect(fetchDataPopulation({ selectedCountry: 'RUS' })).resolves.toEqual(records);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://api.worldbank.org/v2/country/RUS/indicator/SP.POP.TOTL?format=json&per_page=1000',
    );
  });

  test('returns an empty list for an invalid response', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    await expect(fetchDataPopulation({ selectedCountry: 'RUS' })).resolves.toEqual([]);
  });
});
