import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BrandSelectionPage() {
    const { subcategorySlug, categorySlug } = useParams();
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/lookup/brands/by-subcategory-slug/${subcategorySlug}`)
            .then(res => setBrands(res.data))
            .catch(() => setError("Eroare la încărcarea brandurilor"));
    }, [subcategorySlug]);

    return (
        <div className="bg-white min-h-screen flex flex-col items-center px-4 pt-10 animate-fade-in">
            <h1 className="text-4xl font-bold font-jersey mb-10 text-center">Alege un brand</h1>

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full animate-slide-up">
                {brands.map(brand => (
                    <div
                        key={brand.brandID}
                        onClick={() => navigate(`/repair-guides/${categorySlug}/${subcategorySlug}/${brand.slug}`)}
                        className="bg-gray-300 hover:bg-gray-400 transition duration-300 transform hover:scale-105 cursor-pointer text-center p-8 font-bold text-lg rounded shadow-md"
                    >
                        {brand.name}
                    </div>
                ))}
            </div>

            <div className="mt-20"></div>
        </div>
    );
}
