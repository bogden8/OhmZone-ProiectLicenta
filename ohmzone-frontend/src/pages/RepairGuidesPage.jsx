import React from "react";
import { Link } from "react-router-dom";   // ← import Link here

const categories = [
    { name: "PC Laptop", slug: "pc-laptop" },
    { name: "Game consoles", slug: "game-consoles" },
    { name: "Phone", slug: "phone" },
    { name: "Mac", slug: "mac" },
    { name: "Power tools", slug: "power-tools" },
];

export default function RepairGuidesPage() {
    return (
        <div className="bg-white">
            {/* Titlu */}
            <h1 className="text-center text-4xl font-bold font-jersey pt-6">
                Repair guides
            </h1>

            {/* Imagine banner */}
            <div className="w-full mt-4">
                <img
                    src="/assets/repair-banner.jpg"
                    alt="Repair banner"
                    className="w-full h-64 object-cover rounded"
                />
            </div>

            {/* Titlu categorii */}
            <h2 className="text-center text-xl font-bold mt-10 mb-6">Category</h2>

            {/* Grid categorii */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
                {categories.map((cat) => (
                    <Link
                        key={cat.slug}
                        to={
                            cat.slug === "phone"
                                ? "/repair-guides/phone"
                                : `/guides/${encodeURIComponent(cat.slug)}`
                        }
                        className="bg-gray-300 hover:bg-gray-400 transition cursor-pointer text-center p-8 font-bold text-lg rounded"
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>

            {/* Secțiunea despre dreptul de a repara */}
            <div className="bg-gray-300 mt-16 py-10 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded">
                <p className="text-black font-bold text-sm max-w-md">
                    Importanța dreptului de a repara
                </p>
                <img
                    src="/assets/right-repair.jpg"
                    alt="Right to repair"
                    className="w-52 h-auto rounded-xl object-cover"
                />
            </div>
        </div>
    );
}
