import axios from 'axios';  

const API_BASE_URL = 'http://localhost:5001/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - her istekte token'ı header'a ekle
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - 401 hatası durumunda logout yap
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token geçersiz, localStorage'ı temizle
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Sayfayı yenile veya login sayfasına yönlendir
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);