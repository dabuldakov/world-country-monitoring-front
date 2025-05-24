import { useEffect, useState } from 'react';
import { SimpleLineMonetaryReserves, SimpleLineGross, SimpleLineDept, SimpleLineDeptGross, SimpleLineMoneySupply } from '../chart/SimpleLine';
import { BarColumnDebtGrossAllCountries, BarColumnGrossDataAllCountries, BarColumnReservesAllCountries } from '../chart/BarColumn';
import { fetchDataReserves, fetchDataGrossDomestic, fetchDataGrossDomesticAllCountries, fetchDataReservesAllCountries,
    fetchDataDept, fetchDataDeptGross, fetchDataDebtGrossPercentageAllCountries, fetchDataMoneySupply
 } from '../rest/RestService';

import { Tabs, Tab, Box } from '@mui/material';

export function GetMainTabs({ selectedCountry }) {

      const [reserveData, setReserveData] = useState();
      const [reserveAllCOuntriesData, setReserveAllCountriesData] = useState();
      const [grossData, setGrossData] = useState();
      const [grossDataAllCountries, setGrossDataAllCountries] = useState();
      const [debtData, setDebtData] = useState();
      const [debtGrossData, setDebtGrossData] = useState();
      const [debtGrossPercentageData, setDebtGrossPercentageData] = useState();
      const [moneySupplyData, setMoneySupplyData] = useState();
      const [activeTab, setActiveTab] = useState(0);

      useEffect(() => {
        const fetchData = async () => {
            try {
              const reserves = await fetchDataReserves({ selectedCountry });
              setReserveData(reserves);
        
              const gross = await fetchDataGrossDomestic({ selectedCountry });
              setGrossData(gross);
        
              const grossAllCountries = await fetchDataGrossDomesticAllCountries();
              setGrossDataAllCountries(grossAllCountries);
        
              const reservesAllCountries = await fetchDataReservesAllCountries();
              setReserveAllCountriesData(reservesAllCountries);
        
              const dept = await fetchDataDept({ selectedCountry });
              setDebtData(dept);
        
              const deptGross = await fetchDataDeptGross({ selectedCountry });
              setDebtGrossData(deptGross);
        
              const debtGrossPercentage = await fetchDataDebtGrossPercentageAllCountries();
              setDebtGrossPercentageData(debtGrossPercentage);

              const moneySupply = await fetchDataMoneySupply({ selectedCountry });
              setMoneySupplyData(moneySupply);
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
          <Tab label="Monetary Reserves" />
          <Tab label="Gross Domestic Product" />
          <Tab label="Debt" />
          <Tab label="Debt / Gross" />
          <Tab label="Money Supply" />
        </Tabs>
      </Box>
      <div>
        {activeTab === 0 && (
          <div>
            <SimpleLineMonetaryReserves data={reserveData} />
            <div>All countries for 2023 year</div>
            <BarColumnReservesAllCountries data={reserveAllCOuntriesData} />
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <SimpleLineGross data={grossData} />
            <div>All countries for 2023 year</div>
            <BarColumnGrossDataAllCountries data={grossDataAllCountries} />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <SimpleLineDept data={debtData} />
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <SimpleLineDeptGross data={debtGrossData} />
            <div>All countries for 2022 year</div>
            <BarColumnDebtGrossAllCountries data={debtGrossPercentageData} />
          </div>
        )}
        {activeTab === 4 && (
          <div>
            <SimpleLineMoneySupply data={moneySupplyData} />
            <div>All countries for 2022 year</div>
          </div>
        )}
      </div>
    </div>
    );
}