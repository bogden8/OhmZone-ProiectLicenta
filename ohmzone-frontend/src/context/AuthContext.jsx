import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('oz_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    id: decoded.sub,
                    username: decoded.name || decoded.username || decoded.unique_name,
                    role: decoded.role
                });
            } catch {
                localStorage.removeItem('oz_token');
                setUser(null);
            }
        }
    }, []);

    const login = token => {
        localStorage.setItem('oz_token', token);
        const decoded = jwtDecode(token);
        setUser({
            id: decoded.sub,
            username: decoded.name || decoded.username || decoded.unique_name,
            role: decoded.role
        });
    };

    const logout = () => {
        localStorage.removeItem('oz_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
