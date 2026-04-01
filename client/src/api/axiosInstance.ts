import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // আপনার লোকাল সার্ভার পোর্ট
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;