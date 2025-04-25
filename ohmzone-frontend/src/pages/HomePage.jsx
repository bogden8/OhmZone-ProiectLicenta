import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div>
            <section className="bg-blue-600 text-white text-center py-20">
                <h1 className="text-5xl font-bold mb-4">Welcome to OhmZone!</h1>
                <p className="text-lg mb-6">Your go-to place for repair guides, robotics, and more.</p>
                <Link to="/repair-guides" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100">
                    Start Fixing Your Stuff
                </Link>
            </section>


            <section className="py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded shadow hover:bg-gray-200 cursor-pointer">
                        <h3 className="text-xl font-semibold">PC & Laptop</h3>
                    </div>
                    <div className="bg-white p-6 rounded shadow hover:bg-gray-200 cursor-pointer">
                        <h3 className="text-xl font-semibold">Game Consoles</h3>
                    </div>
                    <div className="bg-white p-6 rounded shadow hover:bg-gray-200 cursor-pointer">
                        <h3 className="text-xl font-semibold">Phones</h3>
                    </div>
                </div>
            </section>


            <section className="bg-white py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">About Us</h2>
                    <p className="text-lg mb-4">We are dedicated to helping you repair your devices with detailed guides and resources. Whether it's your laptop, phone, or even game consoles, we've got you covered.</p>
                    <Link to="/about" className="text-blue-600 font-semibold hover:underline">Learn More</Link>
                </div>
            </section>
        </div>
    );
}
