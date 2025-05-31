import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function MyPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('oz_token');
        if (!token) {
            alert("Trebuie să fii logat pentru a vedea postările tale.");
            navigate('/login');
            return;
        }

        fetch(`${API_BASE_URL}/api/forum-posts/mine`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Eroare la încărcarea postărilor");
                return res.json();
            })
            .then(data => setPosts(data))
            .catch(err => {
                console.error("Eroare:", err);
                alert("A apărut o eroare la încărcarea postărilor.");
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    if (loading) return <p className="p-10">Se încarcă postările...</p>;

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Postările mele</h1>

            {posts.length === 0 ? (
                <p className="text-gray-600">Nu ai postat nimic încă.</p>
            ) : (
                <div className="space-y-6">
                    {posts.map(post => (
                        <div
                            key={post.threadID}
                            className="bg-gray-100 p-4 rounded shadow hover:bg-gray-200 cursor-pointer transition"
                            onClick={() => navigate(`/forum/post/${post.threadID}`)}
                        >
                            <h2 className="text-xl font-bold text-blue-700">{post.title}</h2>
                            <p className="text-sm text-gray-500 mb-1">
                                {new Date(post.datePosted).toLocaleString()} {post.categoryName && `• ${post.categoryName}`}
                            </p>
                            {post.imageUrl && (
                                <img
                                    src={`http://localhost:5097${post.imageUrl}`}
                                    alt="poza postare"
                                    className="max-h-[200px] mt-2 rounded"
                                />
                            )}
                            <p className="mt-2 text-gray-800">{post.content.slice(0, 150)}...</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
