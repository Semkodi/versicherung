import { motion } from 'framer-motion';

// Versicherungspartner mit echten Markenfarben als stilisierte Premium-Badges
const partnerLogos: { name: string; kuerzel: string; farbe: string; hintergrund: string }[] = [
    { name: 'Allianz',          kuerzel: 'AZ',  farbe: '#003781', hintergrund: '#e8eef7' },
    { name: 'AXA',              kuerzel: 'AXA', farbe: '#00008F', hintergrund: '#e6e6f7' },
    { name: 'VHV',              kuerzel: 'VHV', farbe: '#B50B0B', hintergrund: '#f7e6e6' },
    { name: 'Alte Leipziger',   kuerzel: 'AL',  farbe: '#004A97', hintergrund: '#e6eef8' },
    { name: 'Nürnberger',       kuerzel: 'NB',  farbe: '#C8102E', hintergrund: '#f8e7ea' },
    { name: 'Barmenia',         kuerzel: 'BA',  farbe: '#005CA9', hintergrund: '#e6eef8' },
    { name: 'Canada Life',      kuerzel: 'CL',  farbe: '#E31E24', hintergrund: '#fce8e8' },
    { name: 'R+V Versicherung', kuerzel: 'R+V', farbe: '#004A96', hintergrund: '#e6eef8' },
    { name: 'Signal Iduna',     kuerzel: 'SI',  farbe: '#E5001B', hintergrund: '#fce6e9' },
    { name: 'Zurich',           kuerzel: 'ZU',  farbe: '#003399', hintergrund: '#e6ebf7' },
    { name: 'Mannheimer',       kuerzel: 'MA',  farbe: '#003C71', hintergrund: '#e6edf6' },
    { name: 'ADAC',             kuerzel: 'AC',  farbe: '#1A1A1A', hintergrund: '#FFF200' },
    { name: 'NRV',              kuerzel: 'NRV', farbe: '#00539F', hintergrund: '#e6eef8' },
    { name: 'Rhion',            kuerzel: 'RH',  farbe: '#E2001A', hintergrund: '#fce6e8' },
    { name: 'Roland',           kuerzel: 'RO',  farbe: '#004B8D', hintergrund: '#e6eef8' },
];

const PartnerLeiste = () => {
    // Dreifache Liste für komplett nahtloses Scrollen
    const scrollingPartner = [...partnerLogos, ...partnerLogos, ...partnerLogos];

    return (
        <section id="partner" className="py-20 bg-hintergrund-alt relative overflow-hidden border-b border-[#e2e8f0]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 mb-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#0a1930]">
                        Transparente Partnerauswahl
                    </h2>
                    <p className="text-[#4a5568] text-base md:text-lg leading-relaxed font-normal">
                        Ich bin an keine einzelne Versicherungsgesellschaft gebunden. Daher unterliege ich keinen
                        Vertriebsvorgaben und kann dir eine vollkommen neutrale und bedarfsgerechte Beratung anbieten.
                        Hier ist eine Auswahl der Partner, deren Tarife ich vergleiche:
                    </p>
                </div>
            </div>

            {/* Premium Endlos-Marquee */}
            <div className="relative w-full overflow-hidden py-6 bg-white border-y border-gray-100 shadow-[inset_0_4px_12px_rgba(0,0,0,0.02)]">
                {/* Fade-Ränder */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex items-center gap-5 md:gap-8 whitespace-nowrap shrink-0"
                    animate={{ x: [0, `-${(100 / 3).toFixed(4)}%`] }}
                    transition={{
                        x: { repeat: Infinity, repeatType: 'loop', duration: 45, ease: 'linear' },
                    }}
                >
                    {scrollingPartner.map((partner, idx) => (
                        <div
                            key={idx}
                            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all cursor-default flex-shrink-0 hover:scale-105"
                            style={{
                                backgroundColor: `${partner.hintergrund}`,
                                borderColor: `${partner.farbe}30`,
                                boxShadow: `0 2px 8px ${partner.farbe}15`,
                            }}
                        >
                            {/* Marken-Kürzel-Badge */}
                            <span
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight flex-shrink-0"
                                style={{ backgroundColor: partner.farbe, color: partner.farbe === '#1A1A1A' ? '#FFF200' : '#ffffff' }}
                            >
                                {partner.kuerzel}
                            </span>
                            {/* PartnerName */}
                            <span
                                className="font-bold text-sm md:text-base whitespace-nowrap"
                                style={{ color: partner.farbe }}
                            >
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PartnerLeiste;
