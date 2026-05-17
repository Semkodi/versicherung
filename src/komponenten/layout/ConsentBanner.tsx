import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookie-consent', 'all');
        setIsVisible(false);
    };

    const handleAcceptNecessary = () => {
        localStorage.setItem('cookie-consent', 'necessary');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 z-[100] pointer-events-none"
                >
                    <div className="max-w-4xl mx-auto bg-marke-sekundaer border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden pointer-events-auto">
                        {/* Background Decoration */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-marke-primaer rounded-full blur-[80px] opacity-20 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
                                <Cookie className="w-8 h-8 text-marke-highlight animate-pulse" />
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-white mb-2">Cookie-Einstellungen</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Wir nutzen Cookies, um dir die bestmögliche Erfahrung auf unserer Website zu bieten. Einige sind notwendig, andere helfen uns, unsere Services zu verbessern. Details findest du in unserer <Link to="/cookies" className="text-marke-highlight hover:underline">Cookie-Richtlinie</Link>.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={handleAcceptNecessary}
                                    className="w-full sm:w-auto px-6 py-3 text-white/70 hover:text-white text-sm font-bold transition-all"
                                >
                                    Nur Notwendige
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="w-full sm:w-auto px-8 py-4 bg-marke-primaer text-white rounded-2xl font-black text-sm shadow-lg hover:shadow-marke-primaer/20 hover:bg-marke-highlight hover:text-marke-sekundaer transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    Alle akzeptieren
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConsentBanner;
