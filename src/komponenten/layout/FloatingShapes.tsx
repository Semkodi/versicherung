import { motion } from 'framer-motion';

// Vordefinierte, harmonisch abgestimmte Partikel-Eigenschaften (behebt Math.random Purity-Fehler im Render)
const PARTIKEL_EIGENSCHAFTEN = [
    { id: 0, duration: 25, delay: 2, width: 45, height: 45, left: '12%', borderRadius: '50%' },
    { id: 1, duration: 18, delay: 5, width: 30, height: 30, left: '28%', borderRadius: '4px' },
    { id: 2, duration: 22, delay: 0, width: 55, height: 55, left: '45%', borderRadius: '50%' },
    { id: 3, duration: 27, delay: 8, width: 20, height: 20, left: '62%', borderRadius: '4px' },
    { id: 4, duration: 15, delay: 3, width: 40, height: 40, left: '78%', borderRadius: '50%' },
    { id: 5, duration: 20, delay: 1, width: 35, height: 35, left: '90%', borderRadius: '4px' }
];

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
            {PARTIKEL_EIGENSCHAFTEN.map((p) => (
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
