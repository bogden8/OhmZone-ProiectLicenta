﻿import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewGuideStepsPage() {
    const { guideId } = useParams();
    const navigate = useNavigate();

    const [steps, setSteps] = useState([]);
    const [guide, setGuide] = useState(null);
    const [error, setError] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    const token = localStorage.getItem('oz_token');
    let isAdmin = false;

    if (token) {
        try {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
                const roleClaim =
                    payload.role ||
                    payload.Role ||
                    (Array.isArray(payload.roles) ? payload.roles[0] : undefined) ||
                    payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                isAdmin = roleClaim === 'Admin';
            }
        } catch (e) {
            console.error('JWT decode error:', e);
        }
    }

    useEffect(() => {
        async function fetchGuideData() {
            try {
                const guideRes = await axios.get(`/api/repairguide/${guideId}`);
                setGuide(guideRes.data);

                const stepsRes = await axios.get(`/api/repairguide/${guideId}/steps`);
                setSteps(stepsRes.data);

                if (token) {
                    const favRes = await axios.get('/api/favorites', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const fav = favRes.data.find(f => f.guideID === parseInt(guideId));
                    setIsFavorite(!!fav);
                }
            } catch (err) {
                setError('Eroare la încărcarea ghidului sau a pașilor.');
            }
        }

        fetchGuideData();
    }, [guideId]);

    const handleDelete = async () => {
        if (!window.confirm('Ești sigur că vrei să ștergi acest ghid?')) return;

        try {
            await axios.delete(`/api/repairguide/${guideId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/repair-guides');
        } catch (err) {
            console.error('Eroare la ștergere:', err);
            setError('Nu s-a putut șterge ghidul.');
        }
    };

    const handleEdit = () => {
        navigate(`/admin/guides/${guideId}/edit`);
    };

    const toggleFavorite = async () => {
        try {
            const url = `/api/favorites/${guideId}`;
            if (isFavorite) {
                await axios.delete(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsFavorite(false);
            } else {
                await axios.post(url, null, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsFavorite(true);
            }
        } catch (err) {
            console.error('Eroare la schimbarea stării favorite:', err);
        }
    };

    return (
        <div className="bg-white min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-2xl shadow-lg">
                {error && <p className="text-red-500">{error}</p>}

                {guide && (
                    <>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold">{guide.title}</h1>
                                <button
                                    onClick={toggleFavorite}
                                    className="text-yellow-500 hover:text-yellow-600 text-2xl"
                                    title={isFavorite ? 'Elimină din favorite' : 'Adaugă la favorite'}
                                >
                                    {isFavorite ? '★' : '☆'}
                                </button>
                            </div>

                            {isAdmin && (
                                <div className="space-x-2">
                                    <button
                                        onClick={handleEdit}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded"
                                    >
                                        Modifică
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-600 hover:bg-red-700 text-black font-bold px-4 py-2 rounded"
                                    >
                                        Șterge
                                    </button>
                                </div>
                            )}
                        </div>

                        <p className="text-gray-700 mb-6">{guide.content}</p>
                    </>
                )}

                <ul className="space-y-6">
                    {steps.map((step, index) => (
                        <li
                            key={step.guideStepID || step.id || index}
                            className="border p-4 rounded bg-white shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">Pasul {index + 1}</h2>
                            <p className="mb-2">{step.description}</p>

                            {step.imagePath && (
                                <img
                                    src={`http://localhost:5097${step.imagePath}`}
                                    alt={`Pasul ${index + 1}`}
                                    className="w-full max-w-md rounded"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
