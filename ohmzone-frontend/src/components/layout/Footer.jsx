import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-navbar-bg text-white mt-10 py-8">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                
                <div>
                    <h2 className="font-bold text-lg mb-2">Despre OhmZone</h2>
                    <p>
                        OhmZone este o platformă dedicată reparațiilor, electronicii și roboticii.
                        Învață, întreabă, repară.
                    </p>
                </div>

                
                <div>
                    <h2 className="font-bold text-lg mb-2">Linkuri utile</h2>
                    <ul className="space-y-1">
                        <li><Link to="/repair-guides" className="hover:underline">Ghiduri de reparații</Link></li>
                        <li><Link to="/robotics" className="hover:underline">Tutoriale Robotică</Link></li>
                        <li><Link to="/forum" className="hover:underline">Forum întrebări</Link></li>
                        <li><Link to="/devices" className="hover:underline">Toate Device-urile</Link></li>
                    </ul>
                </div>

                
                <div>
                    <h2 className="font-bold text-lg mb-2">Contact</h2>
                    <p>Email: <a href="mailto:contact@ohmzone.com" className="underline">contact@ohmzone.com</a></p>
                    
                </div>
            </div>

            {/* Footer de jos */}
            <div className="text-center mt-6 border-t border-white border-opacity-20 pt-4 text-xs">
                © {new Date().getFullYear()} OhmZone. Toate drepturile rezervate.
            </div>
        </footer>
    );
}
