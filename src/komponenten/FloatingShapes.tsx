import { motion } from 'framer-motion';

const FloatingShapes = () => {
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
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: "110vh", opacity: 0 }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 0.15, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 20,
                        ease: "linear"
                    }}
                    className="absolute bg-marke-primaer/10 border border-marke-primaer/20"
                    style={{
                        width: Math.random() * 40 + 20,
                        height: Math.random() * 40 + 20,
                        left: `${Math.random() * 100}%`,
                        borderRadius: Math.random() > 0.5 ? '50%' : '4px'
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingShapes;
