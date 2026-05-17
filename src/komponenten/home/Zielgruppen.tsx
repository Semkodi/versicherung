import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import referendarImg       from '../../assets/bilder/referendar_card_v2.png';
import haushaltImg         from '../../assets/bilder/haushalt_card_v2.png';
import selbststaendigeImg  from '../../assets/bilder/selbststaendige_card_v2.png';

const Zielgruppen = () => {
    const gruppen = [
        {
            titel: "Beamte & Referendare",
            untertitel: "Spezielle Tarife, die perfekt zu deinem Status passen – für heute und morgen.",
            vorteile: [
                "Private Krankenversicherung",
                "Beihilfe & Heilfürsorge",
                "Dienstunfähigkeitsversicherung",
                "Absicherung im Referendariat"
            ],
            image: referendarImg,
            link: "/beamte",
        },
        {
            titel: "Privatkunden & Familien",
            untertitel: "Schutz für dich und deine Liebsten – maßgeschneidert und bezahlbar.",
            vorteile: [
                "Privathaftpflichtversicherung",
                "Hausrat- & Wohngebäudeversicherung",
                "Risikolebensversicherung",
                "Unfallversicherung"
            ],
            image: haushaltImg,
            link: "/privatkunden",
        },
        {
            titel: "Selbstständige & Freiberufler",
            untertitel: "Deine Absicherung für ein sorgenfreies unternehmerisches Handeln.",
            vorteile: [
                "Berufsunfähigkeitsversicherung",
                "Betriebliche Altersvorsorge",
                "Haftpflichtversicherung",
                "Rechtsschutzversicherung"
            ],
            image: selbststaendigeImg,
            link: "/gewerbekunden",
        }
    ];

    return (
        <section id="zielgruppen" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-[2.5rem] font-extrabold mb-4 text-[#0a1930]">
                        Für wen wir da sind
                    </h2>
                    <p className="text-[#4a5568] text-lg font-medium">
                        Individuelle Lösungen für deine Lebenssituation.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {gruppen.map((gruppe, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, scale: 1.03 }}
                            viewport={{ once: true }}
                            transition={{ 
                                y: { type: "spring", stiffness: 300, damping: 20 },
                                scale: { type: "spring", stiffness: 300, damping: 20 },
                                default: { duration: 0.6, ease: "easeOut" }
                            }}
                            className="group relative bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-300"
                        >
                            {/* Card Image */}
                            <Link to={gruppe.link} className="relative h-56 overflow-hidden block">
                                <img
                                    src={gruppe.image}
                                    alt={gruppe.titel}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-112 cursor-pointer"
                                />
                            </Link>

                            {/* Card Content */}
                            <div className="p-8 flex-grow flex flex-col">
                                <h3 className="text-2xl font-extrabold mb-3 text-[#0a1930]">
                                    {gruppe.titel}
                                </h3>
                                <p className="text-[#4a5568] mb-8 text-sm leading-relaxed">
                                    {gruppe.untertitel}
                                </p>

                                {/* Vorteile */}
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {gruppe.vorteile.map((vorteil, vIdx) => (
                                        <li key={vIdx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-[#1e5adb] flex-shrink-0 mt-0.5" />
                                            <span className="text-[#2d3748] text-sm font-medium">{vorteil}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Action Button */}
                                <div className="mt-auto">
                                    <Link
                                        to={gruppe.link}
                                        className="inline-flex items-center gap-2 text-[#1e5adb] font-bold hover:text-[#152a4f] transition-colors group/btn"
                                    >
                                        Mehr erfahren
                                        <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Zielgruppen;
