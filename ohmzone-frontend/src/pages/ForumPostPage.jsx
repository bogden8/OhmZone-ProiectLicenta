import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';

export default function ForumPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [refresh, setRefresh] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/forum-posts/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("DETALII POSTARE:", data);
                setPost(data);
            });
    }, [id, refresh]);

    const handleAddComment = async () => {
        if (!newComment.trim() || !user) {
            alert("Trebuie să fii autentificat pentru a comenta.");
            return;
        }
        const token = localStorage.getItem('oz_token');
        console.log("Token folosit:", token);
        if (!token) {
            alert("Nu ești logat. Fă login și încearcă din nou.");
            return;
        }

        const response = await fetch(`${API_BASE_URL}/api/forum-threads/${id}/replies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('oz_token')}`
            },
            body: JSON.stringify({
                content: newComment
            })
        });

        if (response.ok) {
            setNewComment('');
            setRefresh(prev => !prev);
        } else {
            alert('Eroare la trimiterea comentariului.');
        }
    };

    const handleDeleteComment = async (replyID) => {
        const response = await fetch(`${API_BASE_URL}/api/forum-threads/${id}/replies/${replyID}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('oz_token')}`
            }
        });

        if (response.ok) {
            setRefresh(prev => !prev);
        } else {
            alert('Nu ai voie să ștergi acest comentariu.');
        }
    };

    if (!post) return <p className="p-10">Se încarcă postarea...</p>;

    return (
        <div className="max-w-[900px] mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-600 mb-4">
                Postat de <strong>{post.author?.username || 'Anonim'}</strong> pe {new Date(post.datePosted).toLocaleString()}
            </p>

            {post.imageUrl && (
                <img
                    src={`http://localhost:5097${post.imageUrl}`}
                    alt="poza"
                    className="max-w-full rounded mb-4"
                />
            )}

            <p className="mb-8 whitespace-pre-wrap">{post.content}</p>

            <hr className="my-6" />

            <h2 className="text-xl font-bold mb-4">Comentarii</h2>

            {!post.forumReplies || post.forumReplies.length === 0 ? (
                <p className="text-gray-500 mb-4">Nimeni nu a comentat încă.</p>
            ) : (
                <div className="space-y-4 mb-6">
                    {post.forumReplies.map(reply => (
                        <div key={reply.replyID} className="bg-gray-100 p-4 rounded relative">
                            <p className="text-sm text-gray-600 mb-1">
                                {reply.user?.username || "Anonim"} – {new Date(reply.datePosted).toLocaleString()}
                            </p>
                            <p>{reply.content}</p>
                            {user?.id === reply.userID && (
                                <button
                                    onClick={() => handleDeleteComment(reply.replyID)}
                                    className="absolute top-2 right-2 text-red-500 hover:underline text-sm"
                                >
                                    Șterge
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6">
                <textarea
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full border rounded px-4 py-2 mb-2"
                    placeholder="Adaugă un comentariu..."
                />
                <button
                    onClick={handleAddComment}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Trimite comentariul
                </button>
            </div>
        </div>
    );
}
