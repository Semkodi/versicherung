import React, { useState } from 'react';
import { usePageMetadata } from '@/hooks/usePageMetadata';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, 
    Building2, 
    Truck, 
    ShieldAlert, 
    ArrowRight, 
    HelpCircle, 
    ChevronDown, 
    Hammer, 
    Laptop, 
    ShoppingBag, 
    Scale,
    Check,
    Star,
    ShieldCheck
} from 'lucide-react';
import { ScrollReveal } from '@/komponenten/layout';

// Importiere die neu generierten Bilder fuer die Karten
import betriebImg from '@/assets/bilder/betrieb_card.png';
import inhaltImg    from '@/assets/bilder/inhalt_card.png';
import flottenImg   from '@/assets/bilder/flotten_card.png';
import rechtImg     from '@/assets/bilder/recht_card.png';
import selbststaendigeCardImg from '@/assets/bilder/selbststaendige_card_v2.png';

const METADATA = {
    title: "Betriebshaftpflicht & Cyber-Schutz für Selbstständige | Online",
    description: "Die Risiko-Matrix für Unternehmer, Freiberufler & IT. Gewerbeversicherungen transparent vergleichen und digital verwalten.",
};

// Typdefinitionen fuer FAQs, Branchen und Leistungen
type FAQItem = {
    frage: string;
    antwort: string;
};

type BrancheItem = {
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    beschreibung: string;
    risiko: string;
};

type DetailliertesProdukt = {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    titel: string;
    untertitel: string;
    einleitung: string;
    image: string;
    punkte: { titel: string; text: string }[];
};

const Gewerbekunden = () => {
    usePageMetadata(METADATA);
    // Zustand fuer das geoeffnete FAQ-Element
    const [offenesFAQ, setOffenesFAQ] = useState<number | null>(null);

    // Hochprofessionelle gewerbliche Leistungen
    const produkte: DetailliertesProdukt[] = [
        { 
            id: "betriebshaftpflicht",
            icon: Building2, 
            titel: "Betriebshaftpflichtversicherung", 
            untertitel: "Das wichtigste Schutzschild für dein Unternehmen",
            einleitung: "Schützt dein Unternehmen und dich als Inhaber vor den finanziellen Folgen von Schadensersatzansprüchen bei Personen-, Sach- und echten Vermögensschäden, die im täglichen Geschäftsbetrieb entstehen.", 
            image: betriebImg,
            punkte: [
                {
                    titel: "Personen- & Sachschäden",
                    text: "Sichert dich ab, wenn sich z. B. ein Kunde in deinen Geschäftsräumen verletzt oder deine Mitarbeiter beim Kunden vor Ort Schaden anrichten."
                },
                {
                    titel: "Passiver Rechtsschutz inklusive",
                    text: "Die Versicherung prüft auf eigene Kosten die Rechtmäßigkeit von Schadensansprüchen und wehrt unberechtigte Forderungen für dich vor Gericht ab."
                },
                {
                    titel: "Produkthaftpflicht-Deckung",
                    text: "Schutz bei Schäden, die durch Fehler oder Mängel an von dir hergestellten, gelieferten, montierten oder verkauften Produkten verursacht werden."
                },
                {
                    titel: "Schutz bei Subunternehmereinsatz",
                    text: "Auch Schäden, die durch beauftragte Subunternehmer oder freie Mitarbeiter in deinem Namen verursacht werden, sind sicher mitversichert."
                }
            ]
        },
        { 
            id: "inhaltsversicherung",
            icon: ShieldAlert, 
            titel: "Gewerbliche Inhaltsversicherung", 
            untertitel: "Schutz für dein gesamtes Inventar & Equipment",
            einleitung: "Deine IT, deine Maschinen und deine Büroeinrichtung sind das Herzstück deines Betriebs. Die Inhaltsversicherung schützt diese Sachwerte und sichert deine finanzielle Handlungsfähigkeit.",
            image: inhaltImg,
            punkte: [
                {
                    titel: "Ertragsausfall-Deckung",
                    text: "Sollte dein Betrieb nach einem Brand oder Wasserschaden stillstehen müssen, übernimmt die Versicherung laufende Mieten, Gehälter und den entgangenen Gewinn."
                },
                {
                    titel: "Neuwertentschädigung",
                    text: "Ersetzt beschädigte oder gestohlene Einrichtungsgegenstände, Werkzeuge und IT-Geräte immer zum aktuellen Wiederbeschaffungswert zur Neuanschaffung."
                },
                {
                    titel: "Außenversicherung & Homeoffice",
                    text: "Schützt Laptops, Smartphones und Arbeitsmaterialien deiner Mitarbeiter, wenn diese im Homeoffice, beim Kunden oder auf Geschäftsreisen genutzt werden."
                },
                {
                    titel: "Elektronik-Zusatzabsicherung",
                    text: "Erweiterter Schutz für empfindliche IT-Systeme, Server, teure Messgeräte und Spezialsoftware gegen Bedienungsfehler, Kurzschluss und Überspannung."
                }
            ]
        },
        { 
            id: "flottenversicherung",
            icon: Truck, 
            titel: "Kfz-Flottenversicherung", 
            untertitel: "Smarte Mobilität & optimaler Fuhrparkschutz",
            einleitung: "Einfache Verwaltung und attraktive Pauschalkonditionen für all deine Firmenfahrzeuge. Sichert deine Flotte ab 3 Fahrzeugen maßgeschneidert und rentabel ab.", 
            image: flottenImg,
            punkte: [
                {
                    titel: "Einheitlicher Flottentarif",
                    text: "Keine komplizierte Einzeleinstufung mehr. Alle Firmenfahrzeuge erhalten attraktive Pauschalkonditionen und sind flexibel über einen Vertrag administriert."
                },
                {
                    titel: "GAP-Deckung für Leasingfahrzeuge",
                    text: "Schließt bei Diebstahl oder Totalschaden die finanzielle Lücke zwischen dem Wiederbeschaffungswert und der ausstehenden Leasing-Restforderung."
                },
                {
                    titel: "Umfassende Fahrerschutzversicherung",
                    text: "Sichert den Fahrer des Firmenwagens (auch bei selbstverschuldeten Unfällen) finanziell für Verdienstausfall, Heilkosten oder Schmerzensgeld ab."
                },
                {
                    titel: "24/7 Mobilitätsgarantie",
                    text: "Schnelle Pannen- und Unfallhilfe, Abschleppdienst und kostenfreie Ersatzfahrzeuge sorgen dafür, dass dein Betrieb und deine Mitarbeiter mobil bleiben."
                }
            ]
        },
        { 
            id: "rechtsschutz",
            icon: Scale, 
            titel: "Gewerberechtsschutzversicherung", 
            untertitel: "Rechtssicherheit für dein tägliches Handeln",
            einleitung: "Recht haben bedeutet im Geschäftsleben leider nicht immer auch Recht bekommen. Die Rechtsschutzversicherung schützt dich vor den enormen Kosten von Anwälten, Gutachtern und Gerichten.", 
            image: rechtImg,
            punkte: [
                {
                    titel: "Arbeitgeber-Rechtsschutz",
                    text: "Rechtssicherheit bei arbeitsrechtlichen Streitigkeiten mit Mitarbeitern, beispielsweise bei Kündigungsschutzklagen oder Abmahnungen."
                },
                {
                    titel: "Vertrags-Rechtsschutz für Hilfsgeschäfte",
                    text: "Deckung bei rechtlichen Auseinandersetzungen rund um Mietverträge deiner Büros, Leasingverträge oder den Kauf von Betriebsausstattung."
                },
                {
                    titel: "Steuer-Rechtsschutz vor Gerichten",
                    text: "Vertritt deine Interessen bei steuerrechtlichen Streitigkeiten mit dem Finanzamt (z.B. wegen abgelehnter Betriebsausgaben) vor deutschen Finanzgerichten."
                },
                {
                    titel: "Integriertes Inkasso-Management",
                    text: "Unterstützung bei der professionellen Eintreibung deiner offenen, unbestrittenen Kundenforderungen, um deine Liquidität zu sichern."
                }
            ]
        }
    ];

    // Branchenloesungen mit Risikoprofilen
    const branchen: BrancheItem[] = [
        {
            icon: Laptop,
            name: "IT, Medien & Beratung",
            beschreibung: "Hacker-Angriffe, Datenverlust oder Programmierfehler können existenzbedrohend sein. Hier steht der Schutz vor echten Vermögensschäden und Cyber-Risiken im Fokus.",
            risiko: "Cyber-Versicherung & Vermögensschaden-Haftpflicht (D&O)"
        },
        {
            icon: Hammer,
            name: "Handwerk & Bau",
            beschreibung: "Klassische Sachschäden und Unfälle auf Baustellen bergen hohe Risiken. Die Betriebshaftpflicht mit hoher Deckungssumme für Sach- und Personenschäden ist hier unverzichtbar.",
            risiko: "Betriebshaftpflicht & Maschinenversicherung"
        },
        {
            icon: ShoppingBag,
            name: "Handel & Gastronomie",
            beschreibung: "Kundenverkehr im Laden, Warenhaltung im Lager oder Verderb von Lebensmitteln erfordern passgenaue Lösungen gegen Diebstahl, Sachbeschädigung und Ertragsausfall.",
            risiko: "Inhaltsversicherung & Betriebsunterbrechungsschutz"
        },
        {
            icon: Briefcase,
            name: "Freie Berufe & Dienstleister",
            beschreibung: "Als Steuerberater, Architekt, Arzt oder Coach haftest du für deine fachliche Beratung. Eine fehlerhafte Auskunft kann Millionenschäden nach sich ziehen.",
            risiko: "Berufshaftpflicht (Vermögensschadenhaftpflicht)"
        }
    ];

    // FAQ-Daten für Gewerbekunden
    const faqs: FAQItem[] = [
        {
            frage: "Welche Versicherungen sind für mein Gewerbe gesetzlich vorgeschrieben?",
            antwort: "Das hängt stark von deiner Branche ab. Für bestimmte Berufsgruppen (z. B. Ärzte, Architekten, Steuerberater, Versicherungsmakler) gibt es eine gesetzliche Pflicht zur Berufshaftpflichtversicherung. Wenn du Mitarbeiter beschäftigst, ist die Anmeldung und Versicherung über die gesetzliche Unfallversicherung (Berufsgenossenschaft) gesetzlich vorgeschrieben. Für alle anderen Betriebe ist die Betriebshaftpflicht zwar nicht gesetzlich erzwungen, aber wirtschaftlich absolut überlebensnotwendig."
        },
        {
            frage: "Wann brauche ich eine Cyber-Versicherung für meinen Betrieb?",
            antwort: "Sobald dein Unternehmen digitale Daten verarbeitet, Rechnungen per E-Mail sendet, eine Website betreibt oder Kundendaten speichert. Bei einem Hacker-Angriff oder Ransomware-Befall übernimmt die Cyber-Versicherung nicht nur den finanziellen Schaden durch Betriebsstillstand, sondern stellt auch sofort IT-Forensiker bereit und deckt Lösegeldforderungen sowie datenschutzrechtliche Bußgelder ab."
        },
        {
            frage: "Sind gewerbliche Versicherungen steuerlich absetzbar?",
            antwort: "Ja, absolut! Beiträge für gewerbliche Versicherungen gelten in Deutschland als Betriebsausgaben. Sie mindern den steuerpflichtigen Gewinn deines Unternehmens vollumfänglich und können somit direkt beim Finanzamt geltend gemacht werden."
        },
        {
            frage: "Können bestehende Altverträge unkompliziert optimiert werden?",
            antwort: "Ja. Viele Gewerbeversicherungen laufen seit Jahren unverändert, obwohl sich der Betrieb, der Umsatz oder die Mitarbeiterzahl geändert haben. Das führt oft zu gefährlicher Unterversicherung oder unnötig hohen Beiträgen. Ich analysiere deine bestehenden Policen kostenfrei und verhandle mit den Versicherern bessere Konditionen oder modernere Bedingungen."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOffenesFAQ(offenesFAQ === index ? null : index);
    };

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <main className="relative z-10 overflow-hidden bg-white text-[#2d3748]">
            {/* ─── PREMIUM HERO SEKTION (Zweispaltig mit Bild & schwebenden Kacheln) ─── */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-[#f8f9fc] to-[#eef2f9] overflow-hidden border-b border-[#e2e8f0]">
                {/* Sanfte dekorative Kreise im Hintergrund */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#1e5adb]/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e5adb]/3 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        {/* Linke Spalte: Text & CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-2xl"
                        >
                            <span className="inline-flex items-center gap-2 bg-[#e8effd] text-[#1e5adb] px-4 py-2 rounded-full mb-6 font-semibold text-xs shadow-sm border border-[#d1e0f9] uppercase tracking-wider">
                                Transparente Risikoanalyse für dein Business
                            </span>
                            
                            <h1 className="text-[2.5rem] md:text-5xl lg:text-[4rem] font-extrabold text-[#0a1930] leading-[1.1] mb-6 tracking-tight">
                                Sichere dein Lebenswerk <br />
                                <span className="bg-gradient-to-r from-[#1e5adb] to-[#4f46e5] bg-clip-text text-transparent">professionell</span> ab
                            </h1>
                            
                            <p className="text-base md:text-lg text-[#4a5568] mb-10 max-w-xl font-normal leading-relaxed">
                                Als transparenter Makler kenne ich die Haftungsrisiken des deutschen Mittelstands. Wir analysieren deine Risikofaktoren präzise und schnüren ein Schutzpaket, das dein Business wirksam schützt.
                            </p>

                            {/* Checkmarks */}
                            <ul className="space-y-4 mb-10">
                                {[
                                    "Maßgeschneiderte Branchenkonzepte",
                                    "Haftungs- & Existenzschutz",
                                    "Ertragsausfall- & Liquiditätssicherung"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-[#2d3748] font-medium">
                                        <div className="w-6 h-6 rounded-full bg-[#1e5adb] flex items-center justify-center flex-shrink-0 shadow-md">
                                            <Check className="w-4 h-4 text-white stroke-[3]" />
                                        </div>
                                        <span className="text-sm md:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <a
                                    href="#kontakt"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0a1930] text-white font-semibold rounded-xl hover:bg-[#152a4f] transition-all shadow-xl hover:-translate-y-1"
                                >
                                    <span>Erstgespräch vereinbaren</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                                <a
                                    href="#betriebshaftpflicht"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#0a1930] border-2 border-white shadow-md font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    <span>Risiko-Check starten</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>

                            {/* Social Proof / Stars */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-[#fbbf24] fill-[#fbbf24]" />
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                             <div className="flex -space-x-3">
                                        <img src="https://i.pravatar.cc/100?img=1" alt="simply switch Kundenbewertung IT Freelancer" className="w-8 h-8 rounded-full border-2 border-[#f8f9fc]" />
                                        <img src="https://i.pravatar.cc/100?img=2" alt="simply switch Kundenbewertung Handwerker" className="w-8 h-8 rounded-full border-2 border-[#f8f9fc]" />
                                        <img src="https://i.pravatar.cc/100?img=3" alt="simply switch Kundenbewertung Händler" className="w-8 h-8 rounded-full border-2 border-[#f8f9fc]" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
 
                        {/* Rechte Spalte: Bild & schwebende Trust-Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:flex items-end justify-center"
                        >
                            {/* Main Image mit sanftem Verlauf nach links */}
                            <div className="relative z-10 w-full flex justify-end">
                                <img 
                                    src={selbststaendigeCardImg} 
                                    alt="Sven Kegler - Gewerbeversicherungen & Risikoanalyse für Selbstständige und Firmen" 
                                    className="w-full h-auto max-h-[500px] object-cover rounded-[2rem] [mask-image:linear-gradient(to_right,transparent_0%,black_35%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_35%)] shadow-md"
                                />
                            </div>

                            {/* Floating Trust Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="absolute -bottom-8 -left-12 bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-20 w-max border border-white/40"
                            >
                                <div className="flex gap-6">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="w-10 h-10 rounded-full bg-[#e8effd] flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-[#1e5adb]" />
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-sm text-[#0a1930] mb-0.5">Haftungs-Schutz</div>
                                            <div className="text-[10px] text-[#718096] leading-snug">Schutz vor Personen-<br/>& Sachschäden.</div>
                                        </div>
                                    </div>
                                    <div className="w-px bg-gray-100" />
                                    <div className="flex flex-col gap-1.5">
                                        <div className="w-10 h-10 rounded-full bg-[#e8effd] flex items-center justify-center">
                                            <Briefcase className="w-5 h-5 text-[#1e5adb]" />
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-sm text-[#0a1930] mb-0.5">Substanz-Schutz</div>
                                            <div className="text-[10px] text-[#718096] leading-snug">Inventar & Elektronik<br/>optimal absichern.</div>
                                        </div>
                                    </div>
                                    <div className="w-px bg-gray-100" />
                                    <div className="flex flex-col gap-1.5">
                                        <div className="w-10 h-10 rounded-full bg-[#e8effd] flex items-center justify-center">
                                            <Scale className="w-5 h-5 text-[#1e5adb]" />
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-sm text-[#0a1930] mb-0.5">Liquiditäts-Schutz</div>
                                            <div className="text-[10px] text-[#718096] leading-snug">Rechtsschutz & Cyber-<br/>Ausfall abfedern.</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ─── ORIENTIERUNGS- & EINSTIEGSSEKTION ─── */}
            <section className="py-24 bg-white border-b border-[#e2e8f0]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#1e5adb] font-extrabold text-xs uppercase tracking-widest block mb-3">Wegweiser & Orientierung</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a1930] tracking-tight mb-6">
                            Die gewerbliche Risiko-Matrix: Sicherheit für dein Business
                        </h2>
                        <p className="text-[#4a5568] text-lg font-normal">
                            Bevor du dir die einzelnen Absicherungen im Detail anschaust, hilft dir unser 3-Säulen-Modell und unsere goldenen Regeln, um die richtige Priorisierung für deine Firma zu verstehen.
                        </p>
                    </div>

                    {/* Das 3-Säulen-Modell */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
                            <span className="text-[#1e5adb] font-extrabold text-2xl mb-4 block">01</span>
                            <h3 className="text-xl font-extrabold text-[#0a1930] mb-3">Haftungs-Schutz</h3>
                            <p className="text-xs text-[#4a5568] font-normal leading-relaxed">
                                Existenzsicherung deines Betriebs. Schutz vor Schadensersatzansprüchen Dritter (Kunden, Lieferanten oder Besucher). Die Betriebshaftpflicht ist die absolute Pflichtversicherung für jedes florierende Unternehmen.
                            </p>
                        </div>
                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
                            <span className="text-[#1e5adb] font-extrabold text-2xl mb-4 block">02</span>
                            <h3 className="text-xl font-extrabold text-[#0a1930] mb-3">Substanz-Schutz</h3>
                            <p className="text-xs text-[#4a5568] font-normal leading-relaxed">
                                Deine Sachwerte und IT absichern. Hier schützen wir dein Inventar, deine teuren Spezialgeräte, Server, Warenlager und Geschäftsräume gegen Feuer, Einbruchdiebstahl, Vandalismus und Leitungswasser.
                            </p>
                        </div>
                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
                            <span className="text-[#1e5adb] font-extrabold text-2xl mb-4 block">03</span>
                            <h3 className="text-xl font-extrabold text-[#0a1930] mb-3">Liquiditäts-Schutz</h3>
                            <p className="text-xs text-[#4a5568] font-normal leading-relaxed">
                                Den Zahlungsfluss aufrechterhalten. Sichert dein Überleben bei Rechtsstreitigkeiten (Rechtsschutz) oder deckt entgangene Gewinne und laufende Kosten bei Stillstand nach einem Schaden (Betriebsunterbrechung).
                            </p>
                        </div>
                    </div>

                    {/* Die 3 Goldenen Regeln der gewerblichen Absicherung */}
                    <div className="bg-[#0a1930] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute inset-0 bg-[#1e5adb]/10 blur-[100px] pointer-events-none" />
                        <h3 className="text-2xl font-extrabold mb-8 relative z-10">Die 3 goldenen Regeln der gewerblichen Absicherung</h3>
                        <div className="grid md:grid-cols-3 gap-8 relative z-10">
                            <div>
                                <h4 className="font-extrabold text-base text-white mb-2">Rule #1: Haftung vor Sachwert</h4>
                                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                                    Ein abgebranntes Büro lässt sich wieder einrichten. Eine ungedeckte Schadensersatzforderung von Millionen (z.B. Personenschaden) bricht dir und deiner GmbH sofort das Genick.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-base text-white mb-2">Rule #2: Ertragsausfall immer einplanen</h4>
                                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                                    Der Sachschaden an IT oder Maschinen ist oft der kleinere Teil. Der darauffolgende wochenlange Betriebsstillstand kostet dich durch entgangene Aufträge und laufende Fixkosten die Existenz.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-base text-white mb-2">Rule #3: Summen dynamisch wachsen lassen</h4>
                                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                                    Gewerbeversicherungen müssen atmen! Steigende Umsätze, neue Lagerstandorte oder wachsende Mitarbeiterzahlen müssen umgehend gemeldet werden, um gefährliche Unterversicherung zu vermeiden.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── BRANCHENSPEZIFISCHE LÖSUNGEN ─── */}
            <section className="py-24 bg-[#f8f9fc] relative border-b border-[#e2e8f0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#1e5adb] font-semibold text-xs uppercase tracking-widest block mb-2">Exakt auf dich zugeschnitten</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0a1930]">Konzepte nach Branchen</h2>
                        <p className="text-[#4a5568] font-normal mt-3 max-w-xl mx-auto">Jede Branche birgt andere Gefahren. Finde die perfekte Lösung für deinen Bereich.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {branchen.map((b, i) => (
                            <ScrollReveal key={i} direction="up" delay={i * 0.08}>
                                <div className="p-8 bg-white border border-[#e2e8f0] hover:border-[#1e5adb]/30 rounded-3xl transition-all group flex flex-col h-full shadow-[0_15px_40px_rgba(0,0,0,0.02)] relative">
                                    <div className="w-12 h-12 bg-[#e8effd] border border-[#d1e0f9] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <b.icon className="w-6 h-6 text-[#1e5adb]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0a1930] mb-4">{b.name}</h3>
                                    <p className="text-[#4a5568] text-xs font-normal leading-relaxed mb-6 flex-grow">{b.beschreibung}</p>
                                    <div className="border-t border-[#e2e8f0] pt-4 mt-auto">
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Empfohlener Fokus:</span>
                                        <span className="text-xs text-[#1e5adb] font-bold">{b.risiko}</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── DETALLIERTE PRODUKT-SEKTIONEN (Abwechselndes Apple-Style Layout) ─── */}
            <section className="bg-white">
                {produkte.map((p, idx) => {
                    const istGerade = idx % 2 === 0;
                    return (
                        <div 
                            key={p.id} 
                            id={p.id} // Anker-ID für das direkte Scrollen!
                            className={`py-28 border-b border-[#e2e8f0] scroll-mt-28 relative ${
                                istGerade ? 'bg-white' : 'bg-[#f8f9fc]'
                            }`}
                        >
                            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                                <div className="grid lg:grid-cols-2 gap-16 items-center">
                                    
                                    {/* Bild-Container (Links bei gerade, rechts bei ungerade) */}
                                    <div className={`w-full ${istGerade ? 'lg:order-1' : 'lg:order-2'}`}>
                                        <ScrollReveal direction={istGerade ? "left" : "right"}>
                                            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 aspect-[4/3] lg:aspect-square">
                                                <img 
                                                    src={p.image} 
                                                    alt={`${p.titel} für Gewerbe & Selbstständige - Sven Kegler Online-Makler`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                />
                                            </div>
                                        </ScrollReveal>
                                    </div>

                                    {/* Text- & Info-Container */}
                                    <div className={`w-full ${istGerade ? 'lg:order-2' : 'lg:order-1'}`}>
                                        <ScrollReveal direction="up">
                                            {/* Badge */}
                                            <div className="inline-flex items-center gap-2 bg-[#e8effd] text-[#1e5adb] px-4 py-2 rounded-full mb-6 font-semibold text-xs border border-[#d1e0f9] uppercase tracking-wider">
                                                <p.icon className="w-4 h-4" />
                                                <span>{p.untertitel}</span>
                                            </div>

                                            {/* Headline */}
                                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1930] mb-6 leading-tight">
                                                {p.titel}
                                            </h2>

                                            {/* Einleitung */}
                                            <p className="text-[#4a5568] text-base mb-10 leading-relaxed font-normal">
                                                {p.einleitung}
                                            </p>

                                            {/* Strukturierte Info-Punkte */}
                                            <motion.ul 
                                                variants={listVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: "-100px" }}
                                                className="space-y-6 mb-10"
                                            >
                                                {p.punkte.map((punkt, pIdx) => (
                                                    <motion.li 
                                                        key={pIdx} 
                                                        variants={itemVariants}
                                                        className="flex items-start gap-4 pb-5 border-b border-gray-100 last:border-b-0 last:pb-0 group cursor-default"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-[#1e5adb]/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1e5adb]/20">
                                                            <Check className="w-4 h-4 text-[#1e5adb] stroke-[3] transition-colors duration-300" />
                                                        </div>
                                                        <div className="transition-all duration-300 transform group-hover:translate-x-1">
                                                            <h4 className="font-extrabold text-base text-[#0a1930] mb-1.5 transition-colors duration-300 group-hover:text-[#1e5adb]">{punkt.titel}</h4>
                                                            <p className="text-sm text-[#4a5568] leading-relaxed font-normal">{punkt.text}</p>
                                                        </div>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>

                                            {/* CTA Button */}
                                            <a 
                                                href="#kontakt"
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0a1930] text-white text-sm font-semibold rounded-xl hover:bg-[#152a4f] transition-all shadow-md hover:shadow-lg"
                                            >
                                                <span>Erstgespräch vereinbaren</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </a>
                                        </ScrollReveal>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* ─── FAQ AKKORDEON SEKTION ─── */}
            <section className="py-28 bg-[#f8f9fc] relative border-b border-[#e2e8f0]">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="w-12 h-12 bg-[#e8effd] rounded-xl flex items-center justify-center mb-4 mx-auto border border-[#d1e0f9]">
                            <HelpCircle className="w-6 h-6 text-[#1e5adb]" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#0a1930]">Häufige Fragen für Unternehmen</h2>
                        <p className="text-[#4a5568] font-normal">Wichtige rechtliche und steuerliche Antworten für Gewerbetreibende.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const istOffen = offenesFAQ === index;
                            return (
                                <ScrollReveal key={index} direction="up" delay={index * 0.05}>
                                    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden hover:border-gray-300 transition-colors shadow-sm">
                                        <button
                                            onClick={() => toggleFAQ(index)}
                                            className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-bold text-[#0a1930] hover:text-[#1e5adb] transition-colors"
                                            aria-expanded={istOffen}
                                        >
                                            <span className="text-sm md:text-base font-semibold">{faq.frage}</span>
                                            <motion.div
                                                animate={{ rotate: istOffen ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-[#718096] flex-shrink-0"
                                            >
                                                <ChevronDown className="w-5 h-5" />
                                            </motion.div>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {istOffen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="px-6 pb-6 text-xs md:text-sm text-[#4a5568] font-normal leading-relaxed border-t border-[#e2e8f0] pt-4 bg-[#f8f9fc]">
                                                        {faq.antwort}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── DUNKELBLAUER CTA ─── */}
            <section className="py-24 bg-white relative">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="bg-[#0a1930] rounded-[3rem] p-12 md:p-16 relative overflow-hidden shadow-2xl text-white">
                        <div className="absolute inset-0 bg-[#1e5adb]/10 blur-[120px] pointer-events-none" />
                        
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Gewerbliche Risiken minimieren</h2>
                        <p className="text-slate-300 font-normal mb-10 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            Lass uns deine Verträge analysieren und sie an dein aktuelles Geschäftsmodell anpassen. Ehrlich, unverbindlich und mit voller Steuertransparenz.
                        </p>
                        
                        <motion.a 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://svenkegler.de/gewerbe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-[#1e5adb] text-white font-bold rounded-2xl hover:bg-[#1546b3] transition-all shadow-xl relative z-10 border border-[#1e5adb]/20"
                        >
                            Jetzt Gewerbe-Risikoanalyse anfordern
                            <ArrowRight className="w-5 h-5" />
                        </motion.a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Gewerbekunden;
