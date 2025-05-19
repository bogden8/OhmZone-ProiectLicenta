import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddGuidePage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [deviceList, setDeviceList] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');
    const [newDeviceName, setNewDeviceName] = useState('');
    const [steps, setSteps] = useState([{ text: '', image: null }]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/api/device')
            .then(res => setDeviceList(res.data))
            .catch(() => setDeviceList([]));
    }, []);

    const handleStepChange = (index, field, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index][field] = value;
        setSteps(updatedSteps);
    };

    const addNewStep = () => {
        setSteps([...steps, { text: '', image: null }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('Title', title);
        formData.append('DeviceID', selectedDeviceId);
        formData.append('NewDeviceName', newDeviceName);

        steps.forEach((step, index) => {
            formData.append(`Steps[${index}].Text`, step.text);
            if (step.image) {
                formData.append(`Steps[${index}].Image`, step.image);
            }
        });

        try {
            const res = await axios.post('/api/repairguide/full', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            navigate(res.data.nextUrl);
        } catch (err) {
            console.error(err);
            setError('Eroare la salvare. Verifică câmpurile.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h1 className="text-2xl font-bold mb-6">Creează un nou ghid de reparație</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-semibold">Titlu ghid</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Alege un device existent</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={selectedDeviceId}
                        onChange={e => setSelectedDeviceId(e.target.value)}
                    >
                        <option value="">-- Selectează --</option>
                        {deviceList.map(d => (
                            <option key={d.id} value={d.id}>{d.brand} {d.model}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">sau adaugă un device nou</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        placeholder="Ex: iPhone 11"
                        value={newDeviceName}
                        onChange={e => setNewDeviceName(e.target.value)}
                    />
                </div>

                <hr className="my-4" />

                <h2 className="text-lg font-semibold">Pași de reparație</h2>
                {steps.map((step, idx) => (
                    <div key={idx} className="border p-4 mb-4 rounded bg-gray-50">
                        <label className="block mb-1 font-semibold">Descriere pas #{idx + 1}</label>
                        <textarea
                            rows={3}
                            className="w-full border p-2 rounded mb-2"
                            value={step.text}
                            onChange={e => handleStepChange(idx, 'text', e.target.value)}
                            required
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleStepChange(idx, 'image', e.target.files[0])}
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addNewStep}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    + Adaugă alt pas
                </button>

                <div className="pt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Salvează ghidul
                    </button>
                </div>
            </form>
        </div>
    );
}
