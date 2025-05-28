import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RepairGuidesPage() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    const token = localStorage.getItem("oz_token");
    let isAdmin = false;

    if (token) {
        try {
            const parts = token.split(".");
            if (parts.length === 3) {
                const payloadJson = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
                const payload = JSON.parse(payloadJson);
                const roleClaim =
                    payload.role ||
                    payload.Role ||
                    (Array.isArray(payload.roles) ? payload.roles[0] : undefined) ||
                    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                isAdmin = roleClaim === "Admin";
            }
        } catch (e) {
            console.error("JWT decode error:", e);
        }
    }

    useEffect(() => {
        axios.get("/api/lookup/categories")
            .then(res => setCategories(res.data))
            .catch(() => setError("Eroare la încărcarea categoriilor."));
    }, []);

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between max-w-5xl mx-auto px-4 pt-6 animate-fade-in">
                <h1 className="text-4xl font-bold font-jersey">Ghiduri de Reparare</h1>
                {isAdmin && (
                    <Link
                        to="/admin/guides/full-create"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition"
                    >
                        Adaugă ghid
                    </Link>
                )}
            </div>

            {/* Banner cu text suprapus */}
            <div className="relative w-full mt-4 h-64">
                <img
                    src="/assets/repair-banner.jpg"
                    alt="Repair banner"
                    className="w-full h-full object-cover rounded"
                />
                <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center">
                    <h2 className="text-4xl md:text-5xl font-jersey font-bold text-white animate-fade-in">Poți să o faci !</h2>
                </div>
            </div>

            <h2 className="text-center text-xl font-bold mt-10 mb-6">Ce trebuie să repari?</h2>
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Categorii */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 animate-slide-up">
                {categories.map(cat => (
                    <Link
                        key={cat.categoryID}
                        to={`/repair-guides/${encodeURIComponent(cat.slug || cat.categoryName.toLowerCase().replace(/\s+/g, '-'))}`}
                        className="bg-gray-300 hover:bg-gray-400 transition duration-300 transform hover:scale-105 cursor-pointer text-center p-8 font-bold text-lg rounded shadow-md"
                    >
                        {cat.categoryName}
                    </Link>
                ))}
            </div>

            {/* Secțiune despre dreptul de a repara */}
            <div className="bg-gray-300 mt-16 py-10 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded animate-fade-in">
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
