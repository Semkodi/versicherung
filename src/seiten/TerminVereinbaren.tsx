import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import FormularNav from '@/komponenten/kontakt/FormularNav';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const METADATA = {
    title: "Termin vereinbaren | Sven Kegler Versicherungsmakler",
    description: "Vereinbare deinen Wunschtermin zur Online-Videoberatung, Telefonberatung oder einem persönlichen Gespräch vor Ort in Elbtal.",
};

const TerminVereinbaren = () => {
    usePageMetadata(METADATA);

    const [aktiverTab, setAktiverTab] = useState<'calendly' | 'formular'>('calendly');
    const [terminwunsch, setTerminwunsch] = useState("");
    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");
    const [datum, setDatum] = useState("");
    const [uhrzeit, setUhrzeit] = useState("");
    const [nachricht, setNachricht] = useState("");
    const [datenschutzAkzeptiert, setDatenschutzAkzeptiert] = useState(false);
    const [hcaptchaChecked, setHcaptchaChecked] = useState(false);
    const [wurdeGesendet, setWurdeGesendet] = useState(false);

    const absenden = (e: React.FormEvent) => {
        e.preventDefault();
        if (!vorname || !nachname || !email || !telefon || !terminwunsch || !datenschutzAkzeptiert || !hcaptchaChecked) return;

        const betreff = encodeURIComponent(`📅 Neue Terminanfrage - ${terminwunsch}`);
        const text = encodeURIComponent(
            `Hallo Sven,\n\nich möchte einen Beratungstermin vereinbaren.\n\n` +
            `🗓️ Terminwunsch-Art: ${terminwunsch}\n` +
            `📅 Bevorzugtes Datum: ${datum || 'Keine Angabe'}\n` +
            `⏰ Bevorzugte Uhrzeit/Erreichbarkeit: ${uhrzeit || 'Keine Angabe'}\n\n` +
            `👤 Meine Kontaktdaten:\n` +
            `- Name: ${vorname} ${nachname}\n` +
            `- E-Mail: ${email}\n` +
            `- Telefon: ${telefon}\n\n` +
            `📝 Nachricht / Anmerkungen:\n${nachricht || 'Keine Anmerkungen'}\n`
        );

        window.location.href = `mailto:kegler@simply-switch.de?subject=${betreff}&body=${text}`;
        setWurdeGesendet(true);
    };

    return (
        <main className="relative z-10 overflow-hidden bg-white text-[#020A39] pt-32">
            
            {/* Formular & Kontakt-Info */}
            <section className="py-16 bg-white relative">
                <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        
                        {/* Formular-Spalte (Links) */}
                        <div className="lg:col-span-8">
                            <h1 className="text-4xl md:text-5xl font-normal text-[#020A39] tracking-tight">
                                Termin vereinbaren
                            </h1>
                            <div className="w-16 h-[3px] bg-[#0253ee] mt-4 mb-6" />

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10 max-w-3xl">
                                Wir sind für dich da bei der Suche nach der passenden Versicherungslösung, bei der Verwaltung deiner Unterlagen und natürlich auch im Schadensfall. Buche deinen Wunschtermin direkt online über Calendly oder sende uns eine individuelle Anfrage über das Formular.
                            </p>

                            {/* Tab-Auswahl */}
                            <div className="flex bg-gray-100 p-1.5 rounded-2xl max-w-md mb-8 border border-gray-200/80">
                                <button
                                    onClick={() => setAktiverTab('calendly')}
                                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                                        aktiverTab === 'calendly'
                                            ? 'bg-white text-[#0253ee] shadow-sm'
                                            : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    Online Wunschtermin buchen
                                </button>
                                <button
                                    onClick={() => setAktiverTab('formular')}
                                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                                        aktiverTab === 'formular'
                                            ? 'bg-white text-[#0253ee] shadow-sm'
                                            : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    Anfrage senden
                                </button>
                            </div>

                            {aktiverTab === 'calendly' ? (
                                <div className="w-full bg-white rounded-3xl border border-gray-200/60 overflow-hidden shadow-sm p-1.5">
                                    <iframe
                                        src="https://calendly.com/kegler/kostenloses-infogesprach?hide_landing_page_details=1&hide_gdpr_banner=1"
                                        width="100%"
                                        height="680px"
                                        frameBorder="0"
                                        title="Calendly Terminvereinbarung"
                                        className="w-full rounded-2xl"
                                    />
                                </div>
                            ) : !wurdeGesendet ? (
                                <form onSubmit={absenden} className="space-y-6">
                                    
                                    {/* Termin-Art Dropdown */}
                                    <div>
                                        <label className="block text-xs font-bold text-[#020A39] uppercase tracking-wider mb-2">Termin vereinbaren *</label>
                                        <select
                                            required
                                            value={terminwunsch}
                                            onChange={(e) => setTerminwunsch(e.target.value)}
                                            className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all font-medium text-gray-700"
                                        >
                                            <option value="">-- Bitte auswählen --</option>
                                            <option value="Online-Meeting (Videoberatung)">Online-Meeting (Videoberatung)</option>
                                            <option value="Telefonmeeting (Rückruf)">Telefonmeeting (Rückruf)</option>
                                            <option value="Persönlich vor Ort (Kirchstraße 10, Elbtal)">Persönliches Gespräch vor Ort in Elbtal</option>
                                            <option value="Persönlich bei Ihnen zu Hause">Persönliches Gespräch bei dir zu Hause</option>
                                        </select>
                                    </div>

                                    {/* Zwischenüberschrift: Ihre Daten */}
                                    <div className="pt-4 border-b border-gray-100 pb-2">
                                        <h3 className="font-bold text-lg text-[#020A39]">Ihre Daten</h3>
                                    </div>

                                    {/* Vorname, Nachname, E-Mail in einer 3er-Reihe */}
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                required
                                                value={vorname}
                                                onChange={(e) => setVorname(e.target.value)}
                                                placeholder="Vorname*"
                                                className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                required
                                                value={nachname}
                                                onChange={(e) => setNachname(e.target.value)}
                                                placeholder="Name*"
                                                className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="E-Mail*"
                                                className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* Telefon in eigener Zeile */}
                                    <div>
                                        <input
                                            type="tel"
                                            required
                                            value={telefon}
                                            onChange={(e) => setTelefon(e.target.value)}
                                            placeholder="Telefon*"
                                            className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                        />
                                    </div>

                                    {/* Zwischenüberschrift: Terminwunsch */}
                                    <div className="pt-4 border-b border-gray-100 pb-2">
                                        <h3 className="font-bold text-lg text-[#020A39]">Terminwunsch</h3>
                                    </div>

                                    {/* Datumsauswahl & Freitext für Erreichbarkeit */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={datum}
                                                onChange={(e) => setDatum(e.target.value)}
                                                className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all font-medium text-gray-700"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                value={uhrzeit}
                                                onChange={(e) => setUhrzeit(e.target.value)}
                                                placeholder="Wann sind Sie am besten zu erreichen 00:00 Uhr"
                                                className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* Zwischenüberschrift: Ihre Nachricht */}
                                    <div className="pt-4 border-b border-gray-100 pb-2">
                                        <h3 className="font-bold text-lg text-[#020A39]">Ihre Nachricht</h3>
                                    </div>

                                    {/* Nachricht Textarea */}
                                    <div>
                                        <textarea
                                            rows={5}
                                            value={nachricht}
                                            onChange={(e) => setNachricht(e.target.value)}
                                            placeholder="Ihre Nachricht"
                                            className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all placeholder:text-gray-400 font-medium resize-none leading-relaxed"
                                        />
                                    </div>

                                    {/* Datenschutz Checkbox */}
                                    <div className="flex items-start gap-3 pt-2">
                                        <input
                                            type="checkbox"
                                            id="dsgvo"
                                            required
                                            checked={datenschutzAkzeptiert}
                                            onChange={(e) => setDatenschutzAkzeptiert(e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0253ee] focus:ring-[#0253ee]"
                                        />
                                        <label htmlFor="dsgvo" className="text-xs text-gray-500 leading-relaxed font-normal">
                                            Ich stimme den <a href="/datenschutz" target="_blank" className="text-[#0253ee] font-semibold hover:underline">Datenschutzbestimmungen</a> zu. Ich stimme zu, dass meine Angaben aus dem Formular zur Bearbeitung erhoben und verarbeitet werden. Die Daten werden nach abgeschlossener Bearbeitung der Anfrage gelöscht. Hinweis: Sie können Ihre Einwilligung jederzeit per E-Mail widerrufen. *
                                        </label>
                                    </div>

                                    {/* hCaptcha-Dummy */}
                                    <div className="bg-white border border-gray-400 rounded-md p-4 flex items-center justify-between max-w-[300px] shadow-sm my-4">
                                        <div className="flex items-center gap-3">
                                            <input 
                                                type="checkbox" 
                                                id="hcaptcha-dummy" 
                                                required
                                                checked={hcaptchaChecked}
                                                onChange={(e) => setHcaptchaChecked(e.target.checked)}
                                                className="h-5 w-5 rounded border-gray-300 text-[#0253ee] focus:ring-[#0253ee]" 
                                            />
                                            <label htmlFor="hcaptcha-dummy" className="text-xs font-semibold text-gray-700 select-none cursor-pointer">
                                                Ich bin ein Mensch
                                            </label>
                                        </div>
                                        <div className="flex flex-col items-end text-right">
                                            <div className="flex items-center gap-1">
                                                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">hCaptcha</span>
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#25c2a0]" />
                                            </div>
                                            <span className="text-[7px] text-gray-400 mt-0.5 leading-none">Datenschutz - Impressum</span>
                                        </div>
                                    </div>

                                    {/* Absenden Button */}
                                    <button
                                        type="submit"
                                        disabled={!vorname || !nachname || !email || !telefon || !terminwunsch || !datenschutzAkzeptiert || !hcaptchaChecked}
                                        className={`px-8 py-3.5 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                                            vorname && nachname && email && telefon && terminwunsch && datenschutzAkzeptiert && hcaptchaChecked
                                                ? 'bg-[#0253ee] hover:bg-[#020a39] text-white hover:shadow-md cursor-pointer'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        <span>Anfrage absenden</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            ) : (
                                // Erfolgsscreen
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="border border-gray-150 rounded-lg p-10 md:p-16 text-center flex flex-col items-center justify-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-8 border border-green-100">
                                        <Check className="w-10 h-10 text-green-600 stroke-[3]" />
                                    </div>
                                    <h3 className="font-extrabold text-3xl text-[#020A39] mb-4 tracking-tight">Termin-Anfrage vorbereitet!</h3>
                                    <p className="text-gray-600 text-base max-w-lg mb-8 leading-relaxed font-normal">
                                        Hallo <span className="font-bold text-[#020A39]">{vorname}</span>, deine Terminanfrage wurde generiert und in deinem E-Mail-Programm geöffnet. Bitte klicke dort einfach auf "Senden".
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setWurdeGesendet(false)}
                                        className="font-bold text-sm text-[#0253ee] hover:underline"
                                    >
                                        Erneut anfragen
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Kontaktdaten-Spalte (Rechts) */}
                        <div className="lg:col-span-4">
                            <div className="bg-[#f5f6f8] rounded-lg p-8 md:p-10 space-y-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl">Sven Kegler</h4>
                                    <p className="text-sm text-gray-500 font-semibold mt-1">Versicherungsmakler</p>
                                    <p className="text-sm text-gray-500 font-normal mt-3">Kirchstraße 10</p>
                                    <p className="text-sm text-gray-500 font-normal">65627 Elbtal</p>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-3">Bürozeiten / Erreichbarkeit</h5>
                                    <p className="text-xs text-gray-500 leading-relaxed font-normal">
                                        Montag – Freitag: 08:30 – 18:00 Uhr <br />
                                        Sowie nach individueller Vereinbarung auch am Abend oder Wochenende.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Raster zur Alternativ-Navigation */}
            <FormularNav />
        </main>
    );
};

export default TerminVereinbaren;
