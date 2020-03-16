import axios from 'axios';
// import { parseCookies } from 'nookies';
import config from '../../config';

// const cookies = new parseCookies();
// console.log({cookies, publicRuntimeConfig});

const getStats = () =>
  axios.get(`${config.api}/`).catch(() => ({
    data: {},
  }));

const getCountries = () =>
  axios.get(`${config.api}/countries`).catch(() => ({
    data: {},
  }));

const getCountryStats = ({ id }) =>
  axios.get(`${config.api}/countries/${id}`).catch(() => ({
    data: {},
  }));

export default { getStats, getCountries, getCountryStats };
