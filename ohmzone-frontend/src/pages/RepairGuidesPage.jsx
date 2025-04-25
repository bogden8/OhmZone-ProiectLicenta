import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
    { name: "PC Laptop", slug: "pc-laptop" },
    { name: "Game consoles", slug: "game-consoles" },
    { name: "Phone", slug: "phone" },
    { name: "Mac", slug: "mac" },
    { name: "Power tools", slug: "power-tools" },
];

export default function RepairGuidesPage() {
    const navigate = useNavigate();
    return (
        <>
          

            <main className="container">
                <h1>Repair guides</h1>
                <img
                    src="https://via.placeholder.com/800x200"
                    alt="Banner"
                    style={{ width: '100%', borderRadius: 4, margin: '1rem 0' }}
                />

                <h2>Category</h2>
                <div className="grid columns-3">
                    {categories.map(cat => (
                        <div
                            key={cat.slug}
                            className="card"
                            onClick={() => navigate(`/guides/${cat.slug}`)}
                        >
                            {cat.name}
                        </div>
                    ))}
                </div>

                <section style={{ display: 'flex', marginTop: '2rem', background: '#eee', padding: '1rem', borderRadius: 4 }}>
                    <p style={{ flex: 1 }}>
                        Importanța dreptului de a repara
                    </p>
                    <img
                        src="https://via.placeholder.com/200"
                        alt="Right to repair"
                        style={{ width: 200, borderRadius: 4, marginLeft: '1rem' }}
                    />
                </section>
            </main>

            
        </>
    );
}
