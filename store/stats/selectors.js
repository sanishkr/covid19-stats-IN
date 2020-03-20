const getStats = store => {
  return store.statsReducer.data;
};

const getDailySummary = store => {
  return store.statsReducer.dailySummary;
};

const getTheme = store => {
  return store.statsReducer.theme;
};

const getCountries = store => {
  return store.statsReducer.countries.countries;
};

const getCountryStats = store => {
  return store.statsReducer.countryData;
};

export { getStats, getDailySummary, getTheme, getCountries, getCountryStats };
