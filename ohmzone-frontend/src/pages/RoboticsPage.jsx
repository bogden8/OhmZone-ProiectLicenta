import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../utils/api';

export default function RoboticsPage() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    // Decode role from token
    const token = localStorage.getItem('oz_token');
    let role = null;
    if (token) {
        try {
            // Role claim full name
            role = jwtDecode(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        } catch { /* invalid token */ }
    }

    useEffect(() => {
        api.get('/robotics')
            .then(res => setItems(res.data))
            .catch(() => {/* handle error */ });
    }, []);

    const handleAdd = () => {
        navigate(role === 'Admin' ? '/robotics/new-tutorial' : '/robotics/new-project');
    };

    return (
        <div className="max-w-[1200px] mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-jersey text-4xl">Learn. Build. Create.</h1>
                {role && (
                    <button
                        onClick={handleAdd}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded"
                    >
                        {role === 'Admin' ? 'Adaugă un tutorial' : 'Adaugă un proiect DIY'}
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {items.map(item => (
                    <div
                        key={item.tutorialID}
                        className="flex bg-gray-100 rounded-lg overflow-hidden shadow"
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
