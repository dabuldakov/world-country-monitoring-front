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

import { formatNumber } from '../i18n/locales';
import { useApplicationContext } from '../provider/CountriesProvider';

const NORMALIZE_NUMBER = 1000000;

function formatYear(value) {
  return value ? String(value) : '';
}

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
        <XAxis dataKey="date" tickFormatter={formatYear} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip labelFormatter={formatYear} formatter={formatValue} />
        <Legend />
        <Line type="monotone" dataKey="population" name={t('population')} stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function normalizePopulation(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizePopulation:', data);
    return [];
  }
  return data
    .map((item) => {
      if (!item) {
        return null;
      }
      return {
        ...item,
        date: String(item.date ?? item.year ?? '').slice(0, 4),
        population: normalizeNumber(item.population ?? item.value),
      };
    })
    .filter((item) => item && /^\d{4}$/.test(item.date) && item.population !== null)
    .sort((left, right) => Number(left.date) - Number(right.date));
}

function normalizeNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number / NORMALIZE_NUMBER : null;
}
