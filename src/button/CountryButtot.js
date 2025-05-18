import { useState } from 'react';

import { Select, MenuItem, FormControl } from '@mui/material';

export function CountryButton({ selectedCountry, setSelectedCountry }) {

    const [countries, setCountries] = useState(['RUS', 'USA', 'FRA', 'DEU', 'CHN', 'IND', 'AUS', 'GBR']);
    
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
      };

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