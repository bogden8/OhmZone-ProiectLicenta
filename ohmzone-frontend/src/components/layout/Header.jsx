import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 bg-navbar-bg text-white py-3 shadow-md">
            <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link to="/" className="text-5xl font-bold font-jersey">OhmZone</Link>
                    <nav className="flex items-center gap-8 font-bold text-sm">
                        <Link to="/repair-guides">Fix your stuff</Link>
                        <Link to="/robotics">Robotics</Link>
                        <Link to="/forum">Forum</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="search"
                        className="bg-gray-300 text-black px-6 py-2 rounded-full w-64 placeholder-black"
                    />
                    <button className="bg-gray-300 text-black rounded-md px-3 py-1 font-bold text-sm">RO</button>

                    {user ? (
                        <>
                            <span className="font-medium">{user.username}</span>
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
