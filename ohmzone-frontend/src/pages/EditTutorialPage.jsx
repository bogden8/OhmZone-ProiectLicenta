import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function EditTutorialPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        content: '',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await api.get(`/robotics/${id}`);
                setForm({
                    title: res.data.title,
                    description: res.data.description,
                    content: res.data.content,
                    imageUrl: res.data.imageUrl,
                });
            } catch {
                setError('Eroare la încărcarea tutorialului.');
            }
        }

        fetchData();
    }, [id]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.put(`/robotics/${id}`, form);
            navigate(`/robotics/${id}`);
        } catch {
            setError('Eroare la salvarea modificărilor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-xl shadow">
            <h1 className="text-3xl font-bold mb-6 text-center font-jersey">Editare Tutorial</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block font-bold mb-1">Titlu:</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={e => handleChange('title', e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-bold mb-1">Descriere:</label>
                    <textarea
                        value={form.description}
                        onChange={e => handleChange('description', e.target.value)}
                        className="w-full p-2 border rounded h-24"
                        required
                    />
                </div>

                <div>
                    <label className="block font-bold mb-1">Conținut:</label>
                    <textarea
                        value={form.content}
                        onChange={e => handleChange('content', e.target.value)}
                        className="w-full p-2 border rounded h-40"
                        required
                    />
                </div>

                <div>
                    <label className="block font-bold mb-1">URL Imagine:</label>
                    <input
                        type="text"
                        value={form.imageUrl}
                        onChange={e => handleChange('imageUrl', e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                >
                    {loading ? 'Se salvează...' : 'Salvează Modificările'}
                </button>
            </form>
        </div>
    );
}
