import axios from 'axios';
import { localStorageExport } from "../localStorage/local-storage";

const HTTPS = axios.create({
    baseURL: `http://127.0.0.1:8000/api/`
})
HTTPS.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorageExport('jwtToken')}`;
    return config;
});

const HTTP = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
})
export { HTTP, HTTPS }
