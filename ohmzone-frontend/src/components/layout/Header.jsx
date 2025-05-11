// src/components/layout/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';   // named export

export default function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem('oz_token');
        setUser(null);
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 bg-navbar-bg text-white py-3 shadow-md">
            <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                {/* Stânga */}
                <div className="flex items-center gap-12">
                    <Link to="/" className="text-5xl font-bold font-jersey">OhmZone</Link>
                    <nav className="flex items-center gap-8 font-bold text-sm">
                        <Link to="/repair-guides">Fix your stuff</Link>
                        <Link to="/robotics">Robotics</Link>
                        <Link to="/forum">Forum</Link>
                    </nav>
                </div>

                {/* Dreapta */}
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="search"
                        className="bg-gray-300 text-black px-6 py-2 rounded-full w-64 placeholder-black"
                    />
                    <button className="bg-gray-300 text-black rounded-md px-3 py-1 font-bold text-sm">RO</button>

                    {user ? (
                        <>
                            <span className="font-medium">{user}</span>
                            <button onClick={handleLogout} className="text-sm font-bold hover:underline">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-bold">Login</Link>
                            <Link to="/register" className="text-sm font-bold">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
