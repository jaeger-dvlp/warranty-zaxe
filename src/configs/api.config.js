import axios from 'axios';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

const API = axios.create({ baseURL: APIURL });

export default API;
