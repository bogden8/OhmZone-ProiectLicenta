import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewGuideStepsPage() {
    const { guideId } = useParams();
    const [steps, setSteps] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`/api/repairguide/${guideId}/steps`)
            .then(res => setSteps(res.data))
            .catch(err => setError('Eroare la încărcarea pașilor.'));
    }, [guideId]);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Pași pentru ghidul #{guideId}</h1>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-4">
                {steps.map((step, index) => (
                    <li key={step.id} className="border p-4 rounded bg-white shadow">
                        <p className="font-semibold">Pasul {index + 1}</p>
                        <p>{step.text}</p>
                        {step.mainImageUrl && (
                            <img src={step.mainImageUrl} alt="Main" className="w-64 mt-2 rounded" />
                        )}
                        {step.thumbnailUrlsJson && (
                            <div className="flex gap-2 mt-2">
                                {JSON.parse(step.thumbnailUrlsJson).map((url, i) => (
                                    <img key={i} src={url} alt={`thumb-${i}`} className="w-20 h-20 object-cover rounded" />
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <Link
                to={`/admin/guides/${guideId}/steps/add`}
                className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Adaugă un pas nou
            </Link>
        </div>
    );
}
