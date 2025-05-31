import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ModelSelectionPage() {
    const { categorySlug, subcategorySlug, brandSlug } = useParams();
    const [models, setModels] = useState([]);
    const [error, setError] = useState('');
    const [brandName, setBrandName] = useState('');

    useEffect(() => {
        async function fetchModels() {
            try {
                const brandRes = await axios.get(`/api/lookup/brands/by-subcategory-slug/${subcategorySlug}`);
                const brand = brandRes.data.find(b => b.slug === brandSlug);
                if (!brand) {
                    setError('Brandul nu a fost găsit.');
                    return;
                }
                setBrandName(brand.name);

                const modelsRes = await axios.get(`/api/lookup/devices/${brand.brandID}`);
                setModels(modelsRes.data);
            } catch (err) {
                setError('Eroare la încărcarea modelelor.');
            }
        }

        fetchModels();
    }, [subcategorySlug, brandSlug]);

    return (
        <div className="bg-white min-h-screen flex flex-col items-center px-4 pt-10 animate-fade-in">
            <h1 className="text-4xl font-bold font-jersey mb-10 text-center">
                Modele disponibile pentru {brandName || brandSlug}
            </h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full animate-slide-up">
                {models.map((model) => (
                    <Link
                        key={model.deviceID}
                        to={`/repair-guides/${categorySlug}/${subcategorySlug}/${brandSlug}/${model.slug}`}
                        className="bg-gray-100 hover:bg-gray-200 transition duration-300 transform hover:scale-105 cursor-pointer text-center p-4 rounded shadow-md"
                    >
                        {model.imageUrl && (
                            <img
                                src={model.imageUrl}
                                alt={model.model}
                                className="h-40 mx-auto mb-2 object-contain"
                            />
                        )}
                        <p className="font-bold text-lg">{model.model}</p>
                    </Link>
                ))}
            </div>

            <div className="mt-20"></div>
        </div>
    );
}
