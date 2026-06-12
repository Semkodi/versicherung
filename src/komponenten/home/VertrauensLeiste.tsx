import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, ShieldCheck, Star, Zap } from 'lucide-react';

interface ZaehlerProps {
    ziel: number;
    suffix?: string;
    isDecimal?: boolean;
}

const Zaehler = ({ ziel, suffix = "", isDecimal = false }: ZaehlerProps) => {
    const [wert, setWert] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const istImSichtbereich = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!istImSichtbereich) return;

        let startzeit: number | null = null;
        const dauer = 2000; // 2 Sekunden Animationsdauer

        const schritt = (zeitstempel: number) => {
            if (!startzeit) startzeit = zeitstempel;
            const fortschritt = Math.min((zeitstempel - startzeit) / dauer, 1);
            
            // Easing: easeOutQuad
            const easing = fortschritt * (2 - fortschritt);
            setWert(easing * ziel);

            if (fortschritt < 1) {
                requestAnimationFrame(schritt);
            } else {
                setWert(ziel);
            }
        };

        requestAnimationFrame(schritt);
    }, [istImSichtbereich, ziel]);

    return (
        <span ref={ref}>
            {isDecimal ? wert.toFixed(1) : Math.floor(wert)}
            {suffix}
        </span>
    );
};

const VertrauensLeiste = () => {
    const trustItems = [
        {
            icon: <Users className="w-6 h-6 text-[#94a3b8]" />,
            prefix: "mehr als",
            wert: <Zaehler ziel={873} />,
            text: "Kunden"
        },
        {
            icon: <Zap className="w-6 h-6 text-[#3b82f6]" />,
            prefix: "über",
            wert: <Zaehler ziel={17} suffix=" Jahre" />,
            text: "Erfahrung"
        },
        {
            icon: <Star className="w-6 h-6 text-[#fbbf24]" />,
            prefix: "mehr als",
            wert: <Zaehler ziel={80} />,
            text: "Versicherungspartner"
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-[#10b981]" />,
            prefix: "immer",
            wert: <Zaehler ziel={100} suffix="%" />,
            text: "transparent"
        }
    ];

    return (
        <section className="bg-hintergrund py-12 relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {trustItems.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`flex items-center justify-center gap-4 ${index > 1 ? 'pt-8 md:pt-0' : ''}`}
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-full border border-gray-100 bg-gray-50 group-hover:bg-marke-primaer/5 transition-colors flex items-center justify-center flex-shrink-0">
                                {item.icon}
                            </div>
                            {/* Text-Container im Scholz & Meis Stil */}
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-text-neben font-bold leading-none mb-1">
                                    {item.prefix}
                                </span>
                                <span className="text-2xl md:text-3xl font-black text-marke-primaer leading-tight">
                                    {item.wert}
                                </span>
                                <span className="text-sm font-medium text-text-haupt font-bold leading-none mt-1">
                                    {item.text}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VertrauensLeiste;
