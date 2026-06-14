import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { ScrollReveal } from '@/komponenten/layout';

type FAQItem = {
    frage: string;
    antwort: string;
};

const FAQ = () => {
    const [offenesFAQ, setOffenesFAQ] = useState<number | null>(null);

    const fragen: FAQItem[] = [
        {
            frage: "Was zeichnet Sven Kegler als Versicherungsmakler aus?",
            antwort: "Als freier und transparenter Versicherungsmakler bin ich an keinerlei bestimmte Versicherungsgesellschaft gebunden. Ich vertrete ausschließlich deine Interessen und filtere aus dem gesamten deutschen Markt die objektiv besten Tarife heraus. Mein Fokus liegt auf Transparenz, ehrlicher Beratung und dauerhafter Betreuung."
        },
        {
            frage: "Entstehen für mich Kosten durch die Beratung?",
            antwort: "Nein, meine Beratung und die Tarifvergleiche sind für dich vollkommen kostenlos. Im Falle eines erfolgreichen Abschlusses erhalte ich eine Vergütung (Courtage) direkt vom jeweiligen Versicherer. Für dich gibt es keinerlei Aufpreis gegenüber einem Direktabschluss bei der Gesellschaft."
        },
        {
            frage: "Wie läuft der Wechsel oder die Optimierung bestehender Verträge ab?",
            antwort: "Völlig stressfrei! Wir analysieren deine aktuellen Verträge per Video-Call, Telefon oder persönlich. Wir decken gefährliche Leistungslücken auf und sortieren unnötige, überteuerte Policen aus. Den gesamten lästigen Papierkram und die Kündigungen übernehmen wir komplett für dich."
        },
        {
            frage: "Welche Versicherungen brauche ich als Privatperson oder Selbstständiger wirklich?",
            antwort: "Absolut unverzichtbar ist die Privathaftpflichtversicherung (bzw. die Betriebshaftpflicht für Gewerbe), da du gesetzlich unbegrenzt haftest. Ebenso existenziell wichtig ist die Absicherung deiner Arbeitskraft (Dienstunfähigkeit oder Berufsunfähigkeit). Alle weiteren Bausteine passen wir präzise an deine Lebensphase an."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOffenesFAQ(offenesFAQ === index ? null : index);
    };

    return (
        <section id="faq" className="py-28 bg-white relative border-b border-[#e2e8f0] scroll-mt-20">
            {/* Deko-Elemente im Hintergrund */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#1e5adb]/2 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e5adb]/3 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#e8effd] rounded-xl mb-4 border border-[#d1e0f9]">
                        <HelpCircle className="w-6 h-6 text-[#1e5adb]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#0a1930]">
                        Häufige Fragen (FAQs)
                    </h2>
                    <p className="text-[#4a5568] font-normal max-w-lg mx-auto">
                        Alles, was du zur transparenten Beratung und Absicherung wissen musst – einfach erklärt.
                    </p>
                </div>

                <div className="space-y-4">
                    {fragen.map((faq, index) => {
                        const istOffen = offenesFAQ === index;
                        return (
                            <ScrollReveal key={index} direction="up" delay={index * 0.05}>
                                <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden hover:border-gray-300 transition-colors shadow-sm">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-bold text-[#0a1930] hover:text-[#1e5adb] transition-colors cursor-pointer"
                                        aria-expanded={istOffen}
                                    >
                                        <span className="text-sm md:text-base font-semibold">{faq.frage}</span>
                                        <motion.div
                                            animate={{ rotate: istOffen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-[#718096] flex-shrink-0"
                                        >
                                            <ChevronDown className="w-5 h-5" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {istOffen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-6 pb-6 text-xs md:text-sm text-[#4a5568] font-normal leading-relaxed border-t border-[#e2e8f0] pt-4 bg-[#f8f9fc]">
                                                    {faq.antwort}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
