import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, User, ChevronDown, ShieldAlert, Home, ShieldCheck, GraduationCap, Mail, FileCheck, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/bilder/logo_simply.png';

// Typen für Navigationslinks
interface NavSubItem { name: string; pfad: string; }
interface NavLink { name: string; pfad: string; icon: React.ReactNode; sub?: NavSubItem[]; }

// Moderne Dropdown-Komponente mit Framer Motion für den Desktop-Header (nicht gescrollt)
const DropdownMenu = ({ link, aktiv }: { link: NavLink; aktiv: boolean }) => {
    const [offen, setOffen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Schließen bei Klick außerhalb
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOffen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div
            ref={ref}
            className="relative py-2"
            onMouseEnter={() => setOffen(true)}
            onMouseLeave={() => setOffen(false)}
        >
            {/* Trigger-Link */}
            <Link
                to={link.pfad}
                className={`relative text-base font-bold transition-colors flex items-center gap-1.5 pb-1 ${aktiv ? 'text-[#1e5adb]' : 'text-text-haupt hover:text-[#1e5adb]'
                    }`}
            >
                {link.name}
                <motion.span
                    animate={{ rotate: offen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="inline-flex"
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.span>
                {aktiv && (
                    <motion.span
                        layoutId="nav-indikator"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1e5adb] rounded-full"
                        transition={{ type: 'spring' as const, stiffness: 500, damping: 35 }}
                    />
                )}
            </Link>

            {/* Dropdown-Inhalt */}
            <AnimatePresence>
                {offen && (
                    <motion.div
                        initial={{ scaleY: 0, opacity: 0.6 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                        style={{
                            transformOrigin: 'top center',
                            minWidth: '18rem',
                        }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
                    >
                        <div className="bg-white border border-gray-200/50 rounded-2xl shadow-[0_16px_48px_rgba(2,10,57,0.08)] overflow-hidden">
                            <div className="h-[2px] w-full bg-gradient-to-r from-[#1e5adb] via-[#3b7ef8] to-[#0253ee]" />
                            <div className="py-2.5 px-1">
                                {link.sub!.map((subItem, idx) => (
                                    <motion.span
                                        key={subItem.name}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.05 + idx * 0.055,
                                            duration: 0.22,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        style={{ display: 'block' }}
                                    >
                                        {subItem.name === 'Kontakt aufnehmen' && (
                                            <span className="block mx-4 my-2 border-t border-gray-100" />
                                        )}
                                        <Link
                                            to={subItem.pfad}
                                            onClick={() => setOffen(false)}
                                            className={`group flex items-center gap-3.5 px-4 py-2.5 text-[15px] font-bold transition-all duration-200 rounded-xl hover:translate-x-1 ${
                                                subItem.name === 'Kontakt aufnehmen'
                                                    ? 'text-[#1e5adb] hover:bg-[#e8effd]/70'
                                                    : 'text-gray-600 hover:text-[#1e5adb] hover:bg-[#1e5adb]/5'
                                            }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-125 ${
                                                subItem.name === 'Kontakt aufnehmen' ? 'bg-[#1e5adb]' : 'bg-gray-300 group-hover:bg-[#1e5adb]'
                                            }`} />
                                            {subItem.name}
                                        </Link>
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Navigationsleiste = () => {
    const [istGescrollt, setIstGescrollt] = useState(false);
    const [menueOffen, setMenueOffen] = useState(false);
    const [scrollFortschritt, setScrollFortschritt] = useState(0);
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const aktuellerOrt = useLocation();
    const istStartseite = aktuellerOrt.pathname === '/' || aktuellerOrt.pathname === '/versicherung/' || aktuellerOrt.pathname === '/versicherung';

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIstGescrollt(latest > 100);
        const gesamtHoehe = document.documentElement.scrollHeight - window.innerHeight;
        setScrollFortschritt(gesamtHoehe > 0 ? Math.min(100, Math.round((latest / gesamtHoehe) * 100)) : 0);
    });

    const toggleMenu = () => {
        setMenueOffen(!menueOffen);
        setExpandedMenu(null);
    };

    const toggleExpand = (name: string) => {
        setExpandedMenu(expandedMenu === name ? null : name);
    };

    const handleNavClick = (pfad: string) => {
        const [pfadName, hashPart] = pfad.split('#');
        if (aktuellerOrt.pathname === pfadName || (pfadName === '/' && (aktuellerOrt.pathname === '/versicherung' || aktuellerOrt.pathname === '/versicherung/'))) {
            if (hashPart) {
                const element = document.getElementById(hashPart);
                if (element) {
                    const yOffset = -120;
                    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const navigationsLinks: NavLink[] = [
        {
            name: 'Startseite',
            pfad: '/',
            icon: <Home className="w-5 h-5" />
        },
        {
            name: 'Über uns',
            pfad: '/ueber-uns',
            icon: <User className="w-5 h-5" />
        },
        {
            name: 'Vertragscheck',
            pfad: '/#ordner-check',
            icon: <FileCheck className="w-5 h-5" />
        },
        {
            name: 'Privat',
            pfad: '/privatkunden',
            icon: <ShieldCheck className="w-5 h-5" />,
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
            icon: <GraduationCap className="w-5 h-5" />,
            sub: [
                { name: 'Dienstunfähigkeitsversicherung', pfad: '/beamte#dienstunfaehigkeit' },
                { name: 'Private Krankenversicherung', pfad: '/beamte#krankenversicherung' },
                { name: 'Beihilfe & Heilfürsorge', pfad: '/beamte#beihilfe' },
                { name: 'Schutz im Referendariat', pfad: '/beamte#referendariat' },
                { name: 'Kontakt aufnehmen', pfad: '/beamte#kontakt' }
            ]
        },
        { 
            name: 'Kontakt', 
            pfad: '/termin-vereinbaren',
            icon: <Mail className="w-5 h-5" />
        }
    ];

    // Varianten für das schwebende Popup-Menü
    const menuVariants = {
        closed: {
            opacity: 0,
            scale: 0.8,
            y: -50,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        closed: {
            y: 20,
            opacity: 0,
            scale: 0.8
        },
        open: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 25
            }
        }
    };


    return (
        <>
            {/* Desktop & Normaler Header - bleibt beim Scrollen fixiert und wird kleiner */}
            <header
                className={`fixed w-full z-50 top-0 left-0 right-0 border-b transition-all duration-300 ${
                    istGescrollt 
                        ? 'bg-[#dde1e6]/95 backdrop-blur-md shadow-md border-gray-300/60' 
                        : 'bg-[#dde1e6] border-gray-300/40'
                }`}
            >
                {/* Scroll-Fortschrittsbalken am unteren Rand der Navbar */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#1e5adb] via-[#3b7ef8] to-[#0253ee] z-50 origin-left rounded-r-full"
                    style={{ width: `${scrollFortschritt}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }}
                />

                {/* Hauptnavigation */}
                <div className={`transition-all duration-300 ${istGescrollt ? 'py-2 md:py-3' : 'py-4 md:py-6'}`}>
                    <div className="w-full px-4 md:px-8 flex items-center justify-between">
                        {/* Logo ganz links */}
                        <Link
                            to="/"
                            className="flex items-center shrink-0 relative z-10"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <img
                                src={logo}
                                alt="simply switch logo"
                                className={`w-auto object-contain transition-all duration-300 ${
                                    istGescrollt ? 'h-12 md:h-14' : 'h-20 md:h-24'
                                }`}
                            />
                        </Link>

                        {/* Desktop-Navigation in der Mitte */}
                        <nav className="hidden lg:flex items-center gap-10 xl:gap-14">
                            {navigationsLinks.map((link) => {
                                const aktiv = link.pfad === '/'
                                    ? aktuellerOrt.pathname === '/'
                                    : (link.pfad === '/ueber-uns'
                                        ? aktuellerOrt.pathname === '/ueber-uns'
                                        : aktuellerOrt.pathname.startsWith(link.pfad.split('#')[0]));

                                if (link.sub) {
                                    return (
                                        <DropdownMenu
                                            key={link.name}
                                            link={link}
                                            aktiv={aktiv}
                                        />
                                    );
                                }

                                // Sonderbehandlung für Startseite & Vertragscheck
                                if (link.name === 'Startseite' || link.name === 'Vertragscheck') {
                                    const istAktiv = link.name === 'Startseite'
                                        ? (istStartseite && aktuellerOrt.hash !== '#ordner-check')
                                        : (istStartseite && aktuellerOrt.hash === '#ordner-check');
                                    return (
                                        <Link
                                            key={link.name}
                                            to={link.pfad}
                                            onClick={() => handleNavClick(link.pfad)}
                                            className={`relative text-base font-bold transition-colors pb-1 ${istAktiv
                                                    ? 'text-[#1e5adb]'
                                                    : 'text-text-haupt hover:text-[#1e5adb]'
                                                }`}
                                        >
                                            {link.name}
                                            {istAktiv && (
                                                <motion.span
                                                    layoutId="nav-indikator"
                                                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1e5adb] rounded-full"
                                                    transition={{ type: 'spring' as const, stiffness: 500, damping: 35 }}
                                                />
                                            )}
                                        </Link>
                                    );
                                }

                                return (
                                    <Link
                                        key={link.name}
                                        to={link.pfad}
                                        onClick={() => handleNavClick(link.pfad)}
                                        className={`relative text-base font-bold transition-colors pb-1 ${aktiv
                                                ? 'text-[#1e5adb]'
                                                : 'text-text-haupt hover:text-[#1e5adb]'
                                            }`}
                                    >
                                        {link.name}
                                        {aktiv && (
                                            <motion.span
                                                layoutId="nav-indikator"
                                                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1e5adb] rounded-full"
                                                transition={{ type: 'spring' as const, stiffness: 500, damping: 35 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Desktop-Aktionen rechts */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Link
                                to="/schaden-melden"
                                className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                <ShieldAlert className="w-4 h-4 text-red-200" />
                                <span>Schaden melden</span>
                            </Link>
                            <a
                                href="https://login.simplr.de/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 bg-marke-primaer text-white text-sm font-semibold rounded-lg hover:bg-marke-primaer-hover transition-colors"
                            >
                                <span>Kundenlogin</span>
                                <User className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Mobile Menü Button (wird bei Topbar angezeigt) */}
                        <button
                            className="lg:hidden p-2 text-text-haupt hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                            onClick={toggleMenu}
                            aria-label={menueOffen ? 'Menü schließen' : 'Menü öffnen'}
                            aria-expanded={menueOffen}
                        >
                            {menueOffen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Schwebender Hamburger Button nicht mehr benötigt, da Leiste fixiert bleibt */}

            {/* Schwebendes Popup-Menü */}
            <AnimatePresence>
                {menueOffen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-[#0a1930]/40 backdrop-blur-md z-45"
                            onClick={toggleMenu}
                        />

                        {/* Menü-Container */}
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg"
                        >
                            <div className="relative bg-white/95 border border-white/20 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
                                {/* Schließen Button */}
                                <motion.button
                                    onClick={toggleMenu}
                                    className="absolute top-6 right-6 p-2 text-text-haupt hover:text-red-500 rounded-full hover:bg-gray-100 cursor-pointer"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>

                                {/* Menüpunkte */}
                                <div className="space-y-4 mt-8">
                                    {navigationsLinks.map((item) => (
                                        <motion.div
                                            key={item.name}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.01, x: 4 }}
                                            whileTap={{ scale: 0.99 }}
                                            className="w-full"
                                        >
                                            {item.sub ? (
                                                <div>
                                                    <button
                                                        onClick={() => toggleExpand(item.name)}
                                                        className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer text-left"
                                                    >
                                                        <div className="flex items-center space-x-4">
                                                            <div className="text-[#1e5adb] group-hover:scale-110 transition-transform">
                                                                {item.icon}
                                                            </div>
                                                            <span className="text-lg font-bold text-text-haupt group-hover:text-[#1e5adb] transition-colors">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedMenu === item.name ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    
                                                    <AnimatePresence>
                                                        {expandedMenu === item.name && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="pl-12 space-y-2 mt-2 overflow-hidden border-l border-gray-100 ml-6"
                                                            >
                                                                {item.sub.map((subItem, idx) => (
                                                                    <Link
                                                                        key={idx}
                                                                        to={subItem.pfad}
                                                                        onClick={toggleMenu}
                                                                        className="block py-2 text-base font-semibold text-gray-600 hover:text-[#1e5adb] transition-colors"
                                                                    >
                                                                        {subItem.name}
                                                                    </Link>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <Link
                                                    to={item.pfad}
                                                    onClick={() => {
                                                        handleNavClick(item.pfad);
                                                        toggleMenu();
                                                    }}
                                                    className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                                                >
                                                    <div className="text-[#1e5adb] group-hover:scale-110 transition-transform">
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-lg font-bold text-text-haupt group-hover:text-[#1e5adb] transition-colors">
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            )}
                                        </motion.div>
                                    ))}
                                    
                                    {/* Schaden Melden & Kundenlogin im mobilen Menü */}
                                    <motion.div variants={itemVariants} className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                                        <Link
                                            to="/schaden-melden"
                                            onClick={toggleMenu}
                                            className="flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all shadow-sm"
                                        >
                                            <ShieldAlert className="w-4 h-4 text-red-200" />
                                            <span>Schaden</span>
                                        </Link>
                                        <a
                                            href="https://login.simplr.de/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 py-3 bg-marke-primaer text-white text-sm font-semibold rounded-xl hover:bg-marke-primaer-hover transition-all"
                                        >
                                            <span>Kundenlogin</span>
                                            <LogIn className="w-4 h-4" />
                                        </a>
                                    </motion.div>
                                </div>

                                {/* Deko-Elemente */}
                                <motion.div
                                    className="absolute -top-2 -left-2 w-4 h-4 bg-[#1e5adb] rounded-full"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <motion.div
                                    className="absolute -bottom-2 -right-2 w-3 h-3 bg-orange-400 rounded-full"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.3, 0.8, 0.3]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigationsleiste;
