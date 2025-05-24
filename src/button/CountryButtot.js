import { useState, useEffect } from 'react';
import { fetchDataCountries } from '../rest/RestService';

import { Select, MenuItem, FormControl } from '@mui/material';

export function CountryButton({ selectedCountry, setSelectedCountry }) {
    
    const [countries, setCountries] = useState([]);
  
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
      };

    
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
      <div>
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
      </div>
    );
}