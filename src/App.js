import { useState } from 'react';

import { GetMainTabs } from './tabs/Tabs';
import { CountryButton } from './button/CountryButtot';
import { LanguageButton } from './button/LanguageButton';
import { GetSocialTab } from './tabs/SocialTab';
import { EconomicButton, SocialButton } from './button/GroupButton';
import { ContextProvider, useApplicationContext } from './provider/CountriesProvider';
import './App.css';

function AppContent() {
  const { t } = useApplicationContext();
  const [activeGroup, setActiveGroup] = useState('economic');

  return (
    <div className="App">
      <h2>{t('appTitle')}</h2>
      <div className="app-toolbar">
        <CountryButton />
        <LanguageButton />
        <EconomicButton activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
        <SocialButton activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      </div>
      <div style={{ marginTop: 24 }}>
        {activeGroup === 'economic' && <GetMainTabs />}
        {activeGroup === 'social' && <GetSocialTab />}
      </div>
      <div className="support-info">
        {t('support')}: <a href="mailto:dabuldakov@mail.ru">dabuldakov@mail.ru</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ContextProvider>
      <AppContent />
    </ContextProvider>
  );
}
