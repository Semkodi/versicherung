import { motion } from 'framer-motion';

const PartnerLeiste = () => {
    const partner = [
        "Allianz",
        "AXA",
        "VHV Versicherungen",
        "Alte Leipziger",
        "Nürnberger",
        "Barmenia",
        "Canada Life",
        "R+V Versicherung",
        "Signal Iduna",
        "Zurich",
        "Mannheimer",
        "ADAC Autoversicherung",
        "NRV Rechtsschutz",
        "Rhion",
        "Roland Rechtsschutz"
    ];

    // Doppelte Liste für nahtloses unendliches Scrollen
    const scrollingPartner = [...partner, ...partner];

    return (
        <section id="partner" className="py-20 bg-hintergrund-alt relative overflow-hidden border-b border-[#e2e8f0]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 mb-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#0a1930]">
                        Unabhängige Partnerauswahl
                    </h2>
                    <p className="text-[#4a5568] text-base md:text-lg leading-relaxed font-normal">
                        Ich bin an keine einzelne Versicherungsgesellschaft gebunden. Daher unterliege ich keinen Vertriebsvorgaben und kann dir eine vollkommen neutrale und bedarfsgerechte Beratung anbieten. Hier ist eine Auswahl der Partner, deren Tarife ich vergleiche:
                    </p>
                </div>
            </div>

            {/* Premium Endlos-Marquee */}
            <div className="relative w-full overflow-hidden py-4 bg-white border-y border-gray-100 flex items-center shadow-[inset_0_4px_12px_rgba(0,0,0,0.02)]">
                {/* Weicher Fade-Effekt links und rechts */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-hintergrund-alt to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-hintergrund-alt to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-8 md:gap-16 whitespace-nowrap shrink-0"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35,
                            ease: "linear"
                        }
                    }}
                >
                    {scrollingPartner.map((name, idx) => (
                        <div
                            key={idx}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-[#f8f9fc] border border-gray-100 text-[#0a1930] font-black text-sm md:text-base tracking-wide shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-default"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-[#1e5adb] mr-3 animate-pulse" />
                            {name}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PartnerLeiste;
