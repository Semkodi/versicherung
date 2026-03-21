import { Heart, ShieldCheck } from 'lucide-react';
import profilBild from '../assets/Profil_img.png';

const UeberMich = () => {
    return (
        <section id="ueber-mich" className="py-24 bg-hintergrund relative overflow-hidden">
            {/* Hintergrund-Deko */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-marke-primaer/5 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-marke-sekundaer/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Profilbild */}
                    <div className="order-2 lg:order-1 relative group">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(2,10,57,0.15)] transform transition-all duration-700 hover:-translate-y-3 relative">
                            {/* Gradient-Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-marke-sekundaer/20 to-transparent z-10" />
                            <img
                                src={profilBild}
                                alt="Sven Kegler – Experte für Beamtenversorgung"
                                className="object-cover object-top w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                            />
                        </div>

                    </div>

                    {/* Textinhalt */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-text-haupt leading-tight">
                            Über mich – Dein Partner für den Start ins{' '}
                            <span className="text-marke-primaer">Beamtentum</span>
                        </h2>

                        <div className="w-16 h-1 bg-marke-sekundaer rounded-full mb-8" />

                        <div className="space-y-4 text-text-neben text-base leading-relaxed mb-8">
                            <p>
                                <strong className="text-text-haupt font-semibold">Hi! Ich bin Sven Kegler</strong> – Inhaber von simply switch und zertifizierter Fachberater für Beamtenversorgung. In den vergangenen 17 Jahren klärte ich bereits hunderte zukünftige Beamtenanwärter, Lehramtsstudierende und angehende Referendare umfassend auf.
                            </p>
                            <p>
                                Dabei habe ich immer wieder festgestellt, dass es einfach viel zu wenig Aufklärungsarbeit und kaum unabhängige Berater auf diesem Gebiet gibt.
                            </p>
                        </div>

                        {/* Zitat-Box */}
                        <div className="relative bg-hintergrund-alt border-l-4 border-marke-primaer p-6 rounded-r-2xl mb-10 overflow-hidden">
                            <p className="relative z-10 text-text-haupt font-medium italic text-sm leading-relaxed">
                                Meine Mission: Als Ansprechpartner für alle deine Fragen berate ich dich völlig unabhängig. Wir finden gemeinsam die Absicherung, die wirklich zu dir passt.
                            </p>
                        </div>

                        {/* Eigenschaften */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: <Heart className="w-5 h-5 text-marke-primaer" />, titel: "Ehrlich & Fair", text: "100% kostenlos und transparent" },
                                { icon: <ShieldCheck className="w-5 h-5 text-marke-primaer" />, titel: "Unabhängig", text: "Deine Interessen stehen im Vordergrund" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-5 rounded-xl bg-hintergrund-alt border border-gray-100 hover:border-marke-primaer/20 hover:-translate-y-1 transition-all">
                                    <div className="flex-shrink-0 p-2.5 bg-marke-primaer/10 rounded-lg">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-haupt text-sm mb-1">{item.titel}</h4>
                                        <p className="text-text-neben text-xs">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default UeberMich;
