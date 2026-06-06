import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ChevronDown, Phone, Mail, ShieldAlert } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/bilder/logo_simply.png';
import useScrollSpy from '@/hooks/useScrollSpy';

// Typen für Navigationslinks
interface NavSubItem { name: string; pfad: string; }
interface NavLink { name: string; pfad: string; sub?: NavSubItem[]; }

// Moderne Dropdown-Komponente mit Framer Motion
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
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                )}
            </Link>

            {/* Rolladen-Dropdown */}
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
                        {/* Karte mit Rollo-Inhalt */}
                        <div className="bg-white/98 backdrop-blur-md border border-gray-100/80 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
                            {/* Blauer Akzentstreifen oben */}
                            <div className="h-[3px] w-full bg-gradient-to-r from-[#1e5adb] via-[#3b7ef8] to-[#0253ee]" />
                            <div className="py-2">
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
                                            <span className="block mx-4 my-1.5 border-t border-gray-100" />
                                        )}
                                        <Link
                                            to={subItem.pfad}
                                            onClick={() => setOffen(false)}
                                            className={`flex items-center gap-3 px-5 py-3 text-[15px] font-semibold transition-all duration-150 rounded-lg mx-1 ${subItem.name === 'Kontakt aufnehmen'
                                                    ? 'text-[#1e5adb] hover:bg-[#e8effd]/60'
                                                    : 'text-gray-600 hover:text-[#1e5adb] hover:bg-[#f4f7ff]'
                                                }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${subItem.name === 'Kontakt aufnehmen' ? 'bg-[#1e5adb]' : 'bg-gray-300'
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
    const aktuellerOrt = useLocation();
    const istStartseite = aktuellerOrt.pathname === '/' || aktuellerOrt.pathname === '/versicherung/' || aktuellerOrt.pathname === '/versicherung';

    // Scroll-Spy: nur auf der Startseite aktiv
    const startseiteIds = useMemo(() => [
        'zielgruppen', 'warum-wir', 'partner', 'bewertungen',
        'ueber-mich', 'so-arbeite-ich', 'wissen', 'faq'
    ], []);
    const aktiveSektionId = useScrollSpy(istStartseite ? startseiteIds : []);

    // Lesbarer Name für die aktive Sektion
    const sektionsNamen: Record<string, string> = {
        'zielgruppen': 'Zielgruppen',
        'warum-wir': 'Warum wir?',
        'partner': 'Partner',
        'bewertungen': 'Kundenstimmen',
        'ueber-mich': 'Über mich',
        'so-arbeite-ich': 'So arbeite ich',
        'wissen': 'Ratgeber',
        'faq': 'FAQ',
    };
    const aktiverSektionsName = aktiveSektionId ? sektionsNamen[aktiveSektionId] : null;

    useEffect(() => {
        const behandleScrollen = () => {
            setIstGescrollt(window.scrollY > 20);
            // Scroll-Fortschritt in Prozent (0–100) berechnen
            const gesamtHoehe = document.documentElement.scrollHeight - window.innerHeight;
            const fortschritt = gesamtHoehe > 0 ? (window.scrollY / gesamtHoehe) * 100 : 0;
            setScrollFortschritt(Math.min(100, Math.round(fortschritt)));
        };
        window.addEventListener('scroll', behandleScrollen, { passive: true });
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
        { name: 'Kontakt', pfad: '/termin-vereinbaren' }
    ];

    return (
        <header
            className="fixed w-full z-50 top-0 left-0 right-0 bg-white border-b border-transparent transition-all duration-300 ease-out"
        >
            {/* Scroll-Fortschrittsbalken am unteren Rand der Navbar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#1e5adb] via-[#3b7ef8] to-[#0253ee] z-50 origin-left rounded-r-full"
                style={{ width: `${scrollFortschritt}%` }}
                transition={{ ease: 'linear', duration: 0.1 }}
            />
            {/* Blaue Top-Bar */}
            <div
                className={`bg-marke-primaer text-white transition-all duration-300 ease-in-out ${istGescrollt ? 'h-0 py-0 opacity-0 overflow-hidden' : 'h-12 py-3.5 opacity-100'
                    }`}
            >
                <div className="max-w-[1650px] mx-auto px-6 lg:px-12 flex justify-end items-center text-xs md:text-sm font-semibold">
                    <div className="flex items-center gap-6 md:gap-8">
                        <a
                            href="tel:+4915127042547"
                            className="hover:text-marke-highlight flex items-center gap-1.5 transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            <span>Tel: 0151 27042547</span>
                        </a>
                        <a
                            href="mailto:kegler@simply-switch.de"
                            className="hover:text-marke-highlight flex items-center gap-1.5 transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            <span>E-Mail: kegler@simply-switch.de</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Hauptnavigation */}
            <div
                className={`transition-all duration-300 ${istGescrollt ? 'border-gray-100 shadow-sm py-2' : 'py-4 md:py-6'
                    }`}
            >
                <div className="max-w-[1650px] mx-auto px-6 lg:px-12 flex items-center justify-between">
                    {/* Logo ganz links – Klick scrollt zurück nach oben */}
                    <Link
                        to="/"
                        className="flex items-center shrink-0 relative z-10"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <img
                            src={logo}
                            alt="simply switch logo"
                            className={`${istGescrollt ? 'h-14 md:h-16' : 'h-20 md:h-24'
                                } w-auto object-contain transition-all duration-300`}
                        />
                    </Link>


                    {/* Desktop-Navigation in der Mitte */}
                    <nav className="hidden lg:flex items-center gap-10 xl:gap-14">
                        {navigationsLinks.map((link) => {
                            const aktiv = link.pfad === '/'
                                ? aktuellerOrt.pathname === '/'
                                : aktuellerOrt.pathname.startsWith(link.pfad.split('#')[0]);

                            if (link.sub) {
                                return (
                                    <DropdownMenu
                                        key={link.name}
                                        link={link}
                                        aktiv={aktiv}
                                    />
                                );
                            }

                            // Sonderbehandlung für "Über uns" – mit Scroll-Spy-Badge
                            if (link.name === 'Über uns') {
                                const ueberUnsAktiv = istStartseite;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.pfad}
                                        onClick={() => handleNavClick(link.pfad)}
                                        className={`relative text-base font-bold transition-colors pb-1 flex flex-col items-start gap-0 ${ueberUnsAktiv
                                                ? 'text-[#1e5adb]'
                                                : 'text-text-haupt hover:text-[#1e5adb]'
                                            }`}
                                    >
                                        <span className="relative">
                                            {link.name}
                                            {ueberUnsAktiv && (
                                                <motion.span
                                                    layoutId="nav-indikator"
                                                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1e5adb] rounded-full"
                                                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                                />
                                            )}
                                        </span>
                                        {/* Scroll-Spy-Badge: zeigt aktuelle Sektion beim Scrollen */}
                                        <AnimatePresence mode="wait">
                                            {istStartseite && aktiverSektionsName && (
                                                <motion.span
                                                    key={aktiverSektionsName}
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 4 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-[10px] font-semibold text-[#0253ee] bg-[#e8effd] px-2 py-0.5 rounded-full leading-none whitespace-nowrap"
                                                >
                                                    {aktiverSektionsName}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
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
                            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <ShieldAlert className="w-4 h-4 text-red-200" />
                            <span>Schaden melden</span>
                        </Link>
                        <a
                            href="https://id.simplr.de/login?login_challenge=hMDge3ajx5W_UwQ8Ok_LzZHNT2GRAGizEHpq8t4cXA05lJTCbZ6E6kXBd5ThKrMKvG4D5lwcjaIhQ53FhXBuMF_B1m51I1BuBpyAXF9tkce2b9dttsZtbdl8I-TVn6ZFjLeCg2boEJFU4PgoH0W56qaS4pslBuJ9fl4_oktu4geZVNOSQTlxkCsQ6f7_rS64_S1oXIMAZ1mk6WQlZr8_Rvjiqcow-SCb1wjOXO5-pjm6wRtgnQv_P-_NaZQ1NWk0tse8uqfZy27xSLYrF0cyMwlj5VHtlvPVOEXyTDLbFd22EWCLqaUl8O1HhRweGuhG6hy5JCQdOMyTVyPzp9gToVtb8iS2p8H2b1X6mRq-EjFq9L2N6XDTc1GlNpk9T70L2RyPW7sRh8Ch4ckYcixYh72TPhE0tEmYXF0CPH_J8FlqCwszx3Lx_o40l5NL2To0iXaDXMnkB4HaaWlugwIWcwGI9M9kRjRjTaHS1NCYB-9eT3KYsjmWpU9dEbI6uhJ9XoDXqPzQWb6HHoFKHOtfNkRcSm5OwcLXDJNsKTH669Arx0rajL6dm8p_F2yLa1yq39qjVFZBrZrHJLjkLOHrtYoCNTxOv3ABBvJdfg7CM0Q3L2tE2YpXcsRIYtbW86mSrdCHw9xtmFINK7OpOy-bZd4g4vi0dVKhiYnelgmvgJev3VcKmYnWPj6h2bgA2UDvcovW5b7yioETMI1fahyQAMugjsAJv-7gvPXAg79vQ_eSCymFnPNy-5aziV4il47v0Rmw1ydGh5gSSV0byiuM1TS86I-nPH5bmg-Pfu_qv3DULNllZVhuPQCNBmLEjzj30Whv-ook88mnRk_QIjlDynSgu-zVrJGgc5T-K8W33xAvoNObVLLFknTJqoTRwRlhpdFaj4esyT2lMRz5s3gLTwMzDlqTmUklbr2GzRNVTOhHPtBIKntHVUxmy_WpU7zbdPFlCgS0y5ukY8cpBmZ9g28FZZICvgjQCVewb51DT65rCrF0jqCKrzKwKhmueQsNCwhwuK5q1LduO7o1bF5-_TysrNc-CzrVinqUNZG1T1rtyN8UwLGINEtT5fzZ-_uzLFGgSZkrHqY0ScdyVHC6hZQ6mU8K4m-L8f8rASDjXkaCqliHNgilSVhBMR8UPoXR_97LgeCBCGqbTDf0E4taZIM9n6DMhFPHLHAF98A7CPo3pr9wB_vPHOWZaInBYbiELPN0ENWDsDC16x0M8FE8l84HbygNTcyZOBgNM3bU2V7X-3CYCypIXSxsxifuYL5SaSNxyUtUxeVFzzz3v8H5m4DYhO3j-AfsT4knBnLm0w-A8-uas0hw8DfGWVtQkB0xsgLZ6rDleSDpKYJvzwMXfhB9cqHT_NTeNhByiBR20jIIQZXfb7MwnEdAR_SdI5fZfkWJpBxKtMrPoDaj65ao_N8N1K1yMywT4vxyvBPp4AdN-i8EpVxI7f9mde846HxMwo7dFh47GNbCiZc8mTSWhUhUv54FWctUZ2AqDFJ-24J3Mjg0xrSLB5QEq-Ye"
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
                                                        className={`block px-4 py-2 text-sm font-semibold rounded-md transition-colors ${subItem.name === 'Kontakt aufnehmen'
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
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-300 shadow-md"
                                    onClick={() => setMenueOffen(false)}
                                >
                                    <ShieldAlert className="w-5 h-5 text-red-200" />
                                    <span>Schaden melden</span>
                                </Link>
                                <a
                                    href="https://id.simplr.de/login?login_challenge=hMDge3ajx5W_UwQ8Ok_LzZHNT2GRAGizEHpq8t4cXA05lJTCbZ6E6kXBd5ThKrMKvG4D5lwcjaIhQ53FhXBuMF_B1m51I1BuBpyAXF9tkce2b9dttsZtbdl8I-TVn6ZFjLeCg2boEJFU4PgoH0W56qaS4pslBuJ9fl4_oktu4geZVNOSQTlxkCsQ6f7_rS64_S1oXIMAZ1mk6WQlZr8_Rvjiqcow-SCb1wjOXO5-pjm6wRtgnQv_P-_NaZQ1NWk0tse8uqfZy27xSLYrF0cyMwlj5VHtlvPVOEXyTDLbFd22EWCLqaUl8O1HhRweGuhG6hy5JCQdOMyTVyPzp9gToVtb8iS2p8H2b1X6mRq-EjFq9L2N6XDTc1GlNpk9T70L2RyPW7sRh8Ch4ckYcixYh72TPhE0tEmYXF0CPH_J8FlqCwszx3Lx_o40l5NL2To0iXaDXMnkB4HaaWlugwIWcwGI9M9kRjRjTaHS1NCYB-9eT3KYsjmWpU9dEbI6uhJ9XoDXqPzQWb6HHoFKHOtfNkRcSm5OwcLXDJNsKTH669Arx0rajL6dm8p_F2yLa1yq39qjVFZBrZrHJLjkLOHrtYoCNTxOv3ABBvJdfg7CM0Q3L2tE2YpXcsRIYtbW86mSrdCHw9xtmFINK7OpOy-bZd4g4vi0dVKhiYnelgmvgJev3VcKmYnWPj6h2bgA2UDvcovW5b7yioETMI1fahyQAMugjsAJv-7gvPXAg79vQ_eSCymFnPNy-5aziV4il47v0Rmw1ydGh5gSSV0byiuM1TS86I-nPH5bmg-Pfu_qv3DULNllZVhuPQCNBmLEjzj30Whv-ook88mnRk_QIjlDynSgu-zVrJGgc5T-K8W33xAvoNObVLLFknTJqoTRwRlhpdFaj4esyT2lMRz5s3gLTwMzDlqTmUklbr2GzRNVTOhHPtBIKntHVUxmy_WpU7zbdPFlCgS0y5ukY8cpBmZ9g28FZZICvgjQCVewb51DT65rCrF0jqCKrzKwKhmueQsNCwhwuK5q1LduO7o1bF5-_TysrNc-CzrVinqUNZG1T1rtyN8UwLGINEtT5fzZ-_uzLFGgSZkrHqY0ScdyVHC6hZQ6mU8K4m-L8f8rASDjXkaCqliHNgilSVhBMR8UPoXR_97LgeCBCGqbTDf0E4taZIM9n6DMhFPHLHAF98A7CPo3pr9wB_vPHOWZaInBYbiELPN0ENWDsDC16x0M8FE8l84HbygNTcyZOBgNM3bU2V7X-3CYCypIXSxsxifuYL5SaSNxyUtUxeVFzzz3v8H5m4DYhO3j-AfsT4knBnLm0w-A8-uas0hw8DfGWVtQkB0xsgLZ6rDleSDpKYJvzwMXfhB9cqHT_NTeNhByiBR20jIIQZXfb7MwnEdAR_SdI5fZfkWJpBxKtMrPoDaj65ao_N8N1K1yMywT4vxyvBPp4AdN-i8EpVxI7f9mde846HxMwo7dFh47GNbCiZc8mTSWhUhUv54FWctUZ2AqDFJ-24J3Mjg0xrSLB5QEq-Ye"
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
