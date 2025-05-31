import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SubcategorySelectionPage() {
    const { categorySlug } = useParams();
    const navigate = useNavigate();
    const [subcategories, setSubcategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`/api/lookup/subcategories/by-category-slug/${categorySlug}`)
            .then(res => setSubcategories(res.data))
            .catch(() => setError("Eroare la încărcarea subcategoriilor"));
    }, [categorySlug]);

    return (
        <div className="bg-white min-h-screen flex flex-col items-center px-4 pt-10 animate-fade-in">
            <h1 className="text-4xl font-bold font-jersey mb-10 text-center">Alege o subcategorie</h1>

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full animate-slide-up">
                {subcategories.map(type => (
                    <div
                        key={type.subcategoryID}
                        className="bg-gray-100 hover:bg-gray-200 transition duration-300 transform hover:scale-105 cursor-pointer text-center p-6 rounded shadow-md flex flex-col items-center"
                        onClick={() => navigate(`/repair-guides/${categorySlug}/${type.slug}`)}
                    >
                        {type.imageUrl && (
                            <img
                                src={type.imageUrl}
                                alt={type.name}
                                className="w-20 h-20 object-contain mb-3"
                            />
                        )}
                        <p className="font-bold text-lg">{type.name}</p>
                    </div>
                ))}
            </div>

            <div className="mt-20" />
        </div>
    );
}
