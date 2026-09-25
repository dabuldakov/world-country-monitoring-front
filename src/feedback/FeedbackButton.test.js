import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FeedbackButton } from './FeedbackButton';
import { submitFeedback } from '../rest/RestService';
import { useApplicationContext } from '../provider/CountriesProvider';

jest.mock('../rest/RestService', () => ({
  submitFeedback: jest.fn(),
}));

jest.mock('../provider/CountriesProvider', () => ({
  useApplicationContext: jest.fn(),
}));

describe('FeedbackButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useApplicationContext.mockReturnValue({ t: (key) => key });
    submitFeedback.mockResolvedValue({ id: 1, email: 'user@example.com' });
  });

  test('submits feedback from the dialog', async () => {
    render(<FeedbackButton />);

    userEvent.click(screen.getByRole('button', { name: 'leaveFeedback' }));
    userEvent.type(screen.getByLabelText(/feedbackEmail/), 'user@example.com');
    userEvent.type(screen.getByLabelText(/feedbackMessage/), 'Add more indicators');
    userEvent.click(screen.getByRole('button', { name: 'feedbackSend' }));

    expect(await screen.findByText('feedbackSent')).toBeInTheDocument();
    expect(submitFeedback).toHaveBeenCalledWith({
      email: 'user@example.com',
      message: 'Add more indicators',
    });
  });
});
