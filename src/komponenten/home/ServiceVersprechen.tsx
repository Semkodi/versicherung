import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Coins, HeartHandshake } from 'lucide-react';

const ServiceVersprechen = () => {
    const versprechen = [
        {
            icon: Coins,
            titel: "100% Kostenfrei-Garantie",
            beschreibung: "Unsere persönliche Beratung und die Tarifvergleiche sind und bleiben für dich vollkommen kostenlos. Wir finanzieren uns rein über Courtagen der Gesellschaften."
        },
        {
            icon: Clock,
            titel: "24h-Reaktions-Garantie",
            beschreibung: "Wir lassen dich nicht warten. Auf jede Nachricht oder Anfrage erhältst du innerhalb von maximal 24 Stunden (an Werktagen) eine qualifizierte Rückmeldung."
        },
        {
            icon: ShieldCheck,
            titel: "Transparenz-Garantie",
            beschreibung: "Als freie Makler sind wir an keine Versicherungsgesellschaft gebunden. Wir vergleichen neutral über 160 Anbieter und vertreten ausschließlich deine Interessen."
        },
        {
            icon: HeartHandshake,
            titel: "Schadenshilfe-Versprechen",
            beschreibung: "Im Ernstfall kämpfen wir an deiner Seite. Wir übernehmen die lästige Kommunikation mit dem Versicherer und setzen uns persönlich für deine schnelle Auszahlung ein."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-[#f8f9fc] relative overflow-hidden border-b border-[#e2e8f0]">
            {/* Soft decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1e5adb]/3 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-[#1e5adb] font-extrabold text-xs uppercase tracking-widest block mb-3">Sven Keglers Garantien</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a1930] tracking-tight mb-6">
                        Unser Serviceversprechen an dich
                    </h2>
                    <p className="text-[#4a5568] text-lg font-normal">
                        Ehrliche Beratung braucht ein festes Fundament. Bei uns stehst du als Mensch im Mittelpunkt – abgesichert durch vier glasklare Garantien.
                    </p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {versprechen.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="bg-white/80 backdrop-blur-md border border-white/40 p-8 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-gray-200/50 transition-all duration-300 flex flex-col items-start"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#e8effd] flex items-center justify-center mb-6 shadow-sm border border-[#d1e0f9]/30">
                                <item.icon className="w-6 h-6 text-[#1e5adb]" />
                            </div>
                            <h3 className="font-extrabold text-lg text-[#0a1930] mb-3 leading-snug">
                                {item.titel}
                            </h3>
                            <p className="text-sm text-[#4a5568] leading-relaxed font-normal">
                                {item.beschreibung}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ServiceVersprechen;
