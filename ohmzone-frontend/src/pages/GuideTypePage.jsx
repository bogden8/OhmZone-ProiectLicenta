import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function GuideTypePage() {
    const { categorySlug, subcategorySlug, brandSlug, deviceSlug } = useParams();
    const [guides, setGuides] = useState([]);
    const [error, setError] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGuides() {
            try {
                const allDevicesRes = await axios.get('/api/device');
                const device = allDevicesRes.data.find(d => d.slug === deviceSlug);

                if (!device) {
                    setError('Dispozitivul nu a fost găsit.');
                    return;
                }

                setDeviceName(device.model);

                const guidesRes = await axios.get(`/api/lookup/guides/${device.deviceID}`);
                setGuides(guidesRes.data);
            } catch (err) {
                setError('Eroare la încărcarea ghidurilor.');
            }
        }

        fetchGuides();
    }, [deviceSlug]);

    return (
        <div className="bg-white min-h-screen flex flex-col items-center px-4 pt-10 animate-fade-in">

            {/* Banner cu text suprapus */}
            <div className="relative w-full h-48 rounded-none overflow-hidden mb-10">
                <img
                    src="/assets/magazin-online-soon.jpg"
                    alt="Magazin online în curând"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
                    <h2 className="text-white text-2xl md:text-3xl font-bold text-center">
                        Vom avea un magazin online cu piese și unelete în curând!
                    </h2>
                </div>
            </div>

            <h1 className="text-4xl font-bold font-jersey mb-10 text-center">
                Ghiduri pentru {deviceName || deviceSlug}
            </h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {guides.length === 0 ? (
                <p className="text-center text-gray-600">Nu există ghiduri pentru acest model.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full animate-slide-up">
                    {guides.map((guide) => (
                        <Link
                            key={guide.guideID}
                            to={`/guides/view/${guide.guideID}`}
                            className="bg-gray-300 hover:bg-gray-400 transition duration-300 transform hover:scale-105 cursor-pointer text-center p-8 font-bold text-lg rounded shadow-md"
                        >
                            {guide.title}
                        </Link>
                    ))}
                </div>
            )}

            {/* Buton spre forum */}
            <div className="mt-20 mb-10">
                <button
                    onClick={() => navigate('/forum/ask')}
                    className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300 shadow-md"
                >
                    Nu găsești ce cauți? Pune o întrebare pe forum
                </button>
            </div>
        </div>
    );
}
