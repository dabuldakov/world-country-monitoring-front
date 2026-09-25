import { useState } from 'react';
import { Button } from '@mui/material';

import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { useApplicationContext } from '../provider/CountriesProvider';

const TOKEN_KEY = 'wcm-admin-token';

export function AdminPage({ onExit }) {
  const { t } = useApplicationContext();
  const [token, setToken] = useState(() => window.sessionStorage.getItem(TOKEN_KEY) || '');

  const handleLogin = (nextToken) => {
    window.sessionStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
  };

  return (
    <div className="App">
      <div className="admin-toolbar">
        <Button variant="text" size="small" onClick={onExit}>{t('back')}</Button>
      </div>
      {token ? (
        <AdminDashboard token={token} onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
}
