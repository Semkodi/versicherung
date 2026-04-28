import { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import video1 from '../assets/VIDEO-2025-04-06-14-21-54-Kopie.mp4';
import video2 from '../assets/WhatsApp-Video-2025-04-04-at-14.48.08-Kopie.mp4';

const Bewertungen = () => {
    const textReviews = [
        {
            name: "Herczeg Róbert",
            initial: "H",
            avatar: "bg-marke-primaer/10 text-marke-primaer",
            text: "Ich kann Sven und seine Arbeit wirklich nur empfehlen und jedem ans Herz legen! Frisch aus der Universität und kurz vor dem Referendariat, musste ich mich langsam aber sicher mit der Thematik von Versicherungen etc. auseinandersetzen.",
            sterne: 5,
        },
        {
            name: "Lisa Herbst",
            initial: "L",
            avatar: "bg-marke-sekundaer text-white",
            text: "Ich bin rundum zufrieden mit der Beratung durch Sven. Er hat mich kompetent und verständlich zu wichtigen Versicherungen beraten, insbesondere zur privaten Krankenversicherung für Beamtenanwärter und zum Thema Dienstunfähigkeit.",
            sterne: 5,
        },
        {
            name: "Emma Süper",
            initial: "E",
            avatar: "bg-marke-primaer/20 text-marke-sekundaer",
            text: "Ich fühle mich bei Sven, auf dem Weg eine private Krankenversicherung zu finden, sehr kompetent und freundlich beraten. Er ist für Nachfragen immer sehr schnell erreichbar und kümmert sich zügig um die Erstellung der Anträge.",
            sterne: 5,
        },
        {
            name: "Ste Grue",
            initial: "S",
            avatar: "bg-marke-primaer text-white",
            text: "Top Beratung! Kann ich nur weiterempfehlen.",
            sterne: 5,
        }
    ];

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const videos = [video1, video2];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section id="bewertungen" className="relative bg-hintergrund-alt pb-24 overflow-hidden">
            {/* Oben: Kurven-Hintergrund für Google Reviews */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#f8f9fc] to-transparent rounded-b-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">

                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-extrabold text-marke-sekundaer tracking-tight"
                    >
                        Das sagen meine Kunden!
                    </motion.h2>
                </div>

                {/* Google Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-5 mb-10 flex flex-col md:flex-row items-center justify-between border border-gray-100"
                >
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-50">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-marke-sekundaer">Google Reviews</h3>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="font-bold text-lg text-gray-800">5</span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-[#FBBC05] fill-[#FBBC05]" />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm font-medium">(63)</span>
                            </div>
                        </div>
                    </div>
                    <a
                        href="https://search.google.com/local/writereview?placeid=DEINE_GOOGLE_PLACE_ID"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-marke-primaer hover:bg-marke-sekundaer text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm"
                    >
                        Zufrieden? Lass eine Bewertung da
                    </a>
                </motion.div>

                {/* Reviews Carousel */}
                <div className="relative max-w-6xl mx-auto mb-20 group">
                    <button onClick={() => scroll('left')} className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 hover:text-marke-primaer z-20 border border-gray-100 hidden md:flex transition-all opacity-0 group-hover:opacity-100 focus:outline-none">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={() => scroll('right')} className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 hover:text-marke-primaer z-20 border border-gray-100 hidden md:flex transition-all opacity-0 group-hover:opacity-100 focus:outline-none">
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar p-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {textReviews.map((review, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                className="flex-none w-[320px] bg-white rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-gray-50 snap-center hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(review.sterne)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                                        ))}
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">
                                        "{review.text}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 mt-auto border-t border-gray-50 pt-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg relative ${review.avatar}`}>
                                        {review.initial}
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm p-0.5">
                                            <svg className="w-full h-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="font-semibold text-gray-900 text-sm">{review.name}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h3 className="text-xl md:text-2xl font-extrabold text-marke-sekundaer tracking-tight">
                        Echte Stimmen. Echte Erfahrungen.
                    </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
                    {videos.map((vid, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group relative w-full max-w-[280px] rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 cursor-pointer"
                        >
                            <div className="aspect-[9/16] relative bg-black flex items-center justify-center">
                                <video className="w-full h-full object-cover" controls preload="metadata">
                                    <source src={vid} type="video/mp4" />
                                </video>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <style>{`
                    .hide-scrollbar::-webkit-scrollbar { display: none; }
                `}</style>
            </div>
        </section>
    );
};

export default Bewertungen;
