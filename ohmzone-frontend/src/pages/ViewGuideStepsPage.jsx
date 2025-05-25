import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewGuideStepsPage() {
    const { guideId } = useParams();
    const [steps, setSteps] = useState([]);
    const [guide, setGuide] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchGuideData() {
            try {
                const guideRes = await axios.get(`/api/repairguide/${guideId}`);
                setGuide(guideRes.data);

                const stepsRes = await axios.get(`/api/repairguide/${guideId}/steps`);
                setSteps(stepsRes.data);
            } catch (err) {
                setError('Eroare la încărcarea ghidului sau a pașilor.');
            }
        }

        fetchGuideData();
    }, [guideId]);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow">
            {error && <p className="text-red-500">{error}</p>}

            {guide && (
                <>
                    <h1 className="text-3xl font-bold mb-6">{guide.title}</h1>
                    <p className="text-gray-700 mb-6">{guide.content}</p>
                </>
            )}

            <ul className="space-y-6">
                {steps.map((step, index) => (
                    <li
                        key={step.guideStepID || step.id || index}
                        className="border p-4 rounded bg-gray-50 shadow"
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
    );
}
