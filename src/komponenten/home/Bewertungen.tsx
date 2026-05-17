import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Bewertungen = () => {
    // ─── HIER DEINE ORIGINALEN GOOGLE-BEWERTUNGSLINKS EINTRAGEN ───
    // Wir haben Sven Keglers originale Maps-CID (0x66eb74f057f2bfec) eingepflegt, damit alles direkt live funktioniert!
    const GOOGLE_BEWERTEN_URL = "https://www.google.com/search?q=simply+switch+-+Sven+Kegler#lrd=0x47bc6750feff5573:0x66eb74f057f2bfec,2";
    const GOOGLE_LESEN_URL = "https://www.google.com/search?q=simply+switch+-+Sven+Kegler#lrd=0x47bc6750feff5573:0x66eb74f057f2bfec,1";

    const textReviews = [
        {
            name: "Lisa Herbst",
            initial: "L",
            avatar: "bg-marke-primaer/10 text-marke-primaer",
            text: "Ich kann Sven und seine Arbeit wirklich nur empfehlen und jedem ans Herz legen! Frisch aus der Universität und kurz vor dem Referendariat, musste ich mich langsam aber sicher mit dem Thema einer privaten Krankenversicherung befassen. Da ich davon bislang wirklich fast gar keine Ahnung hatte, war ich umso froher, als ich auf Sven aufmerksam geworden bin. Sven hat mich stets kompetent beraten, ist auf alle Fragen detailliert eingegangen und hat sich für mich um alles Weitere (z.B Kündigung der alten GKV) gekümmert.",
            sterne: 5,
        },
        {
            name: "Emma Süper",
            initial: "E",
            avatar: "bg-marke-sekundaer text-white",
            text: "Ich bin rundum zufrieden mit der Beratung durch Sven. Er hat mich kompetent und verständlich zu wichtigen Versicherungen beraten, insbesondere zur privaten Krankenversicherung für mein Referendariat. Sven ist sehr freundlich, immer schnell erreichbar und nimmt sich Zeit für alle Fragen. Ich habe mich jederzeit gut aufgehoben gefühlt und kann ihn uneingeschränkt weiterempfehlen!:)",
            sterne: 5,
        },
        {
            name: "Denise",
            initial: "D",
            avatar: "bg-marke-primaer/20 text-marke-sekundaer",
            text: "Ich bin sehr zufrieden mit der Beratung durch Sven. Ich war für mein Referendariat auf der Suche nach Versicherungen. Er hat sich sehr viel Zeit genommen und hatte auf alle Fragen eine Antwort. Er ist immer erreichbar und Anliegen werden schnell bearbeitet. 🙂",
            sterne: 5,
        },
        {
            name: "Ste Grue",
            initial: "S",
            avatar: "bg-marke-primaer text-white",
            text: "Ich fühle mich bei Sven, auf dem Weg eine private Krankenversicherung zu finden, sehr kompetent und freundlich beraten. Er ist für Nachfragen immer sehr schnell erreichbar und kümmert sich um alle Belange und Fragen die so anstehen.",
            sterne: 5,
        },
        {
            name: "Stefan Herrmann",
            initial: "S",
            avatar: "bg-marke-sekundaer/10 text-marke-sekundaer",
            text: "Hier wird sich Zeit genommen für das Anliegen und es wird individuell auf jeden Kunden reagiert. Meine Fragen wurden schnell und verständlich erklärt und somit alle Probleme beseitigt.",
            sterne: 5,
        }
    ];

    // Wir duplizieren die Bewertungen, um einen nahtlosen, endlosen Scrolling-Effekt (Marquee) zu erzeugen
    const marqueeReviews = [...textReviews, ...textReviews, ...textReviews];

    return (
        <section id="bewertungen" className="relative bg-hintergrund-alt pb-24 overflow-hidden">
            {/* Oben: Kurven-Hintergrund für Google Reviews */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-hintergrund-hell to-transparent rounded-b-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">

                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-[2.5rem] font-extrabold text-marke-sekundaer tracking-tight"
                    >
                        Das sagen meine Kunden!
                    </motion.h2>
                </div>

                {/* Google Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-8 mb-16 flex flex-col md:flex-row items-center justify-between border border-gray-100/80 relative overflow-hidden"
                >
                    {/* Subtle design glows */}
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#4285F4]/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#FBBC05]/5 rounded-full blur-3xl pointer-events-none" />

                    <a
                        href={GOOGLE_LESEN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 mb-6 md:mb-0 group cursor-pointer relative z-10"
                    >
                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-md border border-gray-50 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-[#0a1930] group-hover:text-marke-primaer transition-colors duration-300">Google Reviews</h3>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="font-extrabold text-lg text-gray-800">5.0</span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-google-gelb fill-google-gelb" />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm font-semibold ml-1">(65 Rezensionen)</span>
                            </div>
                        </div>
                    </a>
                    <a
                        href={GOOGLE_BEWERTEN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0a1930] hover:bg-marke-primaer text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] text-sm relative z-10 text-center w-full md:w-auto"
                    >
                        Zufrieden? Lass eine Bewertung da
                    </a>
                </motion.div>

                {/* Seamless Auto-Scrolling Reviews Marquee */}
                <div className="relative w-full overflow-hidden mb-12 py-4 mask-gradient">
                    <div className="marquee-container flex gap-6">
                        {marqueeReviews.map((review, idx) => (
                            <a
                                key={idx}
                                href={GOOGLE_LESEN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-none w-[340px] bg-white/90 backdrop-blur-md rounded-[2rem] p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-gray-100/60 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-marke-primaer/10 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group/card cursor-pointer"
                            >
                                <div>
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(review.sterne)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-google-gelb fill-google-gelb" />
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
                            </a>
                        ))}
                    </div>
                </div>

                {/* Inline Styles for continuous marquee and beautiful fade gradient mask */}
                <style>{`
                    .mask-gradient {
                        mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
                        -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
                    }
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-340px * 5 - 24px * 5)); }
                    }
                    .marquee-container {
                        display: flex;
                        width: max-content;
                        animation: marquee 45s linear infinite;
                    }
                    .marquee-container:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default Bewertungen;
