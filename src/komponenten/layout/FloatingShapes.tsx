import { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingShapes = () => {
    // Generiere Partikel-Eigenschaften einmalig beim Mounten für deterministische Animationen (verhindert Flackern bei Re-renders)
    const partikelEigenschaften = useMemo(() => {
        return [...Array(6)].map((_, i) => ({
            id: i,
            duration: 15 + Math.random() * 10,
            delay: Math.random() * 20,
            width: Math.random() * 40 + 20,
            height: Math.random() * 40 + 20,
            left: `${Math.random() * 100}%`,
            borderRadius: Math.random() > 0.5 ? '50%' : '4px'
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Große, extrem subtile wabernde Formen */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-marke-primaer/5 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-marke-sekundaer/5 rounded-full blur-[100px]"
            />

            {/* Kleine "Partikel" oder Quadrate die langsam steigen */}
            {partikelEigenschaften.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: "110vh", opacity: 0 }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 0.15, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                    className="absolute bg-marke-primaer/10 border border-marke-primaer/20"
                    style={{
                        width: p.width,
                        height: p.height,
                        left: p.left,
                        borderRadius: p.borderRadius
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingShapes;
