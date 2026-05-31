import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Check, 
    ArrowRight, 
    ArrowLeft, 
    Sparkles, 
    GraduationCap, 
    Briefcase, 
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
        icon: any;
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
                { wert: "gewerbe", label: "Selbstständig / Unternehmer", icon: Briefcase },
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
        setAngebotGesendet(true);
    };

    const aktuellesFragenobjekt = fragen.find(f => f.id === schritt);
    const progressPercentage = (schritt / fragen.length) * 100;

    return (
        <section className="py-24 bg-gradient-to-b from-[#f8f9fc] to-white relative overflow-hidden border-b border-[#e2e8f0]">
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

                {/* Radar Container */}
                <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative min-h-[480px] flex flex-col justify-between">
                    <div className="absolute inset-0 bg-[#1e5adb]/[0.01] blur-[80px] pointer-events-none rounded-[2.5rem]" />
                    
                    <AnimatePresence mode="wait">
                        {schritt <= fragen.length && aktuellesFragenobjekt ? (
                            <motion.div
                                key={schritt}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
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

                                    {/* Optionen Grid */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {aktuellesFragenobjekt.optionen.map((opt) => {
                                            const IconComponent = opt.icon;
                                            return (
                                                <button
                                                    key={opt.wert}
                                                    type="button"
                                                    onClick={() => wähleOption(opt.wert)}
                                                    className="flex items-center gap-4 bg-[#f8f9fc] hover:bg-white border border-gray-100 hover:border-[#1e5adb] hover:shadow-[0_10px_30px_rgba(30,90,219,0.05)] p-5 rounded-2xl text-left font-extrabold text-sm md:text-base text-[#0a1930] transition-all duration-300 group hover:-translate-y-0.5"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#718096] group-hover:text-[#1e5adb] group-hover:bg-[#e8effd]/30 transition-all duration-300">
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                    <span>{opt.label}</span>
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
                                        className={`flex items-center gap-2 font-bold text-sm transition-all ${
                                            schritt === 1 
                                                ? 'text-gray-300 cursor-not-allowed' 
                                                : 'text-[#718096] hover:text-[#0a1930] cursor-pointer'
                                        }`}
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Zurück</span>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            // Schritt 6: Das Ergebnis-Dashboard
                            <motion.div
                                key="ergebnis"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
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
                                                className="px-4 py-2 border border-gray-200 text-xs font-extrabold text-[#718096] rounded-xl hover:bg-gray-50 transition-colors self-start md:self-auto cursor-pointer"
                                            >
                                                Radar neu starten
                                            </button>
                                        </div>

                                        {/* Ergebnis-Säulen */}
                                        <div className="space-y-6 mb-8">
                                            {/* ESSENTIELL */}
                                            {berechneBedarf().essentiell.length > 0 && (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                                                        <span className="text-xs font-extrabold text-red-500 uppercase tracking-widest">Säule 1: Absolut Unverzichtbar</span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {berechneBedarf().essentiell.map((item, idx) => (
                                                            <div key={idx} className="bg-red-50/20 border border-red-100/50 rounded-2xl p-5 relative overflow-hidden">
                                                                <h4 className="font-extrabold text-sm text-[#0a1930] mb-2">{item.titel}</h4>
                                                                <p className="text-xs text-[#718096] leading-relaxed font-normal">{item.beschreibung}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* EMPFEHLENSWERT */}
                                            {berechneBedarf().empfehlenswert.length > 0 && (
                                                <div className="pt-4 border-t border-gray-100">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="w-2.5 h-2.5 rounded-full bg-[#1e5adb]" />
                                                        <span className="text-xs font-extrabold text-[#1e5adb] uppercase tracking-widest">Säule 2: Sehr Empfehlenswert</span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {berechneBedarf().empfehlenswert.map((item, idx) => (
                                                            <div key={idx} className="bg-[#e8effd]/10 border border-[#e8effd]/30 rounded-2xl p-5 relative overflow-hidden">
                                                                <h4 className="font-extrabold text-sm text-[#0a1930] mb-2">{item.titel}</h4>
                                                                <p className="text-xs text-[#718096] leading-relaxed font-normal">{item.beschreibung}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* OPTIONAL */}
                                            {berechneBedarf().optional.length > 0 && (
                                                <div className="pt-4 border-t border-gray-100">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                                                        <span className="text-xs font-extrabold text-[#718096] uppercase tracking-widest">Säule 3: Sinnvolle Ergänzung</span>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {berechneBedarf().optional.map((item, idx) => (
                                                            <div key={idx} className="bg-gray-50 border border-gray-100/50 rounded-2xl p-5 relative overflow-hidden">
                                                                <h4 className="font-extrabold text-sm text-[#0a1930] mb-2">{item.titel}</h4>
                                                                <p className="text-xs text-[#718096] leading-relaxed font-normal">{item.beschreibung}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Kontakt-Abschnitt */}
                                        <form 
                                            onSubmit={anfrageSenden}
                                            className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
                                        >
                                            <div className="max-w-md">
                                                <h4 className="font-extrabold text-base text-[#0a1930] mb-2 flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-[#1e5adb]" />
                                                    <span>Kostenfreien Vergleich & Angebot sichern</span>
                                                </h4>
                                                <p className="text-xs text-[#718096] leading-relaxed font-normal">
                                                    Wir filtern unabhängig die stärksten Tarife am Markt für deinen Bedarf heraus. Hinterlasse einfach deine E-Mail oder Telefonnummer.
                                                </p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-grow max-w-md justify-end">
                                                <input 
                                                    type="text" 
                                                    required
                                                    value={kontaktInfo}
                                                    onChange={(e) => setKontaktInfo(e.target.value)}
                                                    placeholder="Telefonnummer oder E-Mail"
                                                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#1e5adb] focus:outline-none transition-all placeholder:text-gray-300 font-medium w-full sm:w-auto flex-grow"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={!kontaktInfo}
                                                    className={`py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                                                        kontaktInfo 
                                                            ? 'bg-[#0a1930] hover:bg-[#152a4f] text-white hover:-translate-y-0.5 cursor-pointer'
                                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <span>Angebot anfordern</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    // Erfolgs-Bildschirm
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center mb-6 shadow-md border border-[#10b981]/20">
                                            <Check className="w-8 h-8 text-[#10b981] stroke-[3]" />
                                        </div>
                                        <h3 className="font-extrabold text-2xl text-[#0a1930] mb-3 tracking-tight">Anfrage erfolgreich!</h3>
                                        <p className="text-[#4a5568] text-sm max-w-sm mb-6 leading-relaxed font-normal">
                                            Wir haben deine Bedarfs-Radar-Auswertung erhalten und vergleichen jetzt unabhängig die passenden Angebote für dich.
                                        </p>
                                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-2xl p-5 max-w-md text-xs text-[#718096] leading-relaxed shadow-sm font-normal">
                                            Wir melden uns unter <span className="font-bold text-[#0a1930]">{kontaktInfo}</span> innerhalb der nächsten 24 Stunden mit deinen individuellen Angeboten. Du musst nichts weiter tun!
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
