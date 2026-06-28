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
                            <div className="flex flex-col gap-3">
                                <div className="font-extrabold text-[#1e5adb]">Erstklassige Beratung</div>
                                <div className="text-sm text-[#718096]">Empfohlen von Kunden aus ganz Deutschland.</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex -space-x-2">
                                        <img src="https://i.pravatar.cc/100?img=11" alt="kunden avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="https://i.pravatar.cc/100?img=12" alt="kunden avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="https://i.pravatar.cc/100?img=13" alt="kunden avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                                    </div>
                                    <div className="w-8 h-8 bg-[#1e5adb] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                                        4.9
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default WarumSimplySwitch;
