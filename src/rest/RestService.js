const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const clientKey = process.env.REACT_APP_CLIENT_KEY || 'wcm-frontend';

const reservesApi = 'api/wcm/v0/international-reserve/country';
const reservesAllCountriesApi = 'api/wcm/v0/international-reserve/year';
const grossProductApi = 'api/wcm/v0/gross-domestic-product/country';
const grossProductAllCountriesApi = 'api/wcm/v0/gross-domestic-product/year';
const gdpPerCapitaApi = 'api/wcm/v0/gross-domestic-product-per-capita/country';
const gdpPerCapitaAllCountriesApi = 'api/wcm/v0/gross-domestic-product-per-capita/year';
const debtApi = 'api/wcm/v0/debt/country';
const debtGrossApi = 'api/wcm/v0/debt/debt-gross/country';
const debtGrossPercentageApi = 'api/wcm/v0/debt/year';
const debtAmountAllCountriesApi = 'api/wcm/v0/debt/debt-amount/year';
const moneySupplyApi = 'api/wcm/v0/money-supply/country';
const countryApi = 'api/wcm/v0/country/all';
const populationApi = 'api/wcm/v0/population/country';
const lifeExpectancyApi = 'api/wcm/v0/life-expectancy/country';
const lifeExpectancyAllCountriesApi = 'api/wcm/v0/life-expectancy/year';
const feedbackApi = 'api/wcm/v0/feedback';
const visitsApi = 'api/wcm/v0/visits';
const adminApi = 'api/wcm/v0/admin';

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

export const fetchDataGdpPerCapita = async ({ selectedCountry }) => {
  return fetchData(`${baseUrl}/${gdpPerCapitaApi}/${selectedCountry}`);
};

export const fetchDataGdpPerCapitaAllCountries = async () => {
  return fetchData(`${baseUrl}/${gdpPerCapitaAllCountriesApi}/${'2023'}`);
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

export const fetchDataDebtAmountAllCountries = async () => {
  return fetchData(`${baseUrl}/${debtAmountAllCountriesApi}/${'2022'}`);
};

export const fetchDataPopulation = async ({ selectedCountry }) => {
  return fetchData(`${baseUrl}/${populationApi}/${selectedCountry}`);
};

export const fetchDataPopulationAllCountries = async (year) => {
  return fetchData(`${baseUrl}/api/wcm/v0/population/year/${year}`);
};

export const fetchDataLifeExpectancy = async ({ selectedCountry }) => {
  return fetchData(`${baseUrl}/${lifeExpectancyApi}/${selectedCountry}`);
};

export const fetchDataLifeExpectancyAllCountries = async () => {
  return fetchData(`${baseUrl}/${lifeExpectancyAllCountriesApi}/${'2023'}`);
};

export const fetchDataMoneySupply = async ({ selectedCountry }) => {
  return fetchData(`${baseUrl}/${moneySupplyApi}/${selectedCountry}`);
};

export const fetchDataCountries = async () => {
  return fetchData(`${baseUrl}/${countryApi}`);
};

export const submitFeedback = async ({ email, message }) => {
  return request(`${baseUrl}/${feedbackApi}`, {
    method: 'POST',
    body: { email, message },
  });
};

export const registerVisit = async () => {
  return request(`${baseUrl}/${visitsApi}`, { method: 'POST' });
};

export const adminLogin = async ({ login, password }) => {
  return request(`${baseUrl}/${adminApi}/login`, {
    method: 'POST',
    body: { login, password },
  });
};

export const fetchAdminFeedback = async (token) => {
  return request(`${baseUrl}/${adminApi}/feedback`, { token });
};

export const fetchAdminVisits = async (token) => {
  return request(`${baseUrl}/${adminApi}/visits`, { token });
};

export const fetchLastRefill = async (token) => {
  return request(`${baseUrl}/${adminApi}/refill/last`, { token });
};

export const triggerRefillAll = async (token) => {
  return request(`${baseUrl}/${adminApi}/refill/all`, { method: 'POST', token });
};

export const triggerRefillCountry = async (token, countryCode) => {
  return request(`${baseUrl}/${adminApi}/refill/country/${countryCode}`, { method: 'POST', token });
};

export const fetchFeatureStatuses = async (token) => {
  return request(`${baseUrl}/${adminApi}/refill/status`, { token });
};

export const triggerFeatureRefillAll = async (token, feature) => {
  return request(`${baseUrl}/${adminApi}/refill/${feature}/all`, { method: 'POST', token });
};

export const triggerFeatureRefillCountry = async (token, feature, countryCode) => {
  return request(`${baseUrl}/${adminApi}/refill/${feature}/country/${countryCode}`, {
    method: 'POST',
    token,
  });
};

export const enqueueRefreshJob = async (token, feature, countryCode) => {
  return request(`${baseUrl}/${adminApi}/refill/jobs`, {
    method: 'POST',
    token,
    body: { feature, countryCode: countryCode || null },
  });
};

export const fetchRefreshJob = async (token, jobId) => {
  return request(`${baseUrl}/${adminApi}/refill/jobs/${jobId}`, { token });
};

export const retryRefreshJob = async (token, jobId) => {
  return request(`${baseUrl}/${adminApi}/refill/jobs/${jobId}/retry`, { method: 'POST', token });
};

export const fetchCountryStatuses = async (token, feature) => {
  const query = feature ? `?feature=${feature}` : '';
  return request(`${baseUrl}/${adminApi}/refill/country-status${query}`, { token });
};

const request = async (url, options = {}) => {
  const headers = { 'X-WCM-Client': clientKey };

  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const error = new Error(`Request failed: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  if (res.status === 204) {
    return null;
  }

  return res.json();
};

const fetchData = async (url) => {
  try {
    const data = await request(url);
    return data || [];
  } catch (error) {
    console.error('Error in fetchData:', error);
    return [];
  }
};
