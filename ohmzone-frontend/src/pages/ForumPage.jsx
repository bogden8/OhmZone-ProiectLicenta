import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const ForumPage = () => {
    const [type, setType] = useState('');
    const [about, setAbout] = useState('');
    const [category, setCategory] = useState('');
    const [device, setDevice] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [devices, setDevices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/device/with-details`)
            .then(res => res.json())
            .then(data => setDevices(data))
            .catch(() => setDevices([]));
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/lookup/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/forum-posts`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(() => setPosts([]));
    }, []);

    const handleAskQuestion = () => {
        navigate('/forum/ask');
    };

    const filteredPosts = Array.isArray(posts) ? posts.filter(post => (
        (!type || post.type === type) &&
        (!about || post.about === about) &&
        (!category || post.categoryName === category) &&
        (!device || (post.deviceName && post.deviceName.toLowerCase().includes(device.toLowerCase()))) &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )) : [];

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-10">
            <div className="bg-gray-300 p-6 rounded-xl shadow mb-10">
                <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full sm:max-w-[600px] px-4 py-2 border border-gray-300 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleAskQuestion}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                    >
                        Pune o întrebare
                    </button>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button className="bg-navbar-bg text-white px-4 py-2 rounded" onClick={() => {
                        setType('');
                        setAbout('');
                        setCategory('');
                        setDevice('');
                        setSearchTerm('');
                    }}>
                        All
                    </button>

                    <select className="px-4 py-2 border rounded" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Type</option>
                        <option value="question">Question</option>
                        <option value="project">Project</option>
                        <option value="discussion">Discussion</option>
                    </select>

                    <select className="px-4 py-2 border rounded" value={about} onChange={(e) => setAbout(e.target.value)}>
                        <option value="">About</option>
                        <option value="robotics">Robotics</option>
                        <option value="guide">Guide</option>
                        <option value="other">Other</option>
                    </select>

                    <select className="px-4 py-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Category</option>
                        {categories.map(c => (
                            <option key={c.categoryID} value={c.categoryName}>{c.categoryName}</option>
                        ))}
                    </select>

                    <select className="px-4 py-2 border rounded" value={device} onChange={(e) => setDevice(e.target.value)}>
                        <option value="">Device</option>
                        {devices
                            .filter(d => !category || d.CategoryName === category)
                            .map(d => (
                                <option key={d.DeviceID} value={`${d.BrandName} ${d.Model}`}>
                                    {d.BrandName} {d.Model}
                                </option>
                            ))}
                    </select>

                </div>
            </div>

            {filteredPosts.length === 0 ? (
                <p>Nu există postări.</p>
            ) : (
                <div className="space-y-6">
                    {filteredPosts.map(post => (
                        <div
                            key={post.threadID}
                            onClick={() => navigate(`/forum/post/${post.threadID}`)}
                            className="bg-white p-4 rounded shadow hover:bg-gray-100 cursor-pointer transition"
                        >
                            <h2 className="text-xl font-bold text-blue-600">
                                {post.title}
                            </h2>
                            <p className="text-sm text-gray-500 mb-2">
                                Publicat de <b>{post.author?.username || "Anonim"}</b> pe {new Date(post.datePosted).toLocaleString()}<br />
                                <span className="italic">Categoria: <b>{post.categoryName || 'necunoscut'}</b></span><br />
                                {post.deviceName && (
                                    <span className="italic">Device: <b>{post.deviceName}</b></span>
                                )}
                            </p>
                            {post.imageUrl && (
                                <img src={`http://localhost:5097${post.imageUrl}`} alt="post" className="max-w-full h-auto rounded mb-2" />
                            )}
                            <p className="text-gray-800">{post.content.slice(0, 150)}...</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ForumPage;
