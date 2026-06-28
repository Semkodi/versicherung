import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '@/assets/bilder/premium_hero_sven.webp';
import privatImg from '@/assets/bilder/haftpflicht_card.webp';
import beamteImg from '@/assets/bilder/hero_beamte_anwaerter.webp';
import '@/styles/heldenbereich.css';

const slides = [
    {
        title: "Sven Kegler Versicherungsmakler",
        subtitle: "Nah und transparent für deine Sicherheit",
        description: "Seit fast 20 Jahren betreue ich Privatkunden und Beamte in partnerschaftlicher Zusammenarbeit. Als Versicherungsmakler bin ich an keine Versicherungsgesellschaft gebunden und vertrete ausschließlich deine Interessen.",
        checkmarks: [
            "Transparent & objektiv beraten",
            "Persönlicher Ansprechpartner",
            "Digital & unkompliziert"
        ],
        btnText: "Jetzt beraten lassen",
        btnLink: "/#kontakt",
        img: heroImg,
        bildKlasse: "heldenbereich__portrait--sven",
        vollflaechig: true
    },
    {
        title: "Privater Versicherungsschutz",
        subtitle: "simply switch – Deine Experten für optimale Vorsorge",
        description: "Wir helfen dir, die richtige Absicherung zu finden – verständlich, transparent und vollkommen digital. Finde heraus, wie einfach moderne Absicherung für dich ist.",
        checkmarks: [
            "Optimale Tarife mit Best-Leistungsgarantie",
            "Transparenter Marktvergleich"
        ],
        btnText: "Schutz prüfen",
        btnLink: "/privatkunden",
        img: privatImg,
        bildKlasse: "heldenbereich__portrait--privat",
        vollflaechig: true
    },
    {
        title: "Beihilfe & Beamtenversorgung",
        subtitle: "Sven Kegler – Spezialist für Beamte & Anwärter",
        description: "Für Beamte und Anwärter gelten besondere Absicherungsregeln. Ich navigiere dich sicher durch Beihilfe, Dienstunfähigkeit, Heilfürsorge und begleite dich kompetent ab dem Referendariat.",
        checkmarks: [
            "ÖD Sondertarife",
            "Private Krankenversicherung",
            "Dienstunfähigkeitsschutz",
            "Referendariat-Spezialtarife"
        ],
        btnText: "Beamten-Kompass ansehen",
        btnLink: "/beamte",
        img: beamteImg,
        bildKlasse: "heldenbereich__portrait--beamte",
        vollflaechig: true
    }
];

const Heldenbereich = () => {
    const [aktiverSlide, setAktiverSlide] = useState(0);
    const [richtung, setRichtung] = useState(0);
    const [pausiert, setPausiert] = useState(false);

    const wechsleSlide = (neuerIndex: number) => {
        setRichtung(neuerIndex > aktiverSlide ? 1 : -1);
        setAktiverSlide(neuerIndex);
    };

    // Preload der Bilder zur Vermeidung von Flimmern
    useEffect(() => {
        slides.forEach((slide) => {
            const img = new Image();
            img.src = slide.img;
        });
    }, []);

    // Autoplay-Interval: Wechselt alle 6 Sekunden zum nächsten Slide
    useEffect(() => {
        if (pausiert) return;
        const timer = setInterval(() => {
            setRichtung(1);
            setAktiverSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [aktiverSlide, pausiert]);

    const uebergangSanft = { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] };

    const textVarianten = {
        initial: (richtung: number) => ({
            x: richtung > 0 ? -40 : 40,
            opacity: 0,
        }),
        active: {
            x: 0,
            opacity: 1,
            transition: { ...uebergangSanft, staggerChildren: 0.08 },
        },
        exit: (richtung: number) => ({
            x: richtung > 0 ? 40 : -40,
            opacity: 0,
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        }),
    };

    const bildVarianten = {
        initial: (richtung: number) => ({
            x: richtung > 0 ? 60 : -60,
            opacity: 0,
            scale: 0.98,
        }),
        active: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { ...uebergangSanft, delay: 0.05 },
        },
        exit: (richtung: number) => ({
            x: richtung > 0 ? -60 : 60,
            opacity: 0,
            scale: 0.98,
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        }),
    };

    const kindVariante = {
        initial: { y: 12, opacity: 0 },
        active: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
        exit: { y: -8, opacity: 0, transition: { duration: 0.3 } },
    };


    const aktuellerSlideInhalt = slides[aktiverSlide];

    return (
        <section className={`relative pt-40 pb-24 md:pt-122 md:pb-2 bg-gradient-to-br from-[#f8f9fc] to-[#eef2f9] overflow-hidden min-h-[900px] lg:min-h-[850px] flex items-center ${aktuellerSlideInhalt.vollflaechig ? 'heldenbereich--portrait-aktiv' : ''}`}>
            <AnimatePresence mode="wait" custom={richtung}>
                {aktuellerSlideInhalt.vollflaechig ? (
                    <motion.div
                        key={`vollbild-${aktiverSlide}`}
                        custom={richtung}
                        variants={bildVarianten}
                        initial="initial"
                        animate="active"
                        exit="exit"
                        className="absolute inset-0 z-0 overflow-hidden"
                    >
                        <img
                            src={aktuellerSlideInhalt.img}
                            alt={aktuellerSlideInhalt.title}
                            className={`heldenbereich__portrait ${aktuellerSlideInhalt.bildKlasse}`}
                            fetchPriority="high"
                        />
                        <div className="heldenbereich__verlauf absolute inset-0 z-10 pointer-events-none" />
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10 w-full">

                {/* Split-Slide-Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[530px]">

                    {/* LINKE SEITE: Text schiebt von links herein */}
                    <AnimatePresence mode="wait" custom={richtung}>
                        <motion.div
                            key={`text-${aktiverSlide}`}
                            custom={richtung}
                            variants={textVarianten}
                            initial="initial"
                            animate="active"
                            exit="exit"
                            className="heldenbereich__inhalt max-w-2xl"
                        >
                            {/* Headline */}
                            <motion.h1
                                variants={kindVariante}
                                className="heldenbereich__titel text-[2.4rem] md:text-[3.5rem] lg:text-[4.2rem] font-extrabold text-[#020A39] leading-[1.15] mb-6 tracking-tight"
                            >
                                {aktuellerSlideInhalt.title}<br />
                                <span className="bg-gradient-to-r from-marke-primaer to-[#4f46e5] bg-clip-text text-transparent">
                                    {aktuellerSlideInhalt.subtitle}
                                </span>
                            </motion.h1>

                            {/* Beschreibung */}
                            <motion.p
                                variants={kindVariante}
                                className="heldenbereich__beschreibung text-base md:text-xl text-[#4b5a8a] mb-8 max-w-xl font-normal leading-relaxed"
                            >
                                {aktuellerSlideInhalt.description}
                            </motion.p>

                            {/* Checkmarks */}
                            <motion.ul variants={kindVariante} className="heldenbereich__checkliste space-y-3.5 mb-10">
                                {aktuellerSlideInhalt.checkmarks.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3.5 text-[#020A39] font-semibold">
                                        <div className="w-6 h-6 rounded-full bg-marke-primaer flex items-center justify-center flex-shrink-0 shadow-md">
                                            <Check className="w-4 h-4 text-white stroke-[3]" />
                                        </div>
                                        <span className="text-base md:text-lg">{item}</span>
                                    </li>
                                ))}
                            </motion.ul>

                            {/* Button */}
                            <motion.div variants={kindVariante} className="flex flex-col sm:flex-row gap-4 mb-6">
                                {aktuellerSlideInhalt.btnLink.startsWith('/#') ? (
                                    <a
                                        href={aktuellerSlideInhalt.btnLink.substring(1)}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-marke-primaer text-white font-semibold rounded-xl hover:bg-marke-primaer-hover transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
                                    >
                                        {aktuellerSlideInhalt.btnText}
                                        <ArrowRight className="w-5 h-5" />
                                    </a>
                                ) : (
                                    <Link
                                        to={aktuellerSlideInhalt.btnLink}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-marke-primaer text-white font-semibold rounded-xl hover:bg-marke-primaer-hover transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
                                    >
                                        {aktuellerSlideInhalt.btnText}
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                )}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* RECHTE SEITE: Bild schiebt von rechts herein */}
                    <AnimatePresence mode="wait" custom={richtung}>
                        {!aktuellerSlideInhalt.vollflaechig ? (
                            <motion.div
                                key={`bild-${aktiverSlide}`}
                                custom={richtung}
                                variants={bildVarianten}
                                initial="initial"
                                animate="active"
                                exit="exit"
                                className="relative hidden lg:flex items-center justify-end h-full min-h-[420px]"
                            >
                                <div className="relative z-10 w-full flex justify-end">
                                    <img
                                        src={aktuellerSlideInhalt.img}
                                        alt={aktuellerSlideInhalt.title}
                                        className="w-full h-[400px] object-cover rounded-[2rem] [mask-image:linear-gradient(to_right,transparent_0%,black_25%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_25%)] shadow-md"
                                        loading="eager"
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <div key={`bildplatzhalter-${aktiverSlide}`} className="hidden lg:block min-h-[420px]" aria-hidden="true" />
                        )}
                    </AnimatePresence>
                </div>

                {/* Slider-Dots + Pause-Button */}
                <div className="flex justify-center items-center gap-3.5 mt-8 relative z-20">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => wechsleSlide(idx)}
                            className={`h-3.5 rounded-full transition-all duration-300 ${
                                aktiverSlide === idx
                                    ? 'bg-marke-primaer w-10 shadow-[0_2px_8px_rgba(17,63,156,0.4)]'
                                    : 'bg-gray-300 hover:bg-gray-400 w-3.5'
                            }`}
                            aria-label={`Gehe zu Slide ${idx + 1}`}
                        />
                    ))}
                    <button
                        onClick={() => setPausiert(prev => !prev)}
                        className="w-7 h-7 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/50 transition-all duration-200 ml-1"
                        aria-label={pausiert ? 'Autoplay fortsetzen' : 'Autoplay pausieren'}
                    >
                        {pausiert
                            ? <Play className="w-3 h-3 text-[#020A39] fill-[#020A39]" />
                            : <Pause className="w-3 h-3 text-[#020A39] fill-[#020A39]" />
                        }
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Heldenbereich;
