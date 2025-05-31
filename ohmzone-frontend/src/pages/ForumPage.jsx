import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const ForumPage = () => {
    const [type, setType] = useState('');
    const [about, setAbout] = useState('');
    const [category, setCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/forum-posts`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(() => setPosts([]));
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/lookup/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    const handleAskQuestion = () => {
        navigate('/forum/ask');
    };

    const filteredPosts = Array.isArray(posts) ? posts.filter(post => (
        (!type || post.type === type) &&
        (!about || post.about === about) &&
        (!category || post.categoryName === category) &&
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
                        setSearchTerm('');
                    }}>
                        Toate
                    </button>

                    <select className="px-4 py-2 border rounded" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Tip</option>
                        <option value="question">Întrebare</option>
                        <option value="project">Proiect</option>
                        <option value="discussion">Discuție</option>
                    </select>

                    <select className="px-4 py-2 border rounded" value={about} onChange={(e) => setAbout(e.target.value)}>
                        <option value="">Despre</option>
                        <option value="robotics">Robotică</option>
                        <option value="guide">Ghid</option>
                        <option value="other">Altceva</option>
                    </select>

                    <select className="px-4 py-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Categorie</option>
                        {categories.map(c => (
                            <option key={c.categoryID} value={c.categoryName}>{c.categoryName}</option>
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
                            className="bg-white p-4 rounded shadow hover:bg-gray-100 cursor-pointer transition flex flex-col md:flex-row gap-4"
                        >
                            {post.imageUrl && (
                                <div className="w-full md:w-1/3 h-[200px]">
                                    <img
                                        src={`http://localhost:5097${post.imageUrl}`}
                                        alt="post"
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-blue-600">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-gray-500 mb-2">
                                    Publicat de <b>{post.author?.username || "Anonim"}</b> pe {new Date(post.datePosted).toLocaleString()}
                                </p>
                                <p className="text-gray-800">{post.content.slice(0, 150)}...</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ForumPage;
