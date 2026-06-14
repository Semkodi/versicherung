import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, User, Send, HeartHandshake } from 'lucide-react';

type KontaktBereichProps = {
    hintergrund?: 'weiss' | 'hellblau';
};

const KontaktBereich = ({ hintergrund = 'weiss' }: KontaktBereichProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [kanal, setKanal] = useState('Telefon');
    const [gesendet, setGesendet] = useState(false);
    const [honeypot, setHoneypot] = useState('');

    const behandleAbsenden = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (honeypot) {
            // Stillschweigend als Erfolg werten
            setGesendet(true);
            return;
        }

        if (!name || !email) return;

        const betreff = encodeURIComponent("Anfrage Infogespräch & Checkliste - Simply Switch");
        const text = encodeURIComponent(
            `Hallo Sven,\n\nich möchte gerne ein unverbindliches Infogespräch vereinbaren und die Checkliste anfordern.\n\n` +
            `👤 Name: ${name}\n` +
            `📧 E-Mail: ${email}\n` +
            `💬 Bevorzugter Kontaktkanal: ${kanal}\n\n` +
            `Bitte melde dich bezüglich eines Termins bei mir.\n\nFreundliche Grüße`
        );
        
        // E-Mail-Client des Nutzers öffnen
        window.location.href = `mailto:kegler@simply-switch.de?subject=${betreff}&body=${text}`;
        
        setGesendet(true);
    };

    const formularZuruecksetzen = () => {
        setName('');
        setEmail('');
        setKanal('Telefon');
        setHoneypot('');
        setGesendet(false);
    };

    return (
        <section
            id="kontakt"
            className={`py-24 relative overflow-hidden border-b border-[#e2e8f0] ${
                hintergrund === 'hellblau' ? 'bg-hintergrund-alt' : 'bg-white'
            }`}
        >
            {/* Hintergrund */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-marke-primaer/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-marke-primaer text-xs font-extrabold tracking-widest uppercase mb-3 block">Dein erster Schritt</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-[#0a1930] leading-tight tracking-tight">
                        Jetzt deinen Wunschtermin<br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-[#1e5adb] to-[#4f46e5] bg-clip-text text-transparent"> per E-Mail anfordern</span>
                    </h2>
                    <p className="text-[#4a5568] text-lg font-normal">
                        Vereinbare direkt dein unverbindliches Online-Gespräch. Zusätzlich erhältst du unsere exklusive Checkliste für einen erfolgreichen Start in deine Beamtenkarriere.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Haupt-Karte */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#0a1930] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-[0_30px_60px_rgba(10,25,48,0.15)] border border-white/10"
                    >
                        {/* Glows */}
                        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#1e5adb] rounded-full blur-[120px] opacity-20 pointer-events-none" />
                        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[#1e5adb] rounded-full blur-[80px] opacity-10 pointer-events-none" />

                        <AnimatePresence mode="wait">
                            {!gesendet ? (
                                <motion.div
                                    key="kontaktformular"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative z-10"
                                >
                                    <h3 className="text-xl md:text-2xl font-extrabold mb-8 text-center text-white leading-snug">
                                        Dein Weg zum Infogespräch
                                    </h3>
                                    <form onSubmit={behandleAbsenden} className="space-y-6">
                                        {/* Honeypot Spam-Schutz */}
                                        <div className="hidden" aria-hidden="true">
                                            <input 
                                                type="text" 
                                                name="website_url" 
                                                value={honeypot} 
                                                onChange={(e) => setHoneypot(e.target.value)} 
                                                tabIndex={-1} 
                                                autoComplete="off" 
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input 
                                                    type="text" 
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Dein Name" 
                                                    className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:border-marke-highlight focus:ring-1 focus:ring-marke-highlight transition-all font-medium text-sm"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input 
                                                    type="email" 
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Deine E-Mail" 
                                                    className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:border-marke-highlight focus:ring-1 focus:ring-marke-highlight transition-all font-medium text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="block text-xs font-extrabold text-gray-300 uppercase tracking-wider ml-1">
                                                Wie sollen wir dich kontaktieren?
                                            </label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['WhatsApp', 'Telefon', 'E-Mail'].map((kanalOption) => {
                                                    const istAktiv = kanal === kanalOption;
                                                    return (
                                                        <button
                                                            key={kanalOption}
                                                            type="button"
                                                            onClick={() => setKanal(kanalOption)}
                                                            className={`px-3 py-3.5 text-center rounded-2xl border text-xs font-bold transition-all duration-300 ${
                                                                istAktiv
                                                                    ? 'bg-marke-highlight border-marke-highlight text-[#0a1930] shadow-md scale-[1.02]'
                                                                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                                                            }`}
                                                        >
                                                            {kanalOption}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-white text-[#0a1930] rounded-2xl font-extrabold text-base hover:bg-marke-highlight transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                        >
                                            <Send className="w-4 h-4" />
                                            <span>Infogespräch + Checkliste anfordern</span>
                                        </button>
                                        <p className="text-[10px] text-gray-400 text-center leading-relaxed mt-4">
                                            Durch das Absenden wird dein E-Mail-Programm geöffnet. Es gelten unsere Bestimmungen zum Datenschutz.
                                        </p>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="kontakt-erfolg"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative z-10 text-center py-8 flex flex-col items-center justify-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#10b981]/20 flex items-center justify-center mb-6 shadow-md border border-[#10b981]/30">
                                        <Check className="w-8 h-8 text-[#10b981] stroke-[3]" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">Anfrage vorbereitet!</h3>
                                    <p className="text-gray-300 text-sm max-w-sm mb-6 leading-relaxed">
                                        Vielen Dank! Deine E-Mail-Anfrage an Sven Kegler wurde generiert und in deinem E-Mail-Programm geöffnet.
                                    </p>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 max-w-md text-xs text-gray-300 leading-relaxed mb-8 flex gap-4 text-left items-start">
                                        <HeartHandshake className="w-5 h-5 text-marke-highlight flex-shrink-0 mt-0.5" />
                                        <span>
                                            Sollte sich dein Mail-Programm nicht automatisch geöffnet haben, sende uns deine Anfrage einfach direkt an <a href="mailto:kegler@simply-switch.de" className="text-marke-highlight font-bold hover:underline">kegler@simply-switch.de</a>.
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={formularZuruecksetzen}
                                        className="text-sm font-bold text-marke-highlight hover:text-white hover:underline transition-colors"
                                    >
                                        Erneut absenden
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default KontaktBereich;
