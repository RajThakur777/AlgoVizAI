import axios from 'axios';
import API_BASE_URL from '../config/api';

const AUTH_URL = `${API_BASE_URL}/auth`;

const setLocalStorage = (data) => {
    // Store token and user info
    localStorage.setItem('user', JSON.stringify(data));
};

const register = async (userData) => {
    const response = await axios.post(`${AUTH_URL}/register`, userData);
    if (response.data.token) {
        setLocalStorage(response.data);
    }
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${AUTH_URL}/login`, userData);
    if (response.data.token) {
        setLocalStorage(response.data);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

export const authService = {
    register,
    login,
    logout,
    getCurrentUser: () => JSON.parse(localStorage.getItem('user')),
};