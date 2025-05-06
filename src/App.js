import { useEffect, useState } from "react";
import { SimpleLineMonetaryReserves, SimpleLineGross } from "./chart/SimpleLine";

export default function App() {
  const [data, setdata] = useState();
  const [grossData, setGrossData] = useState();
  const [countries, setCountries] = useState(["RUS", "USA", "FRA", "CHN", "IND"]);
  const [selectedCountry, setSelectedCountry] = useState("RUS");

  const filterData = (data) => {
    return data
    .sort((a, b) => a.date - b.date);
  };

  const baseUrl = process.env.API_URL || 'http://localhost:8080';
  const reservesApi = 'api/wcm/v0/international-reserve/country';
  const grossProductApi = 'api/wcm/v0/gross-domestic-product/country';

  useEffect(() => {
    const fetchDataReserves = async () => {
      const res = await fetch(`${baseUrl}/${reservesApi}/${selectedCountry}`);
      const data = await res.json();
      const filteredData = filterData(data || []);
      setdata(filteredData);
    };
    fetchDataReserves();

    const fetchDataGrossDomestic = async () => {
      const res = await fetch(`${baseUrl}/${grossProductApi}/${selectedCountry}`);
      const data = await res.json();
      const filteredData = filterData(data || []);
      setGrossData(filteredData);
    };
    fetchDataGrossDomestic();
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };


  return (
    <div className="App">
      <h1>Country Monitoring</h1>
      <div><select value={selectedCountry} onChange={handleCountryChange}>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        Monetary resereves
        <SimpleLineMonetaryReserves data={data} />
      </div>
      <div>
        Gross domestic product    
        <SimpleLineGross data={grossData} />
      </div>
      
    </div>
  );
}