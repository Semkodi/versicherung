import { motion } from 'framer-motion';
import { Users, ShieldCheck, Star, Zap } from 'lucide-react';

const VertrauensLeiste = () => {
    const trustItems = [
        {
            icon: <Star className="w-6 h-6 text-[#fbbf24]" />,
            zahl: "4.9",
            text: "Kundenbewertung"
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-[#38a169]" />,
            zahl: "100%",
            text: "unabhängig"
        },
        {
            icon: <Zap className="w-6 h-6 text-[#1e5adb]" />,
            zahl: "Schnell",
            text: "& digital"
        },
        {
            icon: <Users className="w-6 h-6 text-[#718096]" />,
            zahl: "1000+",
            text: "Kunden vertrauen uns"
        }
    ];

    return (
        <section className="bg-[#0a1930] py-12 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {trustItems.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`flex items-center justify-center gap-4 ${index > 1 ? 'pt-8 md:pt-0' : ''}`}
                        >
                            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                                {item.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-extrabold text-white leading-tight">
                                    {item.zahl}
                                </span>
                                <span className="text-sm font-medium text-white/80">
                                    {item.text}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VertrauensLeiste;
