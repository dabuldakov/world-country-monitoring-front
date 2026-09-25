import { useEffect, useState } from 'react';

import { GetMainTabs } from './tabs/Tabs';
import { CountryButton } from './button/CountryButtot';
import { LanguageButton } from './button/LanguageButton';
import { GetSocialTab } from './tabs/SocialTab';
import { AdminButton } from './button/AdminButton';
import { EconomicButton, SocialButton } from './button/GroupButton';
import { FeedbackButton } from './feedback/FeedbackButton';
import { AdminPage } from './admin/AdminPage';
import { ContextProvider, useApplicationContext } from './provider/CountriesProvider';
import { registerVisit } from './rest/RestService';
import './App.css';

const VISIT_SESSION_KEY = 'wcm-visit-registered';

function AppContent() {
  const { t } = useApplicationContext();
  const [activeGroup, setActiveGroup] = useState('economic');
  const [activeView, setActiveView] = useState('public');

  useEffect(() => {
    if (typeof window === 'undefined' || typeof registerVisit !== 'function') {
      return;
    }

    try {
      if (!window.sessionStorage.getItem(VISIT_SESSION_KEY)) {
        window.sessionStorage.setItem(VISIT_SESSION_KEY, '1');
        registerVisit().catch(() => {});
      }
    } catch {
      return;
    }
  }, []);

  if (activeView === 'admin') {
    return <AdminPage onExit={() => setActiveView('public')} />;
  }

  return (
    <div className="App">
      <h2>{t('appTitle')}</h2>
      <div className="app-toolbar">
        <CountryButton />
        <LanguageButton />
        <EconomicButton activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
        <SocialButton activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
        <FeedbackButton />
        <AdminButton onClick={() => setActiveView('admin')} />
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
