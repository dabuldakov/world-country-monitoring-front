import { useState } from 'react';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';

import { adminLogin } from '../rest/RestService';
import { useApplicationContext } from '../provider/CountriesProvider';

export function AdminLogin({ onLogin }) {
  const { t } = useApplicationContext();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await adminLogin({ login, password });
      onLogin(result.token);
    } catch (requestError) {
      setError(requestError.status === 401 ? t('adminLoginError') : requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
      <h3>{t('adminLogin')}</h3>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        label={t('login')}
        value={login}
        onChange={(event) => setLogin(event.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label={t('password')}
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 2 }}>
        {isLoading ? <CircularProgress size={20} /> : t('signIn')}
      </Button>
    </form>
  );
}
