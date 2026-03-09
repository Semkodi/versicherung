import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, Mail, ArrowRight } from 'lucide-react';
import logo from '../assets/logo2-Photoroom.png';

const faqDaten = [
    {
        frage: "Wie viel kostet die Beratung?",
        antwort: "Als unabhängiger Berater werde ich von den Versicherungsgesellschaften bezahlt. Für dich ist mein Service vollkommen kostenlos. Ich berate dich umfassend dazu, was für dich sinnvoll ist und dir wirklich etwas bringt."
    },
    {
        frage: "Was passiert mit meiner Dienstunfähigkeitsversicherung, wenn ich nicht weiter verbeamtet werde?",
        antwort: "Solltest du wieder zurück in ein Angestelltenverhältnis gehen, wandle ich die Dienstunfähigkeitsversicherung für dich einfach in eine Berufsunfähigkeitsversicherung um. So bist du immer optimal abgesichert."
    },
    {
        frage: "Kann ich mich auch später noch gegen Dienstunfähigkeit versichern?",
        antwort: "Grundsätzlich ja, sofern es dein Gesundheitszustand zulässt. Solltest du aber während deiner Anwärterzeit oder der Verbeamtung auf Probe dienstunfähig werden, bekommst du ohne Versicherung keine Leistungen vom Dienstherren oder vom Staat. Es ist also ratsam, die Dienstunfähigkeitsversicherung so früh wie möglich zu beantragen."
    },
    {
        frage: "Kann ich mich nicht auch noch später um die Altersvorsorge kümmern?",
        antwort: "Klar kannst du dir auch erst später eine private Altersvorsorge abschließen. Wie bei jeder Vorsorge gilt aber: Je früher du anfängst, desto besser. Mit einer langen Laufzeit profitierst du von Zinseszinseffekten und Wertentwicklung."
    },
    {
        frage: "Was passiert, wenn ich nach meiner Ausbildung vorerst nicht weiter verbeamtet werde?",
        antwort: "Keine Sorge, ich helfe dir gerne, zurück in die gesetzliche Krankenversicherung zu wechseln – und friere deinen Gesundheitszustand ein. So kannst du später ohne neue Gesundheitsprüfung wieder zurück in die private Krankenversicherung."
    },
    {
        frage: "Warum reicht eine Berufsunfähigkeitsversicherung für Beamte nicht aus?",
        antwort: "Der Amtsarzt wird dich im Ernstfall immer nur als \"dienstunfähig\" einstufen. Heißt: Dass du deinen Dienst nicht antreten kannst. Eine BU-Versicherung zahlt oft nicht, wenn du nur dienstunfähig bist. Deshalb benötigst du die richtige Klausel."
    },
    {
        frage: "Muss ich für eine Beratung persönlich vorbeikommen?",
        antwort: "Nein. Die Beratung findet in der Regel online per Videocall statt. Das heißt, ich betreue dich gerne, völlig unabhängig davon, wo du in Deutschland wohnst."
    }
];

const FaqItem = ({ frage, antwort }: { frage: string, antwort: string }) => {
    const [offen, setOffen] = useState(false);

    return (
        <div className={`border-b border-gray-100 transition-colors ${offen ? 'border-marke-primaer/20' : ''}`}>
            <button
                className="w-full text-left flex justify-between items-start py-5 gap-4 focus:outline-none group"
                onClick={() => setOffen(!offen)}
            >
                <span className={`font-semibold text-base pr-4 leading-snug transition-colors ${offen ? 'text-marke-sekundaer' : 'text-text-haupt group-hover:text-marke-sekundaer'}`}>
                    {frage}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${offen ? 'bg-marke-sekundaer text-white' : 'bg-hintergrund-alt text-text-neben group-hover:bg-marke-sekundaer/10'}`}>
                    {offen
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />
                    }
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${offen ? 'max-h-64 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                <p className="text-text-neben font-light text-sm leading-relaxed pl-4 border-l-2 border-marke-primaer">
                    {antwort}
                </p>
            </div>
        </div>
    );
};

const Fusszeile = () => {
    return (
        <footer className="bg-white border-t border-gray-100 relative overflow-hidden">

            {/* CTA-Banner */}
            <div className="bg-marke-sekundaer text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-marke-primaer rounded-full blur-[150px] opacity-15 pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-5 drop-shadow-sm">
                        Bereit für einen entspannten Start?
                    </h2>
                    <p className="text-lg text-gray-300 font-light mb-10 max-w-2xl mx-auto">
                        Lass uns deine offenen Fragen klären – 100% kostenlos und ehrlich. Sichere dir jetzt dein Erstgespräch!
                    </p>
                    <a
                        href="#kontakt"
                        className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-white text-marke-sekundaer rounded-xl font-black text-lg hover:bg-marke-highlight transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Unverbindliches Infogespräch
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>

            {/* FAQ */}
            <div id="faq" className="bg-hintergrund-alt py-20 relative z-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-marke-primaer font-bold tracking-widest uppercase mb-3 block text-sm">Alles Wichtige auf einen Blick</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-haupt">
                            Häufig gestellte Fragen
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(2,10,57,0.06)]"
                    >
                        {faqDaten.map((faq, idx) => (
                            <FaqItem key={idx} frage={faq.frage} antwort={faq.antwort} />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Footer-Inhalt */}
            <div className="bg-marke-sekundaer text-white pt-14 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-1"
                        >
                            <a href="#" className="block mb-4 w-fit hover:-translate-y-1 transition-transform">
                                <img src={logo} alt="simply switch Logo" className="h-16 md:h-20 w-auto object-contain brightness-0 invert" />
                            </a>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
                                Sven Kegler – Dein unabhängiger Versicherungsmakler für den optimalen Start ins Beamtenverhältnis. Ehrlich, kostenlos und 100% digital.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h4 className="text-sm font-bold mb-5 text-white tracking-widest uppercase">Schnellzugriff</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                {[
                                    { label: 'Fehler vermeiden', href: '#fehler' },
                                    { label: 'So arbeite ich', href: '#so-arbeite-ich' },
                                    { label: 'Über mich', href: '#ueber-mich' },
                                    { label: 'Kundenlogin', href: 'https://login.simplr.de/#/login' },
                                ].map((link, i) => (
                                    <li key={i}>
                                        <a href={link.href} className="hover:text-white transition-colors flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-marke-primaer/60" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h4 className="text-sm font-bold mb-5 text-white tracking-widest uppercase">Kontakt</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li className="flex items-start gap-3">
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 mt-0.5">
                                        <MapPin className="w-3.5 h-3.5 text-gray-300" />
                                    </div>
                                    <span className="font-light">
                                        Elbtal, Hessen<br />
                                        <span className="text-xs text-gray-500">(Online Beratung deutschlandweit)</span>
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                        <Mail className="w-3.5 h-3.5 text-gray-300" />
                                    </div>
                                    <a href="mailto:info@simply-switch.de" className="hover:text-white transition-colors">
                                        info@simply-switch.de
                                    </a>
                                </li>
                            </ul>
                        </motion.div>

                    </div>

                    <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
                        <p>&copy; {new Date().getFullYear()} simply switch Versicherungsmakler. Alle Rechte vorbehalten.</p>
                        <div className="flex gap-6">
                            <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
                            <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Fusszeile;
