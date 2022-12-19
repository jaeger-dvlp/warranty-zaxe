import axios from 'axios';

const { APIURL } = process.env;

const API = axios.create({ baseURL: APIURL });

export default API;
