import React, { useState, useEffect } from 'react';
import { updateRepairGuide, fetchRepairGuideById } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRepairGuide() {
    const { id } = useParams();
    const nav = useNavigate();

    const [form, setForm] = useState({
        title: '', url: '', difficulty: '', timeRequired: 0, contentJson: ''
    });
    const [error, setError] = useState('');  

    useEffect(() => {
        fetchRepairGuideById(id).then(g => {
            setForm({
                title: g.title,
                url: g.externalUrl || g.url,
                difficulty: g.difficulty,
                timeRequired: g.timeRequired,
                contentJson: g.contentJson
            });
        });
    }, [id]);

    
    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({
            ...f,
            [name]: name === 'timeRequired' ? +value : value
        }));
    };

    
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setError('');
            
            await updateRepairGuide(id, {
                title: form.title,
                url: form.url,
                difficulty: form.difficulty,
                timeRequired: form.timeRequired,
                contentJson: form.contentJson
            });
            nav('/admin/guides');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-4">
           
            <h2 className="text-xl mb-4">Editează ghid #{id}</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title" value={form.title} onChange={handleChange}
                    placeholder="Titlu" className="w-full border p-2"
                />
                <input
                    name="url" value={form.url} onChange={handleChange}
                    placeholder="URL" className="w-full border p-2"
                />
                <input
                    name="difficulty" value={form.difficulty} onChange={handleChange}
                    placeholder="Dificultate" className="w-full border p-2"
                />
                <input
                    name="timeRequired" type="number" value={form.timeRequired}
                    onChange={handleChange} placeholder="Durată (min)" className="w-full border p-2"
                />
                <textarea
                    name="contentJson" value={form.contentJson} onChange={handleChange}
                    placeholder="Conținut JSON" className="w-full h-32 border p-2"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Salvează modificările
                </button>
            </form>
        </div>
    );
}
