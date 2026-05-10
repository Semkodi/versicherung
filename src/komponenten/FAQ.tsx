import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQItem = ({ frage, antwort, idx }: { frage: string, antwort: string, idx: number }) => {
    const [offen, setOffen] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="mb-4"
        >
            <button 
                onClick={() => setOffen(!offen)}
                className={`w-full flex justify-between items-center p-6 rounded-2xl transition-all duration-300 text-left ${
                    offen ? 'bg-marke-primaer text-white shadow-xl' : 'bg-white/5 text-text-haupt hover:bg-white/10'
                }`}
            >
                <span className="font-bold pr-8">{frage}</span>
                {offen ? <Minus className="w-5 h-5 flex-shrink-0" /> : <Plus className="w-5 h-5 flex-shrink-0 text-marke-highlight" />}
            </button>
            <AnimatePresence>
                {offen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 text-text-neben leading-relaxed text-sm">
                            {antwort}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    const fragen = [
        {
            frage: "Was ist der Unterschied zwischen Berufs- und Dienstunfähigkeit?",
            antwort: "Das ist die wichtigste Frage für Beamte! Eine Berufsunfähigkeitsversicherung (BU) zahlt, wenn du deinen Beruf nicht mehr ausüben kannst. Eine Dienstunfähigkeit (DU) zahlt erst, wenn der Dienstherr dich für dienstunfähig erklärt. Ohne die 'echte Dienstunfähigkeitsklausel' in deinem Vertrag zahlt die Versicherung oft nicht, selbst wenn du nicht mehr arbeiten darfst."
        },
        {
            frage: "Warum brauche ich eine private Krankenversicherung (PKV)?",
            antwort: "Beamte erhalten Beihilfe vom Dienstherrn (meist 50-70%). Die restlichen Kosten müssen privat abgesichert werden. In der gesetzlichen Krankenversicherung (GKV) müsstest du den vollen Beitrag (Arbeitnehmer + Arbeitgeberanteil) selbst zahlen, was meist deutlich teurer und leistungsschwächer ist."
        },
        {
            frage: "Kostet die Beratung etwas?",
            antwort: "Nein. Meine Beratung ist für dich komplett kostenlos. Ich werde von den Versicherungsgesellschaften vergütet, falls es zu einem Abschluss kommt. Für dich entstehen keine Mehrkosten gegenüber einem Direktabschluss – aber du erhältst meine Expertise und Unterstützung."
        },
        {
            frage: "Ab wann sollte ich mich um meine Versicherungen kümmern?",
            antwort: "Am besten schon vor dem Referendariat oder dem Start ins Beamtenverhältnis. Je früher du startest, desto niedriger sind meist die Beiträge (wegen des Eintrittsalters) und desto einfacher ist die Gesundheitsprüfung."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-hintergrund relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-marke-primaer/10 rounded-full mb-4">
                        <HelpCircle className="w-4 h-4 text-marke-primaer" />
                        <span className="text-marke-primaer text-xs font-bold uppercase tracking-widest">Wissensdatenbank</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-text-haupt leading-tight">
                        Häufig gestellte <span className="text-marke-primaer">Fragen</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {fragen.map((f, idx) => (
                        <FAQItem key={idx} {...f} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
