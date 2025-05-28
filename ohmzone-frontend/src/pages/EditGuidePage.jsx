import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditGuidePage() {
    const { id: guideId } = useParams();
    const [guide, setGuide] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [part, setPart] = useState('');
    const [steps, setSteps] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('oz_token');

    useEffect(() => {
        async function fetchGuideAndSteps() {
            try {
                const guideRes = await axios.get(`/api/repairguide/${guideId}`);
                const fetchedGuide = guideRes.data;

                setGuide(fetchedGuide);
                setTitle(fetchedGuide.title);
                setContent(fetchedGuide.content);
                setPart(fetchedGuide.part || '');

                const stepsRes = await axios.get(`/api/repairguide/${guideId}/steps`);
                const normalizedSteps = stepsRes.data.map(s => ({
                    GuideStepID: s.guideStepID,
                    Description: s.description,
                    ImagePath: s.imagePath,
                    isNew: false,
                    newImage: null
                }));
                setSteps(normalizedSteps);
            } catch (err) {
                setError("Eroare la încărcarea ghidului.");
            }
        }

        fetchGuideAndSteps();
    }, [guideId]);

    const handleStepChange = (idx, value) => {
        const updated = [...steps];
        updated[idx].Description = value;
        setSteps(updated);
    };

    const handleImageChange = (idx, file) => {
        const updated = [...steps];
        updated[idx].newImage = file;
        setSteps(updated);
    };

    const handleDeleteStep = async (stepId) => {
        if (!window.confirm("Sigur vrei să ștergi acest pas?")) return;
        try {
            await axios.delete(`/api/repairguide/steps/${stepId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSteps(steps => steps.filter(s => s.GuideStepID !== stepId));
        } catch {
            alert('Eroare la ștergerea pasului.');
        }
    };

    const handleAddStep = () => {
        setSteps([
            ...steps,
            {
                GuideStepID: `temp-${Date.now()}`,
                Description: '',
                ImagePath: null,
                newImage: null,
                isNew: true,
            }
        ]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/repairguide/${guideId}`, {
                title,
                content,
                categoryID: guide.categoryID,
                deviceID: guide.deviceID,
                part: part || ''
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            let updatedSteps = [...steps];

            await Promise.all(
                updatedSteps.map(async (step, idx) => {
                    if (!step.GuideStepID && !step.isNew) return;

                    const formData = new FormData();
                    formData.append('description', step.Description);
                    if (step.newImage) {
                        formData.append('mainImage', step.newImage); 
                    }

                    if (step.isNew) {
                        const resp = await axios.post(`/api/repairguide/${guideId}/steps`, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        const saved = resp.data;
                        updatedSteps[idx] = {
                            ...step,
                            GuideStepID: saved.guideStepID || saved.GuideStepId || saved.GuideStepID,
                            isNew: false,
                            ImagePath: saved.imagePath || step.ImagePath
                        };
                    } else {
                        await axios.put(`/api/repairguide/steps/${step.GuideStepID}`, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                    }
                })
            );

            setSteps(updatedSteps);

            alert('Ghidul și pașii au fost actualizați!');
            navigate(`/guides/view/${guideId}`);
        } catch (err) {
            console.error('Eroare actualizare ghid:', err.response?.data || err.message || err);
            setError('Eroare la actualizarea ghidului sau pașilor.');

        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Editare ghid</h1>
            {error && <p className="text-red-500">{error}</p>}
            {!guide ? (
                <p>Se încarcă...</p>
            ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Titlu</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Conținut</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows={5}
                        />
                    </div>
                   
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block font-semibold">Pași ghid:</label>
                            <button
                                type="button"
                                onClick={handleAddStep}
                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
                            >
                                + Adaugă pas nou
                            </button>
                        </div>
                        {steps.map((step, idx) => (
                            <div key={step.GuideStepID || `temp-${idx}`} className="mb-4 border p-2 rounded bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <div className="font-semibold mb-1">Pasul {idx + 1}</div>
                                    {!step.isNew && (
                                        <button
                                            type="button"
                                            className="text-red-500 font-bold ml-4"
                                            onClick={() => handleDeleteStep(step.GuideStepID)}
                                        >
                                            Șterge
                                        </button>
                                    )}
                                </div>
                                <textarea
                                    value={step.Description || ''}
                                    onChange={e => handleStepChange(idx, e.target.value)}
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                                {(step.ImagePath || step.newImage) && (
                                    <div className="mt-2">
                                        <img
                                            src={step.newImage ? URL.createObjectURL(step.newImage) : step.ImagePath}
                                            alt={`Pasul ${idx + 1}`}
                                            className="max-h-40"
                                            onError={e => e.target.style.display = 'none'}
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-2"
                                    onChange={e => handleImageChange(idx, e.target.files[0])}
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded"
                    >
                        Salvează modificările
                    </button>
                </form>
            )}
        </div>
    );
}