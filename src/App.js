import { useState } from 'react';

import { GetMainTabs } from './tabs/Tabs';
import { CountryButton } from './button/CountryButtot';
import { GetSocialTab } from './tabs/SocialTab';
import { EconomicButton, SocialButton } from './button/GroupButton';
import { CountriesProvider } from './provider/CountriesProvider';

export default function App() {

  const [selectedCountry, setSelectedCountry] = useState('RUS');
  const [activeGroup, setActiveGroup] = useState('economic');

return (
  <CountriesProvider>
    <div className="App">
      <h2>Country Monitoring</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <CountryButton 
        selectedCountry={selectedCountry} 
        setSelectedCountry={setSelectedCountry}
        />
        <EconomicButton activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
        <SocialButton activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      </div>
      <div style={{ marginTop: 24 }}>
        {activeGroup === 'economic' && (
          <GetMainTabs selectedCountry={selectedCountry} />
        )}
        {activeGroup === 'social' && (
          <GetSocialTab selectedCountry={selectedCountry} />
        )}
      </div>
    </div>
  </CountriesProvider>
  );
}