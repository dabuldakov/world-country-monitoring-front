import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
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
          <Tooltip />
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
        <Tooltip />
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
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8"/>
      </BarChart>
    </ResponsiveContainer>
  );
}