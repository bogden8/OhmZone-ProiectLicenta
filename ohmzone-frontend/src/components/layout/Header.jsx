import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-navbar-bg text-white py-3 shadow-md">
            <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                {/* Stânga: Logo + meniul */}
                <div className="flex items-center gap-12">
                    <Link to="/" className="text-5xl font-bold font-jersey">
                        OhmZone
                    </Link>

                    <nav className="flex items-center gap-8 font-bold text-sm">
                        <Link to="/repair-guides" className="hover:underline">Fix your stuff</Link>
                        <Link to="/robotics" className="hover:underline">Robotics</Link>
                        <Link to="/forum" className="hover:underline">Forum</Link>
                    </nav>
                </div>

                {/* Dreapta: Search + RO + Login */}
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="search"
                        className="bg-gray-300 text-black px-6 py-2 rounded-full text-base w-64 placeholder-black"
                    />
                    <button className="bg-gray-300 text-black rounded-md px-3 py-1 font-bold text-sm">RO</button>
                    <Link to="/login" className="hover:underline text-sm font-bold">Login</Link>
                </div>
            </div>
        </header>
    );
}
