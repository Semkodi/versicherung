import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar, PhoneCall, AlertTriangle, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyBottomBanner = () => {
    const [sichtbar, setSichtbar] = useState(false);
    const [geschlossen, setGeschlossen] = useState(false);
    const [istGeoeffnet, setIstGeoeffnet] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    useEffect(() => {
        const behandleScrollen = () => {
            if (geschlossen) return;
            setSichtbar(window.scrollY > 200);
        };
        window.addEventListener('scroll', behandleScrollen);
        return () => window.removeEventListener('scroll', behandleScrollen);
    }, [geschlossen]);

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    if (isMobile || !sichtbar || geschlossen) return null;

    const overlayItems = [
        {
            title: "Termin vereinbaren",
            link: "/termin-vereinbaren",
            linkText: "zum Terminformular",
            icon: Calendar
        },
        {
            title: "Rückruf anfordern",
            link: "/rueckruf-anfordern",
            linkText: "zum Rückrufformular",
            icon: PhoneCall
        },
        {
            title: "Schadenmelden online",
            link: "/schaden-melden",
            linkText: "Schaden melden",
            icon: AlertTriangle
        },
        {
            title: "Änderungen mitteilen",
            link: "/aenderungen-mitteilen",
            linkText: "Änderungen mitteilen",
            icon: Upload
        }
    ];

    return (
        <AnimatePresence mode="wait">
            {!istGeoeffnet ? (
                // ─── ZUSTAND 1: SCHMALES BLAUES BANNER ────────────────────────
                <motion.div
                    key="schmales-banner"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-[#0253ee] text-white py-[24px] px-6 md:px-12 border-t border-[#0042c7] shadow-[0_-8px_30px_rgba(2,83,238,0.15)] cursor-pointer select-none"
                    onClick={() => setIstGeoeffnet(true)}
                >
                    {/* Schwebendes X oberhalb des Banners mit blauer Umrandung */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setGeschlossen(true);
                        }}
                        className="absolute -top-[22px] right-6 md:right-12 z-50 w-[44px] h-[44px] rounded-full bg-white border-2 border-[#0253ee] text-[#0253ee] hover:bg-[#e8effd] hover:text-[#020a39] flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer"
                        aria-label="Banner schließen"
                    >
                        <X className="w-[20px] h-[20px] stroke-[2.5]" />
                    </button>

                    <div className="max-w-[1650px] mx-auto flex items-center justify-center">
                        <span className="text-base md:text-lg font-bold tracking-wide hover:underline text-center">
                            Online-Formulare | Sie möchten einen Schaden melden, einen Termin vereinbaren, einen Rückruf anfordern oder uns Änderungen mitteilen?
                        </span>
                    </div>
                </motion.div>
            ) : (
                // ─── ZUSTAND 2: GEÖFFNETER DRAWER / OVERLAY ──────────────────
                <motion.div
                    key="geoeffneter-drawer"
                    initial={{ y: 250, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 250, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-[#f8f9fc] text-[#020A39] border-t-4 border-[#0253ee] shadow-[0_-15px_40px_rgba(0,0,0,0.15)] pb-6 pt-8 px-6 md:px-12"
                >
                    {/* Schließen Button (Blaues Quadrat mit weißem X) */}
                    <button
                        onClick={() => setIstGeoeffnet(false)}
                        className="absolute -top-1 right-0 bg-[#0253ee] hover:bg-[#020a39] text-white p-3.5 transition-colors cursor-pointer flex items-center justify-center w-12 h-12 shadow-md"
                        aria-label="Menü schließen"
                    >
                        <X className="w-6 h-6 stroke-[2.5]" />
                    </button>

                    <div className="max-w-[1450px] mx-auto mt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:gap-y-6 lg:divide-x divide-gray-200">
                            {overlayItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <Link 
                                        key={index} 
                                        to={item.link}
                                        onClick={() => setIstGeoeffnet(false)}
                                        className="flex flex-col items-center text-center py-4 lg:py-2 lg:px-6 group cursor-pointer"
                                    >
                                        <div className="text-[#0253ee] mb-3 group-hover:scale-105 transition-transform duration-200">
                                            <Icon className="w-8 h-8 stroke-[1.2]" />
                                        </div>
                                        <h4 className="font-bold text-sm text-[#020A39] mb-1 group-hover:text-[#0253ee] transition-colors">
                                            {item.title}
                                        </h4>
                                        <span className="text-xs font-bold text-[#0253ee] group-hover:underline">
                                            {item.linkText}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyBottomBanner;
