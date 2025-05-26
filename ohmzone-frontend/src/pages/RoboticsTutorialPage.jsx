import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function RoboticsTutorialPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tutorial, setTutorial] = useState(null);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Verifică dacă utilizatorul e admin
        const token = localStorage.getItem("oz_token");
        if (token) {
            try {
                const parts = token.split(".");
                if (parts.length === 3) {
                    const payloadJson = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
                    const payload = JSON.parse(payloadJson);
                    const roleClaim =
                        payload.role ||
                        payload.Role ||
                        (Array.isArray(payload.roles) ? payload.roles[0] : undefined) ||
                        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                    setIsAdmin(roleClaim?.toLowerCase() === "admin");
                }
            } catch { }
        }

        // Fetch tutorial
        async function fetchTutorial() {
            try {
                const res = await api.get(`/robotics/${id}`);
                setTutorial(res.data);
            } catch {
                setError('Nu s-a putut încărca tutorialul.');
            }
        }
        fetchTutorial();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Ești sigur că vrei să ștergi acest tutorial?")) return;
        try {
            await api.delete(`/robotics/${id}`);
            navigate('/robotics');
        } catch {
            alert("Eroare la ștergerea tutorialului.");
        }
    };

    const handleEdit = () => {
        navigate(`/robotics/edit/${id}`);
    };

    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
    if (!tutorial) return <p className="text-center mt-10">Se încarcă tutorialul...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => navigate(-1)} className="text-blue-600 underline">← Înapoi</button>
                {isAdmin && (
                    <div className="flex gap-2">
                        <button
                            onClick={handleEdit}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                        >
                            Editează
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                        >
                            Șterge
                        </button>
                    </div>
                )}
            </div>

            <h1 className="text-4xl font-bold mb-4 font-jersey">{tutorial.title}</h1>
            <p className="text-gray-600 italic mb-4">
                Publicat de {tutorial.authorName || 'necunoscut'} pe {tutorial.datePublished?.split('T')[0]}
            </p>

            {tutorial.imageUrl && (
                <img
                    src={tutorial.imageUrl}
                    alt={tutorial.title}
                    className="w-full max-h-[400px] object-cover rounded mb-6 shadow"
                />
            )}

            <p className="text-lg whitespace-pre-line leading-relaxed">{tutorial.content}</p>
        </div>
    );
}
