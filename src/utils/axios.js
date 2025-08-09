import axios from 'axios';

const api = axios.create({
  baseURL: 'https://medusa-ewmh.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;
