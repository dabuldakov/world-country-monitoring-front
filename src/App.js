import { useEffect, useState } from "react";
import BarColumn from "./chart/BarColumn";
import SimpleLine from "./chart/SimpleLine";

export default function App() {
  const [data, setdata] = useState();

  const filterData = (data) => {
    return data
    .map(({ Year, Population }) => ({ Year, Population }))
    .sort((a, b) => a.Year - b.Year);
  };

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
      const data = await res.json();
      const filteredData = filterData(data?.data || []);
      setdata(filteredData);
    };
    fetchDatas();
  }, []);

  return (
    <div className="App">How to use Recharts with React
      <BarColumn data={data} />
      <SimpleLine data={data} />
    </div>
  );
}