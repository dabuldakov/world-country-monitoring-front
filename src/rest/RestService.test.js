import {
  adminLogin,
  enqueueRefreshJob,
  fetchAdminVisits,
  fetchDataPopulation,
  fetchFeatureStatuses,
  fetchRefreshJob,
  registerVisit,
  retryRefreshJob,
  submitFeedback,
  triggerFeatureRefillCountry,
} from './RestService';

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
      expect.objectContaining({ method: 'GET' }),
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

describe('site API', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test('registers a visit with the frontend client header', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ count: 1 }),
    });

    await expect(registerVisit()).resolves.toEqual({ count: 1 });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/wcm/v0/visits',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'X-WCM-Client': expect.any(String) }),
      }),
    );
  });

  test('submits feedback', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: jest.fn().mockResolvedValue({ id: 1, email: 'user@example.com' }),
    });

    await expect(
      submitFeedback({ email: 'user@example.com', message: 'Add charts' }),
    ).resolves.toEqual({ id: 1, email: 'user@example.com' });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/wcm/v0/feedback',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'user@example.com', message: 'Add charts' }),
      }),
    );
  });

  test('logs in as admin', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ token: 'admin-token' }),
    });

    await expect(adminLogin({ login: 'admin', password: 'secret' })).resolves.toEqual({
      token: 'admin-token',
    });
  });

  test('throws an error with status for unauthorized admin request', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
    });

    await expect(fetchAdminVisits('expired-token')).rejects.toMatchObject({ status: 401 });
  });

  test('sends bearer token for admin requests', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ count: 5 }),
    });

    await expect(fetchAdminVisits('admin-token')).resolves.toEqual({ count: 5 });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/wcm/v0/admin/visits',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer admin-token' }),
      }),
    );
  });

  test('loads per-feature refresh statuses', async () => {
    const statuses = [{ feature: 'population', status: 'SUCCESS' }];
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(statuses),
    });

    await expect(fetchFeatureStatuses('admin-token')).resolves.toEqual(statuses);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/wcm/v0/admin/refill/status',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer admin-token' }),
      }),
    );
  });

  test('triggers refill for one feature and country', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ status: 'SUCCESS' }),
    });

    await expect(
      triggerFeatureRefillCountry('admin-token', 'population', 'RUS'),
    ).resolves.toEqual({ status: 'SUCCESS' });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/wcm/v0/admin/refill/population/country/RUS',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  test('enqueues refresh job', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ id: 1, status: 'QUEUED' }),
    });

    await expect(
      enqueueRefreshJob('admin-token', 'population', 'RUS'),
    ).resolves.toEqual({ id: 1, status: 'QUEUED' });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/wcm/v0/admin/refill/jobs',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ feature: 'population', countryCode: 'RUS' }),
      }),
    );
  });

  test('loads refresh job and retries failed countries', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ id: 1, status: 'PARTIAL', failed: 1 }),
    });

    await expect(fetchRefreshJob('admin-token', 1)).resolves.toEqual({
      id: 1,
      status: 'PARTIAL',
      failed: 1,
    });
    await expect(retryRefreshJob('admin-token', 1)).resolves.toEqual({
      id: 1,
      status: 'PARTIAL',
      failed: 1,
    });
  });
});
