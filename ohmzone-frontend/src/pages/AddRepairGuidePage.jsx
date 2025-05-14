import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../utils/api';
import { createDevice, createRepairGuide } from '../utils/api';

export default function AddRepairGuidePage() {
    const nav = useNavigate();

    
    const [device, setDevice] = useState('');
    const [part, setPart] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [authorID, setAuthorID] = useState(null);

    
    const [devices, setDevices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryID, setCategoryID] = useState('');  

    
    useEffect(() => {
        api.get('/categories')
            .then(r => {
                setCategories(r.data);
                if (r.data.length) {
                    setCategoryID(r.data[0].categoryID);
                }
            })
            .catch(() => {
                
                setCategories([{ categoryID: 1, categoryName: 'General' }]);
                setCategoryID(1);
            });
    }, []);

    
    useEffect(() => {
        const token = localStorage.getItem('oz_token');
        if (!token) return;
        try {
            const decoded = jwtDecode(token);
            setAuthorID(decoded.sub || decoded.nameid || decoded.userId);
        } catch {
            console.error('JWT decode failed');
        }
    }, []);

    
    useEffect(() => {
        api.get('/devices')
            .then(r => setDevices(r.data))
            .catch(() => {
                setDevices([
                    { deviceID: 1, name: 'iPhone X' },
                    { deviceID: 2, name: 'Galaxy S10' },
                    { deviceID: 3, name: 'MacBook Pro' },
                ]);
            });
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('token=', localStorage.getItem('oz_token'));

        if (!authorID) {
            setError('Trebuie să fii logat ca Admin.');
            return;
        }
        setError('');

        
        let deviceRecord = devices.find(d => d.name === device);
        if (!deviceRecord) {
            try {
                deviceRecord = await createDevice(device);
                setDevices([...devices, deviceRecord]);
            } catch {
                setError('Nu am putut crea dispozitivul.');
                return;
            }
        }

       
        try {
            const { guideID, nextUrl } = await createRepairGuide({
                title,
                categoryID,                    
                authorID,
                deviceID: deviceRecord.deviceID,
                part,
                content: JSON.stringify({})    
            });
            nav(nextUrl);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                setError('Unauthorized — check that you’re logged in.');
            } else {
                setError('Eroare la salvarea ghidului.');
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-gray-200 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Ghid de reparare</h2>
                <p className="font-semibold mb-2">Introducere</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="block mb-1 font-semibold">Device</label>
                        <input
                            list="deviceList"
                            value={device}
                            onChange={e => setDevice(e.target.value)}
                            placeholder="Select or type a device"
                            className="w-full p-3 border rounded bg-white"
                            required
                        />
                        <datalist id="deviceList">
                            {devices.map((d, i) => (
                                <option key={`${i}-${d.name}`} value={d.name} />
                            ))}
                        </datalist>
                    </div>

                    
                    <div>
                        <label className="block mb-1 font-semibold">Categorie</label>
                        <select
                            value={categoryID}
                            onChange={e => setCategoryID(+e.target.value)}
                            className="w-full p-3 border rounded bg-white"
                            required
                        >
                            <option value="" disabled>
                                Selectează o categorie
                            </option>
                            {categories.map(c => (
                                <option key={c.categoryID} value={c.categoryID}>
                                    {c.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    
                    <div>
                        <label className="block mb-1 font-semibold">
                            What part are you replacing?
                        </label>
                        <input
                            type="text"
                            placeholder="Ce componentă schimbi?"
                            value={part}
                            onChange={e => setPart(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded bg-white"
                        />
                    </div>

                   
                    <div>
                        <label className="block mb-1 font-semibold">Titlu</label>
                        <input
                            type="text"
                            placeholder="Titlul ghidului"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded bg-white"
                        />
                    </div>

                    
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded"
                        >
                            Save
                        </button>
                    </div>

                    
                    {error && (
                        <div className="mt-4 text-red-600 font-medium">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
