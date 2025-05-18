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

    const NORMILIZE_NUMBER = 1000000;

export function PopulationSimpleLine({ data }) {
    return (
      <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={normalizeGetPopulationSimpleLine(data)}
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
        <Line type="monotone" dataKey="population" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
      </ResponsiveContainer>
    );
}

    function normalizeGetPopulationSimpleLine(data) {
    if (!Array.isArray(data)) {
        console.error("Invalid data passed to normalizeGetPopulationSimpleLine:", data);
        return [];
    }
    return data.map(item => ({
        ...item,
        population: normalizeNumber(item.population)
    }));
    }

  const normalizeNumber = ( number ) => {
    return number !== undefined ? number / NORMILIZE_NUMBER : undefined
  }

