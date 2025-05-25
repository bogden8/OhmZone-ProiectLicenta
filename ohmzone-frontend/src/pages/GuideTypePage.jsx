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
                // 🔍 Caută device-ul după slug
                const allDevicesRes = await axios.get('/api/device'); // sau creează un endpoint /api/device/by-slug
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Ghiduri pentru {deviceName || deviceSlug}
            </h1>

            {error && <p className="text-red-500">{error}</p>}

            {guides.length === 0 ? (
                <p>Nu există ghiduri pentru acest model.</p>
            ) : (
                <ul className="space-y-4">
                    {guides.map((guide) => (
                        <li key={guide.guideID}>
                            <Link
                                to={`/guides/view/${guide.guideID}`}
                                className="block bg-gray-100 p-4 rounded shadow hover:bg-gray-200"
                            >
                                {guide.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
