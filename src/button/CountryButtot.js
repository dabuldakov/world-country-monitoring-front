import { useApplicationContext } from '../provider/CountriesProvider';

import { Select, MenuItem, FormControl } from '@mui/material';

export function CountryButton() {
    const { countries, selectedCountry, setSelectedCountry } = useApplicationContext();
  
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
      };

    return (
      <div>
        <FormControl sx={{ 
          width: 200, 
          marginBottom: 2, 
          minHeight: 20, 
          marginLeft: 1 }}>
        {countries.length > 0 && (
        <Select
          labelId="country-select-label"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {countries.map((country) => (
            <MenuItem 
              key={country.code} 
              value={country.code}
              title={country.code}
            >
              {country.name}
            </MenuItem>
          ))}
        </Select>
        )}
        </FormControl>
      </div>
    );
}