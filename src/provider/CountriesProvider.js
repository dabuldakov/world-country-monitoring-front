import { createContext, useContext, useState, useEffect } from 'react';
import { fetchDataCountries } from '../rest/RestService';

const CountriesContext = createContext([]);

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);

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
    <CountriesContext.Provider value={countries}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  return useContext(CountriesContext);
}