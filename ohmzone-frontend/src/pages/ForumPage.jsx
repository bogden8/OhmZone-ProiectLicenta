import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const ForumPage = () => {
    const [type, setType] = useState('');
    const [about, setAbout] = useState('');
    const [device, setDevice] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [devices, setDevices] = useState([]);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setDevices(['PC Laptop', 'Phone', 'Console', 'Mac', 'Power Tools']);
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/forum-posts`)
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    const handleAskQuestion = () => {
        navigate('/forum/ask');
    };

    const filteredPosts = Array.isArray(posts) ? posts.filter(post => (
        (!type || post.type === type) &&
        (!about || post.about === about) &&
        (!device || post.device === device) &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )) : [];


    return (
        <div className="max-w-[1200px] mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-8">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full max-w-[600px] px-4 py-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={handleAskQuestion}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded ml-4"
                >
                    Ask a question
                </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                <button className="bg-black text-white px-4 py-2 rounded" onClick={() => {
                    setType('');
                    setAbout('');
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

                <select className="px-4 py-2 border rounded" value={device} onChange={(e) => setDevice(e.target.value)}>
                    <option value="">Device</option>
                    {devices.map((d, i) => (
                        <option key={i} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            {filteredPosts.length === 0 ? (
                <p>Nu există postări.</p>
            ) : (
                <div className="space-y-6">
                    {filteredPosts.map(post => (
                        <div key={post.threadID} className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-bold">
                                <Link to={`/forum/post/${post.threadID}`} className="text-blue-600 hover:underline">
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-sm text-gray-500 mb-2">
                                Publicat de <b>{post.author?.username || "Anonim"}</b> pe {new Date(post.datePosted).toLocaleString()}
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
