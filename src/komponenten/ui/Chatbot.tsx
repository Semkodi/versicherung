// Importiere React und Hooks für Zustand, Effekte und Referenzen
import React, { useState, useEffect, useRef } from 'react';
// Importiere motion und AnimatePresence von framer-motion für flüssige Animationen
import { motion, AnimatePresence } from 'framer-motion';
// Importiere benötigte Icons von lucide-react
import { X, ArrowUp, Shield, MessageSquare } from 'lucide-react';
// Importiere clsx für bedingtes Zusammenführen von Klassen
import { clsx, type ClassValue } from 'clsx';
// Importiere twMerge um Tailwind-Klassen sicher zusammenzuführen
import { twMerge } from 'tailwind-merge';
// Importiere die Supabase-Client-Instanz für die Datenbankverbindung
import { supabase, istOffline } from '@/lib/supabase';

// Hilfsfunktion zum sicheren Zusammenführen von Tailwind-CSS-Klassen
function cn(...eingaben: ClassValue[]) {
    // Gibt die zusammengeführten Klassen zurück
    return twMerge(clsx(eingaben));
}

// Typdefinition für eine Chat-Nachricht
type Nachricht = {
    // Eindeutige ID der Nachricht
    id: string;
    // Der Textinhalt der Nachricht
    text: string;
    // Absender der Nachricht ('bot' oder 'user')
    sender: 'bot' | 'user';
    // Zeitstempel der Nachricht
    timestamp: Date;
    // Art der Nachricht (optional)
    type?: 'text' | 'options' | 'summary';
    // Mögliche Auswahloptionen für den Benutzer (optional)
    options?: string[];
};

// Typdefinition für die gesammelten Benutzerdaten
type BenutzerDaten = {
    // Hauptkategorie des Anliegens
    category: string;
    // Unterkategorie
    subCategory: string;
    // Vollständiger Name
    name: string;
    // E-Mail-Adresse
    email: string;
    // Telefonnummer
    phone: string;
    // Bevorzugter Kontaktkanal
    channel: string;
};

// Definiere die Chatbot-Komponente
const Chatbot: React.FC = () => {
    // Zustand: Ist der Chatbot geöffnet?
    const [istOffen, setIstOffen] = useState(false);
    // Zustand: Soll der kleine Tooltip neben dem Button angezeigt werden?
    const [zeigeTooltip, setZeigeTooltip] = useState(true);
    // Zustand: Array aller Nachrichten im Chatverlauf
    const [nachrichten, setNachrichten] = useState<Nachricht[]>([]);
    // Zustand: Aktueller Text im Eingabefeld
    const [eingabeWert, setEingabeWert] = useState('');
    // Zustand: Tippt der Bot gerade (zeigt die Lade-Animation)?
    const [tipptGerade, setTipptGerade] = useState(false);
    // Zustand: Aktueller Schritt im automatisierten Chat-Flow
    const [schritt, setSchritt] = useState(0);
    // Zustand: Speichert die gesammelten Daten des Benutzers
    const [benutzerDaten, setBenutzerDaten] = useState<BenutzerDaten>({
        category: '',
        subCategory: '',
        name: '',
        email: '',
        phone: '',
        channel: ''
    });

    // Referenz für das Ende der Nachrichtenliste (zum automatischen Scrollen)
    const nachrichtenEndeRef = useRef<HTMLDivElement>(null);

    // Referenz zur Speicherung der Bot-Timeout-ID für sauberen Cleanup beim Unmounten
    const botTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Effekt: Bereinige ausstehende Bot-Timeouts beim Unmounten der Komponente
    useEffect(() => {
        return () => {
            if (botTimeoutRef.current) {
                clearTimeout(botTimeoutRef.current);
            }
        };
    }, []);

    // Funktion zum automatischen Scrollen nach unten zu den neuesten Nachrichten
    const scrolleNachUnten = () => {
        // Führt das weiche Scrollen zum referenzierten Element aus
        nachrichtenEndeRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Effekt: Scrolle nach unten, sobald sich die Nachrichten ändern oder der Bot tippt
    useEffect(() => {
        scrolleNachUnten();
    }, [nachrichten, tipptGerade]);

    // Effekt: Starte den Chat, wenn er zum ersten Mal geöffnet wird und noch leer ist
    useEffect(() => {
        if (istOffen && nachrichten.length === 0) {
            // Sende die initiale Begrüßungsnachricht mit Optionen
            sendeBotNachricht("Hallo! Ich bin dein Simply Switch Assistent. 👋 Wie kann ich dir heute helfen?", ['Beamtenversicherung', 'Existenzgründer / Selbstständig', 'Private Versicherung', 'Allgemeine Frage']);
        }
    }, [istOffen]);

    // Effekt: Verstecke den Tooltip automatisch nach 10 Sekunden, wenn der Chat zu ist
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (zeigeTooltip && !istOffen) {
            // Setze einen Timeout von 10000ms (10 Sekunden)
            timer = setTimeout(() => {
                setZeigeTooltip(false);
            }, 10000);
        }
        // Bereinige den Timer beim Unmounten oder wenn sich Abhängigkeiten ändern
        return () => clearTimeout(timer);
    }, [zeigeTooltip, istOffen]);

    // Funktion zum Senden einer Nachricht vom Bot (mit künstlicher Verzögerung)
    const sendeBotNachricht = (text: string, options?: string[]) => {
        // Aktiviere die Tipp-Animation
        setTipptGerade(true);
        // Berechne eine dynamische Verzögerung basierend auf der Textlänge (zwischen 0.8s und 2s)
        const verzoegerung = Math.min(Math.max(text.length * 15, 800), 2000);

        // Führe das eigentliche Senden nach der berechneten Zeit aus
        botTimeoutRef.current = setTimeout(() => {
            // Deaktiviere die Tipp-Animation
            setTipptGerade(false);
            // Erstelle das neue Nachrichten-Objekt
            const neueNachricht: Nachricht = {
                id: Math.random().toString(36).substring(7),
                text,
                sender: 'bot',
                timestamp: new Date(),
                type: options ? 'options' : 'text',
                options
            };
            // Füge die Nachricht zum Chatverlauf hinzu
            setNachrichten(prev => [...prev, neueNachricht]);
            botTimeoutRef.current = null;
        }, verzoegerung);
    };

    // Funktion zur Verarbeitung von Klicks auf Antwort-Optionen (Buttons)
    const handleOptionKlick = async (option: string) => {
        // Erstelle eine Nachricht für die ausgewählte Option als Benutzereingabe
        const benutzerNachricht: Nachricht = {
            id: Math.random().toString(36).substring(7),
            text: option,
            sender: 'user',
            timestamp: new Date()
        };
        // Zeige die Benutzerauswahl im Chat an
        setNachrichten(prev => [...prev, benutzerNachricht]);

        // Verarbeite die Logik basierend auf dem aktuellen Schritt des Flows
        if (schritt === 0) {
            // Speichere die gewählte Hauptkategorie
            setBenutzerDaten(prev => ({ ...prev, category: option }));
            if (option === 'Beamtenversicherung') {
                sendeBotNachricht("Hervorragend! In welchem Status befindest du dich aktuell?", ['Anwärter / Referendar', 'Beamter auf Probe', 'Beamter auf Lebenszeit']);
                setSchritt(1);
            } else if (option === 'Existenzgründer / Selbstständig') {
                sendeBotNachricht("Klasse! Startest du gerade erst durch oder bist du bereits länger selbstständig?", ['Gerade in Gründung', 'Bereits selbstständig']);
                setSchritt(1);
            } else {
                sendeBotNachricht("Verstanden. Wie dürfen wir dich nennen? (Vor- und Nachname)");
                setSchritt(2);
            }
        } else if (schritt === 1) {
            // Speichere die gewählte Unterkategorie (Status bzw. Gründungsstatus)
            setBenutzerDaten(prev => ({ ...prev, subCategory: option }));
            if (benutzerDaten.category === 'Beamtenversicherung') {
                sendeBotNachricht("In welchem Bereich bist du tätig?", ['Lehramt / Schule', 'Polizei / Zoll / Justiz', 'Verwaltung', 'Sonstiges']);
                setSchritt(1.2);
            } else if (benutzerDaten.category === 'Existenzgründer / Selbstständig') {
                sendeBotNachricht("In welcher Branche bist du tätig bzw. gründest du?", ['IT & Beratung', 'Handwerk & Bau', 'Dienstleistung', 'Freiberufler', 'Sonstiges']);
                setSchritt(1.3);
            } else {
                sendeBotNachricht("Perfekt. Um den Termin optimal vorzubereiten: Wie dürfen wir dich nennen? (Vor- und Nachname)");
                setSchritt(2);
            }
        } else if (schritt === 1.2) {
            // Speichere die Dienstlaufbahn
            setBenutzerDaten(prev => ({ ...prev, subCategory: prev.subCategory + " (" + option + ")" }));
            sendeBotNachricht("Welches Thema liegt dir besonders am Herzen?", ['Beihilfe & PKV', 'Dienstunfähigkeit (DU)', 'Diensthaftpflicht', 'Rundum-Beratung']);
            setSchritt(1.4);
        } else if (schritt === 1.3) {
            // Speichere die Branche für Selbstständige und gehe zu Schritt 2
            setBenutzerDaten(prev => ({ ...prev, subCategory: prev.subCategory + " (" + option + ")" }));
            sendeBotNachricht("Perfekt. Um den Termin optimal vorzubereiten: Wie dürfen wir dich nennen? (Vor- und Nachname)");
            setSchritt(2);
        } else if (schritt === 1.4) {
            // Speichere den Schwerpunkt für Beamte und gehe zu Schritt 2
            setBenutzerDaten(prev => ({ ...prev, subCategory: prev.subCategory.replace(")", " - " + option + ")") }));
            sendeBotNachricht("Perfekt. Um den Termin optimal vorzubereiten: Wie dürfen wir dich nennen? (Vor- und Nachname)");
            setSchritt(2);
        } else if (schritt === 4) {
            // Speichere den gewünschten Kontaktkanal
            setBenutzerDaten(prev => ({ ...prev, channel: option }));
            // Erstelle einen Zusammenfassungstext
            const zusammenfassungText = `Danke! Hier ist eine Zusammenfassung deiner Anfrage:\n\n📍 Bereich: ${benutzerDaten.category}\n📎 Details: ${benutzerDaten.subCategory || 'Keine Angabe'}\n👤 Name: ${benutzerDaten.name}\n📧 E-Mail: ${benutzerDaten.email}\n📱 Tel: ${benutzerDaten.phone}\n💬 Kanal: ${option}\n\nSoll ich diese Anfrage so an Sven Kegler senden?`;
            sendeBotNachricht(zusammenfassungText, ['Ja, Anfrage senden', 'Daten korrigieren']);
            setSchritt(5);
        } else if (schritt === 5) {
            if (option === 'Ja, Anfrage senden') {
                try {
                    if (istOffline) {
                        // Im Offline-Modus loggen wir den Lead nur in der Konsole
                        console.log('Lead empfangen (Offline-Modus):', {
                            name: benutzerDaten.name,
                            email: benutzerDaten.email,
                            phone: benutzerDaten.phone,
                            category: benutzerDaten.category,
                            sub_category: benutzerDaten.subCategory,
                            channel: benutzerDaten.channel
                        });
                    } else {
                        // Sende die gesammelten Daten an Supabase
                        const { error } = await supabase
                            .from('leads')
                            .insert([
                                {
                                    name: benutzerDaten.name,
                                    email: benutzerDaten.email,
                                    phone: benutzerDaten.phone,
                                    category: benutzerDaten.category,
                                    sub_category: benutzerDaten.subCategory,
                                    channel: benutzerDaten.channel,
                                    status: 'Neu',
                                    // Setze hohe Priorität für Beamtenversicherungen
                                    priority: benutzerDaten.category === 'Beamtenversicherung' ? 'Hoch' : 'Normal'
                                }
                            ]);

                        // Wirf einen Fehler, falls der Insert fehlschlägt
                        if (error) throw error;
                    }
                    sendeBotNachricht("✅ Deine Anfrage wurde erfolgreich empfangen! Sven Kegler wird sich zeitnah persönlich bei dir melden. Vielen Dank für dein Vertrauen!");
                    // Gehe zum Endschritt
                    setSchritt(6);
                } catch (fehler: any) {
                    console.error('Fehler beim Speichern:', fehler);
                    sendeBotNachricht("Leider gab es ein technisches Problem beim Senden deiner Anfrage. Bitte versuche es später noch einmal oder rufe uns direkt an!");
                }
            } else {
                // Bei "Daten korrigieren" starten wir den Flow neu
                sendeBotNachricht("Kein Problem. Starten wir noch einmal kurz von vorn. Was ist dein Anliegen?", ['Beamtenversicherung', 'Existenzgründer / Selbstständig', 'Private Versicherung', 'Allgemeine Frage']);
                setSchritt(0);
            }
        }
    };

    // Funktion zur Verarbeitung von regulären Texteingaben
    const handleNachrichtSenden = (ereignis?: React.FormEvent) => {
        // Verhindere das Neuladen der Seite beim Absenden des Formulars
        ereignis?.preventDefault();
        // Breche ab, wenn das Eingabefeld leer ist
        if (!eingabeWert.trim()) return;

        // Erstelle eine Nachricht für die Eingabe
        const benutzerNachricht: Nachricht = {
            id: Math.random().toString(36).substring(7),
            text: eingabeWert,
            sender: 'user',
            timestamp: new Date()
        };
        // Füge die Nachricht zum Chatverlauf hinzu
        setNachrichten(prev => [...prev, benutzerNachricht]);
        // Speichere den Wert zwischen und leere das Eingabefeld
        const wert = eingabeWert;
        setEingabeWert('');

        // Verarbeite die Eingabe basierend auf dem Schritt
        if (schritt === 2) {
            // Speichere den Namen des Benutzers
            setBenutzerDaten(prev => ({ ...prev, name: wert }));
            // Extrahiere den Vornamen für eine persönliche Ansprache
            sendeBotNachricht(`Freut mich, ${wert.split(' ')[0]}! Unter welcher E-Mail-Adresse können wir dich erreichen?`);
            setSchritt(3);
        } else if (schritt === 3) {
            // Einfache Validierung für E-Mail
            if (wert.includes('@') && wert.includes('.')) {
                setBenutzerDaten(prev => ({ ...prev, email: wert }));
                sendeBotNachricht("Und für Rückfragen oder WhatsApp: Wie lautet deine Telefonnummer?");
                setSchritt(3.5);
            } else {
                sendeBotNachricht("Das sieht nicht wie eine gültige E-Mail aus. Magst du sie nochmal kurz prüfen?");
            }
        } else if (schritt === 3.5) {
            // Speichere die Telefonnummer
            setBenutzerDaten(prev => ({ ...prev, phone: wert }));
            sendeBotNachricht("Wie möchtest du das Beratungsgespräch am liebsten führen?", ['WhatsApp', 'Video-Call', 'Telefonisch', 'Persönlich']);
            setSchritt(4);
        } else if (schritt >= 6) {
            // Standardantwort am Ende des Flows
            sendeBotNachricht("Vielen Dank! Deine Nachricht wurde gespeichert. Sven meldet sich bei dir.");
        } else {
            // Fehlerhinweis, wenn eine Option erwartet wird, aber Text eingegeben wurde
            sendeBotNachricht("Ich bin ein Assistent und folge einem festen Ablauf. Bitte wähle eine der Optionen oder beantworte die Fragen oben.");
        }
    };

    // JSX der Komponente zurückgeben
    return (
        // Wrapper-Container, fixiert in der unteren rechten Ecke
        <div className="fixed bottom-6 right-6 z-[100] font-sans pointer-events-none">
            {/* Tooltip für den geschlossenen Zustand */}
            <AnimatePresence>
                {/* Zeige Tooltip nur, wenn der Chat zu ist und zeigeTooltip true ist */}
                {!istOffen && zeigeTooltip && (
                    <motion.div
                        // Animationseinstellungen für den Tooltip
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
                        transition={{ y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        // Styling des Tooltips
                        className="absolute bottom-[80px] right-2 w-[240px] bg-white text-marke-sekundaer border-2 border-marke-primaer/20 px-4 py-3 rounded-2xl rounded-br-none shadow-xl font-bold text-sm cursor-pointer pointer-events-auto"
                        // Öffne den Chat, wenn auf den Tooltip geklickt wird
                        onClick={() => setIstOffen(true)}
                    >
                        Fragen? Ich bin für dich da! 👋<br/>
                        <span className="font-normal text-xs text-text-neben">Jetzt Chat starten</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Runder Button zum Öffnen/Schließen des Chats */}
            <motion.button
                // Animationen für Hover und Klick
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                // Ändere den Zustand beim Klicken
                onClick={() => setIstOffen(!istOffen)}
                // Zeige Tooltip wieder, wenn die Maus darüber schwebt
                onMouseEnter={() => setZeigeTooltip(true)}
                // Styling des Buttons
                className="w-16 h-16 bg-marke-primaer rounded-full shadow-lg flex items-center justify-center relative z-10 pointer-events-auto"
            >
                {/* Animierter Wechsel zwischen Chat-Icon und Schließen-Icon */}
                <AnimatePresence mode="wait">
                    {istOffen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X className="w-8 h-8 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <MessageSquare className="w-8 h-8 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Das eigentliche Chat-Fenster */}
            <AnimatePresence>
                {istOffen && (
                    <motion.div
                        // Animation für das Ein- und Ausblenden des Chat-Fensters
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "right bottom" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        // Styling des Fensters
                        className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-48px)] h-[580px] bg-white rounded-[2rem] shadow-3xl border border-slate-100 flex flex-col overflow-hidden pointer-events-auto"
                    >
                        {/* Kopfbereich (Header) des Chat-Fensters */}
                        <div className="bg-gradient-to-r from-marke-sekundaer to-marke-akzent p-6 flex items-center gap-4">
                            {/* Avatar/Icon des Bots */}
                            <div className="w-10 h-10 rounded-xl bg-marke-primaer flex items-center justify-center shadow-lg">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            {/* Text und Status im Header */}
                            <div>
                                <h3 className="text-white font-bold">Simply Switch Bot</h3>
                                <div className="flex items-center gap-2">
                                    {/* Pulsierender grüner Punkt für Online-Status */}
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-white/60 text-[10px] font-medium uppercase tracking-wider">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Bereich für die Nachrichten (scrollbar) */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
                            {/* Durchlaufe und rendere alle Nachrichten */}
                            {nachrichten.map((msg, idx) => (
                                <motion.div
                                    // Eindeutiger Schlüssel für die Iteration
                                    key={msg.id}
                                    // Animation für das Erscheinen der Nachricht
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    // Ausrichtung abhängig vom Absender (Benutzer: rechts, Bot: links)
                                    className={cn("flex flex-col", msg.sender === 'user' ? "items-end" : "items-start")}
                                >
                                    {/* Blase für den Nachrichtentext */}
                                    <div className={cn(
                                        "p-4 rounded-2xl text-[13px] leading-relaxed max-w-[90%] shadow-sm",
                                        msg.sender === 'user' 
                                            // Stil für Benutzernachrichten (blau)
                                            ? "bg-marke-primaer text-white rounded-br-none" 
                                            // Stil für Botnachrichten (weiß/grau)
                                            : "bg-white border border-slate-100 text-text-haupt rounded-bl-none"
                                    )}>
                                        {/* Zeilenumbrüche im Text korrekt darstellen */}
                                        {msg.text.split('\n').map((zeile, i) => (
                                            <React.Fragment key={i}>{zeile}{i < msg.text.split('\n').length - 1 && <br />}</React.Fragment>
                                        ))}
                                    </div>

                                    {/* Wenn die Nachricht vom Bot Optionen enthält und es die aktuellste Nachricht ist */}
                                    {msg.sender === 'bot' && msg.options && idx === nachrichten.length - 1 && (
                                        // Container für die Options-Buttons
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {/* Durchlaufe alle Optionen und erstelle Buttons */}
                                            {msg.options.map(option => (
                                                <button
                                                    key={option}
                                                    // Rufe die Funktion für die gewählte Option auf
                                                    onClick={() => handleOptionKlick(option)}
                                                    // Styling für die Buttons
                                                    className="px-4 py-2 rounded-xl border border-marke-primaer/30 text-marke-primaer text-xs font-bold transition-all bg-white hover:bg-marke-primaer hover:text-white hover:border-marke-primaer shadow-sm"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            {/* Zeige Lade-Indikator (drei springende Punkte), wenn der Bot tippt */}
                            {tipptGerade && (
                                <div className="flex gap-1 p-3 bg-white border border-slate-100 rounded-xl w-12 items-center justify-center">
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            )}
                            {/* Leeres Element, um das Scrollen ans Ende zu ermöglichen */}
                            <div ref={nachrichtenEndeRef} />
                        </div>

                        {/* Bereich für das Texteingabefeld */}
                        <form onSubmit={handleNachrichtSenden} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                            {/* Textfeld */}
                            <input
                                type="text"
                                // Gebunden an den Zustand
                                value={eingabeWert}
                                // Aktualisiere Zustand bei Eingabe
                                onChange={(ereignis) => setEingabeWert(ereignis.target.value)}
                                // Platzhaltertext
                                placeholder="Nachricht schreiben..."
                                // Styling des Eingabefeldes
                                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-marke-primaer/20"
                            />
                            {/* Absende-Button */}
                            <button
                                type="submit"
                                // Deaktiviere, wenn das Feld leer ist
                                disabled={!eingabeWert.trim()}
                                // Styling des Buttons (Farbe wechselt, wenn Text eingegeben wird)
                                className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                    eingabeWert.trim() ? "bg-marke-primaer text-white" : "bg-slate-100 text-slate-300"
                                )}
                            >
                                {/* Pfeil nach oben Icon */}
                                <ArrowUp className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Exportiere den Chatbot als Standard
export default Chatbot;
