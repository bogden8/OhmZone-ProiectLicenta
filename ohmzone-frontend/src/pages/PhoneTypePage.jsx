import React from 'react';
import { useNavigate } from 'react-router-dom';

const phoneTypes = [
    { name: 'Apple iPhone', slug: 'apple-iphone' },
    { name: 'Android Phone', slug: 'android-phone' },
    { name: 'Windows Phone', slug: 'windows-phone' },
    { name: 'Feature Phone', slug: 'feature-phone' },
    { name: 'Linux Phone', slug: 'linux-phone' },
    { name: 'Phone Accessories', slug: 'phone-accessories' },
];

export default function PhoneTypeSelectionPage() {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Alege tipul de telefon</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {phoneTypes.map(type => (
                    <div
                        key={type.slug}
                        className="bg-gray-200 p-6 rounded shadow hover:bg-gray-300 cursor-pointer text-center"
                        onClick={() => navigate(`/repair-guides/phone/${type.slug}`)}
                    >
                        {type.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
