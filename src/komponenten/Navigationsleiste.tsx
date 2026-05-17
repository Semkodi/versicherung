// Importiere React Hooks für Zustands- und Seiteneffekte
import { useState, useEffect } from 'react';
// Importiere motion und AnimatePresence von framer-motion für Animationen
import { motion, AnimatePresence } from 'framer-motion';
// Importiere Icons von lucide-react für die Benutzeroberfläche
import { Menu, X, ChevronDown, GraduationCap, Shield } from 'lucide-react';
// Importiere Link und useLocation von react-router-dom für die Navigation
import { Link, useLocation } from 'react-router-dom';
// Importiere das Logo aus dem assets Ordner
import logo from '../assets/logo2-Photoroom.png';

// Definiere die Hauptkomponente für die Navigationsleiste
const Navigationsleiste = () => {
    // Zustand, um zu speichern, ob nach unten gescrollt wurde
    const [istGescrollt, setIstGescrollt] = useState(false);
    // Zustand, um zu speichern, ob das mobile Menü geöffnet ist
    const [menueOffen, setMenueOffen] = useState(false);
    // Zustand, um das aktuell aktive Dropdown-Menü zu speichern
    const [aktivesDropdown, setAktivesDropdown] = useState<string | null>(null);
    // Hole den aktuellen Standort (URL)
    const aktuellerOrt = useLocation();

    // Effekt, der beim Scrollen ausgeführt wird
    useEffect(() => {
        // Funktion, die den Scroll-Zustand aktualisiert
        const behandleScrollen = () => {
            // Setze istGescrollt auf wahr, wenn mehr als 20 Pixel gescrollt wurde
            setIstGescrollt(window.scrollY > 20);
        };
        // Füge einen Event-Listener für das Scrollen hinzu
        window.addEventListener('scroll', behandleScrollen);
        // Entferne den Event-Listener, wenn die Komponente entfernt wird
        return () => window.removeEventListener('scroll', behandleScrollen);
    }, []);

    // Definition der Navigationslinks und ihrer Unterlinks
    const navigationsLinks = [
        // Link zur Startseite
        { name: 'Start', pfad: '/' },
        // Link und Unterlinks für Beamte
        {
            name: 'Beamte',
            pfad: '/beamte',
            // Icon für den Link
            icon: <GraduationCap className="w-4 h-4" />,
            // Untermenü-Links
            unterLinks: [
                { name: 'Dienstunfähigkeit', pfad: '/beamte/du' },
                { name: 'Beihilfe', pfad: '/beamte/beihilfe' },
                { name: 'Diensthaftpflicht', pfad: '/beamte/haftpflicht' }
            ]
        },
        // Link für Privatkunden
        { name: 'Privatkunden', pfad: '/privatkunden' },
        // Link für Gewerbekunden
        { name: 'Gewerbekunden', pfad: '/gewerbekunden' },
        // Anker-Link zum Über-mich-Bereich
        { name: 'Über mich', pfad: '/#ueber-mich' }
    ];

    // Rückgabe des JSX für die Komponente
    return (
        // Animiertes Navigations-Element (nav)
        <motion.nav
            // Start-Animation: 100 Pixel nach oben verschoben und unsichtbar
            initial={{ y: -100, opacity: 0 }}
            // Ziel-Animation: An Ursprungsposition und vollständig sichtbar
            animate={{ y: 0, opacity: 1 }}
            // Übergangseinstellungen für weiche Animation
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            // Basis-Styling und dynamisches Styling abhängig vom Scroll-Zustand
            className={`fixed w-full z-50 transition-all duration-700 ease-out left-0 right-0 ${istGescrollt ? 'top-4 px-4' : 'top-6 px-4'}`}
        >
            {/* Innerer Container mit dynamischer Breite und Hintergrund abhängig vom Scroll-Zustand */}
            <div className={`mx-auto transition-all duration-700 ease-out flex items-center justify-between ${istGescrollt
                ? 'max-w-6xl bg-[#020A39]/90 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] rounded-full border border-white/10 py-2.5 px-6 sm:px-8'
                : 'max-w-7xl bg-[#020A39]/95 backdrop-blur-xl shadow-2xl rounded-[2.5rem] border border-white/10 py-4 px-8 sm:px-10'
                }`}>
                
                {/* Logo-Bereich */}
                <Link to="/" className="flex items-center group shrink-0 relative z-10">
                    {/* Bild des Logos */}
                    <img
                        // Bildquelle
                        src={logo}
                        // Alternativtext
                        alt="simply switch logo"
                        // Dynamische Höhe abhängig vom Scroll-Zustand
                        className={`${istGescrollt ? 'h-10 sm:h-12' : 'h-14 sm:h-16'} w-auto object-contain transition-all duration-700 ease-out transform group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]`}
                    />
                </Link>

                {/* Desktop-Navigation */}
                <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5">
                    {/* Durchlaufe alle Navigationslinks */}
                    {navigationsLinks.map((link) => (
                        // Container für jeden Hauptlink
                        <div
                            // Verwende den Namen als eindeutigen Schlüssel
                            key={link.name}
                            // Styling für die Gruppierung
                            className="relative group/nav"
                            // Zeige das Dropdown-Menü beim Hover an
                            onMouseEnter={() => setAktivesDropdown(link.name)}
                            // Verstecke das Dropdown-Menü beim Verlassen
                            onMouseLeave={() => setAktivesDropdown(null)}
                        >
                            {/* Der Hauptlink */}
                            <Link
                                // Zielpfad des Links
                                to={link.pfad}
                                // Dynamisches Styling, das den aktiven Zustand hervorhebt
                                className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold tracking-wide transition-all rounded-full ${aktuellerOrt.pathname === link.pfad 
                                    ? 'bg-marke-primaer text-white shadow-md' 
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {/* Name des Links */}
                                {link.name}
                                {/* Zeige einen Pfeil, wenn Unterlinks vorhanden sind */}
                                {link.unterLinks && (
                                    // Pfeil-Icon, das rotiert, wenn das Dropdown offen ist
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${aktivesDropdown === link.name ? 'rotate-180' : ''}`} />
                                )}
                            </Link>

                            {/* Komponente zur Animation des Dropdown-Menüs */}
                            <AnimatePresence>
                                {/* Zeige das Dropdown, wenn Unterlinks existieren und dieses Menü aktiv ist */}
                                {link.unterLinks && aktivesDropdown === link.name && (
                                    // Animiertes Dropdown-Menü
                                    <motion.div
                                        // Startzustand
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        // Zielzustand
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        // Endzustand beim Schließen
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        // Übergangsdauer
                                        transition={{ duration: 0.2 }}
                                        // Styling für das Dropdown-Menü (absolut positioniert)
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#020A39]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-2.5 z-50"
                                    >
                                        {/* Container für die Unterlinks */}
                                        <div className="flex flex-col gap-1">
                                            {/* Durchlaufe alle Unterlinks */}
                                            {link.unterLinks.map((unterLink) => (
                                                // Link für den Unterpunkt
                                                <Link
                                                    // Schlüssel für den Unterpunkt
                                                    key={unterLink.name}
                                                    // Zielpfad des Unterpunkts
                                                    to={unterLink.pfad}
                                                    // Styling für den Unterpunkt
                                                    className="px-4 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
                                                >
                                                    {/* Name des Unterpunkts */}
                                                    {unterLink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Desktop-Aktionen (Buttons auf der rechten Seite) */}
                <div className="hidden lg:flex items-center gap-3">
                    {/* Link zum simplr Login */}
                    <a
                        href="https://id.simplr.de/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 text-white/90 hover:text-white text-sm font-bold transition-all bg-white/5 hover:bg-white/15 border border-white/5 rounded-full"
                    >
                        {/* Schild-Icon */}
                        <Shield className="w-4 h-4 text-marke-highlight" />
                        {/* Text */}
                        <span>simplr</span>
                    </a>
                    {/* Button zur Kontaktaufnahme */}
                    <a
                        href="#kontakt"
                        className="px-7 py-2.5 bg-marke-primaer text-white text-sm rounded-full font-black transition-all shadow-[0_0_20px_rgba(2,83,238,0.4)] hover:shadow-[0_0_30px_rgba(2,83,238,0.6)] hover:scale-105"
                    >
                        Gespräch buchen
                    </a>
                </div>

                {/* Button zum Umschalten des mobilen Menüs */}
                <button
                    // Nur auf kleinen Bildschirmen anzeigen
                    className="lg:hidden p-2.5 text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full border border-white/10"
                    // Beim Klicken den Zustand umschalten
                    onClick={() => setMenueOffen(!menueOffen)}
                    // Label für Barrierefreiheit
                    aria-label="Menü umschalten"
                >
                    {/* Zeige das Schließen- oder Menü-Icon abhängig vom Zustand */}
                    {menueOffen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobiles Menü */}
            <AnimatePresence>
                {/* Rendere das Menü nur, wenn es geöffnet ist */}
                {menueOffen && (
                    // Animierter Container für das mobile Menü
                    <motion.div
                        // Startzustand
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        // Zielzustand
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        // Endzustand
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        // Übergangsdauer
                        transition={{ duration: 0.2 }}
                        // Styling für das mobile Menü (absolut positioniert)
                        className="lg:hidden absolute top-full left-4 right-4 mt-4 bg-[#020A39]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden p-6"
                    >
                        {/* Container für die mobilen Links */}
                        <div className="space-y-2">
                            {/* Durchlaufe alle Navigationslinks */}
                            {navigationsLinks.map((link) => (
                                // Container für jeden Link im mobilen Menü
                                <div key={link.name} className="flex flex-col">
                                    {/* Hauptlink im mobilen Menü */}
                                    <Link
                                        to={link.pfad}
                                        className="px-6 py-4 text-lg font-bold text-white bg-white/5 rounded-2xl mb-2"
                                        // Schließe das Menü beim Klicken
                                        onClick={() => setMenueOffen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                    {/* Zeige Unterlinks im mobilen Menü, falls vorhanden */}
                                    {link.unterLinks && (
                                        <div className="pl-6 pr-2 space-y-2 mb-4">
                                            {/* Durchlaufe alle Unterlinks */}
                                            {link.unterLinks.map((unterLink) => (
                                                // Link für den Unterpunkt im mobilen Menü
                                                <Link
                                                    key={unterLink.name}
                                                    to={unterLink.pfad}
                                                    className="block px-4 py-3 text-white/70 hover:text-white bg-white/5 rounded-xl text-base font-medium"
                                                    // Schließe das Menü beim Klicken
                                                    onClick={() => setMenueOffen(false)}
                                                >
                                                    {unterLink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Container für mobile Aktionen */}
                        <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                            {/* Link zum simplr Login für Mobile */}
                            <a
                                href="https://id.simplr.de/login"
                                className="flex items-center justify-center gap-3 w-full py-4 bg-white/10 text-white rounded-2xl font-bold border border-white/5"
                            >
                                <Shield className="w-5 h-5 text-marke-highlight" />
                                simplr Login
                            </a>
                            {/* Button zur Kontaktaufnahme für Mobile */}
                            <a
                                href="#kontakt"
                                className="flex items-center justify-center w-full py-4 bg-marke-primaer text-white rounded-2xl font-black shadow-[0_0_30px_rgba(2,83,238,0.3)]"
                                // Schließe das Menü beim Klicken
                                onClick={() => setMenueOffen(false)}
                            >
                                Gespräch buchen
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

// Exportiere die Navigationsleisten-Komponente als Standard
export default Navigationsleiste;
