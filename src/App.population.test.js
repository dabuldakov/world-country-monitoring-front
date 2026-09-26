import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { fetchDataCountries, fetchDataPopulation } from './rest/RestService';

jest.mock('./rest/RestService', () => ({
  fetchDataCountries: jest.fn(),
  fetchDataPopulation: jest.fn(),
  fetchDataPopulationAllCountries: jest.fn(() => Promise.resolve([])),
  registerVisit: jest.fn(() => Promise.resolve({ count: 1 })),
  submitFeedback: jest.fn(),
}));

jest.mock('./tabs/Tabs', () => ({
  GetMainTabs: () => <div>Economic content</div>,
}));

jest.mock('./chart/Population', () => ({
  BarColumnPopulationAllCountries: () => <output data-testid="population-countries-chart" />,
  PopulationSimpleLine: ({ data }) => <output data-testid="population-chart">{data.length}</output>,
}));

describe('App population flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'ru-RU',
    });
    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      value: ['ru-RU'],
    });
    fetchDataCountries.mockResolvedValue([
      { code: 'RUS', name: 'Russia' },
      { code: 'USA', name: 'United States' },
    ]);
    fetchDataPopulation.mockResolvedValue([
      { date: '2020-12-01', population: 145245148, countryCode: 'RUS' },
      { date: '2021-12-01', population: 146000000, countryCode: 'RUS' },
    ]);
  });

  test('opens social tab and loads population for the selected country', async () => {
    render(<App />);

    userEvent.click(await screen.findByRole('button', { name: 'Социальное' }));

    expect(await screen.findByText('Население: 2020–2021')).toBeInTheDocument();
    expect(screen.getByTestId('population-chart')).toHaveTextContent('2');
    await waitFor(() => expect(fetchDataPopulation).toHaveBeenCalledWith({ selectedCountry: 'RUS' }));
  });
});
