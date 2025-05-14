import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5097/api'
});

api.interceptors.request.use(cfg => {
    const token = localStorage.getItem('oz_token');
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});


export default api;


export async function updateRepairGuide(id, data) {
    const res = await api.put(`/repairguide/${id}`, data);
    return res.data;
}

export async function fetchRepairGuideById(id) {
    const res = await api.get(`/repairguide/${id}`);
    return res.data;
}


export async function login(credentials) {
    const res = await api.post('/auth/login', credentials);
    return res.data;
}
export async function register(user) {
    const res = await api.post('/auth/register', user);
    return res.data;
}


export async function fetchAllTutorials() {
    const res = await api.get('/robotics');
    return res.data;
}


export async function createRepairGuide(data) {
    const res = await api.post('/repairguide', data);
    return res.data;
    
}

export async function createDevice(name) {
    const res = await api.post('/devices', { name });
    return res.data;  
}