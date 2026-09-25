import { Button } from '@mui/material';

import { useApplicationContext } from '../provider/CountriesProvider';

export function AdminButton({ onClick }) {
  const { t } = useApplicationContext();

  return (
    <Button variant="outlined" size="small" onClick={onClick}>
      {t('admin')}
    </Button>
  );
}
