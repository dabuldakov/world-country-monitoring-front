import { useEffect, useState } from "react";
import BarColumn from "./chart/BarColumn";
import SimpleLine from "./chart/SimpleLine";

export default function App() {
  const [data, setdata] = useState();
  const [countries, setCountries] = useState(["RUS", "USA", "CHN", "IND"]);
  const [selectedCountry, setSelectedCountry] = useState("RUS");

  const filterData = (data) => {
    return data
    .sort((a, b) => a.date - b.date);
  };

  const baseUrl = process.env.API_URL || 'http://localhost:8080';
  const countryApi = 'api/wcm/v0/international-reserve/country';

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await fetch(`${baseUrl}/${countryApi}/${selectedCountry}`);
      const data = await res.json();
      const filteredData = filterData(data || []);
      setdata(filteredData);
    };
    fetchDatas();
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };


  return (
    <div className="App">Country Monitoring
      <select value={selectedCountry} onChange={handleCountryChange}>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <SimpleLine data={data} />
    </div>
  );
}