// Importiere den useState Hook von React
import { useState } from 'react';
// Importiere motion von framer-motion für Animationen
import { motion } from 'framer-motion';
// Importiere Icons von lucide-react
import { ChevronDown, ChevronUp, MapPin, Phone, ArrowRight } from 'lucide-react';
// Importiere Link-Komponente für internes Routing
import { Link } from 'react-router-dom';
// Importiere das Logo-Bild
import logo from '../assets/logo2-Photoroom.png';

// Definiere die Daten für die häufig gestellten Fragen (FAQ)
const faqDaten = [
    {
        // Frage 1
        frage: "Wie viel kostet die Beratung?",
        // Antwort 1
        antwort: "Als unabhängiger Berater werde ich von den Versicherungsgesellschaften bezahlt. Für dich ist mein Service vollkommen kostenlos. Ich berate dich umfassend dazu, was für dich sinnvoll ist und dir wirklich etwas bringt."
    },
    {
        // Frage 2
        frage: "Was passiert mit meiner Dienstunfähigkeitsversicherung, wenn ich nicht weiter verbeamtet werde?",
        // Antwort 2
        antwort: "Solltest du wieder zurück in ein Angestelltenverhältnis gehen, wandle ich die Dienstunfähigkeitsversicherung für dich einfach in eine Berufsunfähigkeitsversicherung um. So bist du immer optimal abgesichert."
    },
    {
        // Frage 3
        frage: "Kann ich mich auch später noch gegen Dienstunfähigkeit versichern?",
        // Antwort 3
        antwort: "Grundsätzlich ja, sofern es dein Gesundheitszustand zulässt. Solltest du aber während deiner Anwärterzeit oder der Verbeamtung auf Probe dienstunfähig werden, bekommst du ohne Versicherung keine Leistungen vom Dienstherren oder vom Staat. Es ist also ratsam, die Dienstunfähigkeitsversicherung so früh wie möglich zu beantragen."
    },
    {
        // Frage 4
        frage: "Kann ich mich nicht auch noch später um die Altersvorsorge kümmern?",
        // Antwort 4
        antwort: "Klar kannst du dir auch erst später eine private Altersvorsorge abschließen. Wie bei jeder Vorsorge gilt aber: Je früher du anfängst, desto besser. Mit einer langen Laufzeit profitierst du von Zinseszinseffekten und Wertentwicklung."
    },
    {
        // Frage 5
        frage: "Was passiert, wenn ich nach meiner Ausbildung vorerst nicht weiter verbeamtet werde?",
        // Antwort 5
        antwort: "Keine Sorge, ich helfe dir gerne, zurück in die gesetzliche Krankenversicherung zu wechseln – und friere deinen Gesundheitszustand ein. So kannst du später ohne neue Gesundheitsprüfung wieder zurück in die private Krankenversicherung."
    },
    {
        // Frage 6
        frage: "Warum reicht eine Berufsunfähigkeitsversicherung für Beamte nicht aus?",
        // Antwort 6
        antwort: "Der Amtsarzt wird dich im Ernstfall immer nur als \"dienstunfähig\" einstufen. Heißt: Dass du deinen Dienst nicht antreten kannst. Eine BU-Versicherung zahlt oft nicht, wenn du nur dienstunfähig bist. Deshalb benötigst du die richtige Klausel."
    },
    {
        // Frage 7
        frage: "Muss ich für eine Beratung persönlich vorbeikommen?",
        // Antwort 7
        antwort: "Nein. Die Beratung findet in der Regel online per Videocall statt. Das heißt, ich betreue dich gerne, völlig unabhängig davon, wo du in Deutschland wohnst."
    }
];

// Definiere eine einzelne FAQ-Komponente, die Frage und Antwort empfängt
const FaqElement = ({ frage, antwort }: { frage: string, antwort: string }) => {
    // Zustand, um zu speichern, ob die Antwort ausgeklappt ist
    const [offen, setOffen] = useState(false);

    return (
        // Container für eine FAQ-Frage mit unterem Rand
        <div className={`border-b border-gray-100 transition-colors ${offen ? 'border-marke-primaer/20' : ''}`}>
            {/* Button zum Ausklappen der Antwort */}
            <button
                className="w-full text-left flex justify-between items-start py-5 gap-4 focus:outline-none group"
                // Kehre den Zustand beim Klicken um
                onClick={() => setOffen(!offen)}
            >
                {/* Text der Frage */}
                <span className={`font-semibold text-base pr-4 leading-snug transition-colors ${offen ? 'text-marke-sekundaer' : 'text-text-haupt group-hover:text-marke-sekundaer'}`}>
                    {frage}
                </span>
                {/* Container für das Icon (Pfeil nach oben oder unten) */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${offen ? 'bg-marke-sekundaer text-white' : 'bg-hintergrund-alt text-text-neben group-hover:bg-marke-sekundaer/10'}`}>
                    {/* Zeige entsprechenden Pfeil basierend auf dem Zustand */}
                    {offen
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />
                    }
                </div>
            </button>
            {/* Animierter Container für die Antwort */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${offen ? 'max-h-64 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                {/* Text der Antwort mit linker Rand-Markierung */}
                <p className="text-text-neben font-light text-sm leading-relaxed pl-4 border-l-2 border-marke-primaer">
                    {antwort}
                </p>
            </div>
        </div>
    );
};

// Definiere die Hauptkomponente für die Fusszeile (Footer)
const Fusszeile = () => {
    return (
        // Footer-Container mit weißem Hintergrund und oberem Rand
        <footer className="bg-white border-t border-gray-100 relative overflow-hidden">

            {/* Bereich für Call-to-Action (Handlungsaufforderung) Banner */}
            <div className="bg-marke-sekundaer text-white py-20 relative overflow-hidden">
                {/* Dekorative Hintergrundunschärfe */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-marke-primaer rounded-full blur-[150px] opacity-15 pointer-events-none" />
                {/* Animierter Container für den Banner-Inhalt */}
                <motion.div
                    // Start-Animation (von unten einblenden)
                    initial={{ opacity: 0, y: 30 }}
                    // Ziel-Animation, sobald das Element im Sichtfeld ist
                    whileInView={{ opacity: 1, y: 0 }}
                    // Animation nur einmal abspielen
                    viewport={{ once: true }}
                    // Zentriertes Styling
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
                >
                    {/* Hauptüberschrift des Banners */}
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-5 drop-shadow-sm">
                        Bereit für einen entspannten Start?
                    </h2>
                    {/* Untertitel des Banners */}
                    <p className="text-lg text-gray-300 font-light mb-10 max-w-2xl mx-auto">
                        Lass uns deine offenen Fragen klären – 100% kostenlos und ehrlich. Sichere dir jetzt dein Erstgespräch!
                    </p>
                    {/* Button zur Kontakt-Sektion */}
                    <a
                        href="#kontakt"
                        className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-white text-marke-sekundaer rounded-xl font-black text-lg hover:bg-marke-highlight transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Unverbindliches Infogespräch
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>

            {/* Bereich für Häufig gestellte Fragen (FAQ) */}
            <div id="faq" className="bg-hintergrund-alt py-20 relative z-10">
                {/* Container mit maximaler Breite */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Animierter Header für den FAQ-Bereich */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        {/* Subtiler Über-Titel */}
                        <span className="text-marke-primaer font-bold tracking-widest uppercase mb-3 block text-sm">Alles Wichtige auf einen Blick</span>
                        {/* Hauptüberschrift */}
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-haupt">
                            Häufig gestellte Fragen
                        </h2>
                    </motion.div>

                    {/* Animierter Container für die FAQ-Liste */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(2,10,57,0.06)]"
                    >
                        {/* Durchlaufe alle FAQ-Daten und rendere ein FaqElement für jedes */}
                        {faqDaten.map((faq, index) => (
                            <FaqElement key={index} frage={faq.frage} antwort={faq.antwort} />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Unterer Teil des Footers mit Links und Informationen */}
            <div className="bg-marke-sekundaer text-white pt-14 pb-8">
                {/* Hauptcontainer für den unteren Footer */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Grid-Layout für verschiedene Informationsbereiche */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

                        {/* Erste Spalte: Logo und Beschreibung */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-1"
                        >
                            {/* Logo-Link nach oben */}
                            <a href="#" className="block mb-4 w-fit hover:-translate-y-1 transition-transform">
                                {/* Das Logo wird hier in Weiß umgewandelt (invert, brightness-0) */}
                                <img src={logo} alt="simply switch Logo" className="h-16 md:h-20 w-auto object-contain brightness-0 invert" />
                            </a>
                            {/* Kurze Beschreibung des Unternehmens */}
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
                                Sven Kegler – Dein unabhängiger Versicherungsmakler für den optimalen Start ins Beamtenverhältnis. Ehrlich, kostenlos und 100% digital.
                            </p>
                        </motion.div>

                        {/* Zweite Spalte: Schnellzugriff / Navigation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Überschrift für die Links */}
                            <h4 className="text-sm font-bold mb-5 text-white tracking-widest uppercase">Schnellzugriff</h4>
                            {/* Liste der Links */}
                            <ul className="space-y-3 text-gray-400 text-sm">
                                {/* Array mit Links, das durchlaufen wird */}
                                {[
                                    { label: 'Fehler vermeiden', href: '#fehler', isExternal: false },
                                    { label: 'So arbeite ich', href: '#so-arbeite-ich', isExternal: false },
                                    { label: 'Über mich', href: '#ueber-mich', isExternal: false },
                                    { label: 'Impressum', href: '/impressum', isExternal: false },
                                    { label: 'Datenschutz', href: '/datenschutz', isExternal: false },
                                    { label: 'Cookies', href: '/cookies', isExternal: false },
                                    { label: 'Kundenlogin', href: 'https://id.simplr.de/login?login_challenge=xKlEl3yyPMBrBZBXpkz5l2_R7NXTx0drVZUKM7bmbaa1cD-DD3ag01F-tlT7YXKR2hZja2HEjXk4RZVl3uh1cYZ91i4r9PdYHJzGVnJWJwkGcMgS7y0diTqCdGdH1QQqomEAv4_abNfQ12HkIIoFkJbwbRkANsy3GFpugnJn16z4P6xNtBKsHHFDRG9UJZUQt_WWOx0-GRohX5rMC17jZUCKhCLfvog5ac1OoZ5mk9rJuPH9r7rKjDyK2iJ4ZHVzV0wv4tt1m6ZPR8c_j2UUMaOP7YoLprW3oror-iXau6e39wQytRPsWUCtwMx3K5JVJSiF4XAjFLUvjPtl8kYX2W1H9x8Uzq0GiznyDK1mhCWqafrE1jzFJ4g1wSYS8iBXYhmi49qstZSm9Xu9GrAyv08KiBcS4M7IbYOvGJn9KfmvrKonbisQMoLp_GnP0xtajo8aAaPMkgHkN-wdk1e0ROG2dPCXI4B6AxWwYblFq65jfoPNNcdKgto5Mye7oBGpU8JB_Quams3zlx8NZ7Th1AwzwvvHW4tSo4pGQpS7FhcFLqvASQaenirNzNQKqSBHRrQthI9uOilGwJ0qtOgxeiX_cerxwtP_1nGxn-XRg9js0YtBlcH6qMAoK_PLsv4PwUeaaWvQ1j7Ha95edTPCPwJfG3cZ4DaDuKkGuTg_FuGiOa7lwBuOC_Ae3DXqO9UXk972pZdTSGmvIjV0I5ClC2dDz9teQEXenztjccAv9vYudKtsafSk8ZGVl5_9wBn8B3rz8a9rcNZhR6px17iZFnKRdoyKBEUh1HkkNjGIm2KGlcVkvfZqKUiMr1HLmX2sBLoO53FIrHreCP8C8wLpqQnuK9A1Iqpv7F7XBzQSxbz0ION9G1MbqZU6w1Si--wLv2ERU01owkiFwL9tC9GBgJamnP3KSLIBXbqlR6yByCD6gWtI0utXoc71suU2TbfabRiMuS3N-JKYyH_1By_tYMpzbEaDqXmNykqlEaYLjRGaMVcx3W37X2efFHYEvWAvyWXAwqnEBsQhEAVlAyqyD9o6dzXH_H_eswNHsvxFe6dWFKCS2F2Y3Jp5FsEnDprEA5J2s94XbFxXs3mSHmyMlDEO9UapbTIxpOaKvKwzKMks3r3pSfJjN5JwIz7IZIaxiAzOg_EZJvtzMYFkTXGlNn02oiQQ2BwJrYNr20m9nPrJxivp6XoBQAsylgnyhi_8QyJ7hbuIlAEpRC7r4AvHJvFagkCIxqlkFF_GgDSTj6jCvVLF_pApzrJMOlgukw5i3BLk7QxEQy-sXxt4wAyiZEacOtpIb9LTIajmuicd2nVVBal2MwndgF_cePb9aOAr7oW9ra8PROckfvlipQwfjMVJhWWrPOtSeJxnkkM0Z8I2Mt7DiTbFtNMIo4NgL3_P2lZzPXScBtLMi5wM-PLIPGIsrt4LX65Ym3FpJWgX_DhJ5CU2DnnPqsRDgGLXRpQUYt2Ksseo-Aira6Iwwhw5yoQR6glgktcSWO1FAyWFdTjiyQCpB_d7s4UxYjxrYkpeMnZRBxJh_CizOZsjBJRXA1EOTaFLZ1Vqq5T6MXnU9fhydSoQMNw_PgwUcMOtq1FEtHpI2akgSqAzI5r2l6p_BRgCVIPaQeDQO8g0RvgIwtcLIQqhgjLtrWnDgPEH9eWJjhyex1xjFRlaIOfQ9QCnMm877XJCsP-iXSamLw%3D%3D', isExternal: true },
                                ].map((link, index) => (
                                    <li key={index}>
                                        {/* Fallunterscheidung: Externer oder interner Link */}
                                        {link.isExternal ? (
                                            <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                                                {/* Dekorativer Punkt vor dem Link */}
                                                <span className="w-1 h-1 rounded-full bg-marke-primaer/60" />
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link to={link.href} className="hover:text-white transition-colors flex items-center gap-2">
                                                {/* Dekorativer Punkt vor dem Link */}
                                                <span className="w-1 h-1 rounded-full bg-marke-primaer/60" />
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Dritte Spalte: Kontakt und Zeiten */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            {/* Überschrift für Kontakt */}
                            <h4 className="text-sm font-bold mb-5 text-white tracking-widest uppercase">Kontakt & Zeiten</h4>
                            {/* Container für Kontaktinformationen */}
                            <div className="space-y-4 text-gray-400 text-sm font-light">
                                {/* Adressblock */}
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-marke-primaer mt-1 flex-shrink-0" />
                                    <span>Kirchstraße 10<br />65627 Elbtal</span>
                                </div>
                                {/* Telefonblock */}
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-marke-primaer flex-shrink-0" />
                                    <span>06436 2869917</span>
                                </div>
                                {/* Öffnungszeiten */}
                                <div className="pt-2">
                                    <p className="text-white font-bold text-xs uppercase tracking-wider mb-2">Öffnungszeiten</p>
                                    <p>Mo - Fr: 10:00 – 16:00 Uhr</p>
                                    <p>Sa - So: Geschlossen</p>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Unterste Leiste (Copyright und Admin-Link) */}
                    <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-xs">
                        {/* Copyright mit dynamischem Jahr */}
                        <p>&copy; {new Date().getFullYear()} simply switch Versicherungsmakler. Alle Rechte vorbehalten.</p>
                        {/* Versteckter oder dezenter Link zum Admin-Dashboard */}
                        <Link to="/dashboard" className="hover:text-marke-primaer transition-colors font-bold">Admin-Bereich</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Exportiere die Fusszeile als Standard
export default Fusszeile;
