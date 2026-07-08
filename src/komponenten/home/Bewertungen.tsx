import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const GoogleLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const Bewertungen = () => {
    const GOOGLE_BEWERTEN_URL = "https://www.google.com/search?q=simply+switch+-+Sven+Kegler#lrd=0x47bc6750feff5573:0x66eb74f057f2bfec,2";
    const GOOGLE_LESEN_URL = "https://www.google.com/search?q=simply+switch+-+Sven+Kegler#lrd=0x47bc6750feff5573:0x66eb74f057f2bfec,1";

    const textReviews = [
        {
            name: "Semir Borogovac",
            initial: "S",
            avatar: "bg-marke-primaer text-white",
            text: "Sven ist fachlich einfach der Beste! Er nimmt sich unglaublich viel Zeit, berät absolut transparent und findet für jedes Problem eine Lösung. Er ist extrem zuverlässig und sofort zur Stelle, wenn man ein Anliegen hat.",
            sterne: 5,
        },
        {
            name: "Ann-Christin Bethke",
            initial: "A",
            avatar: "bg-emerald-100 text-emerald-700",
            text: "Ausgezeichnete, freundliche und äußerst kompetente Beratung. Auf Fragen und Anliegen wurde jederzeit schnell und zuverlässig eingegangen. Man fühlt sich bestens betreut und professionell begleitet.",
            sterne: 5,
        },
        {
            name: "Lisa Herbst",
            initial: "L",
            avatar: "bg-marke-primaer/10 text-marke-primaer",
            text: "Ich kann Sven und seine Arbeit wirklich nur empfehlen! Frisch aus der Universität und kurz vor dem Referendariat musste ich mich mit dem Thema PKV befassen. Sven hat mich stets kompetent beraten, ist auf alle Fragen detailliert eingegangen und hat sich um alles Weitere gekümmert.",
            sterne: 5,
        },
        {
            name: "Kim Buder",
            initial: "K",
            avatar: "bg-violet-100 text-violet-700",
            text: "Super umfangreiche & ehrliche Beratung von Sven. Wir sind sehr zufrieden, auch wenn man vor dem Einstieg ins Berufsleben steht & einen Überblick über Versicherungen benötigt. Insbesondere der lockere Umgang miteinander macht die Zusammenarbeit super angenehm. Danke dir Sven!",
            sterne: 5,
        },
        {
            name: "Halgurd Taha",
            initial: "H",
            avatar: "bg-blue-100 text-blue-700",
            text: "Sven Kegler ist ein toller Mensch, richtig gute Beratung, findet für alle Probleme eine Lösung. Habe jetzt eine digitale Verwaltung all meiner Verträge. Mit simply switch spare ich jetzt viel Zeit, Arbeit und vor allem Geld. Nur zu empfehlen!",
            sterne: 5,
        },
        {
            name: "Ella Bondarenko",
            initial: "E",
            avatar: "bg-marke-sekundaer text-white",
            text: "Sven kennen wir mittlerweile schon lange, ca. 8 Jahre. Er ist IMMER verlässlich und ein sehr netter und angenehmer Mensch. Er sagt, was geht und was nicht geht – somit der absolut richtige Ansprechpartner für alle versicherungstechnischen Angelegenheiten.",
            sterne: 5,
        },
        {
            name: "Alexander Scheerer",
            initial: "A",
            avatar: "bg-amber-100 text-amber-700",
            text: "Top Versicherungsmakler! Kompetent, zuverlässig und ehrlich. Schnelle Kommunikation, klare Beratung und maßgeschneiderte Lösungen. Uneingeschränkt empfehlenswert!",
            sterne: 5,
        },
        {
            name: "Selma Hadzic",
            initial: "S",
            avatar: "bg-rose-100 text-rose-700",
            text: "Herr Kegler ist ein Top Versicherungsberater. Habe durch ihn mehrere hundert Euro durch bessere Verträge mit mehr Leistungen im Jahr gespart. Er nimmt sich Zeit und denkt immer an den Kunden und seine Wünsche. Top!",
            sterne: 5,
        },
        {
            name: "Mariana Russotto",
            initial: "M",
            avatar: "bg-pink-100 text-pink-700",
            text: "Wir sind sehr zufrieden, dass wir mit Sven so einen tollen Versicherungsmakler gefunden haben. Bei allen Fragen oder Problemen steht er uns zur Verfügung und kümmert sich besonders schnell darum. Wir können ihn nur empfehlen!",
            sterne: 5,
        },
        {
            name: "Emma Süper",
            initial: "E",
            avatar: "bg-teal-100 text-teal-700",
            text: "Ich bin rundum zufrieden mit der Beratung durch Sven. Er hat mich kompetent und verständlich beraten, insbesondere zur PKV für mein Referendariat. Sven ist sehr freundlich, immer schnell erreichbar und nimmt sich Zeit für alle Fragen.",
            sterne: 5,
        },
        {
            name: "linda boedger",
            initial: "L",
            avatar: "bg-cyan-100 text-cyan-700",
            text: "Absolut zuverlässiger und kompetenter Versicherungsmakler! Man erhält qualifizierte Auskunft, ohne Produkte aufgedrängt zu bekommen! Definitiv eine Weiterempfehlung wert!",
            sterne: 5,
        },
        {
            name: "Dennis Schneider",
            initial: "D",
            avatar: "bg-indigo-100 text-indigo-700",
            text: "Sven ist ein sehr zuverlässiger und freundlicher Berater. Er nimmt sich die Zeit, die man braucht, um über die Angebote zu sprechen, kann mit vielen nützlichen Tipps weiterhelfen und ist immer flexibel. Vielen Dank!",
            sterne: 5,
        },
        {
            name: "Denise Pe",
            initial: "D",
            avatar: "bg-marke-primaer/20 text-marke-sekundaer",
            text: "Top Versicherungsmakler! Seine Beratung ist professionell, transparent und individuell auf die Bedürfnisse abgestimmt. Er nimmt sich viel Zeit, erklärt alle Details verständlich und findet immer die besten Lösungen.",
            sterne: 5,
        },
        {
            name: "Nadine Kräft",
            initial: "N",
            avatar: "bg-orange-100 text-orange-700",
            text: "Super sympathische und vor allem blitzschnelle, kompetente Hilfe und Abwicklung bei jeglichen Versicherungen und allem, was dazu gehört. Kann ich nur empfehlen! 😊",
            sterne: 5,
        },
        {
            name: "Angel K",
            initial: "A",
            avatar: "bg-green-100 text-green-700",
            text: "Sehr freundlich, kümmert sich sofort um jedes Anliegen. Berät gut und erklärt alles genau, wenn man es nicht versteht. Würde auch mehr Sterne geben wenn es gehen würde.",
            sterne: 5,
        },
        {
            name: "Stefan Herrmann",
            initial: "S",
            avatar: "bg-marke-sekundaer/10 text-marke-sekundaer",
            text: "Hier wird sich Zeit genommen für das Anliegen und es wird individuell auf jeden Kunden reagiert. Meine Fragen wurden schnell und verständlich erklärt und somit alle Probleme beseitigt.",
            sterne: 5,
        },
        {
            name: "Denise",
            initial: "D",
            avatar: "bg-purple-100 text-purple-700",
            text: "Ich bin sehr zufrieden mit der Beratung durch Sven. Ich war für mein Referendariat auf der Suche nach Versicherungen. Er hat sich sehr viel Zeit genommen und hatte auf alle Fragen eine Antwort. Er ist immer erreichbar. 🙂",
            sterne: 5,
        },
        {
            name: "Albert Brüstle",
            initial: "A",
            avatar: "bg-gray-100 text-gray-700",
            text: "Nettes Telefonat. Hat gutes Gespür für die richtigen Entscheidungen!",
            sterne: 5,
        },
    ];

    const marqueeReviews = [...textReviews, ...textReviews, ...textReviews];

    return (
        <section id="bewertungen" className="relative bg-white pb-24 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-white to-transparent rounded-b-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">

                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-[2.5rem] font-extrabold text-marke-sekundaer tracking-tight"
                    >
                        Das sagen unsere Kunden
                    </motion.h2>
                </div>

                {/* Google Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-8 mb-16 flex flex-col md:flex-row items-center justify-between border border-gray-100/80 relative overflow-hidden"
                >
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#4285F4]/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#FBBC05]/5 rounded-full blur-3xl pointer-events-none" />

                    <a
                        href={GOOGLE_LESEN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 mb-6 md:mb-0 group cursor-pointer relative z-10"
                    >
                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-md border border-gray-50 group-hover:scale-110 transition-transform duration-300">
                            <GoogleLogo />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-[#0a1930] group-hover:text-marke-primaer transition-colors duration-300">Google Reviews</h3>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="font-extrabold text-lg text-gray-800">5,0</span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-google-gelb fill-google-gelb" />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm font-semibold ml-1">(70+ Rezensionen)</span>
                            </div>
                        </div>
                    </a>
                    <a
                        href={GOOGLE_BEWERTEN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-marke-primaer hover:bg-marke-primaer-hover text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] text-sm relative z-10 text-center w-full md:w-auto cursor-pointer"
                    >
                        Zufrieden? Lass eine Bewertung da
                    </a>
                </motion.div>

                {/* Auto-Scrolling Reviews Marquee */}
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
                                        {review.sterne < 5 && [...Array(5 - review.sterne)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-gray-200 fill-gray-200" />
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
                                            <GoogleLogo className="w-full h-full" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-gray-900 text-sm">{review.name}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <style>{`
                    .mask-gradient {
                        mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
                        -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
                    }
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-340px * 18 - 24px * 18)); }
                    }
                    .marquee-container {
                        display: flex;
                        width: max-content;
                        animation: marquee 80s linear infinite;
                    }
                    .marquee-container:hover {
                        animation-play-state: paused;
                    }
                    .marquee-container a {
                        scroll-snap-align: start;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default Bewertungen;
