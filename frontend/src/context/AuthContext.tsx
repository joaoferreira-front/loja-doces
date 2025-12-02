import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

interface User {
    email: string;
    nome: string;
    role: string;
}

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            // Try standard logout first
            await api.post('/logout');
        } catch (error) {
            console.error('Standard logout failed', error);
        }

        try {
            // Try manual logout as backup
            await api.post('/manual/logout');
        } catch (error) {
            console.error('Manual logout failed', error);
        }
        setUser(null);
        window.location.replace('/');
    };

    const checkAuth = async () => {
        try {
            const response = await api.get('/auth/status');
            if (response.data && response.data.authenticated) {
                setUser({
                    email: response.data.email,
                    nome: response.data.nome,
                    role: response.data.role
                });
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
