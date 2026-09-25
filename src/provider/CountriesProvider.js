import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchDataCountries } from '../rest/RestService';
import {
  DEFAULT_LOCALE,
  getCountryForLocale,
  getDirection,
  getInitialCountry,
  getInitialLocale,
  normalizeLocale,
  translate,
} from '../i18n/locales';

const defaultContext = {
  countries: [],
  selectedCountry: 'RUS',
  setSelectedCountry: () => {},
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
  direction: 'ltr',
};

const ApplicationContext = createContext(defaultContext);

function getInitialState() {
  const locale = getInitialLocale();
  return {
    locale,
    selectedCountry: getInitialCountry(locale),
  };
}

export function ContextProvider({ children }) {
  const [initialState] = useState(getInitialState);
  const [countries, setCountries] = useState([]);
  const [locale, setLocaleState] = useState(initialState.locale);
  const [selectedCountry, setSelectedCountry] = useState(initialState.selectedCountry);

  const setLocale = useCallback((nextLocale) => {
    const normalizedLocale = normalizeLocale(nextLocale);
    if (!normalizedLocale) {
      return;
    }

    setLocaleState(normalizedLocale);
    setSelectedCountry(getCountryForLocale(normalizedLocale, []));

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('wcm-locale', normalizedLocale);
      } catch {
        return;
      }
    }
  }, []);

  const t = useCallback((key, params) => translate(locale, key, params), [locale]);
  const direction = getDirection(locale);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
    document.title = t('appTitle');

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', t('description'));
    }
  }, [direction, t]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fetchedCountries = await fetchDataCountries();
        setCountries(Array.isArray(fetchedCountries) ? fetchedCountries : []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (countries.length === 0 || countries.some((country) => country.code === selectedCountry)) {
      return;
    }

    const fallbackCountry = countries.find((country) => country.code === 'RUS') || countries[0];
    setSelectedCountry(fallbackCountry.code);
  }, [countries, selectedCountry]);

  const value = useMemo(
    () => ({
      countries,
      selectedCountry,
      setSelectedCountry,
      locale,
      setLocale,
      t,
      direction,
    }),
    [countries, selectedCountry, locale, setLocale, t, direction],
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  return useContext(ApplicationContext);
}
