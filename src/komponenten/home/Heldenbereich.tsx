import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '@/assets/bilder/hero_couple.png';
import privatImg from '@/assets/bilder/haftpflicht_card.png';
import beamteImg from '@/assets/bilder/beamte_du.png';

const slides = [
    {
        title: "Sven Kegler Versicherungsmakler",
        subtitle: "Nah und unabhängig für deine Sicherheit",
        description: "Seit Jahren betreue ich Privatkunden und Beamte in partnerschaftlicher Zusammenarbeit. Als unabhängiger Versicherungsmakler bin ich an keine Versicherungsgesellschaft gebunden und vertrete ausschließlich deine Interessen.",
        checkmarks: [
            "Unabhängig & objektiv beraten",
            "Persönlicher Ansprechpartner",
            "Digital & unkompliziert"
        ],
        btnText: "Jetzt beraten lassen",
        btnLink: "/#kontakt",
        img: heroImg
    },
    {
        title: "Privater Versicherungsschutz",
        subtitle: "Sven Kegler – Dein Experte für optimale Vorsorge",
        description: "Wir helfen dir, die richtigen Versicherungen zu finden – verständlich, transparent und vollkommen digital. Finde heraus, wie einfach moderne Absicherung für dich und deine Familie sein kann.",
        checkmarks: [
            "Bedarfsanalyse in 3 Minuten",
            "Haftpflicht, Hausrat, Kfz & mehr",
            "Optimale Tarife mit Best-Service"
        ],
        btnText: "Schutz prüfen",
        btnLink: "/privatkunden",
        img: privatImg
    },
    {
        title: "Beihilfe & Beamtenversorgung",
        subtitle: "Sven Kegler – Spezialist für Beamte & Anwärter",
        description: "Für Beamte und Anwärter gelten besondere Absicherungsregeln. Ich navigiere dich sicher durch Beihilfe, Dienstunfähigkeit, Heilfürsorge und begleite dich kompetent ab dem Referendariat.",
        checkmarks: [
            "Dienstunfähigkeitsschutz (DU)",
            "Private Krankenversicherung (PKV)",
            "Referendariat-Spezialtarife"
        ],
        btnText: "Beamten-Kompass ansehen",
        btnLink: "/beamte",
        img: beamteImg
    }
];

const Heldenbereich = () => {
    const [aktiverSlide, setAktiverSlide] = useState(0);
    const [richtung, setRichtung] = useState(0);

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
        const timer = setInterval(() => {
            setRichtung(1);
            setAktiverSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [aktiverSlide]);

    const slideVarianten = {
        initial: (richtung: number) => ({
            x: richtung > 0 ? 150 : -150,
            opacity: 0
        }),
        active: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "spring" as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
            }
        },
        exit: (richtung: number) => ({
            x: richtung < 0 ? 150 : -150,
            opacity: 0,
            transition: {
                x: { type: "spring" as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
            }
        })
    };

    const aktuellerSlideInhalt = slides[aktiverSlide];

    return (
        <section className="relative pt-40 pb-24 md:pt-52 md:pb-36 bg-gradient-to-br from-[#f8f9fc] to-[#eef2f9] overflow-hidden min-h-[900px] lg:min-h-[850px] flex items-center">
            <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10 w-full">
                
                {/* Animations-Bereich */}
                <div className="relative overflow-hidden min-h-[630px] lg:min-h-[530px]">
                    <AnimatePresence mode="wait" custom={richtung}>
                        <motion.div
                            key={aktiverSlide}
                            custom={richtung}
                            variants={slideVarianten}
                            initial="initial"
                            animate="active"
                            exit="exit"
                            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full"
                        >
                            {/* Linke Seite: Text & CTA */}
                            <div className="max-w-2xl">
                                {/* Headline (ca. 5% größer) */}
                                <h1 className="text-[2.4rem] md:text-[3.5rem] lg:text-[4.2rem] font-extrabold text-[#020A39] leading-[1.15] mb-6 tracking-tight">
                                    {aktuellerSlideInhalt.title}<br />
                                    <span className="bg-gradient-to-r from-[#0253ee] to-[#4f46e5] bg-clip-text text-transparent">
                                        {aktuellerSlideInhalt.subtitle}
                                    </span>
                                </h1>

                                {/* Subheadline (ca. 5% größer) */}
                                <p className="text-base md:text-xl text-[#4b5a8a] mb-8 max-w-xl font-normal leading-relaxed">
                                    {aktuellerSlideInhalt.description}
                                </p>

                                {/* Checkmarks (ca. 5% größer) */}
                                <ul className="space-y-3.5 mb-10">
                                    {aktuellerSlideInhalt.checkmarks.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3.5 text-[#020A39] font-semibold">
                                            <div className="w-6 h-6 rounded-full bg-[#0253ee] flex items-center justify-center flex-shrink-0 shadow-md">
                                                <Check className="w-4 h-4 text-white stroke-[3]" />
                                            </div>
                                            <span className="text-base md:text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    {aktuellerSlideInhalt.btnLink.startsWith('/#') ? (
                                        <a
                                            href={aktuellerSlideInhalt.btnLink.substring(1)}
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#020A39] text-white font-semibold rounded-xl hover:bg-[#0c1c4f] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                                        >
                                            {aktuellerSlideInhalt.btnText}
                                            <ArrowRight className="w-5 h-5" />
                                        </a>
                                    ) : (
                                        <Link
                                            to={aktuellerSlideInhalt.btnLink}
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0253ee] text-white font-semibold rounded-xl hover:bg-[#0042c7] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                                        >
                                            {aktuellerSlideInhalt.btnText}
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Rechte Seite: Bild (ca. 5% größer) */}
                            <div className="relative hidden lg:flex items-center justify-end h-full min-h-[420px]">
                                <div className="relative z-10 w-full flex justify-end">
                                    <img
                                        src={aktuellerSlideInhalt.img}
                                        alt={aktuellerSlideInhalt.title}
                                        className="w-full h-[500px] object-cover rounded-[2rem] [mask-image:linear-gradient(to_right,transparent_0%,black_25%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_25%)] shadow-md"
                                        loading="eager"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Slider-Navigationspunkte (Dots) */}
                <div className="flex justify-center items-center gap-3.5 mt-8 relative z-20">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => wechsleSlide(idx)}
                            className={`h-3.5 rounded-full transition-all duration-300 ${
                                aktiverSlide === idx
                                    ? 'bg-[#0253ee] w-10 shadow-[0_2px_8px_rgba(2,83,238,0.4)]'
                                    : 'bg-gray-300 hover:bg-gray-400 w-3.5'
                            }`}
                            aria-label={`Gehe zu Slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* ProvenExpert Siegel (Rechts Unten) */}
                <div className="absolute -bottom-8 right-6 lg:right-12 z-30 bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.08)] w-[240px] flex flex-col items-center select-none text-center">
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-5.5 h-5.5 rounded-full bg-[#3d3d3d] flex items-center justify-center text-white text-[9px] font-extrabold">
                            PE
                        </div>
                        <span className="text-[11px] font-extrabold text-[#3d3d3d] tracking-tight">ProvenExpert</span>
                    </div>

                    <div className="text-base font-extrabold text-[#020A39] leading-tight mt-1">SEHR GUT</div>

                    <div className="flex gap-0.5 my-1.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24] stroke-none" />
                        ))}
                    </div>

                    <div className="text-[10px] text-[#4b5a8a] leading-tight font-semibold">
                        Sven Kegler &bull; Simply Switch
                    </div>

                    <a
                        href="#bewertungen"
                        className="w-full bg-[#e8effd] text-[#0253ee] text-[11px] font-bold py-2 px-3 rounded-lg mt-3.5 border border-[#d1e0f9] hover:bg-[#d5e3fc] transition-colors"
                    >
                        873 Kundenbewertungen
                    </a>

                    <div className="flex justify-between w-full text-[8.5px] text-gray-400 mt-3 border-t border-gray-100 pt-2 font-medium">
                        <span>100% verifiziert</span>
                        <span>Stand: Juni 2026</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Heldenbereich;
