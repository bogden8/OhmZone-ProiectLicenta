import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function AddGuidePage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState(''); // ✅ nou
    const [deviceList, setDeviceList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    const [selectedDeviceId, setSelectedDeviceId] = useState('');
    const [newDeviceName, setNewDeviceName] = useState('');

    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [newBrandName, setNewBrandName] = useState('');

    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [steps, setSteps] = useState([{ text: '', image: null }]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/api/device')
            .then(res => setDeviceList(res.data))
            .catch(() => setDeviceList([]));

        axios.get('/api/lookup/categories')
            .then(res => setCategoryList(res.data))
            .catch(() => setCategoryList([]));

        axios.get('/api/lookup/brands')
            .then(res => setBrandList(res.data))
            .catch(() => setBrandList([]));
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

        const token = localStorage.getItem('oz_token');
        if (!token) {
            setError('Nu ești autentificat.');
            return;
        }

        let decoded;
        try {
            decoded = jwtDecode(token);
        } catch (err) {
            setError('Token JWT invalid.');
            return;
        }

        const authorID = decoded.sub || decoded.userId || decoded.id;
        if (!authorID) {
            setError('Nu s-a putut extrage ID-ul utilizatorului.');
            return;
        }

        const formData = new FormData();
        formData.append('authorID', authorID);
        formData.append('title', title);
        formData.append('part', 'N/A');
        formData.append('content', content); // ✅ nou

        if (selectedCategoryId) {
            formData.append('categoryIdStr', selectedCategoryId);
        } else {
            setError('Selectează o categorie.');
            return;
        }

        if (selectedDeviceId) {
            formData.append('deviceIdStr', selectedDeviceId);
        } else if (newDeviceName) {
            formData.append('newDeviceName', newDeviceName);
            if (selectedBrandId) {
                formData.append('brandIdStr', selectedBrandId);
            } else if (newBrandName) {
                formData.append('newBrandName', newBrandName);
            } else {
                setError('Selectează un brand existent sau adaugă unul nou.');
                return;
            }
        }

        steps.forEach(step => {
            formData.append('stepTexts', step.text);
            if (step.image) formData.append('stepImages', step.image);
        });

        try {
            const res = await axios.post('/api/repairguide/full', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.data?.nextUrl) {
                navigate(res.data.nextUrl);
            } else {
                navigate('/repair-guides');
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Eroare la salvare. Verifică câmpurile sau backendul.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h1 className="text-2xl font-bold mb-6">Creează un nou ghid de reparație</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-semibold">Titlu ghid</label>
                    <input type="text" className="w-full border p-2 rounded" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>

                <div>
                    <label className="block font-semibold">Conținut ghid</label>
                    <textarea
                        className="w-full border p-2 rounded"
                        rows={5}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Scrie aici conținutul general al ghidului (ex: avertismente, piese necesare etc.)"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Categorie</label>
                    <select className="w-full border p-2 rounded" value={selectedCategoryId} onChange={e => setSelectedCategoryId(e.target.value)} required>
                        <option value="">-- Selectează --</option>
                        {categoryList.map(c => (
                            <option key={c.categoryID} value={c.categoryID}>{c.categoryName}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">Alege un device existent</label>
                    <select className="w-full border p-2 rounded" value={selectedDeviceId} onChange={e => setSelectedDeviceId(e.target.value)}>
                        <option value="">-- Selectează --</option>
                        {deviceList.map(d => (
                            <option key={d.deviceID} value={d.deviceID}>{d.brandName} {d.model}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">sau adaugă un device nou</label>
                    <input type="text" className="w-full border p-2 rounded mb-2" placeholder="Ex: iPhone 11" value={newDeviceName} onChange={e => setNewDeviceName(e.target.value)} />
                    <label className="block font-semibold">Brand</label>
                    <select className="w-full border p-2 rounded mb-2" value={selectedBrandId} onChange={e => setSelectedBrandId(e.target.value)}>
                        <option value="">-- Selectează brand --</option>
                        {brandList.map(b => (
                            <option key={b.brandID} value={b.brandID}>{b.name}</option>
                        ))}
                    </select>
                    <input type="text" className="w-full border p-2 rounded" placeholder="sau adaugă brand nou" value={newBrandName} onChange={e => setNewBrandName(e.target.value)} />
                </div>

                <hr className="my-4" />

                <h2 className="text-lg font-semibold">Pași de reparație</h2>
                {steps.map((step, idx) => (
                    <div key={idx} className="border p-4 mb-4 rounded bg-gray-50">
                        <label className="block mb-1 font-semibold">Descriere pas #{idx + 1}</label>
                        <textarea rows={3} className="w-full border p-2 rounded mb-2" value={step.text} onChange={e => handleStepChange(idx, 'text', e.target.value)} required />
                        <input type="file" accept="image/*" onChange={e => handleStepChange(idx, 'image', e.target.files[0])} />
                    </div>
                ))}

                <button type="button" onClick={addNewStep} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    + Adaugă alt pas
                </button>

                <div className="pt-6">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        Salvează ghidul
                    </button>
                </div>
            </form>
        </div>
    );
}
