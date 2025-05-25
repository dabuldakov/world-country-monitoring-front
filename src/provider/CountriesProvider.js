import { createContext, useContext, useState, useEffect } from 'react';
import { fetchDataCountries } from '../rest/RestService';

const CountriesContext = createContext([]);

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('RUS');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fetchedCountries = await fetchDataCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <CountriesContext.Provider 
    value={{ countries, setSelectedCountry, selectedCountry }}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountriesContext() {
  return useContext(CountriesContext);
}