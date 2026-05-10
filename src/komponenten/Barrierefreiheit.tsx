import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, X, Check } from 'lucide-react';

const Barrierefreiheit = () => {
    const [offen, setOffen] = useState(false);
    const [aktiveProfile, setAktiveProfile] = useState<string[]>([]);

    const profile = [
        { id: 'adhs', name: 'ADHS Profil', beschreibung: 'Fokussiertes Lesen, weniger Ablenkung' },
        { id: 'seh', name: 'Sehbehinderung', beschreibung: 'Höherer Kontrast & größere Schrift' },
        { id: 'epi', name: 'Epilepsie-Sicher', beschreibung: 'Eliminiert flackernde Animationen' },
        { id: 'kognitiv', name: 'Kognitive Hilfe', beschreibung: 'Einfachere Sprache & Orientierung' },
        { id: 'dys', name: 'Legasthenie-Profil', beschreibung: 'Optimierte Zeichenabstände für besseres Lesen' }
    ];

    const toggleProfil = (id: string) => {
        setAktiveProfile(prev => 
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
        document.documentElement.classList.toggle(`basis-${id}`);
    };

    const resetAlles = () => {
        aktiveProfile.forEach(id => {
            document.documentElement.classList.remove(`basis-${id}`);
        });
        setAktiveProfile([]);
    };

    return (
        <>
            {/* Schwebender Button (Links platziert) */}
            <button 
                onClick={() => setOffen(true)}
                className="fixed bottom-6 left-6 z-[60] w-12 h-12 bg-white text-[#020A39] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border border-marke-primaer/20"
                aria-label="Barrierefreiheit öffnen"
            >
                <Accessibility className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {offen && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20 }}
                        className="fixed bottom-24 left-6 z-[60] w-80 bg-[#020A39]/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold">Barrierefreiheit</h3>
                            <button onClick={() => setOffen(false)} className="text-white/40 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {profile.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => toggleProfil(p.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all text-left border ${
                                        aktiveProfile.includes(p.id) 
                                        ? 'bg-marke-primaer border-marke-primaer text-white' 
                                        : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'
                                    }`}
                                >
                                    <div>
                                        <div className="font-bold text-sm">{p.name}</div>
                                        <div className="text-[10px] opacity-60">{p.beschreibung}</div>
                                    </div>
                                    {aktiveProfile.includes(p.id) && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>

                        <p className="text-[10px] text-white/30 text-center mt-6 italic">
                            Anpassungen werden sofort angewendet.
                        </p>

                        <button 
                            onClick={resetAlles}
                            className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/5"
                        >
                            Alle Einstellungen zurücksetzen
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Barrierefreiheit;
