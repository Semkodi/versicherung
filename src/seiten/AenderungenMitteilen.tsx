import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Check, ArrowRight, Smartphone } from 'lucide-react';
import FormularNav from '@/komponenten/kontakt/FormularNav';
import { UnterseitenHero } from '@/komponenten/layout';
import { usePageMetadata } from '@/hooks/usePageMetadata';
import kontaktHeroImg from '@/assets/bilder/premium_hero_sven.webp';

const METADATA = {
    title: "Änderungen mitteilen | Sven Kegler Versicherungsmakler",
    description: "Teile uns deine neue Anschrift, geänderte Bankdaten (IBAN) oder Namensänderungen bequem online mit.",
};

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] fill-current">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.062 5.248 5.303 0 11.771 0c3.14 0 6.088 1.22 8.306 3.441 2.218 2.221 3.435 5.17 3.431 8.309-.01 6.55-5.252 11.797-11.72 11.797h-.005c-2.004-.001-3.974-.516-5.719-1.498L0 24zm6.49-4.22c1.685.999 3.518 1.527 5.271 1.528h.004c5.441 0 9.87-4.428 9.878-9.873.004-2.637-1.019-5.117-2.881-6.981A9.8 9.8 0 0 0 11.77 2.083c-5.451 0-9.88 4.43-9.888 9.875-.001 1.83.479 3.618 1.39 5.197L2.27 21.73l4.277-1.121zM17.43 14.18c-.31-.155-1.833-.904-2.112-1.006-.279-.101-.482-.153-.684.152-.202.306-.782 1.006-.959 1.21-.177.202-.354.228-.664.073-.31-.155-1.309-.48-2.493-1.536-.922-.82-1.543-1.834-1.724-2.144-.18-.31-.02-.477.136-.631.14-.139.31-.362.465-.544.155-.181.207-.31.31-.517.103-.207.051-.388-.026-.543-.077-.155-.684-1.65-.937-2.257-.247-.597-.497-.516-.684-.526-.177-.009-.38-.01-.583-.01-.202 0-.532.077-.81.38-.279.303-1.064 1.04-1.064 2.537 0 1.497 1.09 2.946 1.241 3.15.152.202 2.144 3.273 5.193 4.59.724.314 1.29.502 1.731.642.727.231 1.39.198 1.912.12.582-.087 1.833-.75 2.088-1.472.253-.723.253-1.343.177-1.472-.076-.129-.279-.207-.589-.362z" />
    </svg>
);

const AenderungenMitteilen = () => {
    usePageMetadata(METADATA);

    const [aenderungsart, setAenderungsart] = useState("");
    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");
    const [gesellschaft, setGesellschaft] = useState("");
    const [policenNummer, setPolicenNummer] = useState("");
    const [details, setDetails] = useState("");
    const [datenschutzAkzeptiert, setDatenschutzAkzeptiert] = useState(false);
    const [hcaptchaChecked, setHcaptchaChecked] = useState(false);
    const [wurdeGesendet, setWurdeGesendet] = useState(false);
    const [honeypot, setHoneypot] = useState("");

    const absenden = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (honeypot) {
            // Stillschweigend Erfolg vortäuschen
            setWurdeGesendet(true);
            return;
        }

        if (!vorname || !nachname || !email || !telefon || !aenderungsart || !details || !datenschutzAkzeptiert || !hcaptchaChecked) return;

        const betreff = encodeURIComponent(`✏️ Datenänderung - ${aenderungsart}`);
        const text = encodeURIComponent(
            `Hallo Sven,\n\nich möchte dir eine Änderung meiner Daten mitteilen.\n\n` +
            `📝 Art der Änderung: ${aenderungsart}\n` +
            `🏢 Betroffene Gesellschaft (optional): ${gesellschaft || 'Keine Angabe'}\n` +
            `📄 Versicherungsnummer (optional): ${policenNummer || 'Keine Angabe'}\n\n` +
            `👤 Meine Kontaktdaten:\n` +
            `- Name: ${vorname} ${nachname}\n` +
            `- E-Mail: ${email}\n` +
            `- Telefon: ${telefon}\n\n` +
            `✏️ Details der Änderung (z. B. neue Anschrift oder IBAN):\n${details}\n`
        );

        window.location.href = `mailto:kegler@simply-switch.de?subject=${betreff}&body=${text}`;
        setWurdeGesendet(true);
    };

    return (
        <main className="relative z-10 overflow-hidden bg-hintergrund-alt text-[#020A39]">
            <UnterseitenHero
                label="Digitaler Kundenservice"
                titel="Änderungen einfach"
                hervorhebung="digital mitteilen"
                beschreibung="Ob neue Anschrift, Bankverbindung oder Name: Teile uns deine Änderung mit und wir kümmern uns um die weitere Bearbeitung."
                punkte={[
                    "Änderung sicher erfassen",
                    "Persönliche Bearbeitung",
                    "Weiterleitung an deine Versicherer",
                ]}
                bild={kontaktHeroImg}
                bildAlt="Sven Kegler unterstützt beim digitalen Kundenservice"
                bildKlasse="unterseiten-hero__bild--kontakt"
                primaer={{ text: "Änderung mitteilen", href: "#aenderungsformular" }}
            />
            
            {/* Formular & Kontakt-Info */}
            <section id="aenderungsformular" className="py-16 bg-hintergrund-alt relative scroll-mt-24">
                <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        
                        {/* Formular-Spalte (Links) */}
                        <div className="lg:col-span-8">
                            <h2 className="text-4xl md:text-5xl font-normal text-[#020A39] tracking-tight">
                                Änderungen mitteilen
                            </h2>
                            <div className="w-16 h-[3px] bg-[#0253ee] mt-4 mb-6" />

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10 max-w-3xl">
                                Umgezogen? Neue Bankverbindung? Geheiratet? Teile uns deine Änderungen einfach digital mit. Wir leiten die Daten umgehend an deine Versicherungen weiter.
                            </p>

                            {!wurdeGesendet ? (
                                <form onSubmit={absenden} className="space-y-6">
                                    {/* Honeypot Spam-Schutz */}
                                    <div className="hidden" aria-hidden="true">
                                        <input 
                                            type="text" 
                                            name="website_url" 
                                            value={honeypot} 
                                            onChange={(e) => setHoneypot(e.target.value)} 
                                            tabIndex={-1} 
                                            autoComplete="off" 
                                        />
                                    </div>
                                    
                                    {/* Änderungsart Dropdown */}
                                    <div>
                                        <label className="block text-xs font-bold text-[#020A39] uppercase tracking-wider mb-2">Was möchtest du ändern? *</label>
                                        <select
                                            required
                                            value={aenderungsart}
                                            onChange={(e) => setAenderungsart(e.target.value)}
                                            className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all font-medium text-gray-700"
                                        >
                                            <option value="">-- Bitte auswählen --</option>
                                            <option value="Adressänderung">Adressänderung (Neue Anschrift)</option>
                                            <option value="Änderung der Bankverbindung">Änderung der Bankverbindung (Neue IBAN)</option>
                                            <option value="Namensänderung">Namensänderung (z. B. nach Hochzeit)</option>
                                            <option value="Sonstige Änderung">Sonstige Datenänderung</option>
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

                                    {/* Zwischenüberschrift: Versicherungsdaten */}
                                    <div className="pt-4 border-b border-gray-100 pb-2">
                                        <h3 className="font-bold text-lg text-[#020A39]">Versicherungsdaten</h3>
                                    </div>

                                    {/* Gesellschaft & PolicenNummer */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                value={gesellschaft}
                                                onChange={(e) => setGesellschaft(e.target.value)}
                                                placeholder="Versicherungsgesellschaft (optional)"
                                                className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                value={policenNummer}
                                                onChange={(e) => setPolicenNummer(e.target.value)}
                                                placeholder="Versicherungsnummer / Versicherungsschein"
                                                className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-sm focus:border-[#0253ee] focus:ring-1 focus:ring-[#0253ee] focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* Zwischenüberschrift: Details der Änderung */}
                                    <div className="pt-4 border-b border-gray-100 pb-2">
                                        <h3 className="font-bold text-lg text-[#020A39]">Details der Änderung</h3>
                                    </div>

                                    {/* Details Textarea */}
                                    <div>
                                        <textarea
                                            rows={5}
                                            required
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            placeholder="Bitte trage hier z. B. deine neue Adresse (Straße, PLZ, Ort) oder deine neue Bankverbindung (IBAN & Bankname) ein..."
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
                                        disabled={!vorname || !nachname || !email || !telefon || !aenderungsart || !details || !datenschutzAkzeptiert || !hcaptchaChecked}
                                        className={`px-8 py-3.5 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                                            vorname && nachname && email && telefon && aenderungsart && details && datenschutzAkzeptiert && hcaptchaChecked
                                                ? 'bg-[#0253ee] hover:bg-[#020a39] text-white hover:shadow-md cursor-pointer'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        <span>Änderungen jetzt übermitteln</span>
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
                                    <h3 className="font-extrabold text-3xl text-[#020A39] mb-4 tracking-tight">Datenänderung vorbereitet!</h3>
                                    <p className="text-gray-600 text-base max-w-lg mb-8 leading-relaxed font-normal">
                                        Hallo <span className="font-bold text-[#020A39]">{vorname}</span>, deine E-Mail zur Datenänderung wurde erfolgreich generiert und in deinem E-Mail-Programm geöffnet.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setWurdeGesendet(false)}
                                        className="font-bold text-sm text-[#0253ee] hover:underline"
                                    >
                                        Erneut absenden
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
                                
                                <div className="space-y-4 pt-4 border-t border-gray-200 text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-[#0253ee] flex-shrink-0" />
                                        <a href="tel:+496436921334" className="text-gray-900 hover:text-[#0253ee] transition-colors">06436 921334</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="w-4 h-4 text-[#0253ee] flex-shrink-0" />
                                        <a href="tel:+4915127042547" className="text-gray-900 hover:text-[#0253ee] transition-colors">0151 27042547</a>
                                    </div>
                                    <div className="flex items-center gap-3 text-emerald-600">
                                        <div className="text-emerald-500 flex-shrink-0">
                                            <WhatsAppIcon />
                                        </div>
                                        <a href="https://wa.me/4915127042547" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-gray-900">0151 27042547</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-[#0253ee] flex-shrink-0" />
                                        <a href="mailto:kegler@simply-switch.de" className="text-gray-900 hover:text-[#0253ee] transition-colors">kegler@simply-switch.de</a>
                                    </div>
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

export default AenderungenMitteilen;
