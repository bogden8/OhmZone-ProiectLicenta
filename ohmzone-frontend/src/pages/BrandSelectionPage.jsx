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

            {/* Banner cu text suprapus */}
            <div className="relative w-full h-48 rounded-none overflow-hidden mb-10">
                <img
                    src="/assets/magazin-online-soon.jpg"
                    alt="Magazin online în curând"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
                    <h2 className="text-white text-2xl md:text-3xl font-bold text-center">
                        Vom avea un magazin online cu piese și unelete în curând!
                    </h2>
                </div>
            </div>


            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full animate-slide-up">
                {brands.map(brand => (
                    <div
                        key={brand.brandID}
                        onClick={() => navigate(`/repair-guides/${categorySlug}/${subcategorySlug}/${brand.slug}`)}
                        className="bg-gray-100 hover:bg-gray-200 transition duration-300 transform hover:scale-105 cursor-pointer text-center p-6 rounded shadow-md flex flex-col items-center"
                    >
                        {brand.imageUrl && (
                            <img
                                src={brand.imageUrl}
                                alt={brand.name}
                                className="w-20 h-20 object-contain mb-3"
                            />
                        )}
                        <p className="font-bold text-lg">{brand.name}</p>
                    </div>
                ))}
            </div>

            {/* Buton spre forum */}
            <div className="mt-20 mb-10">
                <button
                    onClick={() => navigate('/forum/ask')}
                    className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300 shadow-md"
                >
                    Nu găsești ce cauți? Pune o întrebare pe forum
                </button>
            </div>
        </div>
    );
}
