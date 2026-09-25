import { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import { PopulationSimpleLine } from '../chart/Population';
import { useApplicationContext } from '../provider/CountriesProvider';
import { fetchDataPopulation } from '../rest/RestService';

export function GetSocialTab() {
  const { selectedCountry, t } = useApplicationContext();
  const [populationData, setPopulationData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const population = await fetchDataPopulation({ selectedCountry });
        setPopulationData(population);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCountry]);

  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label={t('population')} />
          <Tab label={t('withoutWork')} />
          <Tab label={t('lifeExpectancy')} />
          <Tab label={t('pension')} />
        </Tabs>
      </Box>
      <div>
        {activeTab === 0 && (
          <div>
            <PopulationSimpleLine data={populationData} />
            <div>{t('allCountriesForYear', { year: 2023 })}</div>
          </div>
        )}
        {activeTab === 1 && <div>{t('withoutWork')}</div>}
        {activeTab === 2 && <div>{t('lifeExpectancy')}</div>}
        {activeTab === 3 && <div>{t('pension')}</div>}
      </div>
    </div>
  );
}
