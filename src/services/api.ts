import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.0.0.111:3333',
  baseURL: 'https://agrotechapi.devjhon.com',
});

export default api;
