import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div>
            <section className="text-white text-center py-20 bg-cover bg-center" style={{ backgroundImage: "url('/assets/home-banner.jpg')" }} >
                <h1 className="text-5xl font-bold font-jersey mb-4">Cauta un ghid de reparatie</h1>
                <Link to="/repair-guides" className="bg-white text-black px-6 py-2 rounded-full font-jersey hover:bg-gray-100">
                    Start Fixing Your Stuff
                </Link>
            </section>

            <section className="py-16 bg-white text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Link to="/repair-guides" className="bg-navbar-bg hover:bg-black text-white p-8 text-lg font-bold rounded text-center cursor-pointer transition">
                        <h3 className="text-xl font-semibold">Proiecte ale comunitatii</h3>
                    </Link>
                    <Link to="/repair-guides" className="bg-navbar-bg hover:bg-black text-white p-8 text-lg font-bold rounded text-center cursor-pointer transition">
                        <h3 className="text-xl font-semibold">Ghiduri de reparatii</h3>
                    </Link>
                    <Link to="/repair-guides" className="bg-navbar-bg hover:bg-black text-white p-8 text-lg font-bold rounded text-center cursor-pointer transition">
                        <h3 className="text-xl font-semibold">Invata robotica</h3>
                    </Link>
                    <Link to="/repair-guides" className="bg-navbar-bg hover:bg-black text-white p-8 text-lg font-bold rounded text-center cursor-pointer transition">
                        <h3 className="text-xl font-semibold">Dreptul de a repara</h3>
                    </Link>
                    <Link to="/repair-guides" className="bg-navbar-bg hover:bg-black text-white p-8 text-lg font-bold rounded text-center cursor-pointer transition">
                        <h3 className="text-xl font-semibold">Pune o intrebare</h3>
                    </Link>
                </div>
            </section>

            <section className="bg-gray-200 py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-start gap-8">

                        {/* Coloană de TEXT + heading */}
                        <div className="md:w-1/2 space-y-4">
                            <h1 className="text-4xl font-bold font-jersey">
                                Bine ai venit pe OhmZone!
                            </h1>
                            <div className="bg-gray-700 bg-opacity-75 p-6 rounded-lg">
                                <p className="text-white leading-relaxed">
                                    OhmZone este o platformă web dedicată pasionaților de reparații,
                                    electronică și robotică. Scopul său este de a oferi ghiduri
                                    detaliate pentru repararea dispozitivelor, un forum activ pentru
                                    diagnosticare și discuții tehnice.
                                </p>
                            </div>
                        </div>

                        {/* Coloană de IMAGINE */}
                        <div className="md:w-1/2">
                            <img
                                src="/assets/laptop-homepage.jpg"
                                alt="Repair Illustration"
                                className="w-full rounded-lg object-cover shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-start gap-8">

                        {/* Coloană de TEXT + heading */}
                        <div className="md:w-1/2 space-y-4">
                            <h1 className="text-4xl font-bold font-jersey">
                                Robotica
                            </h1>
                            <div className="bg-gray-700 bg-opacity-75 p-6 rounded-lg">
                                <p className="text-white leading-relaxed">
                                    Aici vei găsi resurse, ghiduri și tutoriale care te vor ajuta să înveți și să dezvolți proiecte interesante în domeniul roboticii.
                                    Explorează baze de programare, electronică, senzori și actuatori, și învață prin proiecte practice.
                                </p>
                            </div>
                        </div>

                        {/* Coloană de IMAGINE */}
                        <div className="md:w-1/2">
                            <img
                                src="/assets/Arduino-homepage.png"
                                alt="Arudino Homepage"
                                className="w-full rounded-lg object-cover shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
