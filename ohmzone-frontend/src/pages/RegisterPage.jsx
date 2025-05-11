// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function RegisterPage() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await api.post('/auth/register', form);
            navigate('/login');
        } catch (err) {
            const msg =
                err.response?.data?.error
                ?? err.response?.data
                ?? 'Eroare la înregistrare';
            +  setError(msg);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <div className="bg-gray-200 rounded-2xl shadow-lg p-10 w-full max-w-md">
                <h2 className="font-jersey text-4xl mb-8 text-center">Înregistrează-te</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block font-bold mb-2">Username:</label>
                        <input
                            type="text"
                            placeholder="Alege un username"
                            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={form.username}
                            onChange={e => setForm({ ...form, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            placeholder="adresa@exemplu.com"
                            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-2">Parolă:</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded transition"
                    >
                        Înregistrează-te
                    </button>
                </form>

                <p className="mt-6 text-center text-sm">
                    Ai deja cont?{' '}
                    <Link to="/login" className="text-red-500 font-semibold hover:underline">
                        Loghează-te aici
                    </Link>
                </p>
            </div>
        </div>
    );
}
