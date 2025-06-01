import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';


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
            <section className="bg-white py-6">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={7}
                    loop={true}
                    speed={4000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="w-full px-4 brand-swiper"
                >

                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/acer-logo.png" alt="Acer" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/alcatel.png" alt="Alcatel" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/amazon.png" alt="Amazon" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/aorus-logo.png" alt="Aorus" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/apple.png" alt="Apple" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/asus-logo.png" alt="Asus" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/dell-logo.png" alt="Dell" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/gigabyte-logo.png" alt="Gigabyte" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/google.png" alt="Google" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/hp-logo.png" alt="HP" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/htc.png" alt="HTC" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/huawei.png" alt="Huawei" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/i-mate.png" alt="i-mate" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/jolla.png" alt="Jolla" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/lenovo.png" alt="Lenovo" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/lg-logo.png" alt="LG" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/microsoft-logo.png" alt="Microsoft" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/motorola.png" alt="Motorola" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/msi-logo.png" alt="MSI" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/nokia.png" alt="Nokia" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/oneplus.png" alt="OnePlus" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/playstation-logo.png" alt="PlayStation" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/razer.png" alt="Razer" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/samsung-logo.png" alt="Samsung" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/sony.png" alt="Sony" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/steam-logo.png" alt="Steam" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/xbox-logo.png" alt="Xbox" className="h-16 w-32 object-contain" />
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center">
                        <img src="/assets/brands/xiaomi.png" alt="Xiaomi" className="h-16 w-32 object-contain" />
                    </SwiperSlide>

                </Swiper>
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
                    <Link to="/right-to-repair" className="bg-navbar-bg hover:bg-black text-white p-8 text-xl font-bold rounded cursor-pointer transition">
                        <h3 className="text-2xl font-semibold">Dreptul de a repara</h3>
                    </Link>

                    <Link to="/forum" className="bg-navbar-bg hover:bg-black text-white p-8 text-xl font-bold rounded cursor-pointer transition">
                        <h3 className="text-2xl font-semibold">Pune o întrebare</h3>
                    </Link>
                </div>
            </section>

            {/* Descriere platformă */}
            <section className="bg-gray-200 py-12">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="md:w-[55%] space-y-4">
                            <h1 className="text-4xl font-bold font-jersey">Bine ai venit pe OhmZone!</h1>
                            <div className="bg-gray-700 bg-opacity-75 p-6 rounded-lg">
                                <p className="text-white text-base leading-relaxed">
                                    OhmZone este o platformă web dedicată pasionaților de reparații, electronică și robotică.
                                    Scopul său este de a oferi ghiduri detaliate pentru repararea dispozitivelor, un forum activ
                                    pentru diagnosticare și discuții tehnice.
                                </p>
                            </div>
                        </div>
                        <div className="md:w-[45%]">
                            <img
                                src="/assets/laptop-homepage.jpg"
                                alt="Repair Illustration"
                                className="rounded-lg object-cover shadow-lg w-full h-[300px]"
                            />
                        </div>
                    </div>
                </div>
            </section>




            {/* Robotica + slider */}
            <section className="bg-white py-12">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="md:w-[45%]">
                            <img
                                src="/assets/Arduino-homepage.png"
                                alt="Arduino"
                                className="w-full rounded-lg shadow-lg h-[300px] object-cover"
                            />
                        </div>
                        <div className="md:w-[55%] space-y-4">
                            <h1 className="text-4xl font-bold font-jersey">Robotica</h1>
                            <div className="bg-gray-700 bg-opacity-75 p-6 rounded-lg space-y-4">
                                <p className="text-white text-base leading-relaxed">
                                    Aici vei găsi resurse, ghiduri și tutoriale care te vor ajuta să înveți și să dezvolți proiecte interesante
                                    în domeniul roboticii. Explorează baze de programare, electronică, senzori și actuatori, și învață prin proiecte practice.
                                </p>
                                <Link to="/robotics" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded">
                                    Vezi lecțiile de robotică
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-yellow-100 py-12 mt-16 shadow-inner">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-bold text-yellow-800">Ce urmează pe OhmZone?</h2>
                    <ul className="text-lg text-yellow-900 space-y-2">
                        <li>- Magazin cu piese electronice și componente robotice -</li>
                        <li>- Serviciu de încărcare și printare PCB-uri -</li>
                    </ul>
                    <p className="text-yellow-800 italic">Platforma evoluează constant, rămâi cu noi!</p>

                    <Link
                        to="/register"
                        className="text-red-600 hover:text-red-800 font-bold underline transition"
                    >
                        Creează un cont
                    </Link>
                </div>
            </section>


        </div>
    );
}