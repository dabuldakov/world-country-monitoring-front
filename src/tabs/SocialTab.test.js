import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GetSocialTab } from './SocialTab';
import {
  fetchDataLifeExpectancy,
  fetchDataLifeExpectancyAllCountries,
  fetchDataPopulation,
  fetchDataPopulationAllCountries,
} from '../rest/RestService';
import { useApplicationContext } from '../provider/CountriesProvider';

jest.mock('../rest/RestService', () => ({
  fetchDataLifeExpectancy: jest.fn(),
  fetchDataLifeExpectancyAllCountries: jest.fn(),
  fetchDataPopulation: jest.fn(),
  fetchDataPopulationAllCountries: jest.fn(),
}));

jest.mock('../provider/CountriesProvider', () => ({
  useApplicationContext: jest.fn(),
}));

jest.mock('../chart/Population', () => ({
  BarColumnPopulationAllCountries: () => <output data-testid="population-countries-chart" />,
  PopulationSimpleLine: ({ data }) => <output data-testid="population-chart">{data.length}</output>,
}));

describe('GetSocialTab', () => {
  let consoleError;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    useApplicationContext.mockReturnValue({
      selectedCountry: 'RUS',
      setSelectedCountry: jest.fn(),
      t: (key) => key,
    });
    fetchDataPopulationAllCountries.mockResolvedValue([]);
    fetchDataLifeExpectancy.mockResolvedValue([]);
    fetchDataLifeExpectancyAllCountries.mockResolvedValue([]);
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  test('shows loading state and renders population range after loading', async () => {
    let resolveRequest;
    fetchDataPopulation.mockImplementation(() => new Promise((resolve) => {
      resolveRequest = resolve;
    }));

    render(<GetSocialTab />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(fetchDataPopulation).toHaveBeenCalledWith({ selectedCountry: 'RUS' });

    await act(async () => {
      resolveRequest([
        { date: '2021-12-01', population: 146500000, countryCode: 'RUS' },
        { date: '2020-12-01', population: 145245148, countryCode: 'RUS' },
      ]);
    });

    expect(await screen.findByTestId('population-chart')).toHaveTextContent('2');
    expect(screen.getByText('population: 2020–2021')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  test('renders empty state for an empty response', async () => {
    fetchDataPopulation.mockResolvedValue([]);

    render(<GetSocialTab />);

    expect(await screen.findByText('population: —')).toBeInTheDocument();
    expect(screen.queryByTestId('population-chart')).not.toBeInTheDocument();
  });

  test('renders empty state and logs a request error', async () => {
    fetchDataPopulation.mockRejectedValue(new Error('request failed'));

    render(<GetSocialTab />);

    expect(await screen.findByText('population: —')).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();
  });

  test('switches between social tabs', async () => {
    fetchDataPopulation.mockResolvedValue([
      { date: '2020-12-01', population: 145245148, countryCode: 'RUS' },
    ]);

    render(<GetSocialTab />);
    await screen.findByTestId('population-chart');

    userEvent.click(screen.getByRole('tab', { name: 'withoutWork' }));
    expect(screen.getByRole('tab', { name: 'withoutWork' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.queryByTestId('population-chart')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('tab', { name: 'population' }));
    expect(screen.getByTestId('population-chart')).toBeInTheDocument();
  });

  test('ignores a stale response after country changes', async () => {
    let resolveFirstRequest;
    fetchDataPopulation
      .mockImplementationOnce(() => new Promise((resolve) => {
        resolveFirstRequest = resolve;
      }))
      .mockResolvedValueOnce([
        { date: '2021-12-01', population: 332000000, countryCode: 'USA' },
      ]);

    const { rerender } = render(<GetSocialTab />);
    expect(fetchDataPopulation).toHaveBeenCalledWith({ selectedCountry: 'RUS' });

    useApplicationContext.mockReturnValue({
      selectedCountry: 'USA',
      t: (key) => key,
    });
    rerender(<GetSocialTab />);

    expect(await screen.findByText('population: 2021–2021')).toBeInTheDocument();
    expect(screen.getByTestId('population-chart')).toHaveTextContent('1');

    await act(async () => {
      resolveFirstRequest([
        { date: '1960-12-01', population: 119897000, countryCode: 'RUS' },
      ]);
    });

    expect(screen.getByText('population: 2021–2021')).toBeInTheDocument();
    expect(screen.queryByText('population: 1960–1960')).not.toBeInTheDocument();
  });
});
