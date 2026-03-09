import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { CheckCircle2, TrendingUp, ShieldAlert, GraduationCap } from 'lucide-react';

const TiltCard = ({ children, gradient, idx }: { children: React.ReactNode, gradient: string, idx: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);

    // Maus-Tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(springY, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-12deg", "12deg"]);

    const glowX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);
    const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(2,83,238,0.2), transparent 80%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        setHovering(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="group relative bg-[#020A39] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_100px_rgba(2,83,238,0.3)] transition-all duration-500 h-full border border-white/5"
        >
            <div className={`h-2 w-full bg-gradient-to-r ${gradient} relative`}>
                <div className={`absolute inset-0 blur-lg bg-gradient-to-r ${gradient} opacity-50`} />
            </div>

            <div className="p-8 md:p-10 relative z-10 h-full flex flex-col">
                <motion.div
                    style={{ background: glowBackground, opacity: hovering ? 1 : 0 }}
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[2.5rem]"
                />

                <div className="relative z-10 flex flex-col h-full">
                    {children}
                </div>
            </div>

            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
        </motion.div>
    );
};

const Zielgruppen = () => {
    const gruppen = [
        {
            titel: "Lehramt & Referendariat",
            icon: <GraduationCap className="w-8 h-8 text-white" />,
            farbe: "from-marke-primaer to-marke-akzent",
            text: "Du stehst vor dem Ref. oder im Studium? Die erste Beihilfe, die richtige PKV und die Absicherung der Dienstunfähigkeit als Lehrer sind essenziell."
        },
        {
            titel: "Polizei & Justiz",
            icon: <ShieldAlert className="w-8 h-8 text-white" />,
            farbe: "from-[#1a3a8f] to-marke-sekundaer",
            text: "Hohes Risiko im Dienst. Als Polizeianwärter brauchst du eine spezielle Vollzugsdienstunfähigkeitsklausel und die Freie Heilfürsorge."
        },
        {
            titel: "Verwaltung & Finanzen",
            icon: <TrendingUp className="w-8 h-8 text-white" />,
            farbe: "from-marke-akzent to-marke-sekundaer",
            text: "Ob Verwaltungswirt oder Finanzamt. Auch hier ist die Auswahl der passenden Beihilfe-Ergänzungstarife und die frühzeitige Schließung von Pensionslücken wichtig."
        }
    ];

    return (
        <section id="zielgruppen" className="py-24 bg-hintergrund relative overflow-hidden perspective-2000">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-marke-primaer text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Maßgeschneiderte Beratung</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 text-text-haupt leading-tight">
                        Absicherungen, die<br />
                        <span className="text-marke-primaer">genau zu dir passen</span>
                    </h2>
                    <p className="text-text-neben text-lg font-light leading-relaxed">
                        Nicht jeder Beamte hat denselben Bedarf. Jede Laufbahn benötigt vollkommen unterschiedliche Klauseln in den Verträgen.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {gruppen.map((gruppe, idx) => (
                        <TiltCard key={idx} gradient={gruppe.farbe} idx={idx}>
                            <motion.div
                                style={{ transform: "translateZ(80px)" }}
                                className={`mb-8 inline-flex p-5 rounded-2xl bg-gradient-to-br ${gruppe.farbe} shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500`}
                            >
                                {gruppe.icon}
                            </motion.div>

                            <motion.h3
                                style={{ transform: "translateZ(50px)" }}
                                className="text-2xl font-bold mb-4 text-white"
                            >
                                {gruppe.titel}
                            </motion.h3>

                            <motion.p
                                style={{ transform: "translateZ(30px)" }}
                                className="text-gray-300 leading-relaxed font-light text-sm mb-8"
                            >
                                {gruppe.text}
                            </motion.p>

                            <motion.div
                                style={{ transform: "translateZ(40px)" }}
                                className="space-y-3 border-t border-white/10 pt-6 mt-auto"
                            >
                                {['Abgestimmte DU-Klausel', 'Beihilfe-Konforme PKV'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-marke-highlight flex-shrink-0" />
                                        <span className="text-sm text-gray-200 font-medium">{item}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Zielgruppen;
