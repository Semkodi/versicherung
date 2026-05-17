import { motion } from 'framer-motion';
import { ArrowRight, Users, Search, Smartphone, Shield } from 'lucide-react';
import warumImg from '../../assets/bilder/Profil_img.png'; // Fallback Bild, bis ein Meeting-Bild da ist

const WarumSimplySwitch = () => {
    const features = [
        {
            icon: <Users className="w-5 h-5 text-[#1e5adb]" />,
            titel: "Persönlich",
            text: "Wir nehmen uns Zeit für dich und deine Situation."
        },
        {
            icon: <Search className="w-5 h-5 text-[#1e5adb]" />,
            titel: "Transparent",
            text: "Klare Empfehlungen ohne Fachchinesisch und versteckte Kosten."
        },
        {
            icon: <Smartphone className="w-5 h-5 text-[#1e5adb]" />,
            titel: "Digital",
            text: "Dokumente, Verträge und Beratung – alles an einem Ort."
        },
        {
            icon: <Shield className="w-5 h-5 text-[#1e5adb]" />,
            titel: "Langfristig",
            text: "Wir sind auch morgen noch für dich da, wenn du uns brauchst."
        }
    ];

    return (
        <section id="warum-wir" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    
                    {/* Linke Seite: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[#e8effd] text-[#1e5adb] px-4 py-1.5 rounded-full mb-6 font-semibold text-xs uppercase tracking-wide">
                            Deine Vorteile
                        </div>
                        <h2 className="text-3xl md:text-[2.5rem] font-extrabold mb-6 text-[#0a1930] leading-tight">
                            Warum Simply Switch?
                        </h2>
                        <p className="text-[#4a5568] text-lg font-normal mb-12 max-w-lg leading-relaxed">
                            Wir machen Versicherungen einfach verständlich und behalten dabei nur ein Ziel im Blick: dich bestmöglich abzusichern.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                            {features.map((feat, idx) => (
                                <div key={idx} className="flex flex-col gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-[#e8effd] flex items-center justify-center">
                                        {feat.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-[#0a1930] text-base mb-1">{feat.titel}</h3>
                                        <p className="text-sm text-[#718096] leading-relaxed">{feat.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a
                            href="/#ueber-mich"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0a1930] text-white font-semibold rounded-xl hover:bg-[#152a4f] transition-all shadow-xl hover:-translate-y-1"
                        >
                            Über uns kennenlernen
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>

                    {/* Rechte Seite: Bild */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative lg:ml-10"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 border-[6px] border-white/50 aspect-[4/3] sm:aspect-auto sm:h-[600px] w-full">
                            <img 
                                src={warumImg} 
                                alt="Kundengespräch" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Floating Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-white rounded-2xl p-6 shadow-xl z-20 w-[90%] md:w-auto border border-gray-100"
                        >
                            <div className="flex flex-col gap-3">
                                <div className="font-extrabold text-[#1e5adb]">Kundenservice, der begeistert</div>
                                <div className="text-sm text-[#718096]">Wir sind erst zufrieden, wenn du es bist.</div>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex -space-x-2">
                                        <img src="https://i.pravatar.cc/100?img=1" alt="avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="https://i.pravatar.cc/100?img=2" alt="avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="https://i.pravatar.cc/100?img=3" alt="avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                                    </div>
                                    <div className="w-8 h-8 bg-[#1e5adb] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                                        5.0
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
