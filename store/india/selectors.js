const getLatestStatsIndia = store => {
  return store.indiaStatsReducer.latestData.data
    ? store.indiaStatsReducer.latestData.data.summary
    : {};
};

const getStateStatsIndia = store => stateName => {
  return store.indiaStatsReducer.latestData.data
    ? store.indiaStatsReducer.latestData.data.regional.filter(
        reg => reg.loc === stateName,
      )
    : {};
};

const getStates = store => {
  return store.indiaStatsReducer.latestData.data
    ? store.indiaStatsReducer.latestData.data.regional.map(reg => reg.loc)
    : [];
};

const getDailySummaryIndia = store => {
  return store.indiaStatsReducer.dailySummaryData
    ? store.indiaStatsReducer.dailySummaryData.data
    : [];
};

export {
  getLatestStatsIndia,
  getStateStatsIndia,
  getStates,
  getDailySummaryIndia,
};
