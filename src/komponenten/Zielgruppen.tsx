import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import referendarImg from '../assets/referendar_card_v2.png';
import haushaltImg from '../assets/haushalt_card_v2.png';
import selbststaendigeImg from '../assets/selbststaendige_card_v2.png';

const Zielgruppen = () => {
    const gruppen = [
        {
            titel: "Ich bin Referendar oder bereits Beamter",
            untertitel: "Alles rund um Verbeamtung, PKV, Beihilfe, Dienstunfähigkeit & Altersvorsorge – spezialisiert auf deine Situation.",
            vorteile: [
                "PKV & Beihilfe optimal absichern",
                "Dienstunfähigkeit & Vorsorge",
                "Finanzielle Entscheidungen mit Weitblick"
            ],
            buttonText: "Zur Beamtenberatung",
            image: referendarImg,
            link: "/beamte",
            accentColor: "border-marke-primaer/20",
            buttonBg: "bg-marke-primaer hover:bg-marke-primaer/90"
        },
        {
            titel: "Ich möchte meine Haushaltskosten optimieren",
            untertitel: "Wir analysieren deine Verträge und finden Sparpotenziale – oft mehrere hundert Euro pro Jahr.",
            vorteile: [
                "Kostenlose Analyse deiner Verträge",
                "Ersparnisse von bis zu 1.200 € p.a.",
                "Mehr Geld für das, was wirklich zählt"
            ],
            buttonText: "Jetzt Einsparpotenzial prüfen",
            image: haushaltImg,
            link: "/privatkunden",
            accentColor: "border-marke-sekundaer/20",
            buttonBg: "bg-marke-sekundaer hover:bg-marke-akzent"
        },
        {
            titel: "Ich bin selbstständig oder Unternehmer",
            untertitel: "Exzellente Konzepte für Gründer und Unternehmer. Betriebshaftpflicht, Absicherung und Vorsorge.",
            vorteile: [
                "Gewerbliche Haftpflicht & Sachschutz",
                "Smarte private & betriebliche Vorsorge",
                "Individuelle Risiko- und Bedarfsanalyse"
            ],
            buttonText: "Zur Selbstständigenberatung",
            image: selbststaendigeImg,
            link: "/gewerbekunden",
            accentColor: "border-marke-highlight/20",
            buttonBg: "bg-[#D49E24] hover:bg-[#B7871C]"
        }
    ];

    return (
        <section id="zielgruppen" className="py-24 bg-hintergrund relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-marke-primaer text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Was passt zu dir?</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 text-text-haupt">
                        Wähle deinen Bereich
                    </h2>
                    <p className="text-text-neben text-lg">
                        Damit wir dir die passenden Informationen und Lösungen zeigen können, wähle bitte, was aktuell auf dich zutrifft.
                    </p>
                    <div className="w-16 h-1 bg-marke-primaer mx-auto mt-6 rounded-full" />
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {gruppen.map((gruppe, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className={`group relative bg-white rounded-[2.5rem] shadow-xl border-2 ${gruppe.accentColor} overflow-hidden flex flex-col h-full`}
                        >
                            {/* Card Image Wrapper */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={gruppe.image}
                                    alt={gruppe.titel}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-6 md:p-8 flex-grow flex flex-col">
                                <h3 className="text-xl md:text-2xl font-black mb-4 text-text-haupt text-center min-h-[64px] flex items-center justify-center">
                                    {gruppe.titel}
                                </h3>
                                <p className="text-text-neben text-center mb-6 text-sm flex-grow">
                                    {gruppe.untertitel}
                                </p>

                                {/* Vorteile */}
                                <div className="space-y-3 mb-10">
                                    {gruppe.vorteile.map((vorteil, vIdx) => (
                                        <div key={vIdx} className="flex items-center gap-3">
                                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${idx === 0 ? 'text-marke-primaer' : idx === 1 ? 'text-marke-sekundaer' : 'text-marke-highlight'}`} />
                                            <span className="text-text-haupt font-medium text-xs">{vorteil}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Button */}
                                <div className="mt-auto">
                                    <a
                                        href={gruppe.link}
                                        className={`flex items-center justify-between w-full h-14 px-6 ${gruppe.buttonBg} text-white rounded-2xl font-bold transition-all duration-300 group/btn text-sm`}
                                    >
                                        <span>{gruppe.buttonText}</span>
                                        <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Badges */}
                <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 text-text-neben font-medium text-sm">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-marke-primaer" />
                        Unabhängige Beratung
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-marke-primaer" />
                        Deutschlandweit digital
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-marke-primaer" />
                        Persönlich & auf Augenhöhe
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-marke-primaer" />
                        Schnell, einfach & verständlich
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Zielgruppen;
