import {
    LineChart, 
    Line, 
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

    const NORMILIZE_NUMBER = 1000000;

    export function SimpleLineMonetaryReserves({ data }) {
        return (
          <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={500}
            height={300}
            data={normalizeSimpleLineMonetaryReserves(data)}
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
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }}  strokeWidth={2} />
            <Line type="monotone" dataKey="foreignExchange" label = "foreign exchange" stroke="#C71585"  strokeWidth={2} />
            <Line type="monotone" dataKey="monetaryGold" label="monetary gold" stroke="#55ca9d"  strokeWidth={2} />
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
        data={normalizeSimpleLineGross(data)}
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
        <Line type="monotone" dataKey="absolut" stroke="#C71585" activeDot={{ r: 8 }}  strokeWidth={2} />
        <Line type="monotone" dataKey="purchasingPowerParities" label = "foreign exchange" stroke="#82ca9d"  strokeWidth={2} />
        <Line type="monotone" dataKey="current" label = "current" stroke="#8884d8"  strokeWidth={2} />
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
        data={normalizeSimpleLineDept(data)}
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
        <Line type="monotone" dataKey="foreign" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
      </ResponsiveContainer>
    );
  }

  export function SimpleLineDeptGross({ data }) {
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
        <Line type="monotone" dataKey="ratioPercentage" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
      </ResponsiveContainer>
    );
  }

  function normalizeSimpleLineMonetaryReserves(data) {
    if (!Array.isArray(data)) {
      console.error('Invalid data passed to normalizeSimpleLineMonetaryReserves:', data);
      return [];
    }
    return data.map(item => ({
      ...item,
      amount: normalizeNumber(item.amount),
      foreignExchange: normalizeNumber(item.foreignExchange),
      monetaryGold: normalizeNumber(item.monetaryGold),
    }));
  }

  function normalizeSimpleLineGross(data) {
    if (!Array.isArray(data)) {
      console.error('Invalid data passed to normalizeSimpleLineGross:', data);
      return [];
    }
    return data.map(item => ({
      ...item,
      absolut: normalizeNumber(item.absolut),
      purchasingPowerParities: normalizeNumber(item.purchasingPowerParities),
      current: normalizeNumber(item.current),
    }));
  }

  function normalizeSimpleLineDept(data) {
    if (!Array.isArray(data)) {
      console.error('Invalid data passed to normalizeSimpleLineDept:', data);
      return [];
    }
    return data.map(item => ({
      ...item,
      foreign: normalizeNumber(item.foreign),
    }));
  }

  const normalizeNumber = ( number ) => {
    return number !== undefined ? number / NORMILIZE_NUMBER : undefined;
  };