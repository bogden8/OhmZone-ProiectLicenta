import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../utils/api';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function fetchResults() {
            try {
                const res = await api.get(`/search?q=${query}`);
                setResults(res.data);
            } catch {
                setResults([]);
            }
        }
        if (query) fetchResults();
    }, [query]);

    const getLink = (item) => {
        if (item.type === 'repair') return `/repair-guides/view/${item.id}`;
        if (item.type === 'robotics') return `/robotics/${item.id}`;
        return '#';
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Rezultate pentru: <span className="text-yellow-500">{query}</span></h1>
            {results.length === 0 ? (
                <p>Nu s-au găsit rezultate.</p>
            ) : (
                <ul className="space-y-4">
                    {results.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={getLink(item)}
                                className="block bg-gray-100 hover:bg-gray-200 p-4 rounded shadow transition"
                            >
                                <h2 className="text-xl font-bold">{item.title}</h2>
                                <p className="text-gray-700 text-sm">{item.description.slice(0, 120)}...</p>
                                <span className="text-xs text-gray-500 italic">{item.type === 'repair' ? 'Ghid de reparație' : 'Tutorial robotică'}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
