import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AdminDashboard } from './AdminDashboard';
import {
  enqueueRefreshJob,
  fetchAdminFeedback,
  fetchAdminVisits,
  fetchCountryStatuses,
  fetchFeatureStatuses,
  fetchLastRefill,
  triggerRefillAll,
} from '../rest/RestService';
import { useApplicationContext } from '../provider/CountriesProvider';

jest.mock('../rest/RestService', () => ({
  enqueueRefreshJob: jest.fn(),
  fetchAdminFeedback: jest.fn(),
  fetchAdminVisits: jest.fn(),
  fetchCountryStatuses: jest.fn(),
  fetchFeatureStatuses: jest.fn(),
  fetchLastRefill: jest.fn(),
  fetchRefreshJob: jest.fn(),
  retryRefreshJob: jest.fn(),
  triggerFeatureRefillAll: jest.fn(),
  triggerFeatureRefillCountry: jest.fn(),
  triggerRefillAll: jest.fn(),
  triggerRefillCountry: jest.fn(),
}));

jest.mock('../provider/CountriesProvider', () => ({
  useApplicationContext: jest.fn(),
}));

describe('AdminDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useApplicationContext.mockReturnValue({ t: (key) => key });
    fetchAdminFeedback.mockResolvedValue([
      { id: 1, email: 'user@example.com', message: 'Add more charts', createdAt: '2026-01-01T00:00:00' },
    ]);
    fetchAdminVisits.mockResolvedValue({ count: 7 });
    fetchFeatureStatuses.mockResolvedValue([
      {
        feature: 'population',
        lastUpdatedAtEpochMillis: 1700000000000,
        status: 'SUCCESS',
        processedCount: 1,
      },
    ]);
    fetchCountryStatuses.mockResolvedValue([
      {
        feature: 'population',
        countryCode: 'RUS',
        lastUpdatedAtEpochMillis: 1700000000000,
        status: 'SUCCESS',
      },
    ]);
    fetchLastRefill.mockResolvedValue({
      operation: 'RUS',
      status: 'SUCCESS',
      processedCount: 1,
      startedAt: '2026-01-01T00:00:00',
      finishedAt: '2026-01-01T00:00:01',
    });
    triggerRefillAll.mockResolvedValue({
      operation: 'all',
      status: 'SUCCESS',
      processedCount: 10,
      startedAt: '2026-01-01T00:00:00',
      finishedAt: '2026-01-01T00:00:01',
    });
  });

  test('shows visits, feedback and last refill result', async () => {
    render(<AdminDashboard token="admin-token" onLogout={jest.fn()} />);

    expect(await screen.findByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByText(/7/)).toBeInTheDocument();
    expect(screen.getAllByText(/SUCCESS/).length).toBeGreaterThan(0);
    expect(screen.getAllByText('featurePopulation').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Russia|RUS/).length).toBeGreaterThan(0);
  });

  test('queues refresh job for one feature and one country', async () => {
    enqueueRefreshJob.mockResolvedValue({
      id: 1,
      feature: 'population',
      countryCode: 'RUS',
      status: 'QUEUED',
      total: 1,
      processed: 0,
      failed: 0,
    });

    render(<AdminDashboard token="admin-token" onLogout={jest.fn()} />);
    await screen.findByText('user@example.com');

    userEvent.click(screen.getAllByRole('button', { name: 'refreshCountry' })[3]);

    await waitFor(() =>
      expect(enqueueRefreshJob).toHaveBeenCalledWith('admin-token', 'population', 'RUS'),
    );
  });

  test('runs full refill from the dashboard', async () => {
    render(<AdminDashboard token="admin-token" onLogout={jest.fn()} />);

    await screen.findByText('user@example.com');
    userEvent.click(screen.getByRole('button', { name: 'refillAll' }));

    await waitFor(() => expect(triggerRefillAll).toHaveBeenCalledWith('admin-token'));
  });
});
