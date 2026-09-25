import { render, screen } from '@testing-library/react';

import { PopulationSimpleLine } from './Population';
import { useApplicationContext } from '../provider/CountriesProvider';

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children, data }) => (
    <div data-testid="line-chart" data-points={JSON.stringify(data)}>
      {children}
    </div>
  ),
  CartesianGrid: () => null,
  Legend: () => null,
  Line: ({ dataKey, name }) => <span data-testid="population-line" data-key={dataKey} data-name={name} />,
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null,
}));

jest.mock('../provider/CountriesProvider', () => ({
  useApplicationContext: jest.fn(),
}));

describe('PopulationSimpleLine', () => {
  beforeEach(() => {
    useApplicationContext.mockReturnValue({
      locale: 'en',
      t: (key) => key,
    });
  });

  test('passes sorted normalized data and population line configuration to the chart', () => {
    render(
      <PopulationSimpleLine
        data={[
          { date: '2025-12-01', population: 2000000 },
          { date: '2020-12-01', population: 1000000 },
        ]}
      />,
    );

    expect(screen.getByTestId('line-chart')).toHaveAttribute(
      'data-points',
      JSON.stringify([
        { date: '2020', population: 1 },
        { date: '2025', population: 2 },
      ]),
    );
    expect(screen.getByTestId('population-line')).toHaveAttribute('data-key', 'population');
    expect(screen.getByTestId('population-line')).toHaveAttribute('data-name', 'population');
  });
});
