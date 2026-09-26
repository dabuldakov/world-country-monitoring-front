import { useEffect, useState } from 'react';
import { Box, CircularProgress, Tab, Tabs } from '@mui/material';

import { BarColumnPopulationAllCountries, PopulationSimpleLine } from '../chart/Population';
import { useApplicationContext } from '../provider/CountriesProvider';
import { fetchDataPopulation, fetchDataPopulationAllCountries } from '../rest/RestService';

const POPULATION_YEAR = 2023;

export function GetSocialTab() {
  const { selectedCountry, t } = useApplicationContext();
  const [populationData, setPopulationData] = useState([]);
  const [populationAllCountries, setPopulationAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    setPopulationData([]);
    setPopulationAllCountries([]);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const [population, populationAll] = await Promise.all([
          fetchDataPopulation({ selectedCountry }),
          fetchDataPopulationAllCountries(POPULATION_YEAR),
        ]);
        if (isCurrent) {
          setPopulationData(Array.isArray(population) ? population : []);
          setPopulationAllCountries(Array.isArray(populationAll) ? populationAll : []);
        }
      } catch (error) {
        if (isCurrent) {
          setPopulationData([]);
          setPopulationAllCountries([]);
          console.error('Error fetching population data:', error);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCurrent = false;
    };
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
            {isLoading ? (
              <CircularProgress size={28} />
            ) : populationData.length > 0 ? (
              <div>
                <PopulationSimpleLine data={populationData} />
                <div>{t('population')}: {getPopulationRange(populationData)}</div>
                <div>{t('allCountriesForYear', { year: POPULATION_YEAR })}</div>
                <BarColumnPopulationAllCountries data={populationAllCountries} />
              </div>
            ) : (
              <div>{t('population')}: —</div>
            )}
          </div>
        )}
        {activeTab === 1 && <div>{t('withoutWork')}</div>}
        {activeTab === 2 && <div>{t('lifeExpectancy')}</div>}
        {activeTab === 3 && <div>{t('pension')}</div>}
      </div>
    </div>
  );
}

function getPopulationRange(data) {
  if (!Array.isArray(data)) {
    return '';
  }
  const years = data
    .map((item) => item && Number.parseInt(String(item.date ?? item.year ?? '').slice(0, 4), 10))
    .filter(Number.isFinite);
  if (years.length === 0) {
    return '';
  }
  return `${Math.min(...years)}–${Math.max(...years)}`;
}
