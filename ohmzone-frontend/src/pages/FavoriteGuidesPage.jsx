import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export default function FavoriteGuidesPage() {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('oz_token');

        if (!token) {
            setError('Nu ești autentificat.');
            setLoading(false);
            return;
        }

        fetch(`${API_BASE_URL}/api/favorites`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error('Eroare la încărcarea ghidurilor favorite.');
                return res.json();
            })
            .then(data => setGuides(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-10">
            <h1 className="font-jersey text-4xl font-bold mb-6 ">Ghiduri favorite</h1>

            {loading && <p className="text-gray-500">Se încarcă...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && guides.length === 0 && (
                <p>Nu ai ghiduri salvate.</p>
            )}

            <div className="space-y-6">
                {guides.map(guide => (
                    <div
                        key={guide.guideID}
                        className="bg-gray-200 p-6 rounded-2xl shadow hover:bg-gray-300 cursor-pointer transition"
                        onClick={() => navigate(`/guides/view/${guide.guideID}`)}
                    >
                        <h2 className="text-xl font-bold text-blue-700">{guide.title}</h2>
                        <p className="text-sm text-gray-600">
                            {guide.deviceName || 'Fără nume dispozitiv'}
                        </p>
                        <p className="text-sm text-black">
                            Salvat pe: {guide.dateSaved ? new Date(guide.dateSaved).toLocaleString() : 'Necunoscut'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
