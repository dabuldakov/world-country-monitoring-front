import {
    LineChart, 
    Line, 
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

    export function SimpleLineMonetaryReserves({ data }) {
        return (
          <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="foreignExchange" label = "foreign exchange" stroke="#82ca9d" />
            <Line type="monotone" dataKey="monetaryGold" label="monetary gold" stroke="#55ca9d" />
          </LineChart>
          </ResponsiveContainer>
        );
   }

   export function SimpleLineGross({ data }) {
    return (
      <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="absolut" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="purchasingPowerParities" label = "foreign exchange" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>
    );
  }

  export function SimpleLineDept({ data }) {
    return (
      <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="foreign" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      </ResponsiveContainer>
    );
  }