import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5097/api',    // ← note the “http://”
});

api.interceptors.request.use(cfg => {
    const token = localStorage.getItem('oz_token');
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

export default api;
