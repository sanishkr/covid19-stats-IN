const getStats = store => {
  return store.statsReducer.data;
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

export { getStats, getTheme, getCountries, getCountryStats };
