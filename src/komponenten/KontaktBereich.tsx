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

                        <div className="relative z-10">
                            <h3 className="text-2xl font-extrabold mb-6 text-center">Dein Weg zum Infogespräch</h3>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="Dein Name" 
                                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:border-marke-highlight transition-all"
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Deine E-Mail" 
                                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:border-marke-highlight transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {['WhatsApp', 'Telefon', 'E-Mail'].map((kanal) => (
                                        <label key={kanal} className="cursor-pointer group">
                                            <input type="radio" name="kanal" value={kanal} className="hidden peer" />
                                            <div className="px-3 py-3 text-center rounded-xl bg-white/5 border border-white/10 text-xs font-bold peer-checked:bg-marke-highlight peer-checked:text-marke-sekundaer peer-checked:border-marke-highlight transition-all">
                                                {kanal}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="w-full py-4 bg-white text-marke-sekundaer rounded-2xl font-black text-lg hover:bg-marke-highlight transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    Infogespräch + Checkliste anfordern
                                </button>
                                <p className="text-[10px] text-gray-400 text-center mt-4">
                                    Durch das Absenden erklärst du dich mit unserer Datenschutzerklärung einverstanden.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default KontaktBereich;
