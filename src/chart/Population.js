import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatNumber, getCountryName } from '../i18n/locales';
import { useApplicationContext } from '../provider/CountriesProvider';

const NORMALIZE_NUMBER = 1000000;
const ACTIVE_BAR_COLOR = '#ef4444';

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

export function BarColumnPopulationAllCountries({ data }) {
  const { locale, setSelectedCountry, t } = useApplicationContext();
  const formatValue = (value) => formatNumber(value, locale);

  const handleCountryClick = (entry) => {
    if (entry?.countryCode) {
      setSelectedCountry(entry.countryCode);
    }
  };

  const handleChartClick = (state) => {
    const code = state?.activeLabel ?? state?.activePayload?.[0]?.payload?.countryCode;
    if (code) {
      setSelectedCountry(code);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={normalizePopulationAllCountries(data)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        onClick={handleChartClick}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" tickFormatter={(value) => getCountryName({ code: value }, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip content={<PopulationTooltip valueLabel={t('population')} />} />
        <Legend />
        <Bar
          dataKey="population"
          name={t('population')}
          fill="#8884d8"
          activeBar={{ fill: ACTIVE_BAR_COLOR }}
          onClick={handleCountryClick}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function normalizePopulationAllCountries(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizePopulationAllCountries:', data);
    return [];
  }

  return data
    .map((item) => {
      if (!item) {
        return null;
      }
      return {
        ...item,
        population: normalizeNumber(item.population ?? item.value),
      };
    })
    .filter((item) => item && item.population !== null)
    .sort((left, right) => right.population - left.population);
}

function PopulationTooltip({ active, payload, valueLabel }) {
  const { countries, locale, t } = useApplicationContext();

  if (!active || !payload?.length || !payload[0]?.payload) {
    return null;
  }

  const item = payload[0].payload;
  const country = countries.find((countryItem) => countryItem.code === item.countryCode);
  const countryName = getCountryName(
    country || { code: item.countryCode, name: item.countryCode },
    locale,
  );

  return (
    <div style={{ background: '#fff', border: '1px solid #ccc', padding: 8 }}>
      <div><strong>{t('country')}: </strong>{countryName}</div>
      <div><strong>{valueLabel}: </strong>{formatNumber(payload[0].value, locale)}</div>
    </div>
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
