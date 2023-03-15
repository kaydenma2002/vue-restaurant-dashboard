import axios from 'axios';
import { localStorageExport } from "../localStorage/local-storage";

const HTTPS = axios.create({
    baseURL: `https://127.0.0.1/api/`
})
HTTPS.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorageExport('jwtToken')}`;
    return config;
});

const HTTP = axios.create({
    baseURL: `https://127.0.0.1/api`,
})
export { HTTP, HTTPS }
