import { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import {
  BarColumnDebtAmountAllCountries,
  BarColumnDebtGrossAllCountries,
  BarColumnGdpPerCapitaAllCountries,
  BarColumnGrossDataAllCountries,
  BarColumnReservesAllCountries,
} from '../chart/BarColumn';
import {
  SimpleLineDept,
  SimpleLineDeptGross,
  SimpleLineGdpPerCapita,
  SimpleLineGross,
  SimpleLineMonetaryReserves,
  SimpleLineMoneySupply,
} from '../chart/SimpleLine';
import { useApplicationContext } from '../provider/CountriesProvider';
import {
  fetchDataDebtAmountAllCountries,
  fetchDataDebtGrossPercentageAllCountries,
  fetchDataDept,
  fetchDataDeptGross,
  fetchDataGdpPerCapita,
  fetchDataGdpPerCapitaAllCountries,
  fetchDataGrossDomestic,
  fetchDataGrossDomesticAllCountries,
  fetchDataMoneySupply,
  fetchDataReserves,
  fetchDataReservesAllCountries,
} from '../rest/RestService';

export function GetMainTabs() {
  const { selectedCountry, t } = useApplicationContext();
  const [reserveData, setReserveData] = useState([]);
  const [reserveAllCountriesData, setReserveAllCountriesData] = useState([]);
  const [grossData, setGrossData] = useState([]);
  const [grossDataAllCountries, setGrossDataAllCountries] = useState([]);
  const [gdpPerCapitaData, setGdpPerCapitaData] = useState([]);
  const [gdpPerCapitaAllCountriesData, setGdpPerCapitaAllCountriesData] = useState([]);
  const [debtData, setDebtData] = useState([]);
  const [debtAmountAllCountriesData, setDebtAmountAllCountriesData] = useState([]);
  const [debtGrossData, setDebtGrossData] = useState([]);
  const [debtGrossPercentageData, setDebtGrossPercentageData] = useState([]);
  const [moneySupplyData, setMoneySupplyData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reserves, gross, grossAllCountries, reservesAllCountries, gdpPerCapita, gdpPerCapitaAllCountries, debt, debtAmountAllCountries, debtGross, debtGrossPercentage, moneySupply] = await Promise.all([
          fetchDataReserves({ selectedCountry }),
          fetchDataGrossDomestic({ selectedCountry }),
          fetchDataGrossDomesticAllCountries(),
          fetchDataReservesAllCountries(),
          fetchDataGdpPerCapita({ selectedCountry }),
          fetchDataGdpPerCapitaAllCountries(),
          fetchDataDept({ selectedCountry }),
          fetchDataDebtAmountAllCountries(),
          fetchDataDeptGross({ selectedCountry }),
          fetchDataDebtGrossPercentageAllCountries(),
          fetchDataMoneySupply({ selectedCountry }),
        ]);

        setReserveData(reserves);
        setGrossData(gross);
        setGrossDataAllCountries(grossAllCountries);
        setReserveAllCountriesData(reservesAllCountries);
        setGdpPerCapitaData(gdpPerCapita);
        setGdpPerCapitaAllCountriesData(gdpPerCapitaAllCountries);
        setDebtData(debt);
        setDebtAmountAllCountriesData(debtAmountAllCountries);
        setDebtGrossData(debtGross);
        setDebtGrossPercentageData(debtGrossPercentage);
        setMoneySupplyData(moneySupply);
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
          <Tab label={t('monetaryReserves')} />
          <Tab label={t('grossDomesticProduct')} />
          <Tab label={t('gdpPerCapita')} />
          <Tab label={t('debtAmount')} />
          <Tab label={t('debtToGross')} />
          <Tab label={t('moneySupply')} />
        </Tabs>
      </Box>
      <div>
        {activeTab === 0 && (
          <div>
            <SimpleLineMonetaryReserves data={reserveData} />
            <div>{t('allCountriesForYear', { year: 2023 })}</div>
            <BarColumnReservesAllCountries data={reserveAllCountriesData} />
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <SimpleLineGross data={grossData} />
            <div>{t('allCountriesForYear', { year: 2023 })}</div>
            <BarColumnGrossDataAllCountries data={grossDataAllCountries} />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <SimpleLineGdpPerCapita data={gdpPerCapitaData} />
            <div>{t('allCountriesForYear', { year: 2023 })}</div>
            <BarColumnGdpPerCapitaAllCountries data={gdpPerCapitaAllCountriesData} />
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <SimpleLineDept data={debtData} />
            <div>{t('allCountriesForYear', { year: 2022 })}</div>
            <BarColumnDebtAmountAllCountries data={debtAmountAllCountriesData} />
          </div>
        )}
        {activeTab === 4 && (
          <div>
            <SimpleLineDeptGross data={debtGrossData} />
            <div>{t('allCountriesForYear', { year: 2022 })}</div>
            <BarColumnDebtGrossAllCountries data={debtGrossPercentageData} />
          </div>
        )}
        {activeTab === 5 && (
          <div>
            <SimpleLineMoneySupply data={moneySupplyData} />
            <div>{t('allCountriesForYear', { year: 2022 })}</div>
          </div>
        )}
      </div>
    </div>
  );
}
