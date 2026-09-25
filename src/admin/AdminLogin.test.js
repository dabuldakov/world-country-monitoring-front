import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AdminLogin } from './AdminLogin';
import { adminLogin } from '../rest/RestService';
import { useApplicationContext } from '../provider/CountriesProvider';

jest.mock('../rest/RestService', () => ({
  adminLogin: jest.fn(),
}));

jest.mock('../provider/CountriesProvider', () => ({
  useApplicationContext: jest.fn(),
}));

describe('AdminLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useApplicationContext.mockReturnValue({ t: (key) => key });
  });

  test('calls onLogin with the received token', async () => {
    adminLogin.mockResolvedValue({ token: 'admin-token' });
    const onLogin = jest.fn();

    render(<AdminLogin onLogin={onLogin} />);

    userEvent.type(screen.getByLabelText(/login/), 'admin');
    userEvent.type(screen.getByLabelText(/password/), 'secret');
    userEvent.click(screen.getByRole('button', { name: 'signIn' }));

    await waitFor(() => expect(onLogin).toHaveBeenCalledWith('admin-token'));
  });

  test('shows an error for invalid credentials', async () => {
    adminLogin.mockRejectedValue({ status: 401, message: 'unauthorized' });

    render(<AdminLogin onLogin={jest.fn()} />);

    userEvent.type(screen.getByLabelText(/login/), 'admin');
    userEvent.type(screen.getByLabelText(/password/), 'wrong');
    userEvent.click(screen.getByRole('button', { name: 'signIn' }));

    expect(await screen.findByText('adminLoginError')).toBeInTheDocument();
  });
});
