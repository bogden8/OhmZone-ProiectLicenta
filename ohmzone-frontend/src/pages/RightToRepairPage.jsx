import React from 'react';
import { Link } from 'react-router-dom';

export default function RightToRepairPage() {
    return (
        <div className="bg-white py-12 px-4">
            <div className="bg-gray-200 rounded-lg shadow-xl p-8 md:p-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
                {/* Imaginea */}
                <div className="md:w-1/2">
                    <img
                        src="/assets/right-to-repair.jpg"
                        alt="Dreptul de a repara"
                        className="w-full h-auto rounded-lg object-cover shadow-md"
                    />
                </div>

                {/* Conținutul */}
                <div className="md:w-1/2 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold font-jersey text-gray-900">
                        Repararea înseamnă libertate
                    </h1>
                    <p className="text-lg text-gray-800 leading-relaxed">
                        Mișcarea „Dreptul de a repara” se bazează pe un principiu fundamental: dacă ai cumpărat un produs, îl deții și ar trebui să ai posibilitatea să-l repari. Nimeni nu ar trebui să te împiedice să-ți readuci lucrurile la funcționarea lor inițială.
                    </p>
                    <p className="text-lg text-gray-800 leading-relaxed">
                        Repararea creează locuri de muncă locale, reduce deșeurile electronice și îți oferă controlul asupra dispozitivelor tale. Este o alegere sustenabilă și responsabilă.
                    </p>
                </div>
            </div>
        </div>
    );
}
