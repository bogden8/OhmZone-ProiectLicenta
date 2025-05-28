import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../config";
import { getCurrentUser } from '../utils/getCurrentUser';

export default function AskQuestionPage() {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [about, setAbout] = useState('');
    const [deviceID, setDeviceID] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const [categories, setCategories] = useState([]);
    const [devices, setDevices] = useState([]);
    const [categoryID, setCategoryID] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            alert("Trebuie să fii autentificat pentru a posta.");
            navigate('/login');
            return;
        }

        setCurrentUser(user);

        fetch(`${API_BASE_URL}/api/lookup/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Eroare la categorii:", err.message));

        fetch(`${API_BASE_URL}/api/device/with-details`)
            .then(res => res.json())
            .then(data => setDevices(data))
            .catch(() => setDevices([]));
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('oz_token');
        const formData = new FormData();

        formData.append('Title', title);
        formData.append('Content', content);
        formData.append('Type', type);
        formData.append('About', about);
        if (deviceID) formData.append('DeviceID', deviceID);
        formData.append('CategoryID', categoryID);
        if (image) formData.append('Image', image);

        try {
            const response = await fetch(`${API_BASE_URL}/api/forum-posts`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                navigate('/forum');
            } else {
                const errorText = await response.text();
                console.error('Eroare server:', errorText);
                alert('Eroare la trimiterea întrebării');
            }
        } catch (err) {
            console.error("Eroare la fetch:", err);
            alert("A apărut o eroare la trimiterea întrebării.");
        }
    };

    // Resetăm device-ul dacă se schimbă categoria
    useEffect(() => {
        setDeviceID('');
    }, [categoryID]);

    return (
        <div className="max-w-[800px] mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Pune o întrebare</h1>
            <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded space-y-6">
                <input
                    type="text"
                    placeholder="Titlu"
                    className="w-full px-4 py-2 rounded border"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Descrie întrebarea ta..."
                    className="w-full px-4 py-2 rounded border"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <div className="flex flex-wrap gap-4">
                    <select value={type} onChange={(e) => setType(e.target.value)} className="px-4 py-2 rounded">
                        <option value="">Tip</option>
                        <option value="question">Question</option>
                        <option value="project">Project</option>
                        <option value="discussion">Discussion</option>
                    </select>

                    <select value={about} onChange={(e) => setAbout(e.target.value)} className="px-4 py-2 rounded">
                        <option value="">Despre</option>
                        <option value="robotics">Robotics</option>
                        <option value="guide">Guide</option>
                        <option value="other">Other</option>
                    </select>

                    <select value={categoryID} onChange={(e) => setCategoryID(e.target.value)} className="px-4 py-2 rounded">
                        <option value="">Categorie</option>
                        {categories.map((cat) => (
                            <option key={cat.categoryID} value={cat.categoryID}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>

                    <select value={deviceID} onChange={(e) => setDeviceID(e.target.value)} className="px-4 py-2 rounded">
                        <option value="">Dispozitiv (opțional)</option>
                        {devices
                            .filter(d => !categoryID || d.CategoryID?.toString() === categoryID)
                            .map(d => (
                                <option key={d.deviceID} value={d.deviceID}>
                                    {d.BrandName} {d.Model}
                                </option>
                            ))}
                    </select>


                </div>

                <div>
                    <label className="block mb-1 font-semibold">Imagine (opțional)</label>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                </div>

                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded"
                >
                    Postează
                </button>
            </form>
        </div>
    );
}
