
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function HomePage() {
    return (
        <div>
            {/* Banner principal */}
            <section className="text-white text-center py-20 bg-cover bg-center" style={{ backgroundImage: "url('/assets/home-banner.jpg')" }} >
                <h1 className="text-6xl font-bold font-jersey mb-4">Caută un ghid de reparație</h1>
                <Link to="/repair-guides" className="bg-white text-black px-6 py-2 rounded-full font-jersey hover:bg-gray-100">
                    Începe să-ți repari lucrurile
                </Link>
            </section>

            {/* Carduri utile (2x2 grid) */}
            <section className="py-16 bg-white text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Link to="/repair-guides" className="bg-navbar-bg hover:bg-black text-white p-8 text-xl font-bold rounded cursor-pointer transition">
                        <h3 className="text-2xl font-semibold">Ghiduri de reparații</h3>
                    </Link>
                    <Link to="/robotics" className="bg-navbar-bg hover:bg-black text-white p-8 text-xl font-bold rounded cursor-pointer transition">
                        <h3 className="text-2xl font-semibold">Învață robotică</h3>
                    </Link>
                    <Link to="/repair-guides" className="bg-navbar-bg hover:bg-black text-white p-8 text-xl font-bold rounded cursor-pointer transition">
                        <h3 className="text-2xl font-semibold">Dreptul de a repara</h3>
                    </Link>
                    <Link to="/forum" className="bg-navbar-bg hover:bg-black text-white p-8 text-xl font-bold rounded cursor-pointer transition">
                        <h3 className="text-2xl font-semibold">Pune o întrebare</h3>
                    </Link>
                </div>
            </section>

            {/* Descriere platformă */}
            <section className="bg-gray-200 py-20">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="md:w-1/2 space-y-6">
                            <h1 className="text-5xl font-bold font-jersey">Bine ai venit pe OhmZone!</h1>
                            <div className="bg-gray-700 bg-opacity-75 p-8 rounded-lg">
                                <p className="text-white text-lg leading-loose">
                                    OhmZone este o platformă web dedicată pasionaților de reparații,
                                    electronică și robotică. Scopul său este de a oferi ghiduri
                                    detaliate pentru repararea dispozitivelor, un forum activ pentru
                                    diagnosticare și discuții tehnice.
                                </p>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="/assets/laptop-homepage.jpg"
                                alt="Repair Illustration"
                                className="w-full rounded-lg object-cover shadow-lg max-h-[400px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Robotica + slider */}
            <section className="bg-white py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2">
                            <Swiper spaceBetween={20} slidesPerView={1} loop={true}>
                                <SwiperSlide>
                                    <img
                                        src="/assets/Arduino-homepage.png"
                                        alt="Slide 1"
                                        className="w-full rounded-lg shadow-lg max-h-[400px] object-cover"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img
                                        src="/assets/laptop-homepage.jpg"
                                        alt="Slide 2"
                                        className="w-full rounded-lg shadow-lg max-h-[400px] object-cover"
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className="md:w-1/2 space-y-6">
                            <h1 className="text-5xl font-bold font-jersey">Robotica</h1>
                            <div className="bg-gray-700 bg-opacity-75 p-8 rounded-lg">
                                <p className="text-white text-lg leading-loose">
                                    Aici vei găsi resurse, ghiduri și tutoriale care te vor ajuta să înveți și să dezvolți proiecte interesante în domeniul roboticii.
                                    Explorează baze de programare, electronică, senzori și actuatori, și învață prin proiecte practice.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
