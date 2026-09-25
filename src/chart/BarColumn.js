import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatNumber, getCountryName } from '../i18n/locales';
import { useApplicationContext } from '../provider/CountriesProvider';

const NORMALIZE_NUMBER = 1000000;
const ACTIVE_BAR_COLOR = '#ef4444';

function useCountryBarClick() {
  const { setSelectedCountry } = useApplicationContext();

  return (entry) => {
    if (entry?.countryCode) {
      setSelectedCountry(entry.countryCode);
    }
  };
}

export function BarColumnDebtGrossAllCountries({ data }) {
  const { locale, t } = useApplicationContext();
  const handleCountryClick = useCountryBarClick();
  const formatValue = (value) => formatNumber(value, locale);
  const chartData = Array.isArray(data) ? data : [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" tickFormatter={(value) => getCountryName({ code: value }, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip content={<CustomTooltip valueLabel={t('debtToGdp')} />} />
        <Legend />
        <Bar dataKey="percentageToGDP" name={t('debtToGdp')} fill="#8884d8" activeBar={{ fill: ACTIVE_BAR_COLOR }} onClick={handleCountryClick} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BarColumnGrossDataAllCountries({ data }) {
  const { locale, t } = useApplicationContext();
  const handleCountryClick = useCountryBarClick();
  const formatValue = (value) => formatNumber(value, locale);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={normalizeGrossData(data)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" tickFormatter={(value) => getCountryName({ code: value }, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip content={<CustomTooltip valueLabel={t('current')} />} />
        <Legend />
        <Bar dataKey="current" name={t('current')} fill="#8884d8" activeBar={{ fill: ACTIVE_BAR_COLOR }} onClick={handleCountryClick} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BarColumnReservesAllCountries({ data }) {
  const { locale, t } = useApplicationContext();
  const handleCountryClick = useCountryBarClick();
  const formatValue = (value) => formatNumber(value, locale);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={normalizeReservesData(data)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" tickFormatter={(value) => getCountryName({ code: value }, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip content={<CustomTooltip valueLabel={t('amount')} />} />
        <Legend />
        <Bar dataKey="amount" name={t('amount')} fill="#8884d8" activeBar={{ fill: ACTIVE_BAR_COLOR }} onClick={handleCountryClick} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function normalizeReservesData(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeReservesData:', data);
    return [];
  }
  return data.map((item) => ({
    ...item,
    amount: normalizeNumber(item.amount),
  }));
}

function normalizeGrossData(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeGrossData:', data);
    return [];
  }
  return data.map((item) => ({
    ...item,
    current: normalizeNumber(item.current),
  }));
}

function normalizeNumber(value) {
  return value === null || value === undefined ? value : value / NORMALIZE_NUMBER;
}

function CustomTooltip({ active, payload, valueLabel }) {
  const { countries, locale, t } = useApplicationContext();

  if (!active || !payload?.length || !payload[0]?.payload) {
    return null;
  }

  const item = payload[0].payload;
  const country = countries.find((countryItem) => countryItem.code === item.countryCode);
  const countryName = getCountryName(country || { code: item.countryCode, name: item.countryCode }, locale);

  return (
    <div style={{ background: '#fff', border: '1px solid #ccc', padding: 8 }}>
      <div><strong>{t('country')}: </strong>{countryName}</div>
      <div><strong>{valueLabel}: </strong>{formatNumber(payload[0].value, locale)}</div>
    </div>
  );
}
