import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { LOCALE_OPTIONS } from '../i18n/locales';
import { useApplicationContext } from '../provider/CountriesProvider';

export function LanguageButton() {
  const { locale, setLocale, t } = useApplicationContext();

  return (
    <FormControl size="small" sx={{ minWidth: 150, marginBottom: 2 }}>
      <InputLabel id="language-select-label">{t('language')}</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={locale}
        label={t('language')}
        onChange={(event) => setLocale(event.target.value)}
      >
        {LOCALE_OPTIONS.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
