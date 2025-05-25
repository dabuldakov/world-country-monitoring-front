import { useCountriesContext } from '../provider/CountriesProvider';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

  const NORMILIZE_NUMBER = 1000000;

  export function BarColumnDebtGrossAllCountries({ data }) {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="countryCode" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="percentageToGDP" fill="#8884d8"/>
        </BarChart>
      </ResponsiveContainer>
    );
}

export function BarColumnGrossDataAllCountries({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={normalizeBarColumnGrossDataAllCountries(data)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="current" fill="#8884d8"/>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BarColumnReservesAllCountries({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={normalizeBarColumnReservesAllCountries(data)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="countryCode" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8"/>
      </BarChart>
    </ResponsiveContainer>
  );
}

function normalizeBarColumnReservesAllCountries(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeBarColumnReservesAllCountries:', data);
    return [];
  }
  return data.map(item => ({
    ...item,
    amount: normalizeNumber(item.amount),
  }));
}

function normalizeBarColumnGrossDataAllCountries(data) {
  if (!Array.isArray(data)) {
    console.error('Invalid data passed to normalizeBarColumnGrossDataAllCountries:', data);
    return [];
  }
  return data.map(item => ({
    ...item,
    current: normalizeNumber(item.current),
  }));
}

const normalizeNumber = ( number ) => {
  return number !== undefined ? number / NORMILIZE_NUMBER : undefined;
};

function CustomTooltip({ active, payload, label }) {
  const { countries } = useCountriesContext();
  if (active && payload && payload.length) {
    const countryCode = payload[0].payload.countryCode;
    const country = countries.find(c => c.code === countryCode);
    const countryName = country ? country.name : countryCode;
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 8 }}>
        <div><strong>Country </strong> {countryName}</div>
        <div><strong>Amount </strong> {payload[0].value}</div>
      </div>
    );
  }
  return null;
}