import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormularNav from '@/komponenten/kontakt/FormularNav';
import { 
    Check, 
    ArrowRight, 
    ArrowLeft, 
    Car, 
    ShieldAlert, 
    Home, 
    Briefcase, 
    FileText, 
    Camera, 
    X, 
    User, 
    Mail, 
    Phone, 
    FileSignature,
    Clock
} from 'lucide-react';

interface SchadenDatei {
    id: string;
    name: string;
    size: number;
    progress: number;
    status: 'loading' | 'success';
}

const SchadenMelden = () => {
    const [schritt, setSchritt] = useState(1);
    const [schadensart, setSchadensart] = useState("");
    const [beschreibung, setBeschreibung] = useState("");
    const [schadensdatum, setSchadensdatum] = useState("");
    const [dateien, setDateien] = useState<SchadenDatei[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    
    // Kontaktdaten
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");
    const [policenNummer, setPolicenNummer] = useState("");
    const [wurdeGesendet, setWurdeGesendet] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const schadensarten = [
        { wert: "kfz", label: "Kfz-Schaden / Unfall", icon: Car, beschreibung: "Unfälle, Wildschäden, Glasschäden am Auto" },
        { wert: "haftpflicht", label: "Haftpflichtschaden", icon: ShieldAlert, beschreibung: "Du hast versehentlich Eigentum anderer beschädigt" },
        { wert: "hausrat", label: "Hausrat / Gebäude", icon: Home, beschreibung: "Brand, Leitungswasser, Einbruchdiebstahl, Sturm" },
        { wert: "sonstiges", label: "Sonstiger Schaden", icon: Briefcase, beschreibung: "Rechtsschutz, Unfall, Krankenzusatz, Sonstiges" }
    ];

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const simuliereUpload = (neueDatei: SchadenDatei) => {
        let aktuellerProgress = 0;
        const interval = setInterval(() => {
            aktuellerProgress += 20;
            setDateien((prev) => 
                prev.map(d => d.id === neueDatei.id ? { ...d, progress: aktuellerProgress } : d)
            );

            if (aktuellerProgress >= 100) {
                clearInterval(interval);
                setDateien((prev) => 
                    prev.map(d => d.id === neueDatei.id ? { ...d, status: 'success' as const } : d)
                );
            }
        }, 100);
    };

    const handleDateien = (fileList: FileList) => {
        const neueDateien: SchadenDatei[] = [];
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const datei: SchadenDatei = {
                id: Math.random().toString(36).substring(2, 9),
                name: file.name,
                size: Math.round(file.size / 1024),
                progress: 0,
                status: 'loading'
            };
            neueDateien.push(datei);
        }
        setDateien((prev) => [...prev, ...neueDateien]);
        neueDateien.forEach(d => simuliereUpload(d));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            handleDateien(e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleDateien(e.target.files);
        }
    };

    const dateiEntfernen = (id: string) => {
        setDateien((prev) => prev.filter(d => d.id !== id));
    };

    const weiter = () => {
        if (schritt < 4) setSchritt(prev => prev + 1);
    };

    const zurück = () => {
        if (schritt > 1) setSchritt(prev => prev - 1);
    };

    const absenden = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !telefon) return;

        const betreff = encodeURIComponent(`⚠️ Neue Schadensmeldung - ${schadensarten.find(s => s.wert === schadensart)?.label || schadensart.toUpperCase()}`);
        const dateiListeText = dateien.map(d => `📎 ${d.name} (${d.size} KB)`).join("\n") || 'Keine Belege vorab hochgeladen';
        
        const text = encodeURIComponent(
            `Hallo Sven,\n\nich möchte einen neuen Schaden melden.\n\n` +
            `🚨 Schadensart: ${schadensarten.find(s => s.wert === schadensart)?.label || schadensart.toUpperCase()}\n` +
            `📅 Schadensdatum: ${schadensdatum}\n` +
            `📝 Beschreibung:\n${beschreibung}\n\n` +
            `👤 Kontaktdaten des Kunden:\n` +
            `- Name: ${name}\n` +
            `- E-Mail: ${email}\n` +
            `- Telefon: ${telefon}\n` +
            `- Versicherungsnummer: ${policenNummer || 'Keine Angabe'}\n\n` +
            `📂 Ausgewählte Belege/Bilder:\n${dateiListeText}\n\n` +
            `[Hinweis für den Mail-Versand: Bitte hänge die ausgewählten Schadensbilder/Belege einfach manuell als Anhang an diese E-Mail an, bevor du sie abschickst!]`
        );
        
        // E-Mail-Client des Nutzers öffnen
        window.location.href = `mailto:kegler@simply-switch.de?subject=${betreff}&body=${text}`;
        
        setWurdeGesendet(true);
    };

    const radarReset = () => {
        setSchritt(1);
        setSchadensart("");
        setBeschreibung("");
        setSchadensdatum("");
        setDateien([]);
        setName("");
        setEmail("");
        setTelefon("");
        setPolicenNummer("");
        setWurdeGesendet(false);
    };

    return (
        <main className="relative z-10 overflow-hidden bg-white text-[#2d3748]">
            {/* ─── HELDEN HERO SEKTION (Premium Look) ─── */}
            <section className="relative pt-40 pb-20 bg-gradient-to-br from-[#f8f9fc] to-[#eef2f9] overflow-hidden border-b border-[#e2e8f0]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#1e5adb]/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e5adb]/3 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full mb-6 font-semibold text-xs shadow-sm border border-red-100 uppercase tracking-wider">
                            Soforthilfe im Notfall
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-[#0a1930] mb-6 tracking-tight leading-[1.1]">
                            Schaden digital <br />
                            <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">schnell melden</span>
                        </h1>
                        <p className="text-[#4a5568] text-base md:text-lg leading-relaxed font-normal">
                            Ein Schaden ist ärgerlich genug. Lass uns die Abwicklung übernehmen. Melde deinen Schaden in unter 3 Minuten vollständig digital – Sven Kegler kümmert sich umgehend um deine Schadensregulierung.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── MULTI-STEP SCHADENSMELDER ─── */}
            <section className="py-24 bg-white relative">
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    
                    {!wurdeGesendet ? (
                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] min-h-[500px] flex flex-col justify-between">
                            
                            {/* Progress bar */}
                            <div className="mb-10">
                                <div className="flex justify-between items-center text-xs font-extrabold text-[#718096] uppercase tracking-wider mb-3">
                                    <span>Schritt {schritt} von 4</span>
                                    <span>{schritt === 1 ? 'Schadensart' : schritt === 2 ? 'Details' : schritt === 3 ? 'Bilder' : 'Kontaktdaten'}</span>
                                </div>
                                <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="bg-red-500 h-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(schritt / 4) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {/* Schritt 1: Schadensart */}
                                {schritt === 1 && (
                                    <motion.div
                                        key="schritt1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="font-extrabold text-2xl text-[#0a1930] tracking-tight mb-2">Welche Schadensart liegt vor?</h3>
                                        <p className="text-xs text-[#718096] mb-6 font-normal">Wähle den passenden Bereich aus, um die Schadensmeldung optimal zu starten.</p>
                                        
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {schadensarten.map((art) => {
                                                const Icon = art.icon;
                                                const istAusgewählt = schadensart === art.wert;
                                                return (
                                                    <button
                                                        key={art.wert}
                                                        type="button"
                                                        onClick={() => { setSchadensart(art.wert); weiter(); }}
                                                        className={`p-6 rounded-2xl border text-left flex flex-col items-start gap-4 transition-all duration-300 group hover:-translate-y-0.5 ${
                                                            istAusgewählt 
                                                                ? 'border-red-500 bg-red-50/10 shadow-md' 
                                                                : 'border-gray-100 bg-white hover:border-red-500 hover:shadow-md'
                                                        }`}
                                                    >
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                                                            istAusgewählt
                                                                ? 'bg-red-500 border-red-500 text-white'
                                                                : 'bg-[#f8f9fc] border-gray-100 text-[#718096] group-hover:text-red-500 group-hover:bg-red-50/30'
                                                        }`}>
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-extrabold text-sm text-[#0a1930]">{art.label}</h4>
                                                            <p className="text-[11px] text-[#718096] leading-relaxed font-normal mt-1">{art.beschreibung}</p>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Schritt 2: Details */}
                                {schritt === 2 && (
                                    <motion.div
                                        key="schritt2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="font-extrabold text-2xl text-[#0a1930] tracking-tight mb-2">Was ist genau passiert?</h3>
                                        <p className="text-xs text-[#718096] mb-6 font-normal">Beschreibe den Schaden kurz in deinen eigenen Worten.</p>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-extrabold text-[#0a1930] uppercase tracking-wider mb-2">Wann ist der Schaden aufgetreten?</label>
                                                <input 
                                                    type="date"
                                                    required
                                                    value={schadensdatum}
                                                    onChange={(e) => setSchadensdatum(e.target.value)}
                                                    className="w-full bg-white border border-gray-400 rounded-xl px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-all font-medium"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-extrabold text-[#0a1930] uppercase tracking-wider mb-2">Schadensbeschreibung</label>
                                                <textarea 
                                                    rows={5}
                                                    required
                                                    value={beschreibung}
                                                    onChange={(e) => setBeschreibung(e.target.value)}
                                                    placeholder="Beschreibe z. B. wo es passiert ist, was beschädigt wurde und wie hoch du den Schaden schätzt..."
                                                    className="w-full bg-white border border-gray-400 rounded-xl px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-all placeholder:text-gray-300 font-medium resize-none leading-relaxed"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Schritt 3: Bilder- & Belege-Upload */}
                                {schritt === 3 && (
                                    <motion.div
                                        key="schritt3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="font-extrabold text-2xl text-[#0a1930] tracking-tight mb-2">Schadensbilder & Dokumente</h3>
                                        <p className="text-xs text-[#718096] mb-6 font-normal">Lade hier Fotos vom Schaden, Rechnungen oder Unfallberichte hoch. Je mehr Belege wir haben, desto schneller zahlt der Versicherer.</p>

                                        {/* Dropzone */}
                                        <div 
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                                                isDragging 
                                                    ? 'border-red-500 bg-red-50/5 scale-[0.98]' 
                                                    : 'border-gray-400 bg-white hover:border-red-500 hover:bg-red-50/[0.01]'
                                            }`}
                                        >
                                            <input 
                                                type="file" 
                                                ref={fileInputRef}
                                                onChange={handleFileSelect}
                                                multiple
                                                accept=".pdf,.png,.jpg,.jpeg"
                                                className="hidden"
                                            />
                                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 text-red-500">
                                                <Camera className="w-5 h-5" />
                                            </div>
                                            <span className="font-extrabold text-sm text-[#0a1930] text-center mb-1">
                                                Schadensbilder hierhin ziehen
                                            </span>
                                            <span className="text-xs text-[#718096] text-center font-normal">
                                                oder klicken, um Fotos/PDFs auszuwählen
                                            </span>
                                        </div>

                                        {/* Dateiliste */}
                                        {dateien.length > 0 && (
                                            <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                                                {dateien.map((datei) => (
                                                    <div 
                                                        key={datei.id} 
                                                        className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden"
                                                    >
                                                        {datei.status === 'loading' && (
                                                            <div 
                                                                className="absolute left-0 top-0 bottom-0 bg-red-50/30 transition-all duration-300"
                                                                style={{ width: `${datei.progress}%` }}
                                                            />
                                                        )}
                                                        <div className="flex items-center gap-3 relative z-10">
                                                            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                                                                <FileText className="w-4 h-4 text-[#718096]" />
                                                            </div>
                                                            <div>
                                                                <div className="font-extrabold text-xs text-[#0a1930] truncate max-w-[200px]">
                                                                    {datei.name}
                                                                </div>
                                                                <div className="text-[10px] text-[#718096] font-normal">{datei.size} KB</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 relative z-10">
                                                            {datei.status === 'loading' ? (
                                                                <span className="font-bold text-[10px] text-red-500">{datei.progress}%</span>
                                                            ) : (
                                                                <div className="w-5 h-5 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                                                                    <Check className="w-3 h-3 text-[#10b981] stroke-[3]" />
                                                                </div>
                                                            )}
                                                            <button 
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); dateiEntfernen(datei.id); }}
                                                                className="w-5 h-5 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#718096] hover:text-red-500"
                                                            >
                                                                <X className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Schritt 4: Kontaktdaten */}
                                {schritt === 4 && (
                                    <motion.div
                                        key="schritt4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="font-extrabold text-2xl text-[#0a1930] tracking-tight mb-2">Wie können wir dich erreichen?</h3>
                                        <p className="text-xs text-[#718096] mb-6 font-normal">Hinterlasse uns deine Kontaktdaten. Sven Kegler kontaktiert dich sofort persönlich.</p>

                                        <form onSubmit={absenden} className="space-y-4">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-extrabold text-[#0a1930] uppercase tracking-wider mb-2">Vor- & Nachname</label>
                                                    <div className="relative">
                                                        <User className="w-4 h-4 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2" />
                                                        <input 
                                                            type="text" 
                                                            required
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder="z. B. Max Mustermann"
                                                            className="w-full bg-white border border-gray-400 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-all placeholder:text-gray-300 font-medium"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-extrabold text-[#0a1930] uppercase tracking-wider mb-2">Telefonnummer</label>
                                                    <div className="relative">
                                                        <Phone className="w-4 h-4 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2" />
                                                        <input 
                                                            type="tel" 
                                                            required
                                                            value={telefon}
                                                            onChange={(e) => setTelefon(e.target.value)}
                                                            placeholder="z. B. 0176 1234567"
                                                            className="w-full bg-white border border-gray-400 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-all placeholder:text-gray-300 font-medium"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-extrabold text-[#0a1930] uppercase tracking-wider mb-2">E-Mail-Adresse</label>
                                                <div className="relative">
                                                    <Mail className="w-4 h-4 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2" />
                                                    <input 
                                                        type="email" 
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="z. B. name@mail.de"
                                                        className="w-full bg-white border border-gray-400 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-all placeholder:text-gray-300 font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-extrabold text-[#0a1930] uppercase tracking-wider mb-2">Versicherungsnummer (optional)</label>
                                                <div className="relative">
                                                    <FileSignature className="w-4 h-4 text-gray-300 absolute left-4 top-1/2 -translate-y-1/2" />
                                                    <input 
                                                        type="text" 
                                                        value={policenNummer}
                                                        onChange={(e) => setPolicenNummer(e.target.value)}
                                                        placeholder="z. B. SV-123-456-789 (falls zur Hand)"
                                                        className="w-full bg-white border border-gray-400 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-all placeholder:text-gray-300 font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Buttons Footer */}
                            <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between relative z-10">
                                <button
                                    type="button"
                                    onClick={zurück}
                                    disabled={schritt === 1}
                                    className={`flex items-center gap-2 font-bold text-sm transition-all ${
                                        schritt === 1 
                                            ? 'text-gray-200 cursor-not-allowed' 
                                            : 'text-[#718096] hover:text-[#0a1930] cursor-pointer'
                                    }`}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Zurück</span>
                                </button>

                                {schritt < 4 ? (
                                    <button
                                        type="button"
                                        onClick={weiter}
                                        disabled={schritt === 1 && !schadensart || schritt === 2 && (!beschreibung || !schadensdatum)}
                                        className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all ${
                                            (schritt === 1 && schadensart) || (schritt === 2 && beschreibung && schadensdatum) || schritt === 3
                                                ? 'bg-[#0a1930] hover:bg-[#152a4f] text-white hover:-translate-y-0.5 cursor-pointer'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        <span>Weiter</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={absenden}
                                        disabled={!name || !email || !telefon}
                                        className={`px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                                            name && email && telefon
                                                ? 'bg-red-500 hover:bg-red-600 text-white hover:-translate-y-0.5 cursor-pointer'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        <span>Schaden jetzt melden</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                        </div>
                    ) : (
                        // Erfolgsscreen
                        <motion.div
                            key="erfolgreich"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white border border-gray-100 rounded-[2.5rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)] text-center flex flex-col items-center justify-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-[#10b981]/10 flex items-center justify-center mb-8 shadow-md border border-[#10b981]/20">
                                <Check className="w-10 h-10 text-[#10b981] stroke-[3]" />
                            </div>
                            <h3 className="font-extrabold text-3xl text-[#0a1930] mb-4 tracking-tight">Schadensmeldung vorbereitet!</h3>
                            <p className="text-[#4a5568] text-base max-w-lg mb-8 leading-relaxed font-normal">
                                Hallo <span className="font-bold text-[#0a1930]">{name}</span>, deine E-Mail-Schadensmeldung wurde erfolgreich generiert und in deinem E-Mail-Programm geöffnet.
                            </p>

                            <div className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-6 md:p-8 max-w-xl text-left flex gap-5 items-start mb-8 shadow-sm">
                                <Clock className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-extrabold text-sm text-[#0a1930] mb-1">Bitte beachten & unser 2h-Versprechen:</h4>
                                    <p className="text-xs text-[#718096] leading-relaxed font-normal">
                                        1. ⚠️ **Wichtig:** Vergiss nicht, deine ausgewählten Belege oder Bilder manuell an die geöffnete E-Mail anzuhängen, bevor du sie abschickst!<br />
                                        2. Falls sich das Mail-Programm nicht geöffnet hat, sende die Schadensdetails einfach direkt an <span className="font-bold text-[#0a1930]">kegler@simply-switch.de</span>.<br />
                                        3. Sven Kegler prüft deine Meldung sofort und kontaktiert dich innerhalb der nächsten **2 Stunden** persönlich unter deiner Nummer <span className="font-bold text-[#0a1930]">{telefon}</span>.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={radarReset}
                                className="font-bold text-sm text-[#1e5adb] hover:text-[#1546b3] transition-colors cursor-pointer"
                            >
                                Neue Schadensmeldung starten
                            </button>
                        </motion.div>
                    )}

                </div>
            </section>
            
            {/* Raster zur Alternativ-Navigation */}
            <FormularNav />
        </main>
    );
};

export default SchadenMelden;
