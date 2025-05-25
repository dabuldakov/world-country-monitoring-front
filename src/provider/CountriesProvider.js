import { createContext, useContext, useState, useEffect } from 'react';
import { fetchDataCountries } from '../rest/RestService';

const ApplicationContext = createContext([]);

export function ContextProvider({ children }) {
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
    <ApplicationContext.Provider 
    value={{ countries, selectedCountry, setSelectedCountry }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  return useContext(ApplicationContext);
}