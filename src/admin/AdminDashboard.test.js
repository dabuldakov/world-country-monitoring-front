import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AdminDashboard } from './AdminDashboard';
import {
  fetchAdminFeedback,
  fetchAdminVisits,
  fetchLastRefill,
  triggerRefillAll,
} from '../rest/RestService';
import { useApplicationContext } from '../provider/CountriesProvider';

jest.mock('../rest/RestService', () => ({
  fetchAdminFeedback: jest.fn(),
  fetchAdminVisits: jest.fn(),
  fetchLastRefill: jest.fn(),
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
    expect(screen.getByText(/SUCCESS/)).toBeInTheDocument();
  });

  test('runs full refill from the dashboard', async () => {
    render(<AdminDashboard token="admin-token" onLogout={jest.fn()} />);

    await screen.findByText('user@example.com');
    userEvent.click(screen.getByRole('button', { name: 'refillAll' }));

    await waitFor(() => expect(triggerRefillAll).toHaveBeenCalledWith('admin-token'));
  });
});
