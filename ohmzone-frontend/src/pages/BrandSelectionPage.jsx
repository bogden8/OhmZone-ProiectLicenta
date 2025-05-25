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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Alege un brand</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {brands.map(brand => (
                    <div
                        key={brand.brandID}
                        onClick={() => navigate(`/repair-guides/${categorySlug}/${subcategorySlug}/${brand.slug}`)}
                        className="bg-gray-200 p-6 rounded shadow hover:bg-gray-300 cursor-pointer text-center"
                    >
                        {brand.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
