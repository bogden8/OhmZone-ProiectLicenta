import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function LoginPage() {
    const { login } = useAuth();
    const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', form);
            const decoded = jwtDecode(data.token);

            localStorage.setItem('oz_token', data.token);
            localStorage.setItem('oz_role', decoded.role); 

            login(data.token);
            navigate('/');
        } catch (err) {
            const msg =
                err.response?.data?.error
                ?? err.response?.data
                ?? 'Eroare la autentificare';
            setError(msg);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <div className="bg-gray-200 rounded-2xl shadow-lg p-10 w-full max-w-md">
                <h2 className="font-jersey text-4xl mb-8 text-center">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            placeholder="ex:popescuadrian@yahoo.com"
                            className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={form.usernameOrEmail}
                            onChange={e => setForm({ ...form, usernameOrEmail: e.target.value })}
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
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm">
                    Nu ai cont?{' '}
                    <Link to="/register" className="text-red-500 font-semibold hover:underline">
                        Creează unul aici
                    </Link>
                </p>
            </div>
        </div>
    );
}
