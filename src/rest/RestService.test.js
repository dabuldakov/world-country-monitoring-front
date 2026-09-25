import { fetchDataPopulation } from './RestService';

describe('fetchDataPopulation', () => {
  const originalFetch = globalThis.fetch;
  let consoleError;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    consoleError.mockRestore();
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

  test('returns an empty list for a missing response body', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(null),
    });

    await expect(fetchDataPopulation({ selectedCountry: 'RUS' })).resolves.toEqual([]);
  });

  test('returns an empty list for an unsuccessful response', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Service Unavailable',
    });

    await expect(fetchDataPopulation({ selectedCountry: 'RUS' })).resolves.toEqual([]);
    expect(consoleError).toHaveBeenCalled();
  });

  test('returns an empty list when the request fails', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('network error'));

    await expect(fetchDataPopulation({ selectedCountry: 'RUS' })).resolves.toEqual([]);
    expect(consoleError).toHaveBeenCalled();
  });

  test('returns an empty list when JSON parsing fails', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockRejectedValue(new Error('invalid json')),
    });

    await expect(fetchDataPopulation({ selectedCountry: 'RUS' })).resolves.toEqual([]);
    expect(consoleError).toHaveBeenCalled();
  });
});
