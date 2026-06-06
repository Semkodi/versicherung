import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyBottomBanner = () => {
    const [sichtbar, setSichtbar] = useState(false);
    const [geschlossen, setGeschlossen] = useState(false);

    useEffect(() => {
        const behandleScrollen = () => {
            if (geschlossen) return;
            setSichtbar(window.scrollY > 200);
        };
        window.addEventListener('scroll', behandleScrollen);
        return () => window.removeEventListener('scroll', behandleScrollen);
    }, [geschlossen]);

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <AnimatePresence>
            {sichtbar && !geschlossen && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-[#0253ee] text-white py-4.5 px-6 md:px-12 border-t border-[#0042c7] shadow-[0_-10px_35px_rgba(2,83,238,0.15)]"
                >
                    <div className="max-w-[1650px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-center sm:text-left">
                            <FileText className="w-5.5 h-5.5 text-white animate-pulse flex-shrink-0" />
                            <span className="text-sm font-semibold tracking-wide">
                                Online-Formulare | Du möchtest einen Schaden melden oder uns Änderungen mitteilen?
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-3 flex-wrap justify-center">
                            <Link
                                to="/schaden-melden"
                                className="bg-[#020A39] hover:bg-[#0c1c4f] text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors shadow-md whitespace-nowrap"
                            >
                                Schaden melden
                            </Link>
                            <button
                                onClick={() => handleScrollTo('kontakt')}
                                className="bg-white hover:bg-gray-50 text-[#0253ee] text-xs font-bold py-2 px-4 rounded-lg transition-colors shadow-md whitespace-nowrap"
                            >
                                Änderungen mitteilen
                            </button>
                            <button
                                onClick={() => setGeschlossen(true)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                                aria-label="Banner schließen"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyBottomBanner;
