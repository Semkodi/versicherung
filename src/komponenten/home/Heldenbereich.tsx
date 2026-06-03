import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Shield, Zap } from 'lucide-react';
import heroImg from '@/assets/bilder/hero_couple.png';

const Heldenbereich = () => {
    const checkmarks = [
        "Unabhängig & objektiv beraten",
        "Persönlicher Ansprechpartner",
        "Digital & unkompliziert"
    ];

    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-[#f8f9fc] to-[#eef2f9] overflow-hidden">
            <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Linke Seite: Text & CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#e8effd] text-[#1e5adb] px-4 py-2 rounded-full mb-8 font-semibold text-sm shadow-sm border border-[#d1e0f9]">
                            Dein Partner für Sicherheit & Vorsorge
                        </div>

                        {/* Headline */}
                        <h1 className="text-[2.5rem] md:text-5xl lg:text-[4rem] font-extrabold text-[#0a1930] leading-[1.1] mb-6 tracking-tight">
                            Versicherungen.<br />
                            Einfach. Persönlich.<br />
                            <span className="bg-gradient-to-r from-[#1e5adb] to-[#4f46e5] bg-clip-text text-transparent">Für dich.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-[#4a5568] mb-10 max-w-xl font-normal leading-relaxed">
                            Wir helfen Beamten, Privatkunden und Selbstständigen die richtigen Versicherungen zu finden – verständlich, transparent und digital.
                        </p>

                        {/* Checkmarks */}
                        <ul className="space-y-4 mb-12">
                            {checkmarks.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-4 text-[#2d3748] font-medium">
                                    <div className="w-6 h-6 rounded-full bg-[#1e5adb] flex items-center justify-center flex-shrink-0 shadow-md">
                                        <Check className="w-4 h-4 text-white stroke-[3]" />
                                    </div>
                                    <span className="text-base">{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <a
                                href="#kontakt"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0a1930] text-white font-semibold rounded-xl hover:bg-[#152a4f] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                Jetzt beraten lassen
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="#zielgruppen"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0a1930] border-2 border-white shadow-md font-semibold rounded-xl hover:border-gray-100 hover:bg-gray-50 transition-all"
                            >
                                Mehr erfahren
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Social Proof / Stars */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-[#fbbf24] fill-[#fbbf24]" />
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-base text-[#0a1930]">4,9/5 aus 230+ Bewertungen</span>
                                <div className="flex -space-x-3">
                                    <img src="https://i.pravatar.cc/100?img=1" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#f8f9fc]" />
                                    <img src="https://i.pravatar.cc/100?img=2" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#f8f9fc]" />
                                    <img src="https://i.pravatar.cc/100?img=3" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#f8f9fc]" />
                                    <img src="https://i.pravatar.cc/100?img=4" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#f8f9fc]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rechte Seite: Bild & Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:flex items-end justify-center mt-10 lg:mt-0"
                    >
                        {/* Main Image - Sanfter Übergang links ins Transparente */}
                        <div className="relative z-10 w-full flex justify-center lg:justify-end">
                            <img 
                                src={heroImg} 
                                alt="Glückliche Familie" 
                                className="w-full h-auto max-h-[500px] object-cover rounded-[2rem] [mask-image:linear-gradient(to_right,transparent_0%,black_35%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_35%)] shadow-md"
                            />
                        </div>

                        {/* Floating Trust Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="absolute -bottom-8 -left-12 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-20 w-max border border-white/40"
                        >
                            <div className="flex gap-8">
                                <div className="flex flex-col gap-2">
                                    <div className="w-12 h-12 rounded-full bg-[#e8effd] flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-[#1e5adb]" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-base text-[#0a1930] mb-1">100% unabhängig</div>
                                        <div className="text-xs text-[#718096] leading-snug">Wir arbeiten für dich,<br/>nicht für Versicherungen.</div>
                                    </div>
                                </div>
                                <div className="w-px bg-gray-100" />
                                <div className="flex flex-col gap-2">
                                    <div className="w-12 h-12 rounded-full bg-[#e8effd] flex items-center justify-center">
                                        <Star className="w-6 h-6 text-[#1e5adb]" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-base text-[#0a1930] mb-1">Top bewertet</div>
                                        <div className="text-xs text-[#718096] leading-snug">Hundertfaches Vertrauen<br/>durch unsere Kunden.</div>
                                    </div>
                                </div>
                                <div className="w-px bg-gray-100" />
                                <div className="flex flex-col gap-2">
                                    <div className="w-12 h-12 rounded-full bg-[#e8effd] flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-[#1e5adb]" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-base text-[#0a1930] mb-1">Schnell & digital</div>
                                        <div className="text-xs text-[#718096] leading-snug">Anfragen, Dokumente &<br/>Beratung online.</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Heldenbereich;
