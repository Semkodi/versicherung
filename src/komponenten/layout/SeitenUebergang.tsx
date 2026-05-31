import React from 'react';
import { motion } from 'framer-motion';

// Schnittstelle fuer die Attribute der SeitenUebergang-Komponente
interface SeitenUebergangProps {
    // Die Kinder-Komponenten, die gerendert und animiert werden sollen
    children: React.ReactNode;
}

/**
 * SeitenUebergang-Komponente
 * Huellt eine Seite in ein Framer-Motion-div, um fluessige und 
 * premium-wirkende Übergänge (Transitions) beim Routenwechsel zu realisieren.
 */
const SeitenUebergang: React.FC<SeitenUebergangProps> = ({ children }) => {
    return (
        <motion.div
            // Initiale Zustände, bevor die Seite gerendert wird (leicht nach unten verschoben und unsichtbar)
            initial={{ opacity: 0, y: 20 }}
            // Zielzustand (vollständig sichtbar und auf Originalposition)
            animate={{ opacity: 1, y: 0 }}
            // Zustand beim Verlassen der Route (sanftes Ausblenden nach oben)
            exit={{ opacity: 0, y: -20 }}
            // Konfiguration der Transitions-Geschwindigkeit und Kurve (Apple-like Ease-Out)
            transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1] // Custom Cubic-Bezier fuer ein besonders weiches Gefuehl
            }}
            className="w-full min-h-screen"
        >
            {children}
        </motion.div>
    );
};

export default SeitenUebergang;
