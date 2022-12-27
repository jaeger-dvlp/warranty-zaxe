import axios from 'axios';

const { NEXT_PUBLIC_API_URL } = process.env;

const API = axios.create({ baseURL: NEXT_PUBLIC_API_URL });

export default API;
