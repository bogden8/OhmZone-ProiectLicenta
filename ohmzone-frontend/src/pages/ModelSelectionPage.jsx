import React from 'react';
import { useParams, Link } from 'react-router-dom';


const modelsByType = {
    'apple-iphone': ['iPhone 14', 'iPhone 13', 'iPhone 12', 'iPhone SE'],
    'android-phone': ['Galaxy S23', 'Pixel 7', 'OnePlus 11', 'Moto G'],
    'windows-phone': ['Galaxy S23', 'Pixel 7', 'OnePlus 11', 'Moto G'],
    'feature-phone': ['Galaxy S23', 'Pixel 7', 'OnePlus 11', 'Moto G'],
    'linux-phone': ['Jolla', 'Pine64 PinePhone'],
    'phone-accessories': ['Galaxy S23', 'Pixel 7', 'OnePlus 11', 'Moto G'],
};

export default function ModelSelectionPage() {
    const { phoneType } = useParams();
    const models = modelsByType[phoneType] || [];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                {phoneType.replace(/-/g, ' ')} Models
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {models.map(model => (
                    <Link
                        key={model}
                        to={`/repair-guides/phone/${phoneType}/${encodeURIComponent(model)}`}
                        className="bg-gray-300 hover:bg-gray-400 p-6 rounded text-center font-semibold"
                    >
                        {model}
                    </Link>
                ))}
            </div>
        </div>
    );
}
