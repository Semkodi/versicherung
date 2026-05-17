import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export const ScrollReveal = ({ children, width = "100%", delay = 0.2, direction = "up" }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
            scale: 0.95,
            filter: "blur(10px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
        },
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 1, delay: delay, ease: [0.16, 1, 0.3, 1] as any }}
            >
                {children}
            </motion.div>
        </div>
    );
};
