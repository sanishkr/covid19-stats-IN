const getStats = store => {
  return store.statsReducer.data;
};

const getCountries = store => {
  return store.statsReducer.countries;
};

const getCountryStats = store => {
  return store.statsReducer.countryData;
};

export { getStats, getCountries, getCountryStats };
