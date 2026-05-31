import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/bilder/logo_simply.png';

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

    const navigationsLinks = [
        { name: 'Startseite', pfad: '/' },
        { 
            name: 'Privatkunden', 
            pfad: '/privatkunden',
            sub: [
                { name: 'Haftpflicht', pfad: '/privatkunden#haftpflicht' },
                { name: 'Hausrat', pfad: '/privatkunden#hausrat' },
                { name: 'Kfz-Versicherung', pfad: '/privatkunden#kfz-versicherung' },
                { name: 'Vorsorge', pfad: '/privatkunden#vorsorge' }
            ]
        },
        { 
            name: 'Beamte', 
            pfad: '/beamte',
            sub: [
                { name: 'Dienstunfähigkeit', pfad: '/beamte#dienstunfaehigkeit' },
                { name: 'Private Krankenversicherung', pfad: '/beamte#krankenversicherung' },
                { name: 'Beihilfe & Heilfürsorge', pfad: '/beamte#beihilfe' },
                { name: 'Referendariat', pfad: '/beamte#referendariat' }
            ]
        },
        { 
            name: 'Selbstständige', 
            pfad: '/gewerbekunden',
            sub: [
                { name: 'Betriebshaftpflicht', pfad: '/gewerbekunden#betriebshaftpflicht' },
                { name: 'Inhaltsversicherung', pfad: '/gewerbekunden#inhaltsversicherung' },
                { name: 'Flottenversicherung', pfad: '/gewerbekunden#flottenversicherung' },
                { name: 'Rechtsschutz', pfad: '/gewerbekunden#rechtsschutz' }
            ]
        },
        { name: 'Über uns', pfad: '/#ueber-mich' },
        { name: 'FAQ', pfad: '/#faq' },
        { name: 'Kontakt', pfad: '/#kontakt' }
    ];

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ease-out top-0 left-0 right-0 bg-white border-b ${istGescrollt ? 'border-gray-100 shadow-sm py-2' : 'border-transparent py-4'}`}
        >
            <div className="max-w-[1650px] mx-auto px-6 lg:px-12 flex items-center justify-between">

                {/* Logo ganz links */}
                <Link to="/" className="flex items-center shrink-0 relative z-10">
                    <img
                        src={logo}
                        alt="simply switch logo"
                        className={`${istGescrollt ? 'h-14 md:h-16' : 'h-20 md:h-24'} w-auto object-contain transition-all duration-300`}
                    />
                </Link>

                {/* Desktop-Navigation in der Mitte */}
                <nav className="hidden lg:flex items-center gap-12">
                    {navigationsLinks
                        .filter(link => link.name !== 'Startseite' || aktuellerOrt.pathname !== '/')
                        .map((link) => {
                            if (link.sub) {
                                return (
                                    <div key={link.name} className="relative group py-2">
                                        <Link
                                            to={link.pfad}
                                            className={`text-sm font-semibold transition-colors flex items-center gap-1 ${aktuellerOrt.pathname === link.pfad
                                                ? 'text-marke-primaer'
                                                : 'text-text-haupt hover:text-marke-primaer'
                                                }`}
                                        >
                                            {link.name}
                                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                        </Link>
                                        
                                        {/* Premium Dropdown Menu */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                            {link.sub.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.pfad}
                                                    className="block px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-marke-primaer hover:bg-gray-50 transition-colors"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={link.name}
                                    to={link.pfad}
                                    className={`text-sm font-semibold transition-colors ${aktuellerOrt.pathname === link.pfad
                                        ? 'text-marke-primaer'
                                        : 'text-text-haupt hover:text-marke-primaer'
                                        }`}
                                >
                                    {link.name}
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
                            {navigationsLinks
                                .filter(link => link.name !== 'Startseite' || aktuellerOrt.pathname !== '/')
                                .map((link) => (
                                    <div key={link.name} className="space-y-1">
                                        <Link
                                            to={link.pfad}
                                            className="block px-4 py-3 text-base font-semibold text-text-haupt hover:bg-gray-50 rounded-lg"
                                            onClick={() => setMenueOffen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                        {link.sub && (
                                            <div className="pl-6 space-y-1 border-l border-gray-100 ml-4">
                                                {link.sub.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        to={subItem.pfad}
                                                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:text-marke-primaer hover:bg-gray-50 rounded-md"
                                                        onClick={() => setMenueOffen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
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
