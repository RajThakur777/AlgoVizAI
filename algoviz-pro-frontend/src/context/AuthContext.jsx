// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService'; // Assuming this service is defined in src/services/

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Check local storage for initial user state
    const [user, setUser] = useState(() => authService.getCurrentUser());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Login function calls the backend and updates context
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await authService.login({ email, password });
            setUser(userData);
            setLoading(false);
            return userData;
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Login failed.';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Registration function calls the backend and updates context
    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await authService.register({ username, email, password });
            setUser(userData);
            setLoading(false);
            return userData;
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Registration failed.';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Logout function clears local storage and state
    const logout = () => {
        authService.logout();
        setUser(null);
    };

    // Value exposed to consuming components
    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};