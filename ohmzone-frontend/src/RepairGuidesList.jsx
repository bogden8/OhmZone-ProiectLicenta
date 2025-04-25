import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function RepairGuidesList() {
    const { category } = useParams();
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/RepairGuide/category/${category}`)
            .then(res => setGuides(res.data))
            .catch(console.error);
    }, [category]);

    return (
        <div className="container">
            <h2>Ghiduri pentru: {category}</h2>
            {guides.length === 0 ? (
                <p>Niciun ghid găsit.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {guides.map(g => (
                        <li key={g.guideID} className="card" style={{ marginBottom: '1rem' }}>
                            <h3>{g.title}</h3>
                            <p>{g.content.slice(0, 100)}…</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
