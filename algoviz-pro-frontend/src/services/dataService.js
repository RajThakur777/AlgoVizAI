import axios from 'axios';
import API_BASE_URL from '../config/api';

const DATA_URL = `${API_BASE_URL}/data`;

// Helper to retrieve token for protected routes
const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.token) {
        // Required format for the Express middleware
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
};

// POST /api/data/save (Protected)
export const saveState = async (stateData) => {
    const response = await axios.post(`${DATA_URL}/save`, stateData, {
        headers: authHeader(),
    });
    return response.data;
};

// GET /api/data/states (Protected)
export const getStates = async () => {
    const response = await axios.get(`${DATA_URL}/states`, {
        headers: authHeader(),
    });
    return response.data.data;
};

// DELETE /api/data/states/:id (Protected)
export const deleteState = async (stateId) => {
    const response = await axios.delete(`${DATA_URL}/states/${stateId}`, {
        headers: authHeader(),
    });
    return response.data;
};