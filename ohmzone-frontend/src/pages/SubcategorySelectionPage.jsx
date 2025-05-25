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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Alege o subcategorie</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {subcategories.map(type => (
                    <div
                        key={type.subcategoryID}
                        className="bg-gray-200 p-6 rounded shadow hover:bg-gray-300 cursor-pointer text-center"
                        onClick={() => navigate(`/repair-guides/${categorySlug}/${type.slug}`)}
                    >
                        {type.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
