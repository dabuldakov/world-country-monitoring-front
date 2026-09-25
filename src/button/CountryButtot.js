import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { getCountryName } from '../i18n/locales';
import { useApplicationContext } from '../provider/CountriesProvider';

export function CountryButton() {
  const { countries, selectedCountry, setSelectedCountry, locale, t } = useApplicationContext();
  const hasSelectedCountry = countries.some((country) => country.code === selectedCountry);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ width: 220, marginBottom: 2, marginInlineStart: 1 }}>
      <InputLabel id="country-select-label">{t('country')}</InputLabel>
      {countries.length > 0 && (
        <Select
          labelId="country-select-label"
          id="country-select"
          value={hasSelectedCountry ? selectedCountry : ''}
          label={t('country')}
          onChange={handleCountryChange}
        >
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.code} title={country.code}>
              {getCountryName(country, locale)}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
}
