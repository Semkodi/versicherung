import { motion } from 'framer-motion';
import { Calendar, FileText, Send, Check } from 'lucide-react';

const SoArbeiteIch = () => {
    const schritte = [
        {
            zahl: "1",
            titel: "Strategiegespräch",
            text: "Hier erhältst du alle wichtigen Infos rundum die bevorstehende Verbeamtung und worauf du achten solltest. Im Strategiegespräch zeige ich dir deine Versorgungslücken auf und wir besprechen deine Wünsche. Das Gespräch findet locker online per Videocall statt.",
            icon: <Calendar className="w-5 h-5 text-white" />
        },
        {
            zahl: "2",
            titel: "Konzeptvorstellung",
            text: "Angepasst an deine Wünsche, suche ich nach der besten Absicherung und Vorsorge für dich. Ich erstelle dir ein individuelles Konzept, welches nur auf dich abgestimmt ist. Das Komplettpaket stelle ich dir vor und beantworte alle deine Fragen.",
            icon: <FileText className="w-5 h-5 text-white" />
        },
        {
            zahl: "3",
            titel: "Beantragung",
            text: "Lass dir Zeit! Bist du mit dem Konzept zufrieden, kümmere ich mich darum, alles für dich zu beantragen. Ich brauche dafür nur deine schriftliche Zustimmung, sonst musst du dich um nichts kümmern. Die komplette Übersicht hast du dann bequem per App im Blick.",
            icon: <Send className="w-5 h-5 text-white" />
        }
    ];

    return (
        <section id="so-arbeite-ich" className="py-24 bg-hintergrund-alt relative overflow-hidden">
            {/* Subtiler Hintergrund */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(2,83,238,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(2,83,238,0.025)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_50%,transparent_100%)]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* Linke Seite – Prozess-Schritte */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-marke-primaer text-sm font-bold tracking-widest uppercase mb-3 block">Einfach & Stressfrei</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-text-haupt leading-tight">
                            So kannst du<br />
                            <span className="text-marke-primaer">mit mir arbeiten</span>
                        </h2>
                        <p className="text-text-neben text-lg font-light mb-12 leading-relaxed">
                            Rundum abgesichert ins Beamtentum starten – in nur drei einfachen Schritten. Ohne viel Bürokratie, ohne Stress.
                        </p>

                        <div className="space-y-8">
                            {schritte.map((schritt, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="relative flex gap-6 group"
                                >
                                    {/* Verbindungslinie */}
                                    {idx !== schritte.length - 1 && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: "4rem" }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.2 + 0.3, duration: 0.5 }}
                                            className="absolute left-[1.375rem] top-14 w-px bg-gradient-to-b from-marke-primaer/30 to-transparent"
                                        />
                                    )}

                                    {/* Kreis mit Nummer */}
                                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-marke-sekundaer flex items-center justify-center shadow-[0_0_0_4px_rgba(2,10,57,0.1)] group-hover:shadow-[0_0_0_6px_rgba(2,10,57,0.15)] transition-all z-10">
                                        <span className="text-white font-black text-sm">{schritt.zahl}</span>
                                    </div>

                                    {/* Inhalt */}
                                    <div className="pb-2">
                                        <h3 className="text-xl font-bold text-text-haupt mb-2 group-hover:text-marke-primaer transition-colors">{schritt.titel}</h3>
                                        <p className="text-text-neben font-light leading-relaxed text-sm">{schritt.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Rechte Seite – App-Vorschau-Box */}
                    <div className="lg:sticky lg:top-28">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-marke-sekundaer rounded-3xl p-8 md:p-10 text-white shadow-[0_30px_80px_rgba(2,10,57,0.3)] relative overflow-hidden"
                        >
                            {/* Glow-Effekt */}
                            <div className="absolute -right-16 -top-16 w-64 h-64 bg-marke-primaer rounded-full blur-[100px] opacity-20" />
                            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-marke-primaer rounded-full blur-[80px] opacity-10" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 bg-marke-highlight/20 border border-marke-highlight/30 px-4 py-2 rounded-full mb-6">
                                    <span className="w-2 h-2 rounded-full bg-marke-highlight animate-pulse" />
                                    <span className="text-marke-highlight text-sm font-bold tracking-wider uppercase">Kostenloses Extra</span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                                    Alle Verträge übersichtlich<br />
                                    <span className="text-marke-highlight">in einer App</span>
                                </h3>

                                <p className="text-gray-300 mb-8 text-sm font-light leading-relaxed">
                                    Einen Überblick über alle abgeschlossenen Verträge und Dokumente, wie z.B. deine Krankenversicherung oder Diensthaftpflichtversicherung, hast du komplett kostenlos und ganz bequem per App.
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {['Kostenlose App-Nutzung', 'Zentraler Dokumenten-Speicher', 'Digitaler Kundenservice', 'Beantragung per Knopfdruck'].map((feat, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + (i * 0.1) }}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="w-5 h-5 rounded-full bg-marke-highlight/20 border border-marke-highlight/40 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-marke-highlight" />
                                            </span>
                                            <span className="text-sm text-gray-200">{feat}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <a
                                    href="https://login.simplr.de/#/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center py-3.5 bg-white text-marke-sekundaer rounded-xl font-black text-base transition-all hover:bg-marke-highlight hover:text-marke-sekundaer shadow-lg hover:-translate-y-1"
                                >
                                    Zum Kundenlogin
                                </a>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SoArbeiteIch;
