import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function RoboticsPage() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("oz_token");
    let isAdmin = false;

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
                isAdmin = roleClaim?.toLowerCase() === "admin";
            }
        } catch (e) {
            console.error("Eroare la decodarea JWT:", e);
        }
    }

    useEffect(() => {
        api.get('/robotics')
            .then(res => setItems(res.data))
            .catch(() => {
                console.error("Eroare la încărcarea tutorialelor");
            });
    }, []);

    const handleAdd = () => {
        navigate('/robotics/new-tutorial');
    };

    return (
        <div className="max-w-[1200px] mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-jersey text-4xl">Învață. Construiește. Creează.</h1>
                {isAdmin && (
                    <button
                        onClick={handleAdd}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded"
                    >
                        Adaugă un tutorial
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {items.map(item => (
                    <div
                        key={item.tutorialID}
                        onClick={() => navigate(`/robotics/${item.tutorialID}`)}
                        className="flex cursor-pointer bg-gray-100 hover:bg-gray-200 transition rounded-lg overflow-hidden shadow"
                    >
                        <div className="w-1/3">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="object-cover h-full w-full"
                            />
                        </div>
                        <div className="p-6 flex-1">
                            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                            <p className="text-gray-700">{item.description}</p>
                            <p className="text-sm text-gray-500 mt-2 italic">
                                Publicat la: {item.datePublished?.split('T')[0] || 'necunoscut'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
