import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
const SELECTED_BAR_COLOR = '#2e7d32';
const DEFAULT_BAR_COLOR = '#8884d8';

function useCountryBarClick() {
  const { setSelectedCountry } = useApplicationContext();

  const onBarClick = (entry) => {
    if (entry?.countryCode) {
      setSelectedCountry(entry.countryCode);
    }
  };

  const onChartClick = (state) => {
    const code = state?.activeLabel ?? state?.activePayload?.[0]?.payload?.countryCode;
    if (code) {
      setSelectedCountry(code);
    }
  };

  return { onBarClick, onChartClick };
}

function countryCells(data, selectedCountry) {
  return data.map((entry, index) => (
    <Cell
      key={`${entry?.countryCode ?? index}-${index}`}
      fill={entry?.countryCode === selectedCountry ? SELECTED_BAR_COLOR : DEFAULT_BAR_COLOR}
    />
  ));
}

export function BarColumnDebtGrossAllCountries({ data }) {
  const { locale, selectedCountry, t } = useApplicationContext();
  const { onBarClick, onChartClick } = useCountryBarClick();
  const formatValue = (value) => formatNumber(value, locale);
  const chartData = sortDescending(Array.isArray(data) ? data : [], 'percentageToGDP');

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onClick={onChartClick}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" tickFormatter={(value) => getCountryName({ code: value }, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip content={<CustomTooltip valueLabel={t('debtToGdp')} />} />
        <Legend />
        <Bar dataKey="percentageToGDP" name={t('debtToGdp')} fill={DEFAULT_BAR_COLOR} activeBar={{ fill: ACTIVE_BAR_COLOR }} onClick={onBarClick}>
          {countryCells(chartData, selectedCountry)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BarColumnGrossDataAllCountries({ data }) {
  const { locale, selectedCountry, t } = useApplicationContext();
  const { onBarClick, onChartClick } = useCountryBarClick();
  const formatValue = (value) => formatNumber(value, locale);
  const chartData = normalizeGrossData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onClick={onChartClick}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" tickFormatter={(value) => getCountryName({ code: value }, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip content={<CustomTooltip valueLabel={t('current')} />} />
        <Legend />
        <Bar dataKey="current" name={t('current')} fill={DEFAULT_BAR_COLOR} activeBar={{ fill: ACTIVE_BAR_COLOR }} onClick={onBarClick}>
          {countryCells(chartData, selectedCountry)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BarColumnGdpPerCapitaAllCountries({ data }) {
  const { locale, selectedCountry, t } = useApplicationContext();
  const { onBarClick, onChartClick } = useCountryBarClick();
  const formatValue = (value) => formatNumber(value, locale);
  const chartData = sortDescending(Array.isArray(data) ? data : [], 'amount');

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onClick={onChartClick}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" tickFormatter={(value) => getCountryName({ code: value }, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip content={<CustomTooltip valueLabel={t('gdpPerCapita')} />} />
        <Legend />
        <Bar dataKey="amount" name={t('gdpPerCapita')} fill={DEFAULT_BAR_COLOR} activeBar={{ fill: ACTIVE_BAR_COLOR }} onClick={onBarClick}>
          {countryCells(chartData, selectedCountry)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BarColumnDebtAmountAllCountries({ data }) {
  const { locale, selectedCountry, t } = useApplicationContext();
  const { onBarClick, onChartClick } = useCountryBarClick();
  const formatValue = (value) => formatNumber(value, locale);
  const chartData = normalizeDebtAmountData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onClick={onChartClick}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" tickFormatter={(value) => getCountryName({ code: value }, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip content={<CustomTooltip valueLabel={t('debtAmount')} />} />
        <Legend />
        <Bar dataKey="foreign" name={t('debtAmount')} fill={DEFAULT_BAR_COLOR} activeBar={{ fill: ACTIVE_BAR_COLOR }} onClick={onBarClick}>
          {countryCells(chartData, selectedCountry)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BarColumnLifeExpectancyAllCountries({ data }) {
  const { locale, selectedCountry, t } = useApplicationContext();
  const { onBarClick, onChartClick } = useCountryBarClick();
  const formatValue = (value) => formatNumber(value, locale);
  const chartData = sortDescending(Array.isArray(data) ? data : [], 'years');

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onClick={onChartClick}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" tickFormatter={(value) => getCountryName({ code: value }, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip content={<CustomTooltip valueLabel={t('lifeExpectancy')} />} />
        <Legend />
        <Bar dataKey="years" name={t('lifeExpectancy')} fill={DEFAULT_BAR_COLOR} activeBar={{ fill: ACTIVE_BAR_COLOR }} onClick={onBarClick}>
          {countryCells(chartData, selectedCountry)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BarColumnReservesAllCountries({ data }) {
  const { locale, selectedCountry, t } = useApplicationContext();
  const { onBarClick, onChartClick } = useCountryBarClick();
  const formatValue = (value) => formatNumber(value, locale);
  const chartData = normalizeReservesData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onClick={onChartClick}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" tickFormatter={(value) => getCountryName({ code: value }, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip content={<CustomTooltip valueLabel={t('amount')} />} />
        <Legend />
        <Bar dataKey="amount" name={t('amount')} fill={DEFAULT_BAR_COLOR} activeBar={{ fill: ACTIVE_BAR_COLOR }} onClick={onBarClick}>
          {countryCells(chartData, selectedCountry)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function normalizeReservesData(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeReservesData:', data);
    return [];
  }
  return sortDescending(
    data.map((item) => ({
      ...item,
      amount: normalizeNumber(item.amount),
    })),
    'amount',
  );
}

function normalizeDebtAmountData(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeDebtAmountData:', data);
    return [];
  }
  return sortDescending(
    data.map((item) => ({
      ...item,
      foreign: normalizeNumber(item.foreign),
    })),
    'foreign',
  );
}

function normalizeGrossData(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeGrossData:', data);
    return [];
  }
  return sortDescending(
    data.map((item) => ({
      ...item,
      current: normalizeNumber(item.current),
    })),
    'current',
  );
}

function sortDescending(data, key) {
  return [...data].sort((left, right) => {
    const leftValue = left?.[key] ?? 0;
    const rightValue = right?.[key] ?? 0;
    return rightValue - leftValue;
  });
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
