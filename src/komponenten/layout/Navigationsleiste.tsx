import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ChevronDown, Phone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/bilder/logo_simply.png';

const Navigationsleiste = () => {
    const [istGescrollt, setIstGescrollt] = useState(false);
    const [menueOffen, setMenueOffen] = useState(false);
    const aktuellerOrt = useLocation();

    useEffect(() => {
        const behandleScrollen = () => {
            setIstGescrollt(window.scrollY > 20);
        };
        window.addEventListener('scroll', behandleScrollen);
        return () => window.removeEventListener('scroll', behandleScrollen);
    }, []);

    const handleNavClick = (pfad: string) => {
        if (aktuellerOrt.pathname === pfad) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const navigationsLinks = [
        { 
            name: 'Über uns', 
            pfad: '/#ueber-mich'
        },
        { 
            name: 'Privat', 
            pfad: '/privatkunden',
            sub: [
                { name: 'Haftpflicht', pfad: '/privatkunden#haftpflicht' },
                { name: 'Einkommensschutz & Vorsorge', pfad: '/privatkunden#vorsorge' },
                { name: 'Hausrat', pfad: '/privatkunden#hausrat' },
                { name: 'Kfz-Versicherung', pfad: '/privatkunden#kfz-versicherung' },
                { name: 'Kontakt aufnehmen', pfad: '/privatkunden#kontakt' }
            ]
        },
        { 
            name: 'Beamte', 
            pfad: '/beamte',
            sub: [
                { name: 'Dienstunfähigkeitsversicherung', pfad: '/beamte#dienstunfaehigkeit' },
                { name: 'Private Krankenversicherung', pfad: '/beamte#krankenversicherung' },
                { name: 'Beihilfe & Heilfürsorge', pfad: '/beamte#beihilfe' },
                { name: 'Schutz im Referendariat', pfad: '/beamte#referendariat' },
                { name: 'Kontakt aufnehmen', pfad: '/beamte#kontakt' }
            ]
        },
        { name: 'Kontakt', pfad: '/#kontakt' }
    ];

    return (
        <header
            className="fixed w-full z-50 top-0 left-0 right-0 bg-white border-b border-transparent transition-all duration-300 ease-out"
        >
            {/* Blaue Top-Bar */}
            <div
                className={`bg-marke-primaer text-white transition-all duration-300 ease-in-out ${
                    istGescrollt ? 'h-0 py-0 opacity-0 overflow-hidden' : 'h-10 py-2.5 opacity-100'
                }`}
            >
                <div className="max-w-[1650px] mx-auto px-6 lg:px-12 flex justify-between items-center text-xs font-semibold">
                    <div className="flex items-center gap-6">
                        <a
                            href="tel:+496436921334"
                            className="hover:text-marke-highlight flex items-center gap-1.5 transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Tel: +49 6436 921334</span>
                        </a>
                        <a
                            href="mailto:kegler@simply-switch.de"
                            className="hover:text-marke-highlight flex items-center gap-1.5 transition-colors"
                        >
                            <Mail className="w-3.5 h-3.5" />
                            <span>E-Mail: kegler@simply-switch.de</span>
                        </a>
                    </div>
                    <div className="hidden sm:block">
                        <span>✨ Unabhängiger Versicherungsmakler Sven Kegler</span>
                    </div>
                </div>
            </div>

            {/* Hauptnavigation */}
            <div
                className={`transition-all duration-300 ${
                    istGescrollt ? 'border-gray-100 shadow-sm py-2' : 'py-4 md:py-6'
                }`}
            >
                <div className="max-w-[1650px] mx-auto px-6 lg:px-12 flex items-center justify-between">
                    {/* Logo ganz links */}
                    <Link to="/" className="flex items-center shrink-0 relative z-10">
                        <img
                            src={logo}
                            alt="simply switch logo"
                            className={`${
                                istGescrollt ? 'h-14 md:h-16' : 'h-20 md:h-24'
                            } w-auto object-contain transition-all duration-300`}
                        />
                    </Link>

                {/* Desktop-Navigation in der Mitte */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navigationsLinks.map((link) => {
                        const aktiv = link.pfad === '/'
                            ? aktuellerOrt.pathname === '/'
                            : aktuellerOrt.pathname.startsWith(link.pfad);

                        if (link.sub) {
                            return (
                                <div key={link.name} className="relative group py-2">
                                    <Link
                                        to={link.pfad}
                                        className={`relative text-base font-bold transition-colors flex items-center gap-1 pb-1 ${
                                            aktiv
                                                ? 'text-[#1e5adb]'
                                                : 'text-text-haupt hover:text-[#1e5adb]'
                                        }`}
                                    >
                                        {link.name}
                                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                        {aktiv && (
                                            <motion.span
                                                layoutId="nav-indikator"
                                                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1e5adb] rounded-full"
                                                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                            />
                                        )}
                                    </Link>
                                    
                                    {/* Premium Dropdown Menu */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" style={{minWidth: '17rem'}}>
                                        {link.sub.map((subItem) => (
                                            <span key={subItem.name}>
                                                {subItem.name === 'Kontakt aufnehmen' && (
                                                    <span className="block mx-4 my-1.5 border-t border-gray-100" />
                                                )}
                                                <Link
                                                    to={subItem.pfad}
                                                    className={`flex items-center gap-2 px-5 py-3 text-base font-semibold transition-colors ${
                                                        subItem.name === 'Kontakt aufnehmen'
                                                            ? 'text-[#1e5adb] hover:text-[#1546b3] hover:bg-[#e8effd]/40'
                                                            : 'text-gray-600 hover:text-[#1e5adb] hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.name}
                                to={link.pfad}
                                onClick={() => handleNavClick(link.pfad)}
                                className={`relative text-base font-bold transition-colors pb-1 ${
                                    aktiv
                                        ? 'text-[#1e5adb]'
                                        : 'text-text-haupt hover:text-[#1e5adb]'
                                }`}
                            >
                                {link.name}
                                {aktiv && (
                                    <motion.span
                                        layoutId="nav-indikator"
                                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1e5adb] rounded-full"
                                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>


                {/* Desktop-Aktionen (Kundenlogin rechts) */}
                <div className="hidden lg:flex items-center gap-3">
                    <Link
                        to="/schaden-melden"
                        className="flex items-center gap-2 px-5 py-2.5 border-2 border-marke-highlight text-[#0a1930] hover:bg-marke-highlight hover:text-white text-sm font-bold rounded-lg transition-all duration-300"
                    >
                        <span>⚠️ Schaden melden</span>
                    </Link>
                    <a
                        href="https://login.simplr.de/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#0a1930] text-white text-sm font-semibold rounded-lg hover:bg-[#152a4f] transition-colors"
                    >
                        <span>Kundenlogin</span>
                        <User className="w-4 h-4" />
                    </a>
                </div>

                {/* Mobile Menü Toggle (rechts auf Mobile) */}
                <button
                    className="lg:hidden p-2 text-text-haupt hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setMenueOffen(!menueOffen)}
                >
                    {menueOffen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
        </div>

            {/* Mobiles Menü */}
            <AnimatePresence>
                {menueOffen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navigationsLinks.map((link) => (
                                <div key={link.name} className="space-y-1">
                                    <Link
                                        to={link.pfad}
                                        onClick={() => {
                                            handleNavClick(link.pfad);
                                            setMenueOffen(false);
                                        }}
                                        className="block px-4 py-3 text-base font-semibold text-text-haupt hover:bg-gray-50 rounded-lg"
                                    >
                                        {link.name}
                                    </Link>
                                    {link.sub && (
                                        <div className="pl-6 space-y-1 border-l border-gray-100 ml-4">
                                            {link.sub.map((subItem) => (
                                                <span key={subItem.name}>
                                                    {subItem.name === 'Kontakt aufnehmen' && (
                                                        <span className="block my-1 border-t border-gray-100" />
                                                    )}
                                                    <Link
                                                        to={subItem.pfad}
                                                        className={`block px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                                                            subItem.name === 'Kontakt aufnehmen'
                                                                ? 'text-[#1e5adb] hover:bg-[#e8effd]/40'
                                                                : 'text-gray-500 hover:text-marke-primaer hover:bg-gray-50'
                                                        }`}
                                                        onClick={() => setMenueOffen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-2">
                                <Link
                                    to="/schaden-melden"
                                    className="flex items-center justify-center gap-2 w-full py-3 border-2 border-marke-highlight text-[#0a1930] font-bold rounded-lg hover:bg-marke-highlight hover:text-white transition-all duration-300"
                                    onClick={() => setMenueOffen(false)}
                                >
                                    <span>⚠️ Schaden melden</span>
                                </Link>
                                <a
                                    href="https://login.simplr.de/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#0a1930] text-white font-bold rounded-lg hover:bg-[#152a4f] transition-colors"
                                    onClick={() => setMenueOffen(false)}
                                >
                                    <span>Kundenlogin</span>
                                    <User className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navigationsleiste;
