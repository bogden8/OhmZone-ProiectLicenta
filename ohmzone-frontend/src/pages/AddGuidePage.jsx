// ⬇️ sus, în imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function AddGuidePage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [deviceList, setDeviceList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubcategoryList] = useState([]);

    const [selectedDeviceId, setSelectedDeviceId] = useState('');
    const [newDeviceName, setNewDeviceName] = useState('');
    const [deviceImage, setDeviceImage] = useState(null); // ✅ imagine pentru device nou

    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [newBrandName, setNewBrandName] = useState('');

    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');

    const [steps, setSteps] = useState([{ text: '', image: null }]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/api/lookup/categories').then(res => setCategoryList(res.data)).catch(() => setCategoryList([]));
    }, []);

    useEffect(() => {
        if (selectedCategoryId) {
            axios.get(`/api/lookup/subcategories/${selectedCategoryId}`)
                .then(res => setSubcategoryList(res.data))
                .catch(() => setSubcategoryList([]));
        }
    }, [selectedCategoryId]);

    useEffect(() => {
        if (selectedSubcategoryId) {
            axios.get(`/api/lookup/brands/${selectedSubcategoryId}`)
                .then(res => setBrandList(res.data))
                .catch(() => setBrandList([]));
        }
    }, [selectedSubcategoryId]);

    useEffect(() => {
        if (selectedBrandId) {
            axios.get(`/api/lookup/devices/${selectedBrandId}`)
                .then(res => setDeviceList(res.data))
                .catch(() => setDeviceList([]));
        }
    }, [selectedBrandId]);

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
        if (!token) return setError('Nu ești autentificat.');

        let decoded;
        try {
            decoded = jwtDecode(token);
        } catch (err) {
            return setError('Token JWT invalid.');
        }

        const authorID = decoded.sub || decoded.userId || decoded.id;
        if (!authorID) return setError('Nu s-a putut extrage ID-ul utilizatorului.');

        const formData = new FormData();
        formData.append('authorID', authorID);
        formData.append('title', title);
        formData.append('part', 'N/A');
        formData.append('content', content);
        if (selectedCategoryId) formData.append('categoryIdStr', selectedCategoryId);
        if (selectedSubcategoryId) formData.append('subcategoryIdStr', selectedSubcategoryId);

        if (selectedDeviceId) {
            formData.append('deviceIdStr', selectedDeviceId);
        } else if (newDeviceName) {
            formData.append('newDeviceName', newDeviceName);
            if (selectedBrandId) {
                formData.append('brandIdStr', selectedBrandId);
            } else if (newBrandName) {
                formData.append('newBrandName', newBrandName);
            } else {
                return setError('Selectează un brand existent sau adaugă unul nou.');
            }

            if (deviceImage) {
                formData.append('deviceImage', deviceImage); // ✅ trimitem imaginea
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

            if (res.data?.nextUrl) navigate(res.data.nextUrl);
            else navigate('/repair-guides');

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
                    <textarea className="w-full border p-2 rounded" rows={5} value={content} onChange={e => setContent(e.target.value)} />
                </div>

                <div>
                    <label className="block font-semibold">Categorie</label>
                    <select className="w-full border p-2 rounded" value={selectedCategoryId} onChange={e => setSelectedCategoryId(e.target.value)} required>
                        <option value="">-- Selectează --</option>
                        {categoryList.map(c => <option key={c.categoryID} value={c.categoryID}>{c.categoryName}</option>)}
                    </select>
                </div>

                {subcategoryList.length > 0 && (
                    <div>
                        <label className="block font-semibold">Subcategorie</label>
                        <select className="w-full border p-2 rounded mb-2" value={selectedSubcategoryId} onChange={e => setSelectedSubcategoryId(e.target.value)}>
                            <option value="">-- Selectează --</option>
                            {subcategoryList.map(s => <option key={s.subcategoryID} value={s.subcategoryID}>{s.name}</option>)}
                        </select>
                    </div>
                )}

                {brandList.length > 0 && (
                    <div>
                        <label className="block font-semibold">Brand</label>
                        <select className="w-full border p-2 rounded mb-2" value={selectedBrandId} onChange={e => setSelectedBrandId(e.target.value)}>
                            <option value="">-- Selectează brand --</option>
                            {brandList.map(b => <option key={b.brandID} value={b.brandID}>{b.name}</option>)}
                        </select>
                    </div>
                )}

                {deviceList.length > 0 && (
                    <div>
                        <label className="block font-semibold">Device existent</label>
                        <select className="w-full border p-2 rounded" value={selectedDeviceId} onChange={e => setSelectedDeviceId(e.target.value)}>
                            <option value="">-- Selectează --</option>
                            {deviceList.map(d => <option key={d.deviceID} value={d.deviceID}>{d.model}</option>)}
                        </select>
                    </div>
                )}

                <div>
                    <label className="block font-semibold">sau adaugă device nou</label>
                    <input type="text" className="w-full border p-2 rounded mb-2" placeholder="Ex: Galaxy S22" value={newDeviceName} onChange={e => setNewDeviceName(e.target.value)} />
                    <input type="text" className="w-full border p-2 rounded mb-2" placeholder="sau brand nou" value={newBrandName} onChange={e => setNewBrandName(e.target.value)} />

                    {newDeviceName && (
                        <div className="mt-2">
                            <label className="block font-semibold">Imagine device</label>
                            <input type="file" accept="image/*" onChange={e => setDeviceImage(e.target.files[0])} />
                        </div>
                    )}
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
                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded">
                        Salvează ghidul
                    </button>
                </div>
            </form>
        </div>
    );
}
