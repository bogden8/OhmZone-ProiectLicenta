// src/pages/AddProjectPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export function AddProjectPage() {
    const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await api.post('/diyprojects', form);
            navigate('/robotics');
        } catch (err) {
            const msg =
                err.response?.data?.error ??
                err.response?.data ??
                'Eroare la adăugarea proiectului';
            setError(msg);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-white p-6">
            <div className="w-full max-w-lg bg-gray-200 rounded-2xl shadow-lg p-8">
                <h2 className="font-jersey text-3xl mb-6 text-center">Adaugă Proiect DIY</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block font-bold mb-1">Titlu:</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-400 rounded"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-bold mb-1">Descriere:</label>
                        <textarea
                            className="w-full p-2 border border-gray-400 rounded h-24"
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-bold mb-1">URL Imagine:</label>
                        <input
                            type="url"
                            className="w-full p-2 border border-gray-400 rounded"
                            value={form.imageUrl}
                            onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
                    >
                        Salvează Proiect
                    </button>
                </form>
            </div>
        </div>
    );
}
