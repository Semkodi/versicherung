import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { AlertTriangle, TrendingDown, Clock, ShieldAlert, Sparkles } from 'lucide-react';

const FehlerCard = ({ icon: Icon, titel, text, idx }: { icon: any, titel: string, text: string, idx: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);

    // Maus-Tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Sanfte Federn
    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    // Rotationen
    const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Glow Position
    const glowX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);
    const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(2,83,238,0.25), transparent 70%)`;

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const onMouseLeave = () => {
        setHovering(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="perspective-2000 relative group h-full"
        >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 h-full transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                {/* Dynamischer Glow */}
                <motion.div
                    style={{ background: glowBackground, opacity: hovering ? 1 : 0 }}
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                />

                <div className="relative z-10">
                    <motion.div
                        style={{ transform: "translateZ(40px)" }}
                        className="w-14 h-14 bg-marke-primaer/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner"
                    >
                        <Icon className="w-7 h-7 text-marke-primaer" />
                    </motion.div>

                    <motion.h3
                        style={{ transform: "translateZ(30px)" }}
                        className="text-xl font-extrabold text-white mb-4 group-hover:text-marke-highlight transition-colors"
                    >
                        {titel}
                    </motion.h3>

                    <motion.p
                        style={{ transform: "translateZ(20px)" }}
                        className="text-gray-400 text-sm leading-relaxed font-light"
                    >
                        {text}
                    </motion.p>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-4 h-4 text-marke-highlight animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
};

const FehlerBereich = () => {
    const fehler = [
        {
            icon: AlertTriangle,
            titel: "Falscher Krankenversicherungstarif",
            text: "Viele wählen Tarife, die im Alter unbezahlbar werden oder wichtige Leistungen für Beamte nicht enthalten. Wir zeigen dir, wie du stabil bleibst."
        },
        {
            icon: TrendingDown,
            titel: "Fehlende Dienstunfähigkeitsklausel",
            text: "Eine normale Berufsunfähigkeitsversicherung bringt dir als Beamter nichts. Ohne die spezielle Dienstunfähigkeitsklausel riskierst du deine Existenz."
        },
        {
            icon: Clock,
            titel: "Zu später Start beim Sparen",
            text: "Beamte haben tolle Vorteile – aber nur, wer früh startet, nutzt den Zinseszins voll aus. Warte nicht bis zur Verbeamtung auf Lebenszeit."
        },
        {
            icon: ShieldAlert,
            titel: "Unwissenheit bei der Beihilfe",
            text: "Die Beihilfe ist komplex. Wer seine Lücken nicht kennt, bleibt im Krankheitsfall auf tausenden Euro Kosten sitzen. Wir schließen diese Lücken."
        },
        {
            icon: Sparkles,
            titel: "Keine Nutzung von Förderungen",
            text: "Der Staat schenkt dir Geld für deine Vorsorge. Viele Beamte verschenken diese Förderungen aus reiner Unkenntnis. Wir holen sie für dich zurück."
        }
    ];

    return (
        <section id="fehler" className="py-24 bg-marke-sekundaer relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-marke-primaer rounded-full blur-[150px] opacity-10" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-marke-primaer rounded-full blur-[130px] opacity-10" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-marke-highlight text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Gefahren im Check</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                        Vermeide diese <span className="text-marke-highlight">5 kritischen Fehler</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light">
                        Ein falscher Haken kann dich im Laufe deines Lebens hunderttausende Euro kosten. Ich zeige dir, wie du es von Anfang an richtig machst.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fehler.map((f, idx) => (
                        <FehlerCard key={idx} {...f} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FehlerBereich;
