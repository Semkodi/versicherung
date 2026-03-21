import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import profilBild from '../assets/Profil_img.png';

const Heldenbereich = () => {
    // Varianten für staggered Animationen
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)", y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any }
        }
    };

    return (
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-hintergrund mesh-gradient">
            {/* Hintergrund-Dekoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-marke-primaer rounded-full blur-[180px] opacity-[0.07]" />
                <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-marke-sekundaer rounded-full blur-[150px] opacity-[0.05]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(2,83,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(2,83,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Linke Seite – Textinhalt */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.15] mb-6 text-text-haupt pt-4">
                            Vermeide die 5 häufigsten Fehler beim{' '}
                            <span className="relative">
                                <span className="text-marke-primaer">
                                    Start in die Beamtenkarriere!
                                </span>
                                <motion.svg
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 1.2 }}
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 300 10"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M0,8 Q150,0 300,8" stroke="#0253ee" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.3" />
                                </motion.svg>
                            </span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg text-text-neben mb-10 leading-relaxed max-w-xl">
                            Bald verbeamtet! Doch mit dem neuen Status kommen auch eine Flut an Bürokratie und jede Menge Stolperfallen auf dich zu. Eine falsche Entscheidung kann richtig teuer werden.
                        </motion.p>

                        {/* Vorteile-Liste */}
                        <motion.div variants={itemVariants} className="space-y-3.5 mb-12">
                            {[
                                'Umfassende Aufklärung über das Beamtenverhältnis',
                                'Wir übernehmen sämtliche Formalitäten',
                                'Staatliche Fördermittel optimal ausschöpfen'
                            ].map((punkt, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-marke-primaer/10 border border-marke-primaer/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-marke-primaer" />
                                    </div>
                                    <span className="text-text-haupt font-medium">{punkt}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div variants={itemVariants}>
                            <a
                                href="#kontakt"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-marke-sekundaer text-white rounded-xl font-bold text-base hover:bg-marke-akzent transition-all duration-300 shadow-[0_8px_30px_rgba(2,10,57,0.25)] hover:shadow-[0_12px_40px_rgba(2,10,57,0.35)] hover:-translate-y-1"
                            >
                                Unverbindliches Infogespräch
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Rechte Seite – Profilbild */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
                        className="relative lg:ml-6 mt-10 lg:mt-0"
                    >
                        <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(2,10,57,0.18)] group transform transition-all duration-700 hover:-translate-y-3">
                            <div className="absolute inset-0 bg-gradient-to-t from-marke-sekundaer/30 via-transparent to-transparent z-10" />
                            <img
                                src={profilBild}
                                alt="Sven Kegler – Experte für Beamtenversorgung"
                                className="object-cover object-top w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Heldenbereich;
