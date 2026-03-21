import { motion } from 'framer-motion';

const bausteine = [
    { text: "PKV", color: "bg-[#0253ee]", textColor: "text-white" },
    { text: "Dienstunfähigkeit", color: "bg-[#020A39]", textColor: "text-white" },
    { text: "Beihilfe", color: "bg-[#0B154D]", textColor: "text-white" },
    { text: "Haftpflicht", color: "bg-[#FFBE36]", textColor: "text-[#020A39]" },
    { text: "Vorsorge", color: "bg-[#0476D8]", textColor: "text-white" },
    { text: "Anwartschaft", color: "bg-[#0253ee]", textColor: "text-white" },
    { text: "Ehrlichkeit", color: "bg-[#020A39]", textColor: "text-white" },
    { text: "Unabhängigkeit", color: "bg-[#0B154D]", textColor: "text-white" }
];

const PhysikSektion = () => {
    return (
        <section className="py-20 bg-hintergrund-alt relative overflow-hidden border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
                    <div>
                        <span className="text-marke-primaer text-sm font-bold tracking-widest uppercase mb-3 block">Fundament für deine Karriere</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-text-haupt leading-tight">
                            Deine Absicherung ist<br />
                            <span className="text-marke-primaer">kein Zufallsprodukt</span>
                        </h2>
                        <p className="text-text-neben text-lg font-light mb-8 max-w-xl mx-auto lg:mx-0">
                            Wir setzen deine Versicherungsbausteine so zusammen, dass sie ein perfektes und stabiles Fundament bilden – individuell auf dich abgestimmt.
                        </p>
                    </div>

                    <div className="relative group mt-8 lg:mt-0">
                        <div className="w-full bg-white/50 backdrop-blur-sm rounded-[2rem] border border-gray-200 p-8 shadow-sm">
                            <div className="flex flex-wrap gap-4 justify-center">
                                {bausteine.map((b, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className={`${b.color} ${b.textColor} px-6 py-4 rounded-xl font-bold text-sm shadow-md cursor-default border border-white/10`}
                                    >
                                        {b.text}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhysikSektion;
