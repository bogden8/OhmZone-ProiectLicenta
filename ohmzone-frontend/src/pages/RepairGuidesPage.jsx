// src/pages/RepairGuidesPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import * as jwt from "jwt-decode";   // ← named import

const categories = [
    { name: "PC Laptop", slug: "pc-laptop" },
    { name: "Game consoles", slug: "game-consoles" },
    { name: "Phone", slug: "phone" },
    { name: "Mac", slug: "mac" },
    { name: "Power tools", slug: "power-tools" },
];

export default function RepairGuidesPage() {
    const token = localStorage.getItem("oz_token");
    let isAdmin = false;

    if (token) {
        try {
            // 1) split into header.payload.signature
            const parts = token.split(".");
            if (parts.length === 3) {
                // 2) base64‐decode the payload
                const payloadJson = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
                const payload = JSON.parse(payloadJson);
                console.log("JWT payload:", payload);

                // 3) figure out which property holds the role
                // common possibilities:
                const roleClaim =
                    payload.role ||
                    payload.Role ||
                    (Array.isArray(payload.roles) ? payload.roles[0] : undefined) ||
                    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

                console.log("Detected roleClaim:", roleClaim);
                isAdmin = roleClaim === "Admin";
            }
        } catch (e) {
            console.error("Error decoding JWT:", e);
        }
    }

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between max-w-5xl mx-auto px-4 pt-6">
                <h1 className="text-4xl font-bold font-jersey">
                    Repair guides
                </h1>

                {/* now this will show if isAdmin became true */}
                {isAdmin && (
                    <Link
                        to="/admin/guides/new"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                    >
                        Adaugă ghid
                    </Link>
                )}
            </div>

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
                {categories.map(cat => (
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

            {/* Despre dreptul de a repara */}
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
