import { fetchDataPopulation } from './RestService';

describe('fetchDataPopulation', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test('loads population history from the backend', async () => {
    const records = [
      { date: '2025-12-01', population: 143513328, countryCode: 'RUS' },
      { date: '1960-12-01', population: 119897000, countryCode: 'RUS' },
    ];
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(records),
    });

    await expect(fetchDataPopulation({ selectedCountry: 'RUS' })).resolves.toEqual(records);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/wcm/v0/population/country/RUS',
    );
  });

  test('returns an empty list for an invalid response', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(null),
    });

    await expect(fetchDataPopulation({ selectedCountry: 'RUS' })).resolves.toEqual([]);
  });
});
