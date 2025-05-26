import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export function AddTutorialPage() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        content: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('title', form.title);
        data.append('description', form.description);
        data.append('content', form.content);
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            await api.post('/robotics/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate('/robotics');
        } catch (err) {
            const msg =
                err.response?.data?.error ??
                err.response?.data ??
                'Eroare la adăugarea tutorialului';
            setError(msg.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-white p-6">
            <div className="w-full max-w-2xl bg-gray-100 rounded-2xl shadow-lg p-8">
                <h2 className="font-jersey text-3xl mb-6 text-center">Adaugă Tutorial de Robotică</h2>
                {error && <p className="text-red-600 text-center font-bold mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block font-bold mb-1">Titlu:</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={form.title}
                            onChange={e => handleChange('title', e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Descriere scurtă:</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded h-24"
                            value={form.description}
                            onChange={e => handleChange('description', e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Imagine (fișier .jpg/.png):</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1">Conținut complet tutorial:</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded h-60"
                            value={form.content}
                            onChange={e => handleChange('content', e.target.value)}
                            placeholder="Scrie aici pașii detaliați, explicații tehnice, cod, imagini etc..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Se salvează...' : 'Salvează Tutorial'}
                    </button>
                </form>
            </div>
        </div>
    );
}
