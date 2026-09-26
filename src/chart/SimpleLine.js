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

export function SimpleLineMonetaryReserves({ data }) {
  const { locale, t } = useApplicationContext();
  const formatValue = (value) => formatNumber(value, locale);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={normalizeMonetaryReserves(data)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(value) => formatDate(value, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip labelFormatter={(value) => formatDate(value, locale)} formatter={formatValue} />
        <Legend />
        <Line type="monotone" dataKey="amount" name={t('totalReserves')} stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
        <Line type="monotone" dataKey="foreignExchange" name={t('foreignExchange')} stroke="#C71585" strokeWidth={2} />
        <Line type="monotone" dataKey="monetaryGold" name={t('monetaryGold')} stroke="#55ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SimpleLineGross({ data }) {
  const { locale, t } = useApplicationContext();
  const formatValue = (value) => formatNumber(value, locale);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={normalizeGross(data)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(value) => formatDate(value, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip labelFormatter={(value) => formatDate(value, locale)} formatter={formatValue} />
        <Legend />
        <Line type="monotone" dataKey="absolut" name={t('grossDomesticProduct')} stroke="#C71585" activeDot={{ r: 8 }} strokeWidth={2} />
        <Line type="monotone" dataKey="purchasingPowerParities" name={t('purchasingPowerParities')} stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="current" name={t('current')} stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SimpleLineGdpPerCapita({ data }) {
  const { locale, t } = useApplicationContext();
  const formatValue = (value) => formatNumber(value, locale);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={Array.isArray(data) ? data : []}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(value) => formatDate(value, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip labelFormatter={(value) => formatDate(value, locale)} formatter={formatValue} />
        <Legend />
        <Line type="monotone" dataKey="amount" name={t('gdpPerCapita')} stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SimpleLineDept({ data }) {
  const { locale, t } = useApplicationContext();
  const formatValue = (value) => formatNumber(value, locale);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={normalizeDebt(data)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(value) => formatDate(value, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip labelFormatter={(value) => formatDate(value, locale)} formatter={formatValue} />
        <Legend />
        <Line type="monotone" dataKey="foreign" name={t('foreignDebt')} stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SimpleLineDeptGross({ data }) {
  const { locale, t } = useApplicationContext();
  const formatValue = (value) => formatNumber(value, locale);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(value) => formatDate(value, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip labelFormatter={(value) => formatDate(value, locale)} formatter={formatValue} />
        <Legend />
        <Line type="monotone" dataKey="ratioPercentage" name={t('debtToGdp')} stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SimpleLineLifeExpectancy({ data }) {
  const { locale, t } = useApplicationContext();
  const formatValue = (value) => formatNumber(value, locale);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={normalizeLifeExpectancy(data)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(value) => formatDate(value, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip labelFormatter={(value) => formatDate(value, locale)} formatter={formatValue} />
        <Legend />
        <Line type="monotone" dataKey="years" name={t('lifeExpectancy')} stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SimpleLineMoneySupply({ data }) {
  const { locale, t } = useApplicationContext();
  const formatValue = (value) => formatNumber(value, locale);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={normalizeMoneySupply(data)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(value) => formatDate(value, locale)} />
        <YAxis tickFormatter={formatValue} />
        <Tooltip labelFormatter={(value) => formatDate(value, locale)} formatter={formatValue} />
        <Legend />
        <Line type="monotone" dataKey="amountUsd" name={t('moneySupply')} stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function normalizeMonetaryReserves(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeMonetaryReserves:', data);
    return [];
  }
  return data.map((item) => ({
    ...item,
    amount: normalizeNumber(item.amount),
    foreignExchange: normalizeNumber(item.foreignExchange),
    monetaryGold: normalizeNumber(item.monetaryGold),
  }));
}

function normalizeGross(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeGross:', data);
    return [];
  }
  return data.map((item) => ({
    ...item,
    absolut: normalizeNumber(item.absolut),
    purchasingPowerParities: normalizeNumber(item.purchasingPowerParities),
    current: normalizeNumber(item.current),
  }));
}

function normalizeDebt(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeDebt:', data);
    return [];
  }
  return data.map((item) => ({
    ...item,
    foreign: normalizeNumber(item.foreign),
  }));
}

function normalizeLifeExpectancy(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeLifeExpectancy:', data);
    return [];
  }
  return data;
}

function normalizeMoneySupply(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeMoneySupply:', data);
    return [];
  }
  return data.map((item) => ({
    ...item,
    amountUsd: normalizeNumber(item.amountUsd),
  }));
}

function normalizeNumber(value) {
  return value === null || value === undefined ? value : value / NORMALIZE_NUMBER;
}
