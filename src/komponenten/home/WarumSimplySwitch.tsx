import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import warumImg from '@/assets/bilder/Profil_img.webp'; 

const WarumSimplySwitch = () => {
    const vorteile = [
        {
            titel: "Transparenter Versicherungsmakler",
            text: "Wir sind an keine einzelne Versicherungsgesellschaft gebunden. Unsere Beratung ist neutral, objektiv und orientiert sich zu 100% an deinen Interessen."
        },
        {
            titel: "Zertifizierte & ganzheitliche Beratung",
            text: "Mit fundierter Fachausbildung und Spezialisierung schließen wir Versorgungslücken, vermeiden Überversicherungen und senken durch eine bedarfsgerechte Absicherung unnötige Versicherungsbeiträge."
        },
        {
            titel: "Digitaler Service & Verträge",
            text: "Über die simplr App verwaltest du deine Verträge, Dokumente und Schäden papierlos und bequem von überall aus."
        },
        {
            titel: "Individuell & vertrauensvoll",
            text: "Kein Verkaufsdruck, keine Vertriebsziele. Die Beratung erfolgt verständlich, transparent und auf Augenhöhe."
        },
        {
            titel: "Schnelle Schadensbearbeitung",
            text: "Im Notfall stehen wir dir persönlich zur Seite und kümmern uns um eine reibungslose und schnelle Schadenregulierung."
        }
    ];

    return (
        <section id="warum-wir" className="py-24 bg-hintergrund-alt relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-start">
                    
                    {/* Linke Seite: Text & Liste */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[#e8effd] text-[#1e5adb] px-4 py-1.5 rounded-full mb-6 font-semibold text-xs uppercase tracking-wide">
                            Deine Sicherheit
                        </div>
                        
                        <h2 className="text-3xl md:text-[2.5rem] font-extrabold mb-6 text-[#0a1930] leading-tight">
                            Warum Sven Kegler und simply switch?
                        </h2>

                        <div className="space-y-6 text-[#4a5568] text-lg leading-relaxed mb-10 font-normal">
                            <p>
                                Seit fast <strong className="text-[#0a1930] font-bold">20 Jahren</strong> beraten wir Beamte, Beamtenanwärter und Privatkunden kompetent und transparent in allen Versicherungs- und Vorsorgefragen.
                            </p>
                            <p>
                                Unser Leitbild <strong className="text-[#1e5adb] font-bold">„Ehrlich, einfach transparent und digital"</strong> drückt unser Verständnis einer partnerschaftlichen Zusammenarbeit aus. Wir möchten dich als freier Versicherungsmakler in allen Lebensphasen begleiten und dir jederzeit die passende Versicherungslösung anbieten.
                            </p>
                        </div>

                        {/* Vorteils-Liste im Apple-Style */}
                        <ul className="space-y-6 mb-12">
                            {vorteile.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#e8effd] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm group-hover:bg-[#1e5adb] transition-colors duration-300">
                                        <Check className="w-3.5 h-3.5 text-[#1e5adb] group-hover:text-white stroke-[3] transition-colors duration-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-[#0a1930] text-base mb-1 group-hover:text-[#1e5adb] transition-colors duration-300">
                                            {item.titel}
                                        </h3>
                                        <p className="text-sm text-[#718096] leading-relaxed font-normal">
                                            {item.text}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>

                        <a
                            href="/#kontakt"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-marke-primaer text-white font-semibold rounded-xl hover:bg-marke-primaer-hover transition-all shadow-xl hover:-translate-y-1 cursor-pointer"
                        >
                            Erstgespräch vereinbaren
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                    
                    {/* Rechte Seite: Bild & Trust Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative lg:ml-10 lg:sticky lg:top-28"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 border-[6px] border-white/50 aspect-[4/3] sm:aspect-[3/4] sm:max-h-[650px] w-full">
                            <img 
                                src={warumImg} 
                                alt="Sven Kegler - Beratung auf Augenhöhe" 
                                className="w-full h-full object-cover object-top"
                            />
                        </div>

                        {/* Floating Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute -bottom-8 -left-6 md:-bottom-10 md:-left-10 bg-white rounded-2xl p-6 shadow-xl z-20 w-[95%] md:w-auto border border-gray-100"
                        >
                            <a
                                href="https://www.google.com/search?q=Sven+Kegler+simply+switch+Versicherungsmakler+Bewertungen"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col gap-2 group"
                            >
                                <div className="font-extrabold text-[#1e5adb] group-hover:underline">Unsere Google-Bewertungen</div>
                                <div className="flex items-center gap-1">
                                    {[1,2,3,4,5].map(i => (
                                        <svg key={i} className="w-4 h-4 text-[#fbbf24] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                    ))}
                                    <span className="text-xs font-bold text-[#0a1930] ml-1">5,0 / 5</span>
                                </div>
                                <div className="text-xs text-[#718096]">Auf Google bewertet – jetzt lesen</div>
                            </a>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default WarumSimplySwitch;
