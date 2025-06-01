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

    const handleSubcategoryClick = async (subcategorySlug) => {
        try {
            const brandRes = await axios.get(`/api/lookup/brands/by-subcategory-slug/${subcategorySlug}`);
            const brands = brandRes.data;

            if (brands.length === 1) {
                const brand = brands[0];
                navigate(`/repair-guides/${categorySlug}/${subcategorySlug}/${brand.slug}`);
            } else {
                navigate(`/repair-guides/${categorySlug}/${subcategorySlug}`);
            }
        } catch (err) {
            console.error("Eroare la verificarea brandurilor:", err);
            navigate(`/repair-guides/${categorySlug}/${subcategorySlug}`);
        }
    };

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
                {subcategories.map(type => (
                    <div
                        key={type.subcategoryID}
                        className="bg-gray-100 hover:bg-gray-200 transition duration-300 transform hover:scale-105 cursor-pointer text-center p-6 rounded shadow-md flex flex-col items-center"
                        onClick={() => handleSubcategoryClick(type.slug)}
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
