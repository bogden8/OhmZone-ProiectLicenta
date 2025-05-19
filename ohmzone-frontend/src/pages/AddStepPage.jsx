import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddStepPage() {
    const { guideId } = useParams();
    const navigate = useNavigate();

    const [text, setText] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [thumbnails, setThumbnails] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Text', text);
        if (mainImage) formData.append('MainImage', mainImage);
        for (let i = 0; i < thumbnails.length; i++) {
            formData.append('Thumbnails', thumbnails[i]);
        }

        try {
            const token = localStorage.getItem("oz_token");

            await axios.post(`/api/repairguide/${guideId}/steps`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });

            navigate(`/admin/guides/${guideId}/steps`);
        } catch (err) {
            console.error(err);
            setError('Eroare la trimiterea pasului.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Adaugă un pas nou</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Descriere pas</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows={4}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Imagine principală</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setMainImage(e.target.files[0])}
                    />
                </div>

                <div>
                    <label className="block font-semibold">Thumbnail-uri (opțional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={e => setThumbnails(Array.from(e.target.files))}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Adaugă pas
                </button>
            </form>
        </div>
    );
}
