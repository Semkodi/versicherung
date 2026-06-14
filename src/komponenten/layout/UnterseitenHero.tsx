import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

type HeroLink = {
    text: string;
    href: string;
};

type UnterseitenHeroProps = {
    label: string;
    titel: string;
    hervorhebung: string;
    beschreibung: string;
    punkte: string[];
    bild: string;
    bildAlt: string;
    bildKlasse?: string;
    primaer: HeroLink;
    sekundaer?: HeroLink;
    akzent?: 'blau' | 'rot';
};

const UnterseitenHero = ({
    label,
    titel,
    hervorhebung,
    beschreibung,
    punkte,
    bild,
    bildAlt,
    bildKlasse = '',
    primaer,
    sekundaer,
    akzent = 'blau',
}: UnterseitenHeroProps) => {
    const istRot = akzent === 'rot';

    return (
        <section className={`unterseiten-hero unterseiten-hero--vollbild ${istRot ? 'unterseiten-hero--rot' : ''}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 z-0 overflow-hidden"
            >
                <img
                    src={bild}
                    alt={bildAlt}
                    className={`unterseiten-hero__hintergrundbild ${bildKlasse}`}
                    fetchPriority="high"
                />
            </motion.div>

            <div className="unterseiten-hero__verlauf" aria-hidden="true" />

            <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[530px]">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="unterseiten-hero__inhalt max-w-2xl"
                    >
                        <span className="unterseiten-hero__label">
                            {label}
                        </span>

                        <h1 className="text-[2.4rem] md:text-[3.5rem] lg:text-[4.2rem] font-extrabold text-text-haupt leading-[1.15] mb-6 tracking-tight">
                            {titel}<br />
                            <span className={istRot
                                ? 'bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent'
                                : 'bg-gradient-to-r from-marke-primaer to-[#4f46e5] bg-clip-text text-transparent'
                            }>
                                {hervorhebung}
                            </span>
                        </h1>

                        <p className="text-base md:text-xl text-text-neben mb-8 max-w-xl font-normal leading-relaxed">
                            {beschreibung}
                        </p>

                        <ul className="space-y-3.5 mb-10">
                            {punkte.map((punkt) => (
                                <li key={punkt} className="flex items-center gap-3.5 text-text-haupt font-semibold">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${istRot ? 'bg-red-500' : 'bg-marke-primaer'}`}>
                                        <Check className="w-4 h-4 text-white stroke-[3]" />
                                    </span>
                                    <span className="text-base md:text-lg">{punkt}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <a
                                href={primaer.href}
                                className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer ${istRot ? 'bg-red-500 hover:bg-red-600' : 'bg-marke-primaer hover:bg-marke-primaer-hover'}`}
                            >
                                {primaer.text}
                                <ArrowRight className="w-5 h-5" />
                            </a>

                            {sekundaer ? (
                                <a
                                    href={sekundaer.href}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-text-haupt font-semibold rounded-xl border border-slate-200 hover:bg-hintergrund-hell transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                                >
                                    {sekundaer.text}
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            ) : null}
                        </div>
                    </motion.div>

                    <div className="hidden lg:block min-h-[420px]" aria-hidden="true" />
                </div>
            </div>
        </section>
    );
};

export default UnterseitenHero;
