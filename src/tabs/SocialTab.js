import { useEffect, useState } from 'react';

import { Tabs, Tab, Box } from '@mui/material';
import { PopulationSimpleLine } from '../chart/Population';
import { fetchDataPopulation } from '../rest/RestService';
import { useCountriesContext } from '../provider/CountriesProvider';

export function GetSocialTab() {

    const { selectedCountry } = useCountriesContext();
    const [populationData, setPopulationData] = useState();
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

    const handleTabChange = (event, newValue) => {
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
          <Tab label="Population" />
          <Tab label="Without Work" />
          <Tab label="Life Expectancy" />
          <Tab label="Pension" />
        </Tabs>
      </Box>
      <div>
            {activeTab === 0 && (
              <div>
                  <PopulationSimpleLine data={populationData} />
                  <div>All countries for 2023 year</div>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                  <div>Without Work</div>
              </div>
            )}
            {activeTab === 2 && (
              <div>
                  <div>Life Expectancy</div>
              </div>
            )}
            {activeTab === 3 && (
              <div>
                  <div>Pension</div>   
              </div>
            )}
          </div>
    </div>
  );
}