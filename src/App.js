import { useEffect, useState } from "react";
import BarColumn from "./chart/BarColumn";
import SimpleLine from "./chart/SimpleLine";

export default function App() {
  const [data, setdata] = useState();

  const filterData = (data) => {
    return data
    .sort((a, b) => a.date - b.date);
  };

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await fetch("/api/api/wcm/v0/international-reserve/country/RUS");
      const data = await res.json();
      const filteredData = filterData(data || []);
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