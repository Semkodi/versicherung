import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, GraduationCap, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo2-Photoroom.png';

const Navigationsleiste = () => {
    const [istGescrollt, setIstGescrollt] = useState(false);
    const [menueOffen, setMenueOffen] = useState(false);
    const [aktivesDropdown, setAktivesDropdown] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIstGescrollt(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationsLinks = [
        { name: 'Start', path: '/' },
        {
            name: 'Beamte',
            path: '/beamte',
            icon: <GraduationCap className="w-4 h-4" />,
            subLinks: [
                { name: 'Dienstunfähigkeit', path: '/beamte/du' },
                { name: 'Beihilfe', path: '/beamte/beihilfe' },
                { name: 'Diensthaftpflicht', path: '/beamte/haftpflicht' }
            ]
        },
        { name: 'Privatkunden', path: '/privatkunden' },
        { name: 'Gewerbekunden', path: '/gewerbekunden' },
        { name: 'Über mich', path: '/#ueber-mich' }
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className={`fixed w-full z-50 transition-all duration-700 ease-out left-0 right-0 ${istGescrollt ? 'top-2 sm:top-4 px-4' : 'top-0 px-0'}`}
        >
            <div className={`mx-auto transition-all duration-700 ease-out ${istGescrollt
                ? 'max-w-7xl bg-[#020A39]/85 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-[2rem] border border-white/10 py-2 px-6 sm:px-10'
                : 'max-w-full bg-[#020A39] border-b border-white/5 py-4 px-6 sm:px-12'
                }`}>
                <div className="flex justify-between items-center h-16 sm:h-20">

                    <Link to="/" className="flex items-center group shrink-0 relative z-10">
                        <img
                            src={logo}
                            alt="simply switch logo"
                            className={`${istGescrollt ? 'h-12 sm:h-14' : 'h-16 sm:h-24'} w-auto object-contain transition-all duration-700 ease-out transform group-hover:scale-105 drop-shadow-[0_10px_25px_rgba(255,255,255,0.1)]`}
                        />
                    </Link>

                    <div className="hidden lg:flex items-center gap-2 xl:gap-4">
                        {navigationsLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative group/nav"
                                onMouseEnter={() => setAktivesDropdown(link.name)}
                                onMouseLeave={() => setAktivesDropdown(null)}
                            >
                                <Link
                                    to={link.path}
                                    className={`flex items-center gap-1.5 px-4 py-2 font-bold tracking-wide transition-all rounded-xl hover:bg-white/5 ${location.pathname === link.path ? 'text-marke-highlight' : 'text-white/90'
                                        }`}
                                >
                                    {link.name}
                                    {link.subLinks && (
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${aktivesDropdown === link.name ? 'rotate-180' : ''}`} />
                                    )}
                                </Link>

                                <AnimatePresence>
                                    {link.subLinks && aktivesDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-2 w-64 bg-[#020A39] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 z-50"
                                        >
                                            <div className="flex flex-col">
                                                {link.subLinks.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        to={sub.path}
                                                        className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <a
                            href="https://id.simplr.de/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 text-white/80 hover:text-white font-bold transition-all hover:bg-white/5 rounded-xl"
                        >
                            <Shield className="w-4 h-4 text-marke-highlight" />
                            <span>simplr Login</span>
                        </a>
                        <a
                            href="#kontakt"
                            className="px-8 py-3 bg-marke-primaer text-white rounded-full font-black transition-all shadow-lg hover:shadow-marke-primaer/30 hover:bg-marke-highlight hover:text-marke-sekundaer hover:-translate-y-1"
                        >
                            Infogespräch
                        </a>
                    </div>

                    <button
                        className="lg:hidden p-3 text-white transition-colors bg-white/5 rounded-2xl"
                        onClick={() => setMenueOffen(!menueOffen)}
                        aria-label="Menü umschalten"
                    >
                        {menueOffen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {menueOffen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-[#020A39]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-6">
                            {navigationsLinks.map((link) => (
                                <div key={link.name} className="space-y-4">
                                    <Link
                                        to={link.path}
                                        className="block text-xl font-bold text-white"
                                        onClick={() => setMenueOffen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.subLinks && (
                                        <div className="pl-4 space-y-3 border-l border-white/10">
                                            {link.subLinks.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    to={sub.path}
                                                    className="block text-white/60 hover:text-white text-lg"
                                                    onClick={() => setMenueOffen(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-6 space-y-4">
                                <a
                                    href="https://id.simplr.de/login"
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 text-white rounded-2xl font-bold"
                                >
                                    <Shield className="w-5 h-5 text-marke-highlight" />
                                    simplr Login
                                </a>
                                <a
                                    href="#kontakt"
                                    className="flex items-center justify-center w-full py-4 bg-marke-primaer text-white rounded-2xl font-black shadow-lg"
                                    onClick={() => setMenueOffen(false)}
                                >
                                    Infogespräch
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navigationsleiste;
