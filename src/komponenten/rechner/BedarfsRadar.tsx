import React, { useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Check, 
    ArrowRight, 
    ArrowLeft, 
    Sparkles, 
    GraduationCap, 
    Users, 
    User, 
    Home, 
    Building, 
    Car, 
    Compass, 
    Shield, 
    Activity, 
    Key,
    Info,
    X
} from 'lucide-react';

interface FrageSchritt {
    id: number;
    titel: string;
    beschreibung: string;
    optionen: {
        wert: string;
        label: string;
        icon: ComponentType<{ className?: string }>;
    }[];
}

const BedarfsRadar = () => {
    const [schritt, setSchritt] = useState(1);
    const [antworten, setAntworten] = useState<Record<number, string>>({});
    const [angebotGesendet, setAngebotGesendet] = useState(false);
    const [kontaktInfo, setKontaktInfo] = useState("");

    const fragen: FrageSchritt[] = [
        {
            id: 1,
            titel: "Deine aktuelle Lebensphase?",
            beschreibung: "Wähle das Profil, das am besten auf dich zutrifft. Wir passen die Empfehlungen exakt darauf an.",
            optionen: [
                { wert: "single", label: "Single & Berufseinstieg", icon: User },
                { wert: "familie", label: "Partnerschaft & Familie", icon: Users },
                { wert: "beamte", label: "Beamter / Anwärter", icon: GraduationCap }
            ]
        },
        {
            id: 2,
            titel: "Wie sieht deine Wohnsituation aus?",
            beschreibung: "Deine Immobilie oder Miete bestimmt wesentliche Haftungs- und Sachwert-Risiken.",
            optionen: [
                { wert: "miete", label: "Zur Miete (Wohnung/Haus)", icon: Key },
                { wert: "besitz", label: "Eigener Hausbesitzer / Eigentumswohnung", icon: Home },
                { wert: "bau", label: "In Planung (Hausbau/Kauf)", icon: Building }
            ]
        },
        {
            id: 3,
            titel: "Wie bist du im Alltag mobil?",
            beschreibung: "Auto, Motorrad oder öffentliche Verkehrsmittel – sichere deine Wege ab.",
            optionen: [
                { wert: "auto", label: "Eigenes Auto / Motorrad", icon: Car },
                { wert: "bahn", label: "ÖPNV / Fahrrad / E-Scooter", icon: Compass }
            ]
        },
        {
            id: 4,
            titel: "Hast du Haustiere?",
            beschreibung: "Tierhalter haften gesetzlich unbegrenzt für alle Schäden, die ihr Tier verursacht.",
            optionen: [
                { wert: "hund", label: "Ja, Hund(e) oder Pferd(e)", icon: Activity },
                { wert: "klein", label: "Ja, Katze(n) oder Kleintier(e)", icon: Info },
                { wert: "keine", label: "Nein, keine Haustiere", icon: X }
            ]
        },
        {
            id: 5,
            titel: "Welcher Absicherungs-Schwerpunkt ist dir wichtig?",
            beschreibung: "Setze den Fokus für deine persönliche Beratung.",
            optionen: [
                { wert: "existenz", label: "Existenzsicherung (Haftung, Arbeitskraft)", icon: Shield },
                { wert: "sachwert", label: "Vermögen- & Sachwertschutz", icon: Home },
                { wert: "vorsorge", label: "Altersvorsorge & Zukunft", icon: Sparkles }
            ]
        }
    ];

    const wähleOption = (wert: string) => {
        setAntworten((prev) => ({ ...prev, [schritt]: wert }));
        if (schritt < fragen.length) {
            setSchritt((prev) => prev + 1);
        } else {
            setSchritt(6); // Zum Ergebnis
        }
    };

    const zurück = () => {
        if (schritt > 1) {
            setSchritt((prev) => prev - 1);
        }
    };

    const radarZurücksetzen = () => {
        setAntworten({});
        setSchritt(1);
        setAngebotGesendet(false);
        setKontaktInfo("");
    };

    // Echtzeit-Bedarfsberechnung
    const berechneBedarf = () => {
        const phase = antworten[1];
        const wohnen = antworten[2];
        const mobil = antworten[3];
        const tier = antworten[4];

        const essentiell: { titel: string; beschreibung: string }[] = [];
        const empfehlenswert: { titel: string; beschreibung: string }[] = [];
        const optional: { titel: string; beschreibung: string }[] = [];

        // Lebensphase
        if (phase === "beamte") {
            essentiell.push({ 
                titel: "Dienstunfähigkeitsversicherung (DU)", 
                beschreibung: "Absolut zwingend erforderlich, da normale BU-Klauseln deine Beamtenlaufbahn (Widerruf/Entlassung) nicht absichern." 
            });
            essentiell.push({ 
                titel: "Beihilfekonforme PKV-Restkosten", 
                beschreibung: "Ergänzt deine 50-80% staatliche Beihilfe perfekt und sichert dir erstklassigen Privatpatienten-Status." 
            });
            empfehlenswert.push({ 
                titel: "Diensthaftpflichtversicherung", 
                beschreibung: "Schützt dich vor extremen Regressansprüchen deines Dienstherrn bei Fehlern im Dienst." 
            });
        } else if (phase === "gewerbe") {
            essentiell.push({ 
                titel: "Betriebshaftpflichtversicherung", 
                beschreibung: "Die absolute Überlebensgarantie für deine Firma bei Personen- oder Sachschäden Dritter." 
            });
            essentiell.push({ 
                titel: "Cyber-Risiko-Existenzschutz", 
                beschreibung: "Schützt dich vor ruinösen Schäden durch Hackerangriffe, Betriebsstillstand und Lösegeldforderungen." 
            });
            empfehlenswert.push({ 
                titel: "Gewerbliche Rechtsschutzversicherung", 
                beschreibung: "Zahlt teure Anwalts- und Gerichtskosten bei arbeits-, vertrags- oder steuerrechtlichen Streitigkeiten." 
            });
        } else {
            // Privatkunden (single, familie)
            essentiell.push({ 
                titel: "Privathaftpflichtversicherung", 
                beschreibung: "Gesetzlich absolut unverzichtbar. Schützt dich vor lebenslangen Schadensersatzforderungen." 
            });
            essentiell.push({ 
                titel: "Berufsunfähigkeitsversicherung (Einkommensschutz)", 
                beschreibung: "Sichert deinen wertvollsten Besitz ab – deine eigene Arbeitskraft und deinen Lebensstandard." 
            });
        }

        // Wohnen
        if (wohnen === "miete") {
            empfehlenswert.push({ 
                titel: "Hausratversicherung", 
                beschreibung: "Ersetzt dein gesamtes Hab und Gut zum Neuwert bei Einbruchdiebstahl, Leitungswasser, Sturm oder Brand." 
            });
        } else if (wohnen === "besitz") {
            essentiell.push({ 
                titel: "Wohngebäudeversicherung", 
                beschreibung: "Existenziell für Eigenheimbesitzer. Deckt Schäden am Mauerwerk/Dach durch Brand, Sturm, Hagel." 
            });
            empfehlenswert.push({ 
                titel: "Elementarschaden-Zusatzschutz", 
                beschreibung: "Zwingend notwendig zum Schutz vor Überschwemmungen, Starkregen und Naturgewalten." 
            });
        } else if (wohnen === "bau") {
            essentiell.push({ 
                titel: "Bauherrenhaftpflichtversicherung", 
                beschreibung: "Schützt dich während der gesamten Bauphase vor Schadenersatzforderungen bei Unfällen auf der Baustelle." 
            });
            empfehlenswert.push({ 
                titel: "Bauleistungsversicherung", 
                beschreibung: "Absicherung deiner unfertigen Immobilie bei unvorhergesehenen Sachschäden, Vandalismus oder Sturm." 
            });
        }

        // Mobil
        if (mobil === "auto") {
            essentiell.push({ 
                titel: "Kfz-Haftpflicht & Kaskoschutz", 
                beschreibung: "Gesetzlich Pflicht. Wir vergleichen Tarife mit freier Werkstattwahl und vollem Tierschaden-Schutz." 
            });
            optional.push({ 
                titel: "Verkehrs-Rechtsschutz", 
                beschreibung: "Sichert dich ab bei Streitigkeiten nach Unfällen, Bußgeldbescheiden oder Führerscheinentzug." 
            });
        }

        // Tiere
        if (tier === "hund") {
            essentiell.push({ 
                titel: "Tierhalterhaftpflicht (Hund/Pferd)", 
                beschreibung: "Als Halter haftest du verschuldensunabhängig. Ohne diesen Schutz droht bei Unfällen der finanzielle Ruin." 
            });
            optional.push({ 
                titel: "Hunde-/Pferde-OP-Krankenversicherung", 
                beschreibung: "Schützt dich vor explodierenden Tierarzt- und OP-Kosten bei Krankheiten oder Unfällen deines Tieres." 
            });
        }

        // Allgemeiner Rechtsschutz
        optional.push({ 
            titel: "Private Rechtsschutzversicherung", 
            beschreibung: "Übernimmt Anwalts- und Gerichtskosten bei privaten Streitigkeiten (z. B. mit Nachbarn oder Vermietern)." 
        });

        return { essentiell, empfehlenswert, optional };
    };

    const anfrageSenden = (e: React.FormEvent) => {
        e.preventDefault();
        if (!kontaktInfo) return;

        const betreff = encodeURIComponent("Anfrage Bedarfs-Radar Auswertung - Sven Kegler");
        const bedarf = berechneBedarf();
        const essentiellListe = bedarf.essentiell.map(i => `- ${i.titel}`).join("\n");
        const empfehlenswertListe = bedarf.empfehlenswert.map(i => `- ${i.titel}`).join("\n");
        
        const text = encodeURIComponent(
            `Hallo Sven,\n\nich habe mein persönliches Bedarfs-Radar ausgefüllt und möchte gerne die kostenfreien Vergleiche anfordern.\n\n` +
            `📊 Bedarfs-Radar Ergebnis:\n` +
            `[Essentiell]\n${essentiellListe || 'Kein akuter Bedarf'}\n\n` +
            `[Empfehlenswert]\n${empfehlenswertListe || 'Kein akuter Bedarf'}\n\n` +
            `👤 Kontaktdaten:\n- Telefon/E-Mail: ${kontaktInfo}\n\n` +
            `Bitte erstelle mir hierzu ein unverbindliches Angebot.\n\nFreundliche Grüße`
        );

        window.location.href = `mailto:kegler@simply-switch.de?subject=${betreff}&body=${text}`;
        setAngebotGesendet(true);
    };

    const aktuellesFragenobjekt = fragen.find(f => f.id === schritt);
    const progressPercentage = (schritt / fragen.length) * 100;

    return (
        <section id="bedarfsradar" className="py-24 bg-gradient-to-b from-[#f8f9fc] to-white relative overflow-hidden border-b border-[#e2e8f0] scroll-mt-20">
            <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-[#1e5adb] font-extrabold text-xs uppercase tracking-widest block mb-3">Interaktive Bedarfsanalyse</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a1930] tracking-tight mb-6">
                        Dein persönliches Bedarfs-Radar
                    </h2>
                    <p className="text-[#4a5568] text-lg font-normal">
                        Finde in unter 3 Minuten spielerisch heraus, welche Absicherungen für deine aktuelle Lebensphase wirklich unverzichtbar sind und wo du bares Geld sparen kannst.
                    </p>
                </div>

                {/* Radar Container - Borderless Editorial Style */}
                <div className="max-w-7xl mx-auto relative min-h-[440px] flex flex-col justify-between">
                    <div className="absolute inset-0 bg-[#1e5adb]/[0.01] blur-[80px] pointer-events-none rounded-[2.5rem]" />
                    
                    <AnimatePresence mode="wait">
                        {schritt <= fragen.length && aktuellesFragenobjekt ? (
                            <motion.div
                                key={schritt}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col flex-grow justify-between relative z-10"
                            >
                                {/* Progress Bar & Schrittzähler */}
                                <div>
                                    <div className="flex justify-between items-center mb-4 text-xs font-extrabold text-[#718096] uppercase tracking-wider">
                                        <span>Frage {schritt} von {fragen.length}</span>
                                        <span className="text-[#1e5adb]">{Math.round(progressPercentage)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full mb-8 overflow-hidden">
                                        <motion.div 
                                            className="bg-[#1e5adb] h-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPercentage}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>

                                    {/* Frage & Beschreibung */}
                                    <h3 className="font-extrabold text-2xl md:text-3xl text-[#0a1930] mb-3 tracking-tight">
                                        {aktuellesFragenobjekt.titel}
                                    </h3>
                                    <p className="text-sm text-[#718096] mb-8 font-normal leading-relaxed">
                                        {aktuellesFragenobjekt.beschreibung}
                                    </p>

                                    {/* Optionen Grid - Borderless Line-based Design */}
                                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                                        {aktuellesFragenobjekt.optionen.map((opt) => {
                                            const IconComponent = opt.icon;
                                            return (
                                                <button
                                                    key={opt.wert}
                                                    type="button"
                                                    onClick={() => wähleOption(opt.wert)}
                                                    className="flex items-center gap-5 border-b border-gray-100 hover:border-[#1e5adb] py-5 text-left font-extrabold text-sm md:text-base text-[#0a1930] transition-all duration-300 group hover:translate-x-1 cursor-pointer"
                                                >
                                                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-[#718096] group-hover:text-[#1e5adb] group-hover:bg-[#e8effd]/50 group-hover:border-[#e8effd]/80 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.02)]">
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <span className="block text-[#0a1930] group-hover:text-[#1e5adb] transition-colors">{opt.label}</span>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1e5adb] group-hover:translate-x-1 transition-all" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Navigation Footer */}
                                <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between">
                                    <button
                                        type="button"
                                        disabled={schritt === 1}
                                        onClick={zurück}
                                        className={`flex items-center gap-2 font-extrabold text-sm transition-all ${
                                            schritt === 1 
                                                ? 'text-gray-300 cursor-not-allowed opacity-50' 
                                                : 'text-[#1e5adb]/85 hover:text-[#1e5adb] hover:-translate-x-0.5 cursor-pointer'
                                        }`}
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Zurück</span>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            // Schritt 6: Das Ergebnis-Dashboard - Komplett rahmenlos & Akzentstreifen-basiert
                            <motion.div
                                key="ergebnis"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col relative z-10"
                            >
                                {!angebotGesendet ? (
                                    <>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100 mb-8 gap-4">
                                            <div>
                                                <h3 className="font-extrabold text-2xl text-[#0a1930] tracking-tight">Dein persönliches Absicherungs-Radar</h3>
                                                <p className="text-xs text-[#718096] font-normal">Basierend auf deinen Antworten haben wir folgende Absicherungen analysiert.</p>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={radarZurücksetzen}
                                                className="px-4 py-2 bg-[#e8effd]/40 border border-[#e8effd] hover:border-[#1e5adb]/20 text-xs font-extrabold text-[#1e5adb] rounded-xl hover:bg-[#e8effd]/80 transition-all self-start md:self-auto cursor-pointer"
                                            >
                                                Radar neu starten
                                            </button>
                                        </div>

                                        {/* Ergebnis-Zeilen mit Akzentstreifen statt Boxen */}
                                        <div className="space-y-10 mb-12">
                                            
                                            {/* ESSENTIELL */}
                                            {berechneBedarf().essentiell.length > 0 && (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-6">
                                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                                                        <span className="text-xs font-extrabold text-red-500 uppercase tracking-widest">Säule 1: Absolut Unverzichtbar</span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-8">
                                                        {berechneBedarf().essentiell.map((item, idx) => (
                                                            <div key={idx} className="border-l-[6px] border-red-500 bg-gradient-to-r from-red-50/50 via-red-50/10 to-transparent rounded-r-2xl pl-6 py-4 shadow-[0_4px_15px_rgba(239,68,68,0.01)] border border-red-100/30">
                                                                <h4 className="font-black text-lg md:text-xl text-[#0a1930] mb-2 leading-snug">{item.titel}</h4>
                                                                <p className="text-base text-[#1a202c] leading-relaxed font-semibold">{item.beschreibung}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* EMPFEHLENSWERT */}
                                            {berechneBedarf().empfehlenswert.length > 0 && (
                                                <div className="pt-8 border-t border-gray-100">
                                                    <div className="flex items-center gap-2 mb-6">
                                                        <span className="w-3 h-3 rounded-full bg-[#1e5adb] animate-pulse" />
                                                        <span className="text-xs font-extrabold text-[#1e5adb] uppercase tracking-widest">Säule 2: Sehr Empfehlenswert</span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-8">
                                                        {berechneBedarf().empfehlenswert.map((item, idx) => (
                                                            <div key={idx} className="border-l-[6px] border-[#1e5adb] bg-gradient-to-r from-[#e8effd]/40 via-[#e8effd]/10 to-transparent rounded-r-2xl pl-6 py-4 shadow-[0_4px_15px_rgba(30,90,219,0.01)] border border-[#e8effd]/30">
                                                                <h4 className="font-black text-lg md:text-xl text-[#0a1930] mb-2 leading-snug">{item.titel}</h4>
                                                                <p className="text-base text-[#1a202c] leading-relaxed font-semibold">{item.beschreibung}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* OPTIONAL */}
                                            {berechneBedarf().optional.length > 0 && (
                                                <div className="pt-8 border-t border-gray-100">
                                                    <div className="flex items-center gap-2 mb-6">
                                                        <span className="w-3 h-3 rounded-full bg-gray-400" />
                                                        <span className="text-xs font-extrabold text-[#718096] uppercase tracking-widest">Säule 3: Sinnvolle Ergänzung</span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-8">
                                                        {berechneBedarf().optional.map((item, idx) => (
                                                            <div key={idx} className="border-l-[6px] border-gray-300 bg-gradient-to-r from-gray-50/70 via-gray-50/20 to-transparent rounded-r-2xl pl-6 py-4 shadow-[0_4px_15px_rgba(0,0,0,0.01)] border border-gray-100/30">
                                                                <h4 className="font-black text-lg md:text-xl text-[#0a1930] mb-2 leading-snug">{item.titel}</h4>
                                                                <p className="text-base text-[#1a202c] leading-relaxed font-semibold">{item.beschreibung}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Kontakt-Abschnitt - Clean Glassmorphism-Bordered Banner */}
                                        <form 
                                            onSubmit={anfrageSenden}
                                            className="bg-[#0a1930] border border-blue-950 rounded-[2.5rem] p-10 flex flex-col lg:flex-row items-center justify-between gap-8 mt-16 shadow-[0_20px_50px_rgba(10,25,48,0.15)] relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e5adb]/10 rounded-full blur-[80px] pointer-events-none" />
                                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
                                            
                                            <div className="max-w-md text-left relative z-10">
                                                <h4 className="font-extrabold text-xl text-white mb-3 flex items-center gap-3">
                                                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                                                    <span>Kostenfreien Vergleich & Angebot sichern</span>
                                                </h4>
                                                <p className="text-sm text-blue-200 leading-relaxed font-medium">
                                                    Wir filtern transparent die stärksten Tarife am Markt für deinen Bedarf heraus. Durch das Absenden öffnet sich dein E-Mail-Programm mit allen Details.
                                                </p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-grow max-w-lg justify-end relative z-10">
                                                <div className="relative flex-grow">
                                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                                        <span className="text-gray-400 font-bold text-base">@</span>
                                                    </div>
                                                    <input 
                                                        type="text" 
                                                        required
                                                        value={kontaktInfo}
                                                        onChange={(e) => setKontaktInfo(e.target.value)}
                                                        placeholder="Telefonnummer oder E-Mail"
                                                        className="bg-white border-2 border-transparent focus:border-[#1e5adb] rounded-2xl pl-10 pr-5 py-4 text-base text-[#0a1930] focus:outline-none transition-all placeholder:text-gray-400 font-bold w-full shadow-lg"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className={`py-4 px-8 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                                                        kontaktInfo 
                                                            ? 'bg-[#1e5adb] hover:bg-[#2b6eff] text-white shadow-[0_4px_20px_rgba(30,90,219,0.3)] hover:-translate-y-0.5 active:scale-95 cursor-pointer'
                                                            : 'bg-[#1e5adb] text-white/80 opacity-60 hover:opacity-75 cursor-pointer'
                                                    }`}
                                                >
                                                    <span>Angebot anfordern</span>
                                                    <ArrowRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    // Erfolgs-Bildschirm - E-Mail mailto formatierte Bestätigung
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center mb-6 shadow-md border border-[#10b981]/20">
                                            <Check className="w-8 h-8 text-[#10b981] stroke-[3]" />
                                        </div>
                                        <h3 className="font-extrabold text-2xl text-[#0a1930] mb-3 tracking-tight">Anfrage per E-Mail vorbereitet!</h3>
                                        <p className="text-[#4a5568] text-sm max-w-sm mb-6 leading-relaxed font-normal">
                                            Vielen Dank! Deine E-Mail-Anfrage wurde erfolgreich generiert und in deinem E-Mail-Programm an <span className="font-bold text-[#0a1930]">kegler@simply-switch.de</span> geöffnet.
                                        </p>
                                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-2xl p-5 max-w-md text-xs text-[#718096] leading-relaxed shadow-sm font-normal">
                                            Sollte sich dein Mail-Programm nicht automatisch geöffnet haben, sende uns deine Anfrage einfach direkt mit deinen Bedarfsdaten per Mail. Sven Kegler meldet sich innerhalb der nächsten 24 Stunden persönlich bei dir!
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={radarZurücksetzen}
                                            className="mt-8 font-bold text-sm text-[#1e5adb] hover:text-[#1546b3] transition-colors cursor-pointer"
                                        >
                                            Radar neu starten
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default BedarfsRadar;
