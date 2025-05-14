import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function StepsPage() {
    const { id: guideID } = useParams();
    const nav = useNavigate();
    const [steps, setSteps] = useState([]);

    
    useEffect(() => {
        api.get(`/repairguide/${guideID}/steps`)
            .then(res => setSteps(res.data))
            .catch(console.error);
    }, [guideID]);

    
    const addStep = () => {
        setSteps(s => [
            ...s,
            {
                stepID: null,
                text: '',
                mainImageFile: null,
                thumbFiles: [null, null, null],
                mainImageUrl: null,
                thumbUrls: [null, null, null]
            }
        ]);
    };

   
    const handleTextChange = (i, text) =>
        setSteps(s => s.map((st, idx) => idx === i ? { ...st, text } : st));

    const handleMainImage = (i, file) =>
        setSteps(s =>
            s.map((st, idx) =>
                idx === i
                    ? { ...st, mainImageFile: file, mainImageUrl: URL.createObjectURL(file) }
                    : st
            )
        );

    const handleThumb = (i, file, slot) =>
        setSteps(s =>
            s.map((st, idx) => {
                if (idx !== i) return st;
                const newFiles = [...st.thumbFiles];
                const newUrls = [...st.thumbUrls];
                newFiles[slot] = file;
                newUrls[slot] = URL.createObjectURL(file);
                return { ...st, thumbFiles: newFiles, thumbUrls: newUrls };
            })
        );

    
    const saveStep = async i => {
        const step = steps[i];
        const form = new FormData();
        form.append('text', step.text);
        if (step.mainImageFile) form.append('mainImage', step.mainImageFile);
        step.thumbFiles.forEach(f => f && form.append('thumbnails', f));

        try {
            let res;
            if (step.stepID) {
                res = await api.put(
                    `/repairguide/${guideID}/steps/${step.stepID}`,
                    form,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
            } else {
                res = await api.post(
                    `/repairguide/${guideID}/steps`,
                    form,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
            }
            setSteps(s => s.map((st, idx) => idx === i ? res.data : st));
        } catch (err) {
            console.error('Error saving step:', err);
            alert('Eroare la salvarea pasului.');
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Ghid de reparare</h1>

            {steps.map((st, i) => (
                <div key={i} className="p-4 bg-gray-100 rounded space-y-4">
                    <h2 className="font-semibold">Pasul {i + 1}</h2>

                    <div className="flex space-x-4">
                        
                        <div>
                            {st.mainImageUrl ? (
                                <img
                                    src={st.mainImageUrl}
                                    alt=""
                                    className="w-48 h-48 object-cover rounded"
                                />
                            ) : (
                                <div className="w-48 h-48 bg-gray-300 flex items-center justify-center rounded">
                                    adaugă poză
                                </div>
                            )}
                            <input
                                type="file"
                                className="mt-2"
                                onChange={e => handleMainImage(i, e.target.files[0])}
                            />
                        </div>

                        
                        <div className="flex-1">
                            <input
                                type="text"
                                className="w-full border p-2 rounded mb-2"
                                placeholder="Scrie aici pasul"
                                value={st.text}
                                onChange={e => handleTextChange(i, e.target.value)}
                            />
                            <button
                                className="bg-yellow-500 text-black px-4 py-2 rounded"
                                onClick={() => saveStep(i)}
                            >
                                Save
                            </button>
                        </div>
                    </div>

                   
                    <div className="flex space-x-2">
                        {[0, 1, 2].map(slot => (
                            <div key={slot} className="text-center">
                                {st.thumbUrls[slot] ? (
                                    <img
                                        src={st.thumbUrls[slot]}
                                        alt=""
                                        className="w-24 h-24 object-cover rounded mb-1"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded mb-1">
                                        adaugă poză
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={e => handleThumb(i, e.target.files[0], slot)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <button
                className="w-full bg-gray-300 py-2 rounded"
                onClick={addStep}
            >
                Adaugă alt pas
            </button>

            <button
                className="mt-4 float-right bg-yellow-500 text-black px-6 py-2 rounded"
                onClick={() => nav('/admin/guides')}
            >
                Gata
            </button>
        </div>
    );
}
