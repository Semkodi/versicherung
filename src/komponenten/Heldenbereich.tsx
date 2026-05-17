// Importiere motion von framer-motion für Animationen
import { motion } from 'framer-motion';
// Importiere Icons von lucide-react für die Benutzeroberfläche
import { ArrowRight, ShieldCheck, TrendingUp, MessageCircle, Star } from 'lucide-react';
// Importiere das Heldenbild aus dem assets Ordner
import heldenBild from '../assets/hero_couple.png';

// Definiere die Hauptkomponente für den Heldenbereich
const Heldenbereich = () => {
    // Varianten für gestaffelte Animationen des Containers
    const containerVarianten = {
        // Versteckter Zustand: Deckkraft ist 0
        hidden: { opacity: 0 },
        // Sichtbarer Zustand
        visible: {
            // Volle Deckkraft
            opacity: 1,
            // Übergangseinstellungen
            transition: {
                // Verzögerung zwischen den Kind-Elementen
                staggerChildren: 0.1,
                // Initiale Verzögerung für alle Kind-Elementen
                delayChildren: 0.2
            }
        }
    };

    // Varianten für die einzelnen Elemente
    const elementVarianten = {
        // Versteckter Zustand: Deckkraft 0 und um 20 Pixel nach unten verschoben
        hidden: { opacity: 0, y: 20 },
        // Sichtbarer Zustand
        visible: {
            // Volle Deckkraft
            opacity: 1,
            // Zurück zur ursprünglichen Y-Position
            y: 0,
            // Übergang mit Dauer und Easing-Funktion
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
        }
    };

    // Rückgabe des JSX für die Komponente
    return (
        // Haupt-Sektion mit relativer Positionierung, Abständen, verstecktem Überlauf und Hintergrundfarbe
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-hintergrund">
            {/* Container für die Hintergrund-Dekoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Erster dekorativer unscharfer Kreis oben rechts */}
                <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-marke-primaer rounded-full blur-[180px] opacity-[0.05]" />
                {/* Zweiter dekorativer unscharfer Kreis in der Mitte links */}
                <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-marke-primaer rounded-full blur-[150px] opacity-[0.03]" />
            </div>

            {/* Container für den Inhalt mit maximaler Breite, Zentrierung und Abständen */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Grid-Layout für zwei Spalten auf großen Bildschirmen */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Linke Seite – Animierter Container für den Textinhalt */}
                    <motion.div
                        // Zuweisung der Container-Varianten
                        variants={containerVarianten}
                        // Startzustand ist versteckt
                        initial="hidden"
                        // Zielzustand ist sichtbar
                        animate="visible"
                        // Flexbox-Layout als Spalte mit z-Index 20
                        className="flex flex-col relative z-20"
                    >
                        {/* Animiertes Badge-Element (aktuell leer) */}
                        <motion.div variants={elementVarianten} className="inline-flex items-center self-start px-3 py-1 rounded-full bg-marke-primaer/10 text-marke-primaer text-[10px] font-bold tracking-widest uppercase mb-6 border border-marke-primaer/20">
                            {/* Leerer Inhalt des Badges */}
                        </motion.div>

                        {/* Animierte Hauptüberschrift */}
                        <motion.h1 variants={elementVarianten} className="text-4xl md:text-5xl lg:text-[4.5rem] font-black leading-[1.05] mb-6 text-text-haupt">
                            {/* Textteil 1 */}
                            Mehr aus deinem <br />
                            {/* Hervorgehobener Textteil */}
                            <span className="text-marke-primaer">Geld machen.</span> <br />
                            {/* Subtiler Textteil */}
                            <span className="text-text-neben">Für heute und morgen.</span>
                        </motion.h1>

                        {/* Animierter Absatz mit Beschreibung */}
                        <motion.p variants={elementVarianten} className="text-lg text-text-neben mb-10 leading-relaxed max-w-xl">
                            {/* Text der Beschreibung */}
                            Wir sind spezialisiert auf junge und angehende Beamte sowie Haushalte, die mehr aus ihrem Geld machen wollen – mit maßgeschneiderten Lösungen und echten Ersparnissen.
                        </motion.p>

                        {/* Animiertes Grid für die Features/Vorteile */}
                        <motion.div variants={elementVarianten} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                            {/* Erstes Feature: Beamte */}
                            <div className="flex flex-col gap-3">
                                {/* Container für das Icon */}
                                <div className="w-10 h-10 rounded-lg bg-hintergrund-alt flex items-center justify-center text-marke-primaer shadow-sm border border-marke-primaer/10">
                                    {/* Schild-Icon */}
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                {/* Container für den Titel */}
                                <div>
                                    {/* Titel des ersten Features */}
                                    <h3 className="font-bold text-sm text-text-haupt leading-tight">Spezialisiert auf junge & angehende Beamte</h3>
                                </div>
                            </div>

                            {/* Zweites Feature: Ersparnisse */}
                            <div className="flex flex-col gap-3">
                                {/* Container für das Icon */}
                                <div className="w-10 h-10 rounded-lg bg-hintergrund-alt flex items-center justify-center text-marke-primaer shadow-sm border border-marke-primaer/10">
                                    {/* Trend-Icon */}
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                {/* Container für den Titel */}
                                <div>
                                    {/* Titel des zweiten Features */}
                                    <h3 className="font-bold text-sm text-text-haupt leading-tight">Ersparnisse von bis zu 1.200 € p.a. möglich</h3>
                                </div>
                            </div>

                            {/* Drittes Feature: Digital */}
                            <div className="flex flex-col gap-3">
                                {/* Container für das Icon */}
                                <div className="w-10 h-10 rounded-lg bg-hintergrund-alt flex items-center justify-center text-marke-primaer shadow-sm border border-marke-primaer/10">
                                    {/* Nachrichten-Icon */}
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                {/* Container für den Titel */}
                                <div>
                                    {/* Titel des dritten Features */}
                                    <h3 className="font-bold text-sm text-text-haupt leading-tight">100 % digital & persönlich per WhatsApp</h3>
                                </div>
                            </div>
                        </motion.div>

                        {/* Animierter Container für Call-to-Action und Bewertung */}
                        <motion.div variants={elementVarianten} className="flex flex-wrap items-center gap-6">
                            {/* Link-Button zur Kontakt-Sektion */}
                            <a
                                // Ziel-Anker auf der Seite
                                href="#kontakt"
                                // Styling für den Button mit Hover-Effekten
                                className="inline-flex items-center gap-3 px-8 py-4 bg-marke-sekundaer text-white rounded-xl font-bold text-base hover:bg-marke-akzent transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                {/* Text des Buttons */}
                                Jetzt beraten lassen
                                {/* Pfeil-Icon */}
                                <ArrowRight className="w-5 h-5" />
                            </a>

                            {/* Container für die Google-Bewertung */}
                            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                                {/* Flex-Container für die Sterne */}
                                <div className="flex">
                                    {/* Erstelle ein Array mit 5 Elementen und mappe darüber für die Sterne */}
                                    {[...Array(5)].map((_, index) => (
                                        // Stern-Icon mit goldener Farbe
                                        <Star key={index} className="w-4 h-4 fill-[#FABB05] text-[#FABB05]" />
                                    ))}
                                </div>
                                {/* Bewertungszahl */}
                                <span className="text-sm font-bold text-text-haupt">5,0/5</span>
                                {/* Hinweis auf die Anzahl der Bewertungen */}
                                <span className="text-xs text-text-neben">aus 63+ Bewertungen</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Rechte Seite – Animierter Container für das Bild */}
                    <motion.div
                        // Initiale Werte: Unsichtbar und leicht nach rechts verschoben
                        initial={{ opacity: 0, x: 20 }}
                        // Zielwerte: Sichtbar und an ursprünglicher Position
                        animate={{ opacity: 1, x: 0 }}
                        // Übergangseinstellungen für weiche Animation
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
                        // Container-Styling für absolute Positionierung auf großen Bildschirmen
                        className="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2 flex items-center justify-end pointer-events-none select-none overflow-hidden"
                    >
                        {/* Wrapper für das Bild mit spezifischen Größenanpassungen */}
                        <div className="relative w-full h-full lg:h-[120%] lg:w-[120%] lg:-mr-[10%]">
                            {/* Subtile Maske am linken Rand für einen weichen Übergang in den Hintergrund */}
                            <div className="absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-hintergrund to-transparent w-1/4" />
                            
                            {/* Das eigentliche Bild-Element */}
                            <img
                                // Bildquelle aus den Imports
                                src={heldenBild}
                                // Alternativtext für Barrierefreiheit
                                alt="Finanzberatung für junge Paare"
                                // Styling für Objekt-Anpassung und Ausrichtung
                                className="w-full h-full object-cover lg:object-contain lg:object-right"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Exportiere die Komponente als Standard-Export
export default Heldenbereich;
