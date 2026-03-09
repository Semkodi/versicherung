import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo2-Photoroom.png';

const Navigationsleiste = () => {
    const [istGescrollt, setIstGescrollt] = useState(false);
    const [menueOffen, setMenueOffen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIstGescrollt(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Fehler vermeiden', href: '#fehler' },
        { name: 'So arbeite ich', href: '#so-arbeite-ich' },
        { name: 'Erfahrungen', href: '#bewertungen' },
        { name: 'Kontakt', href: '#kontakt' },
        { name: 'Über mich', href: '#ueber-mich' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
            className={`fixed w-full z-50 transition-all duration-500 ${istGescrollt
                ? 'bg-marke-sekundaer/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] py-2'
                : 'bg-marke-sekundaer/80 backdrop-blur-md py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo – Doppelt so groß wie vorher */}
                    <a href="#" className="flex items-center gap-2 group">
                        <img
                            src={logo}
                            alt="simply switch logo"
                            className="h-20 md:h-24 w-auto transition-all duration-500 transform group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-bold tracking-wide text-white/90 hover:text-white transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-marke-highlight after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="https://login.simplr.de/#/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-marke-primaer text-white rounded-full font-black transition-all shadow-[0_4px_15px_rgba(2,83,238,0.3)] hover:shadow-[0_8px_25px_rgba(2,83,238,0.5)] hover:bg-marke-highlight hover:text-marke-sekundaer hover:-translate-y-1"
                        >
                            Kundenlogin
                        </a>
                    </div>

                    {/* Mobile Menü Button */}
                    <button
                        className="lg:hidden p-2 text-white transition-colors"
                        onClick={() => setMenueOffen(!menueOffen)}
                        aria-label="Menü umschalten"
                    >
                        {menueOffen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menü – Jetzt auch Dunkel */}
            {menueOffen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-marke-sekundaer border-t border-white/10 shadow-2xl animate-fade-in-up origin-top">
                    <div className="flex flex-col p-6 space-y-5">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-white font-bold text-lg p-3 hover:bg-white/10 rounded-xl transition-colors border-l-2 border-transparent hover:border-marke-highlight"
                                onClick={() => setMenueOffen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="https://login.simplr.de/#/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center px-6 py-5 bg-marke-highlight text-marke-sekundaer rounded-xl font-black shadow-xl"
                        >
                            Kundenlogin
                        </a>
                    </div>
                </div>
            )}
        </motion.nav>
    );
};

export default Navigationsleiste;
