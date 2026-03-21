import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import lehramtImg from '../assets/lehramt_3d.png';
import polizeiImg from '../assets/polizei_3d.png';
import verwaltungImg from '../assets/verwaltung_3d.png';

const TiltCard = ({ children, gradient, idx }: { children: React.ReactNode, gradient: string, idx: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);

    // Maus-Tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

    const glowX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);
    const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.06), transparent 70%)`;

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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.8 }}
            className="group relative bg-[#020A39] rounded-[2.5rem] shadow-[0_15px_40px_rgba(2,10,57,0.2)] hover:shadow-[0_30px_80px_rgba(2,83,238,0.3)] transition-shadow duration-500 h-full border border-white/5 overflow-hidden"
        >
            <div className={`absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br ${gradient} rounded-full blur-[50px] opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />
            <div className={`h-1.5 w-full bg-gradient-to-r ${gradient} relative rounded-t-[2.5rem] z-20`} />

            <div className="p-8 md:p-10 relative z-20 h-full flex flex-col pt-10">
                <motion.div
                    style={{ background: glowBackground, opacity: hovering ? 1 : 0 }}
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[2.5rem]"
                />

                <div className="relative z-10 flex flex-col h-full transform-style-3d">
                    {children}
                </div>
            </div>
            
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px] mix-blend-screen rounded-[2.5rem] z-10" />
        </motion.div>
    );
};

const Zielgruppen = () => {
    const gruppen = [
        {
            titel: "Lehramt & Referendariat",
            icon: (
                <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 border border-white/10 group-hover:border-white/20">
                    <img src={lehramtImg} alt="Lehramt 3D Icon" className="w-full h-full object-cover" />
                </div>
            ),
            farbe: "from-marke-primaer to-marke-akzent",
            text: "Du stehst vor dem Ref. oder im Studium? Die erste Beihilfe, die richtige PKV und die Absicherung der Dienstunfähigkeit als Lehrer sind essenziell."
        },
        {
            titel: "Polizei & Justiz",
            icon: (
                <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 border border-white/10 group-hover:border-white/20">
                    <img src={polizeiImg} alt="Polizei 3D Icon" className="w-full h-full object-cover" />
                </div>
            ),
            farbe: "from-marke-sekundaer to-[#0B154D]",
            text: "Hohes Risiko im Dienst. Als Polizeianwärter brauchst du eine spezielle Vollzugsdienstunfähigkeitsklausel und die Freie Heilfürsorge."
        },
        {
            titel: "Verwaltung & Finanzen",
            icon: (
                <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 border border-white/10 group-hover:border-white/20">
                    <img src={verwaltungImg} alt="Verwaltung 3D Icon" className="w-full h-full object-cover" />
                </div>
            ),
            farbe: "from-marke-highlight to-[#CCA000]",
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
                                className="relative mb-10 w-32 h-32 md:w-40 md:h-40 mx-auto"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${gruppe.farbe} rounded-[2rem] blur-[30px] opacity-30 group-hover:opacity-60 transition-all duration-700`} />
                                {gruppe.icon}
                            </motion.div>

                            <motion.h3
                                style={{ transform: "translateZ(50px)" }}
                                className="text-2xl font-black mb-4 text-white tracking-tight"
                            >
                                {gruppe.titel}
                            </motion.h3>

                            <motion.p
                                style={{ transform: "translateZ(30px)" }}
                                className="text-gray-300 leading-relaxed font-light text-sm mb-12"
                            >
                                {gruppe.text}
                            </motion.p>

                            <motion.div
                                style={{ transform: "translateZ(40px)" }}
                                className="space-y-3 pt-6 mt-auto relative"
                            >
                                <div className="absolute top-0 left-0 w-12 h-px bg-white/20" />
                                {['Abgestimmte DU-Klausel', 'Beihilfe-Konforme PKV'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-marke-highlight/20 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-marke-highlight" />
                                        </div>
                                        <span className="text-sm text-white font-medium">{item}</span>
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
