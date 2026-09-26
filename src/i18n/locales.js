export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_LOCALES = ['en', 'zh', 'hi', 'es', 'fr', 'ar', 'bn', 'pt', 'ru', 'ur'];

export const LOCALE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
  { code: 'ur', label: 'اردو' },
];

const COUNTRY_CODE_BY_REGION = {
  AF: 'AFG',
  AO: 'AGO',
  AL: 'ALB',
  AD: 'AND',
  AE: 'ARE',
  AR: 'ARG',
  AM: 'ARM',
  AG: 'ATG',
  AU: 'AUS',
  AT: 'AUT',
  AZ: 'AZE',
  BI: 'BDI',
  BE: 'BEL',
  BJ: 'BEN',
  BF: 'BFA',
  BD: 'BGD',
  BG: 'BGR',
  BH: 'BHR',
  BS: 'BHS',
  BY: 'BLR',
  BZ: 'BLZ',
  BO: 'BOL',
  BR: 'BRA',
  BB: 'BRB',
  BN: 'BRN',
  BW: 'BWA',
  CA: 'CAN',
  CF: 'CAF',
  TD: 'TCD',
  CL: 'CHL',
  CN: 'CHN',
  KM: 'COM',
  CD: 'COD',
  CG: 'COG',
  CR: 'CRI',
  CI: 'CIV',
  HR: 'HRV',
  CU: 'CUB',
  CY: 'CYP',
  CZ: 'CZE',
  DK: 'DNK',
  DJ: 'DJI',
  DM: 'DMA',
  DO: 'DOM',
  EC: 'ECU',
  EG: 'EGY',
  SV: 'SLV',
  GQ: 'GNQ',
  ER: 'ERI',
  EE: 'EST',
  SZ: 'SWZ',
  ET: 'ETH',
  FJ: 'FJI',
  FI: 'FIN',
  FR: 'FRA',
  GA: 'GAB',
  GM: 'GMB',
  GE: 'GEO',
  DE: 'DEU',
  GH: 'GHA',
  GN: 'GIN',
  GW: 'GNB',
  GY: 'GUY',
  HT: 'HTI',
  HN: 'HND',
  HU: 'HUN',
  IS: 'ISL',
  IN: 'IND',
  ID: 'IDN',
  IR: 'IRN',
  IQ: 'IRQ',
  IE: 'IRL',
  IL: 'ISR',
  IT: 'ITA',
  JM: 'JAM',
  JP: 'JPN',
  JO: 'JOR',
  KZ: 'KAZ',
  KE: 'KEN',
  KI: 'KIR',
  KP: 'PRK',
  KR: 'KOR',
  KW: 'KWT',
  KG: 'KGZ',
  LA: 'LAO',
  LV: 'LVA',
  LB: 'LBN',
  LS: 'LSO',
  LR: 'LBR',
  LY: 'LBY',
  LI: 'LIE',
  LT: 'LTU',
  LU: 'LUX',
  MG: 'MDG',
  MW: 'MWI',
  MY: 'MYS',
  MV: 'MDV',
  ML: 'MLI',
  MT: 'MLT',
  MH: 'MHL',
  MR: 'MRT',
  MU: 'MUS',
  MX: 'MEX',
  MD: 'MDA',
  MC: 'MCO',
  MN: 'MNG',
  ME: 'MNE',
  MA: 'MAR',
  MZ: 'MOZ',
  MM: 'MMR',
  NA: 'NAM',
  NR: 'NRU',
  NP: 'NPL',
  NL: 'NLD',
  NZ: 'NZL',
  NI: 'NIC',
  NE: 'NER',
  NG: 'NGA',
  MK: 'MKD',
  NO: 'NOR',
  OM: 'OMN',
  PK: 'PAK',
  PW: 'PLW',
  PA: 'PAN',
  PG: 'PNG',
  PY: 'PRY',
  PE: 'PER',
  PH: 'PHL',
  PL: 'POL',
  PT: 'PRT',
  QA: 'QAT',
  RO: 'ROU',
  RU: 'RUS',
  RW: 'RWA',
  KN: 'KNA',
  LC: 'LCA',
  VC: 'VCT',
  WS: 'WSM',
  SM: 'SMR',
  ST: 'STP',
  SA: 'SAU',
  SN: 'SEN',
  RS: 'SRB',
  SC: 'SYC',
  SL: 'SLE',
  SG: 'SGP',
  SK: 'SVK',
  SI: 'SVN',
  SB: 'SLB',
  SO: 'SOM',
  ZA: 'ZAF',
  SS: 'SSD',
  ES: 'ESP',
  LK: 'LKA',
  SD: 'SDN',
  SR: 'SUR',
  SE: 'SWE',
  CH: 'CHE',
  SY: 'SYR',
  TJ: 'TJK',
  TZ: 'TZA',
  TH: 'THA',
  TL: 'TLS',
  TG: 'TGO',
  TO: 'TON',
  TT: 'TTO',
  TN: 'TUN',
  TR: 'TUR',
  TM: 'TKM',
  UG: 'UGA',
  UA: 'UKR',
  GB: 'GBR',
  US: 'USA',
  UY: 'URY',
  UZ: 'UZB',
  VU: 'VUT',
  VE: 'VEN',
  VN: 'VNM',
  YE: 'YEM',
  ZM: 'ZMB',
  ZW: 'ZWE',
};

const COUNTRY_REGION_BY_CODE = Object.entries(COUNTRY_CODE_BY_REGION).reduce(
  (result, [region, code]) => ({ ...result, [code]: region }),
  {},
);

const DEFAULT_COUNTRY_BY_LOCALE = {
  en: 'USA',
  zh: 'CHN',
  hi: 'IND',
  es: 'ESP',
  fr: 'FRA',
  ar: 'SAU',
  bn: 'BGD',
  pt: 'BRA',
  ru: 'RUS',
  ur: 'PAK',
};

const translations = {
  en: {
    appTitle: 'Country monitoring',
    description: 'Economic and social indicators by country',
    support: 'Support',
    country: 'Country',
    language: 'Language',
    economic: 'Economic',
    social: 'Social',
    monetaryReserves: 'Monetary reserves',
    grossDomesticProduct: 'Gross domestic product',
    debt: 'Debt',
    debtToGross: 'Debt / GDP',
    moneySupply: 'Money supply',
    allCountriesForYear: 'All countries for {year}',
    population: 'Population',
    withoutWork: 'Without work',
    lifeExpectancy: 'Life expectancy',
    pension: 'Pension',
    amount: 'Amount',
    totalReserves: 'Total reserves',
    foreignExchange: 'Foreign exchange',
    monetaryGold: 'Monetary gold',
    current: 'Current',
    purchasingPowerParities: 'Purchasing power parity',
    foreignDebt: 'Foreign debt',
    debtToGdp: 'Debt to GDP ratio',
    admin: 'Admin',
    adminPanel: 'Admin panel',
    adminLogin: 'Admin login',
    adminLoginError: 'Invalid login or password',
    login: 'Login',
    password: 'Password',
    signIn: 'Sign in',
    logout: 'Log out',
    back: 'Back',
    leaveFeedback: 'Leave feedback',
    feedbackEmail: 'Your email',
    feedbackMessage: 'What can be improved?',
    feedbackSend: 'Send',
    feedbackSent: 'Thank you! Your feedback has been sent.',
    feedbackError: 'Could not send feedback. Please try again later.',
    visits: 'Visits',
    refillAll: 'Update all countries',
    refillCountry: 'Update country',
    countryCode: 'Country code',
    lastRefill: 'Last update result',
    status: 'Status',
    operation: 'Operation',
    processed: 'Processed',
    started: 'Started',
    finished: 'Finished',
    error: 'Error',
    noRefillResult: 'No updates yet',
    feedbackList: 'Feedback',
    noFeedback: 'No feedback yet',
    createdAt: 'Date',
    close: 'Close',
    featureGdp: 'GDP',
    featureDebt: 'Debt',
    featureReserves: 'Reserves',
    featurePopulation: 'Population',
    lastUpdated: 'Last updated',
    updateByFeature: 'Update by feature',
    refresh: 'Refresh',
    refreshAll: 'All countries',
    refreshCountry: 'Country',
    refreshJob: 'Refresh job',
    failedCountries: 'Failed countries',
    retryFailed: 'Retry failed',
    updateByCountry: 'Updates by country',
  },
  zh: {
    appTitle: '国家监测',
    description: '各国经济和社会指标',
    support: '支持',
    country: '国家',
    language: '语言',
    economic: '经济',
    social: '社会',
    monetaryReserves: '货币储备',
    grossDomesticProduct: '国内生产总值',
    debt: '债务',
    debtToGross: '债务 / GDP',
    moneySupply: '货币供应',
    allCountriesForYear: '{year} 年所有国家',
    population: '人口',
    withoutWork: '失业',
    lifeExpectancy: '预期寿命',
    pension: '养老金',
    amount: '金额',
    totalReserves: '总储备',
    foreignExchange: '外汇储备',
    monetaryGold: '货币黄金',
    current: '现价美元',
    purchasingPowerParities: '购买力平价',
    foreignDebt: '外债',
    debtToGdp: '债务占 GDP 比例',
  },
  hi: {
    appTitle: 'देशों की निगरानी',
    description: 'देशों के आर्थिक और सामाजिक संकेतक',
    support: 'सहायता',
    country: 'देश',
    language: 'भाषा',
    economic: 'आर्थिक',
    social: 'सामाजिक',
    monetaryReserves: 'मुद्रा भंडार',
    grossDomesticProduct: 'सकल घरेलू उत्पाद',
    debt: 'ऋण',
    debtToGross: 'ऋण / जीडीपी',
    moneySupply: 'मुद्रा आपूर्ति',
    allCountriesForYear: '{year} के सभी देश',
    population: 'जनसंख्या',
    withoutWork: 'बेरोज़गार',
    lifeExpectancy: 'जीवन अवधि',
    pension: 'पेंशन',
    amount: 'राशि',
    totalReserves: 'कुल भंडार',
    foreignExchange: 'विदेशी मुद्रा',
    monetaryGold: 'मौद्रिक सोना',
    current: 'वर्तमान',
    purchasingPowerParities: 'क्रय शक्ति समता',
    foreignDebt: 'विदेशी ऋण',
    debtToGdp: 'जीडीपी के अनुपात में ऋण',
  },
  es: {
    appTitle: 'Monitoreo de países',
    description: 'Indicadores económicos y sociales por país',
    support: 'Soporte',
    country: 'País',
    language: 'Idioma',
    economic: 'Económico',
    social: 'Social',
    monetaryReserves: 'Reservas monetarias',
    grossDomesticProduct: 'Producto interno bruto',
    debt: 'Deuda',
    debtToGross: 'Deuda / PIB',
    moneySupply: 'Oferta monetaria',
    allCountriesForYear: 'Todos los países en {year}',
    population: 'Población',
    withoutWork: 'Sin empleo',
    lifeExpectancy: 'Esperanza de vida',
    pension: 'Pensión',
    amount: 'Cantidad',
    totalReserves: 'Reservas totales',
    foreignExchange: 'Divisas',
    monetaryGold: 'Oro monetario',
    current: 'Actual',
    purchasingPowerParities: 'Paridad de poder adquisitivo',
    foreignDebt: 'Deuda exterior',
    debtToGdp: 'Deuda / PIB',
  },
  fr: {
    appTitle: 'Suivi des pays',
    description: 'Indicateurs économiques et sociaux par pays',
    support: 'Assistance',
    country: 'Pays',
    language: 'Langue',
    economic: 'Économique',
    social: 'Social',
    monetaryReserves: 'Réserves monétaires',
    grossDomesticProduct: 'Produit intérieur brut',
    debt: 'Dette',
    debtToGross: 'Dette / PIB',
    moneySupply: 'Offre monétaire',
    allCountriesForYear: 'Tous les pays en {year}',
    population: 'Population',
    withoutWork: 'Sans emploi',
    lifeExpectancy: 'Espérance de vie',
    pension: 'Retraite',
    amount: 'Montant',
    totalReserves: 'Réserves totales',
    foreignExchange: 'Change',
    monetaryGold: 'Or monétaire',
    current: 'Actuel',
    purchasingPowerParities: 'Parité de pouvoir d’achat',
    foreignDebt: 'Dette extérieure',
    debtToGdp: 'Dette / PIB',
  },
  ar: {
    appTitle: 'مراقبة الدول',
    description: 'المؤشرات الاقتصادية والاجتماعية حسب الدولة',
    support: 'الدعم',
    country: 'الدولة',
    language: 'اللغة',
    economic: 'اقتصادي',
    social: 'اجتماعي',
    monetaryReserves: 'الاحتياطيات النقدية',
    grossDomesticProduct: 'الناتج المحلي الإجمالي',
    debt: 'الدين',
    debtToGross: 'الدين / الناتج المحلي الإجمالي',
    moneySupply: 'عرض النقد',
    allCountriesForYear: 'جميع دول {year}',
    population: 'السكان',
    withoutWork: 'العاطلون عن العمل',
    lifeExpectancy: 'متوسط العمر المتوقع',
    pension: 'المعاشات',
    amount: 'المبلغ',
    totalReserves: 'إجمالي الاحتياطيات',
    foreignExchange: 'العملات الأجنبية',
    monetaryGold: 'الذهب النقدي',
    current: 'الحالي',
    purchasingPowerParities: 'تعادل القوة الشرائية',
    foreignDebt: 'الدين الخارجي',
    debtToGdp: 'نسبة الدين إلى الناتج المحلي الإجمالي',
  },
  bn: {
    appTitle: 'দেশ পর্যবেক্ষণ',
    description: 'দেশভিত্তিক অর্থনৈতিক ও সামাজিক সূচক',
    support: 'সহায়তা',
    country: 'দেশ',
    language: 'ভাষা',
    economic: 'অর্থনৈতিক',
    social: 'সামাজিক',
    monetaryReserves: 'মুদ্রা রিজার্ভ',
    grossDomesticProduct: 'মোট দেপোজ্যর উৎপাদন',
    debt: 'ঋণ',
    debtToGross: 'ঋণ / জিডিপি',
    moneySupply: 'মুদ্রা সরবরাহ',
    allCountriesForYear: '{year} সালের সব দেশ',
    population: 'জনসংখ্যা',
    withoutWork: 'বেকারত্ব',
    lifeExpectancy: 'আয়ুষ্ঠানুমান',
    pension: 'পেনশন',
    amount: 'পরিমাণ',
    totalReserves: 'মোট রিজার্ভ',
    foreignExchange: 'বৈদেশিক মুদ্রা',
    monetaryGold: 'মুদ্রা স্বর্ণ',
    current: 'বর্তমান',
    purchasingPowerParities: 'ক্রয় ক্ষমতা সমতা',
    foreignDebt: 'বৈদেশিক ঋণ',
    debtToGdp: 'জিডিপি-র অনুপাতে ঋণ',
  },
  pt: {
    appTitle: 'Monitoramento de países',
    description: 'Indicadores econômicos e sociais por país',
    support: 'Suporte',
    country: 'País',
    language: 'Idioma',
    economic: 'Econômico',
    social: 'Social',
    monetaryReserves: 'Reservas monetárias',
    grossDomesticProduct: 'Produto interno bruto',
    debt: 'Dívida',
    debtToGross: 'Dívida / PIB',
    moneySupply: 'Oferta monetária',
    allCountriesForYear: 'Todos os países em {year}',
    population: 'População',
    withoutWork: 'Desemprego',
    lifeExpectancy: 'Expectativa de vida',
    pension: 'Aposentadoria',
    amount: 'Quantia',
    totalReserves: 'Reservas totais',
    foreignExchange: 'Moeda estrangeira',
    monetaryGold: 'Ouro monetário',
    current: 'Atual',
    purchasingPowerParities: 'Paridade de poder de compra',
    foreignDebt: 'Dívida externa',
    debtToGdp: 'Dívida / PIB',
  },
  ru: {
    appTitle: 'Мониторинг стран',
    description: 'Экономические и социальные показатели по странам',
    support: 'Поддержка',
    country: 'Страна',
    language: 'Язык',
    economic: 'Экономика',
    social: 'Социальное',
    monetaryReserves: 'Валютные резервы',
    grossDomesticProduct: 'Валовой внутренний продукт',
    debt: 'Долг',
    debtToGross: 'Долг / ВВП',
    moneySupply: 'Денежная масса',
    allCountriesForYear: 'Все страны за {year} год',
    population: 'Население',
    withoutWork: 'Безработные',
    lifeExpectancy: 'Продолжительность жизни',
    pension: 'Пенсия',
    amount: 'Сумма',
    totalReserves: 'Общие резервы',
    foreignExchange: 'Иностранная валюта',
    monetaryGold: 'Монетарное золото',
    current: 'Текущий',
    purchasingPowerParities: 'Паритет покупательной способности',
    foreignDebt: 'Внешний долг',
    debtToGdp: 'Отношение долга к ВВП',
    admin: 'Админ',
    adminPanel: 'Кабинет администратора',
    adminLogin: 'Вход администратора',
    adminLoginError: 'Неверный логин или пароль',
    login: 'Логин',
    password: 'Пароль',
    signIn: 'Войти',
    logout: 'Выйти',
    back: 'Назад',
    leaveFeedback: 'Оставить отзыв',
    feedbackEmail: 'Ваш email',
    feedbackMessage: 'Что можно улучшить?',
    feedbackSend: 'Отправить',
    feedbackSent: 'Спасибо! Ваш отзыв отправлен.',
    feedbackError: 'Не удалось отправить отзыв. Попробуйте позже.',
    visits: 'Посещения',
    refillAll: 'Обновить все страны',
    refillCountry: 'Обновить страну',
    countryCode: 'Код страны',
    lastRefill: 'Результат последнего обновления',
    status: 'Статус',
    operation: 'Операция',
    processed: 'Обработано',
    started: 'Начало',
    finished: 'Окончание',
    error: 'Ошибка',
    noRefillResult: 'Обновлений ещё не было',
    feedbackList: 'Отзывы',
    noFeedback: 'Отзывов пока нет',
    createdAt: 'Дата',
    close: 'Закрыть',
    featureGdp: 'ВВП',
    featureDebt: 'Долг',
    featureReserves: 'Резервы',
    featurePopulation: 'Население',
    lastUpdated: 'Последнее обновление',
    updateByFeature: 'Обновление по фичам',
    refresh: 'Обновить',
    refreshAll: 'Все страны',
    refreshCountry: 'Страна',
    refreshJob: 'Задание обновления',
    failedCountries: 'Стран с ошибкой',
    retryFailed: 'Повторить упавшие',
    updateByCountry: 'Обновления по странам',
  },
  ur: {
    appTitle: 'ممالک کی نگرانی',
    description: 'مالک کے معاشی اور سماجی اشارے',
    support: 'معاونت',
    country: 'ملک',
    language: 'زبان',
    economic: 'اقتصادی',
    social: 'سماجی',
    monetaryReserves: 'زرخزدہ ذخائر',
    grossDomesticProduct: 'مجموعی گروپ تولیافت',
    debt: 'قرض',
    debtToGross: 'قرض / جی ڈی پی',
    moneySupply: 'پیسے کی فراہمی',
    allCountriesForYear: '{year} کے تمام ممالک',
    population: 'آبادی',
    withoutWork: 'بے روزگار',
    lifeExpectancy: 'متوقع عمر',
    pension: 'پنشن',
    amount: 'رقم',
    totalReserves: 'کل ذخائر',
    foreignExchange: 'غیر ملکی کرنسی',
    monetaryGold: 'زری سونا',
    current: 'موجودہ',
    purchasingPowerParities: 'خریداری طاقت کا برابر',
    foreignDebt: 'غیر ملکی قرض',
    debtToGdp: 'جی ڈی پی کا تناسب',
  },
};

const INTL_LOCALES = {
  zh: 'zh-CN',
  pt: 'pt-BR',
};

export function normalizeLocale(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const language = value.toLowerCase().replace('_', '-').split('-')[0];
  return SUPPORTED_LOCALES.includes(language) ? language : null;
}

function getLanguageTags() {
  if (typeof navigator === 'undefined') {
    return [];
  }
  const languages = Array.isArray(navigator.languages) ? navigator.languages : [];
  return [...languages, navigator.language].filter(Boolean);
}

function getStoredLocale() {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return normalizeLocale(window.localStorage.getItem('wcm-locale'));
  } catch {
    return null;
  }
}

export function getBrowserLocale() {
  for (const languageTag of getLanguageTags()) {
    const locale = normalizeLocale(languageTag);
    if (locale) {
      return locale;
    }
  }
  return DEFAULT_LOCALE;
}

export function getInitialLocale() {
  return getStoredLocale() || getBrowserLocale();
}

export function getRegionFromLanguageTag(languageTag) {
  if (typeof languageTag !== 'string') {
    return null;
  }
  const parts = languageTag.replace('_', '-').split('-');
  return parts.slice(1).find((part) => /^[a-z]{2}$/i.test(part) || /^\d{3}$/.test(part))?.toUpperCase() || null;
}

export function getCountryForLocale(locale, languageTags = getLanguageTags()) {
  const normalizedLocale = normalizeLocale(locale) || DEFAULT_LOCALE;
  for (const languageTag of languageTags) {
    const region = getRegionFromLanguageTag(languageTag);
    if (region && COUNTRY_CODE_BY_REGION[region]) {
      return COUNTRY_CODE_BY_REGION[region];
    }
  }
  return DEFAULT_COUNTRY_BY_LOCALE[normalizedLocale] || 'RUS';
}

export function getInitialCountry(locale = getInitialLocale()) {
  const storedLocale = getStoredLocale();
  return getCountryForLocale(locale, storedLocale ? [] : getLanguageTags());
}

export function getDirection(locale) {
  return ['ar', 'ur'].includes(normalizeLocale(locale)) ? 'rtl' : 'ltr';
}

export function getIntlLocale(locale = DEFAULT_LOCALE) {
  return INTL_LOCALES[normalizeLocale(locale)] || normalizeLocale(locale) || DEFAULT_LOCALE;
}

export function getLocaleLabel(locale) {
  return LOCALE_OPTIONS.find((option) => option.code === locale)?.label || locale;
}

export function translate(locale, key, params = {}) {
  const normalizedLocale = normalizeLocale(locale) || DEFAULT_LOCALE;
  const template = translations[normalizedLocale]?.[key] || translations[DEFAULT_LOCALE][key] || key;
  return Object.entries(params).reduce(
    (result, [param, value]) => result.split(`{${param}}`).join(String(value)),
    template,
  );
}

export function formatDate(value, locale = DEFAULT_LOCALE) {
  if (!value) {
    return '';
  }
  const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(String(value)) ? `${value}T00:00:00` : value;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    year: 'numeric',
    month: 'short',
  }).format(date);
}

export function formatNumber(value, locale = DEFAULT_LOCALE) {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  const number = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(number)) {
    return String(value);
  }
  return new Intl.NumberFormat(getIntlLocale(locale), {
    maximumFractionDigits: 2,
  }).format(number);
}

export function getCountryName(country, locale = DEFAULT_LOCALE) {
  const fallback = country?.name || country?.code || '';
  if (!country?.code || typeof Intl === 'undefined' || typeof Intl.DisplayNames !== 'function') {
    return fallback;
  }
  try {
    const region = COUNTRY_REGION_BY_CODE[country.code] || country.code;
    const displayName = new Intl.DisplayNames([getIntlLocale(locale)], { type: 'region' }).of(region);
    return displayName && displayName !== region ? displayName : fallback;
  } catch {
    return fallback;
  }
}
