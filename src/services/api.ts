import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agrotechapi.devjhon.com',
});

export default api;
