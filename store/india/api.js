import axios from 'axios';
// import { parseCookies } from 'nookies';
import config from '../../config';

// const cookies = new parseCookies();
// console.log({cookies, publicRuntimeConfig});

const getLatestStatsIndia = () =>
  axios.get(`${config.india}/stats/latest`).catch(() => ({
    data: {},
  }));

const getDailySummaryIndia = () =>
  axios.get(`${config.india}/stats/daily`).catch(() => ({
    data: [],
  }));

export default {
  getLatestStatsIndia,
  getDailySummaryIndia,
};
