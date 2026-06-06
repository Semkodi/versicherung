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
            icon: <Star className="w-6 h-6 text-[#fbbf24]" />,
            wert: <Zaehler ziel={4.9} isDecimal={true} />,
            text: "Kundenbewertung"
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-[#10b981]" />,
            wert: <Zaehler ziel={100} suffix="%" />,
            text: "unabhängig"
        },
        {
            icon: <Zap className="w-6 h-6 text-[#3b82f6]" />,
            wert: "Schnell",
            text: "& digital"
        },
        {
            icon: <Users className="w-6 h-6 text-[#94a3b8]" />,
            wert: <Zaehler ziel={873} suffix="+" />,
            text: "Kunden vertrauen uns"
        }
    ];

    return (
        <section className="bg-[#0a1930] py-12 relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {trustItems.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`flex items-center justify-center ${index > 1 ? 'pt-8 md:pt-0' : ''}`}
                        >
                            {/* Kontinuierliche Schwebeladung (Anti-Gravity Effekt) */}
                            <motion.div
                                className="flex items-center gap-4"
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                    duration: 4 + index * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.2
                                }}
                            >
                                {/* Pulsierendes Icon-Design */}
                                <motion.div 
                                    className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0"
                                    animate={{ 
                                        scale: [1, 1.05, 1],
                                        borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0.1)"]
                                    }}
                                    transition={{
                                        duration: 3 + index * 0.6,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {item.icon}
                                </motion.div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-extrabold text-white leading-tight">
                                        {item.wert}
                                    </span>
                                    <span className="text-sm font-medium text-white/80">
                                        {item.text}
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VertrauensLeiste;
