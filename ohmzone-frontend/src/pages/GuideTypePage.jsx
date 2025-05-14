import React from 'react';
import { useParams } from 'react-router-dom';


const guideTypesByModel = {
    'iPhone 14': ['Screen replacement', 'Battery swap', 'Camera repair'],
    'Galaxy S23': ['Screen replacement', 'Back cover change', 'Speaker fix'],
    
};

export default function GuideTypePage() {
    const { phoneType, model } = useParams();
    const decodedModel = decodeURIComponent(model);
    const guideTypes = guideTypesByModel[decodedModel] || [];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                {decodedModel} Guides
            </h1>
            {guideTypes.length === 0 ? (
                <p>No guides available for this model yet.</p>
            ) : (
                <ul className="space-y-4">
                    {guideTypes.map(type => (
                        <li
                            key={type}
                            className="bg-gray-100 p-4 rounded shadow hover:bg-gray-200 cursor-pointer"
                        >
                            {type}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
