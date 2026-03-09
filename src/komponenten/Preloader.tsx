import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import logo from '../assets/logo2-Photoroom.png';

const Preloader = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 15);
        return () => clearInterval(interval);
    }, []);

    const bars = Array.from({ length: 5 });

    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
            {/* Staggered Exit Panels */}
            {bars.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scaleY: 1 }}
                    exit={{
                        scaleY: 0,
                        transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: i * 0.1 }
                    }}
                    style={{
                        left: `${(100 / bars.length) * i}%`,
                        width: `${100 / bars.length}%`,
                        transformOrigin: "top"
                    }}
                    className="absolute inset-y-0 bg-[#020A39] z-10"
                />
            ))}

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-auto"
            >
                <div className="relative flex flex-col items-center">
                    {/* Logo im Preloader */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <img src={logo} alt="simply switch logo" className="h-16 md:h-20 w-auto brightness-0 invert" />
                    </motion.div>
                    {/* Background Circle Glow */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-marke-primaer rounded-full blur-[80px]"
                    />

                    {/* Counter Text */}
                    <div className="relative">
                        <motion.span
                            className="text-[120px] md:text-[180px] font-black text-white leading-none tracking-tighter mix-blend-difference"
                        >
                            {counter}<span className="text-marke-primaer text-4xl md:text-6xl text-stroke">%</span>
                        </motion.span>
                    </div>

                    {/* Animated Text Sequence */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 flex gap-4 items-center justify-center"
                    >
                        <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-bold">Initializing</span>
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-1 h-1 bg-marke-primaer rounded-full"
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <style>{`
                .text-stroke {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.2);
                }
            `}</style>
        </div>
    );
};

export default Preloader;
