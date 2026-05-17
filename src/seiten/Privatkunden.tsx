import { motion } from 'framer-motion';
import { ShieldCheck, Home, Car, HeartPulse, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../komponenten/layout/ScrollReveal.tsx';

const Privatkunden = () => {
    const leistungen = [
        { icon: ShieldCheck, titel: "Haftpflicht", text: "Schutz vor den kleinen und großen Missgeschicken des Alltags." },
        { icon: Home, titel: "Hausrat", text: "Sicherheit für dein Zuhause und dein Hab und Gut." },
        { icon: Car, titel: "Kfz-Versicherung", text: "Günstige Tarife mit exzellentem Schadenservice." },
        { icon: HeartPulse, titel: "Vorsorge", text: "Smarte Lösungen für deine Rente und Gesundheit." }
    ];

    return (
        <main className="relative z-10 overflow-hidden">
            {/* Header Sektion */}
            <div className="pt-40 pb-24 px-4 bg-hintergrund-alt relative">
                <div className="absolute inset-0 bg-marke-primaer/5 blur-[120px] rounded-full translate-y-[-50%]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-7xl font-black text-text-haupt mb-8"
                        >
                            Versicherungen für <br />
                            <span className="text-marke-primaer">Privatkunden</span>
                        </motion.h1>
                        <p className="text-xl text-text-neben max-w-2xl mx-auto leading-relaxed">
                            Wir bieten maßgeschneiderte Lösungen für dich und deine Familie. Einfach, transparent und fair.
                        </p>
                    </div>
                </div>
            </div>

            {/* Karten Sektion */}
            <div className="py-24 bg-hintergrund relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                        {leistungen.map((l, i) => (
                            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                                <div className="p-8 bg-hintergrund-alt border border-white/5 rounded-3xl hover:border-marke-primaer/30 transition-all group shadow-xl">
                                    <div className="w-12 h-12 bg-marke-primaer/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <l.icon className="w-6 h-6 text-marke-primaer" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{l.titel}</h3>
                                    <p className="text-gray-400 text-sm font-light leading-relaxed">{l.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="bg-marke-sekundaer rounded-[3rem] p-12 text-center relative overflow-hidden border border-white/10 shadow-2xl">
                        <div className="absolute inset-0 bg-marke-primaer/10 blur-[100px] pointer-events-none" />
                        <h2 className="text-3xl font-black text-white mb-6 relative z-10">Bereit für den optimalen Schutz?</h2>
                        <p className="text-gray-400 mb-10 relative z-10">Lass uns gemeinsam schauen, welche Absicherung wirklich zu deinem Leben passt.</p>
                        <a 
                            href="https://svenkegler.de/privatkunden"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-marke-primaer text-white rounded-xl font-black hover:bg-marke-highlight hover:text-marke-sekundaer transition-all relative z-10"
                        >
                            Jetzt beraten lassen
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Privatkunden;
