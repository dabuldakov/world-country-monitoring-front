import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatDate, formatNumber } from '../i18n/locales';
import { useApplicationContext } from '../provider/CountriesProvider';

const NORMALIZE_NUMBER = 1000000;

export function PopulationSimpleLine({ data }) {
  const { locale, t } = useApplicationContext();
  const formatValue = (value) => formatNumber(value, locale);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={normalizePopulation(data)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(value) => formatDate(value, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip labelFormatter={(value) => formatDate(value, locale)} formatter={formatValue} />
        <Legend />
        <Line type="monotone" dataKey="population" name={t('population')} stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function normalizePopulation(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizePopulation:', data);
    return [];
  }
  return data.map((item) => ({
    ...item,
    population: normalizeNumber(item.population),
  }));
}

function normalizeNumber(value) {
  return value === null || value === undefined ? value : value / NORMALIZE_NUMBER;
}
