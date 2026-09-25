import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { fetchDataCountries } from './rest/RestService';

jest.mock('./rest/RestService', () => ({
  fetchDataCountries: jest.fn(() => Promise.resolve([])),
}));

jest.mock('./tabs/Tabs', () => ({
  GetMainTabs: () => <div>Economic content</div>,
}));

jest.mock('./tabs/SocialTab', () => ({
  GetSocialTab: () => <div>Social content</div>,
}));

describe('App localization', () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'ru-RU',
    });
    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      value: ['ru-RU'],
    });
  });

  test('uses the browser locale for the interface and country data', async () => {
    render(<App />);

    expect(await screen.findByText('Мониторинг стран')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('ru');
    expect(document.documentElement.dir).toBe('ltr');
    await waitFor(() => expect(fetchDataCountries).toHaveBeenCalled());
  });
});
