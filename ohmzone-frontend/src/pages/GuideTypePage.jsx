import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function GuideTypePage() {
    const { categorySlug, subcategorySlug, brandSlug, deviceSlug } = useParams();
    const [guides, setGuides] = useState([]);
    const [error, setError] = useState('');
    const [deviceName, setDeviceName] = useState('');

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

            <div className="mt-20"></div>
        </div>
    );
}
