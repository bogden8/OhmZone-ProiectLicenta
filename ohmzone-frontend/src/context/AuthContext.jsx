import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    //pentru a citi token-ul o singura data
    useEffect(() => {
        const token = localStorage.getItem('oz_token');
        if (token) {
            try {
                const { username } = jwtDecode(token);
                setUser(username);

            } catch {
                localStorage.removeItem('oz_token');

            }
        }
    }, []);

    //functia login care acutalizeaza contextul
    const login = token => {
        localStorage.setItem('oz_token', token);
        const { username } = jwtDecode(token);
        setUser(username);
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