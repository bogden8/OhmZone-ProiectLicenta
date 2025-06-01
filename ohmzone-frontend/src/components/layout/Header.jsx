import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearchKey = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-navbar-bg text-white py-3 shadow-md transition duration-300">
            <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-5xl font-bold font-jersey hover:text-yellow-400 transition">
                        OhmZone
                    </Link>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-2xl ml-4">
                        ☰
                    </button>
                </div>

                <nav className={`md:flex gap-6 font-bold text-sm ${mobileMenuOpen ? 'flex flex-col absolute top-16 left-0 bg-navbar-bg w-full p-4 z-50' : 'hidden'} md:static md:flex-row md:items-center`}>
                    <Link to="/repair-guides" className="hover:text-yellow-400 transition">Ghiduri de reparații</Link>
                    <Link to="/robotics" className="hover:text-yellow-400 transition">Robotică</Link>
                    <Link to="/forum" className="hover:text-yellow-400 transition">Forum</Link>
                </nav>


                <div className="hidden md:flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="caută"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearchKey}
                        className="bg-gray-300 text-black px-6 py-2 rounded-full w-64 placeholder-black"
                    />
                    <button className="bg-gray-300 text-black rounded-md px-3 py-1 font-bold text-sm">RO</button>

                    <Link
                        to="/favorites"
                        className="text-white text-2xl hover:text-yellow-400 transition"
                        title="Ghiduri favorite"
                    >
                        ★
                    </Link>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <span
                                onClick={() => setIsOpen(prev => !prev)}
                                className="font-medium cursor-pointer hover:text-yellow-400 transition"
                            >
                                {user.username}
                            </span>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
                                    <Link
                                        to="/forum/myposts"
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition border-b border-gray-300"
                                    >
                                        Vezi postările tale
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-bold hover:text-yellow-400 transition">Login</Link>
                            <Link to="/register" className="text-sm font-bold hover:text-yellow-400 transition">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
