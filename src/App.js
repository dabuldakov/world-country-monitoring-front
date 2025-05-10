import { useEffect, useState } from "react";
import { SimpleLineMonetaryReserves, SimpleLineGross, SimpleLineDept, SimpleLineDeptGross } from "./chart/SimpleLine";
import { BarColumnDebtGrossPercentage } from "./chart/BarColumn"
import { Tabs, Tab, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function App() {
  const [data, setdata] = useState();
  const [grossData, setGrossData] = useState();
  const [deptData, setDeptData] = useState();
  const [deptGrossData, setDeptGrossData] = useState();
  const [debtGrossPercentageData, setDebtGrossPercentageData] = useState();
  const [countries, setCountries] = useState(["RUS", "USA", "FRA", "DEU", "CHN", "IND", "AUS", "GBR"]);
  const [selectedCountry, setSelectedCountry] = useState("RUS");
  const [activeTab, setActiveTab] = useState(0);

  const filterData = (data) => {
    return data
    .sort((a, b) => a.date - b.date);
  };

  const baseUrl = process.env.REACT_APP_API_URL || '/api';
  console.log(process.env.REACT_APP_API_URL);
  const reservesApi = 'api/wcm/v0/international-reserve/country';
  const grossProductApi = 'api/wcm/v0/gross-domestic-product/country';
  const deptApi = 'api/wcm/v0/debt/country';
  const deptGrossApi ='api/wcm/v0/debt/debt-gross/country'
  const debtGrossPercentageApi ='api/wcm/v0/debt/year'

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

    const fetchDataDept = async () => {
      const res = await fetch(`${baseUrl}/${deptApi}/${selectedCountry}`);
      const data = await res.json();
      const filteredData = filterData(data || []);
      setDeptData(filteredData);
    };
    fetchDataDept();

    const fetchDataDeptGross = async () => {
      const res = await fetch(`${baseUrl}/${deptGrossApi}/${selectedCountry}`);
      const data = await res.json();
      const filteredData = filterData(data || []);
      setDeptGrossData(filteredData);
    };
    fetchDataDeptGross();

    const fetchDataDebtGrossPercentage = async () => {
      const res = await fetch(`${baseUrl}/${debtGrossPercentageApi}/${'2022'}`);
      const data = await res.json();
      setDebtGrossPercentageData(data || []);
    };
    fetchDataDebtGrossPercentage();

  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="App">
      <h2>Country Monitoring</h2>
      <FormControl sx={{ minWidth: 50, marginBottom: 2, minHeight: 20, marginLeft: 1, marginBottom: 1 }}>
        <Select
          labelId="country-select-label"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Monetary Reserves" />
          <Tab label="Gross Domestic Product" />
          <Tab label="Debt" />
          <Tab label="Debt / Gross" />
        </Tabs>
      </Box>
      <div>
        {activeTab === 0 && (
          <div>
            <SimpleLineMonetaryReserves data={data} />
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <SimpleLineGross data={grossData} />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <SimpleLineDept data={deptData} />
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <SimpleLineDeptGross data={deptGrossData} />
            <div>All countries for 2022 year</div>
            <BarColumnDebtGrossPercentage data={debtGrossPercentageData} />
          </div>
        )}
      </div>
    </div>
  );
}