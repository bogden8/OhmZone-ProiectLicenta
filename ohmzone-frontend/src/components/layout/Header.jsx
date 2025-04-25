import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="flex justify-between items-center px-4 py-3 border-b bg-white">
            <Link to="/" className="text-2xl font-bold">OhmZone</Link>
            <nav className="flex items-center space-x-4">
                <Link to="/repair-guides" className="hover:underline">Fix your stuff</Link> 
                <Link to="/robotics" className="hover:underline">Robotics</Link>
                <Link to="/forum" className="hover:underline">Forum</Link>
                <input type="text" placeholder="Search" className="border p-1 rounded" />
                <button className="px-2 py-1 border rounded">EN</button>
                <Link to="/login" className="hover:underline">Login</Link>
            </nav>
        </header>
    ); 
}
