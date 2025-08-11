import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lightning.ai/aswinharidas0/playground/studios/litdata/web-ui?port%3D8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
