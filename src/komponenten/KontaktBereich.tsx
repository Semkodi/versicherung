import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const KontaktBereich = () => {
    return (
        <section id="kontakt" className="py-24 relative overflow-hidden bg-hintergrund-alt">
            {/* Hintergrund */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-marke-primaer/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-marke-primaer text-sm font-bold tracking-widest uppercase mb-3 block text-sm">Dein erster Schritt</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-text-haupt leading-tight">
                        Jetzt deinen Wunschtermin<br className="hidden md:block" />
                        <span className="text-marke-primaer"> online buchen</span>
                    </h2>
                    <p className="text-text-neben text-lg font-light">
                        Vereinbare direkt dein unverbindliches Online-Gespräch. Zusätzlich erhältst du unsere exklusive Checkliste für einen erfolgreichen Start in deine Beamtenkarriere.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Haupt-Karte */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-marke-sekundaer rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-[0_30px_80px_rgba(2,10,57,0.3)]"
                    >
                        {/* Glow */}
                        <div className="absolute -right-20 -top-20 w-80 h-80 bg-marke-primaer rounded-full blur-[120px] opacity-20 pointer-events-none" />
                        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-marke-primaer rounded-full blur-[80px] opacity-10 pointer-events-none" />

                        <div className="relative z-10 text-center">
                            {/* Icon */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-16 h-16 mx-auto bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm"
                            >
                                <Mail className="w-8 h-8 text-white" />
                            </motion.div>

                            <h3 className="text-2xl font-extrabold mb-3">Kostenfreies Infogespräch</h3>
                            <p className="text-gray-300 font-light text-sm mb-8 max-w-sm mx-auto">
                                Wähle einfach deinen Wunschtermin in meinem Kalender aus – ich bin auch am Abend verfügbar.
                            </p>

                            {/* Vertrauens-Badges */}
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                {['Kostenlos', '100% Unverbindlich', 'Online per Video'].map((badge, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                        className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-sm text-gray-200"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-marke-highlight" />
                                        {badge}
                                    </motion.div>
                                ))}
                            </div>

                            <a
                                href="https://calendly.com/kegler/kostenloses-infogesprach"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex justify-center items-center gap-3 px-10 py-4 bg-white text-marke-sekundaer rounded-xl font-black text-lg hover:bg-marke-highlight transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Termin online buchen
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default KontaktBereich;
