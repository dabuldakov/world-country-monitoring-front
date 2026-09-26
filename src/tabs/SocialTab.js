import { useEffect, useState } from 'react';
import { Box, CircularProgress, Tab, Tabs } from '@mui/material';

import { BarColumnLifeExpectancyAllCountries } from '../chart/BarColumn';
import { BarColumnPopulationAllCountries, PopulationSimpleLine } from '../chart/Population';
import { SimpleLineLifeExpectancy } from '../chart/SimpleLine';
import { useApplicationContext } from '../provider/CountriesProvider';
import {
  fetchDataLifeExpectancy,
  fetchDataLifeExpectancyAllCountries,
  fetchDataPopulation,
  fetchDataPopulationAllCountries,
} from '../rest/RestService';

const POPULATION_YEAR = 2023;
const LIFE_EXPECTANCY_YEAR = 2023;

export function GetSocialTab() {
  const { selectedCountry, t } = useApplicationContext();
  const [populationData, setPopulationData] = useState([]);
  const [populationAllCountries, setPopulationAllCountries] = useState([]);
  const [lifeExpectancyData, setLifeExpectancyData] = useState([]);
  const [lifeExpectancyAllCountries, setLifeExpectancyAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    setPopulationData([]);
    setPopulationAllCountries([]);
    setLifeExpectancyData([]);
    setLifeExpectancyAllCountries([]);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const [population, populationAll, lifeExpectancy, lifeExpectancyAll] = await Promise.all([
          fetchDataPopulation({ selectedCountry }),
          fetchDataPopulationAllCountries(POPULATION_YEAR),
          fetchDataLifeExpectancy({ selectedCountry }),
          fetchDataLifeExpectancyAllCountries(LIFE_EXPECTANCY_YEAR),
        ]);
        if (isCurrent) {
          setPopulationData(Array.isArray(population) ? population : []);
          setPopulationAllCountries(Array.isArray(populationAll) ? populationAll : []);
          setLifeExpectancyData(Array.isArray(lifeExpectancy) ? lifeExpectancy : []);
          setLifeExpectancyAllCountries(Array.isArray(lifeExpectancyAll) ? lifeExpectancyAll : []);
        }
      } catch (error) {
        if (isCurrent) {
          setPopulationData([]);
          setPopulationAllCountries([]);
          setLifeExpectancyData([]);
          setLifeExpectancyAllCountries([]);
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
        {activeTab === 2 && (
          <div>
            {isLoading ? (
              <CircularProgress size={28} />
            ) : lifeExpectancyData.length > 0 ? (
              <div>
                <SimpleLineLifeExpectancy data={lifeExpectancyData} />
                <div>{t('allCountriesForYear', { year: LIFE_EXPECTANCY_YEAR })}</div>
                <BarColumnLifeExpectancyAllCountries data={lifeExpectancyAllCountries} />
              </div>
            ) : (
              <div>{t('lifeExpectancy')}: —</div>
            )}
          </div>
        )}
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
