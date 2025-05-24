const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const reservesApi = 'api/wcm/v0/international-reserve/country';
const reservesAllCountriesApi = 'api/wcm/v0/international-reserve/year';
const grossProductApi = 'api/wcm/v0/gross-domestic-product/country';
const grossProductAllCountriesApi = 'api/wcm/v0/gross-domestic-product/year';
const debtApi = 'api/wcm/v0/debt/country';
const debtGrossApi ='api/wcm/v0/debt/debt-gross/country';
const debtGrossPercentageApi ='api/wcm/v0/debt/year';
const populationApi = 'api/wcm/v0/population/country';
const moneySupplyApi = 'api/wcm/v0/money-supply/country';

export const fetchDataReserves = async ({ selectedCountry }) => {
  return fetchData(`${baseUrl}/${reservesApi}/${selectedCountry}`);
};

export const fetchDataGrossDomestic = async ({ selectedCountry }) => {
  return fetchData(`${baseUrl}/${grossProductApi}/${selectedCountry}`);
};

export const fetchDataGrossDomesticAllCountries = async () => {
  return fetchData(`${baseUrl}/${grossProductAllCountriesApi}/${'2023'}`);
};

export const fetchDataReservesAllCountries = async () => {
  return fetchData(`${baseUrl}/${reservesAllCountriesApi}/${'2023'}`);
};

export const fetchDataDept = async ({ selectedCountry }) => {
  return fetchData(`${baseUrl}/${debtApi}/${selectedCountry}`);
};

export const fetchDataDeptGross = async ({ selectedCountry }) => {
  return fetchData(`${baseUrl}/${debtGrossApi}/${selectedCountry}`);
};

export const fetchDataDebtGrossPercentageAllCountries = async () => {
  return fetchData(`${baseUrl}/${debtGrossPercentageApi}/${'2022'}`);
};

export const fetchDataPopulation = async ({ selectedCountry }) => {
  return fetchData(`${baseUrl}/${populationApi}/${selectedCountry}`);
};

export const fetchDataMoneySupply = async ({ selectedCountry }) => {
  return fetchData(`${baseUrl}/${moneySupplyApi}/${selectedCountry}`);
};

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('Error in fetchData:', error);
    return [];
  }
};