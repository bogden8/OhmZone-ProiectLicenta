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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Modele disponibile pentru brandul {brandName || brandSlug}
            </h1>

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {models.map((model) => (
                    <Link
                        key={model.deviceID}
                        to={`/repair-guides/${categorySlug}/${subcategorySlug}/${brandSlug}/${model.slug}`}
                        className="bg-gray-300 hover:bg-gray-400 p-6 rounded text-center font-semibold"
                    >
                        {model.model}
                    </Link>
                ))}
            </div>
        </div>
    );
}
