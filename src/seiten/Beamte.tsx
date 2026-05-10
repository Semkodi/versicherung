import { motion } from 'framer-motion';
import FehlerBereich from '../komponenten/FehlerBereich.tsx';
import FAQ from '../komponenten/FAQ.tsx';
import SoArbeiteIch from '../komponenten/SoArbeiteIch.tsx';
import AppVorteile from '../komponenten/AppVorteile.tsx';
import KontaktBereich from '../komponenten/KontaktBereich.tsx';
import { ScrollReveal } from '../komponenten/ScrollReveal.tsx';

const Beamte = () => {
    return (
        <main className="relative z-10 overflow-hidden">
            <div className="pt-40 pb-20 px-4 bg-hintergrund-alt relative">
                <div className="absolute inset-0 bg-marke-primaer/5 blur-[120px] rounded-full translate-y-[-50%]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <span className="text-marke-primaer font-bold tracking-widest uppercase mb-4 block">Expertenwissen für dich</span>
                        <h1 className="text-4xl md:text-7xl font-black text-text-haupt mb-8 leading-tight">
                            Exklusive Beratung für <br />
                            <span className="text-marke-primaer text-transparent bg-clip-text bg-gradient-to-r from-marke-primaer to-marke-akzent">Beamte & Referendare</span>
                        </h1>
                        <p className="text-xl text-text-neben max-w-3xl mx-auto leading-relaxed">
                            Beihilfe, Dienstunfähigkeit und Pension – wir kennen die Besonderheiten deiner Laufbahn und begleiten dich stressfrei in deine Karriere.
                        </p>
                    </motion.div>
                </div>
            </div>

            <ScrollReveal direction="up">
                <FehlerBereich />
            </ScrollReveal>

            <ScrollReveal direction="up">
                <SoArbeiteIch />
            </ScrollReveal>

            <ScrollReveal direction="up">
                <AppVorteile />
            </ScrollReveal>

            <ScrollReveal direction="up">
                <FAQ />
            </ScrollReveal>

            <ScrollReveal direction="up">
                <KontaktBereich />
            </ScrollReveal>
        </main>
    );
};

export default Beamte;
