import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

interface HochgeladeneDatei {
    id: string;
    name: string;
    size: number;
    progress: number;
    status: 'loading' | 'success' | 'error';
}

const OrdnerCheck = () => {
    const [dateien, setDateien] = useState<HochgeladeneDatei[]>();
    const [isDragging, setIsDragging] = useState(false);
    const [kontaktInfo, setKontaktInfo] = useState("");
    const [wurdeGesendet, setWurdeGesendet] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const simuliereUpload = (neueDatei: HochgeladeneDatei) => {
        let aktuellerProgress = 0;
        const interval = setInterval(() => {
            aktuellerProgress += 10;
            setDateien((prevDateien) => 
                prevDateien ? prevDateien.map(d => 
                    d.id === neueDatei.id ? { ...d, progress: aktuellerProgress } : d
                ) : []
            );

            if (aktuellerProgress >= 100) {
                clearInterval(interval);
                setDateien((prevDateien) => 
                    prevDateien ? prevDateien.map(d => 
                        d.id === neueDatei.id ? { ...d, status: 'success' as const } : d
                    ) : []
                );
            }
        }, 150);
    };

    const handleDateien = (fileList: FileList) => {
        const neueDateien: HochgeladeneDatei[] = [];
        
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const dateiObjekt: HochgeladeneDatei = {
                id: Math.random().toString(36).substring(2, 9),
                name: file.name,
                size: Math.round(file.size / 1024), // Größe in KB
                progress: 0,
                status: 'loading'
            };
            neueDateien.push(dateiObjekt);
        }

        setDateien((prev) => [...(prev || []), ...neueDateien]);
        neueDateien.forEach(d => simuliereUpload(d));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleDateien(e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleDateien(e.target.files);
        }
    };

    const dateiEntfernen = (id: string) => {
        setDateien((prev) => prev ? prev.filter(d => d.id !== id) : []);
    };

    const dateiKlick = () => {
        fileInputRef.current?.click();
    };

    const absendenFormular = (e: React.FormEvent) => {
        e.preventDefault();
        if (!kontaktInfo || !dateien || dateien.length === 0) return;
        
        // Simuliere Absendung
        setWurdeGesendet(true);
        setTimeout(() => {
            setDateien([]);
            setKontaktInfo("");
            setWurdeGesendet(false);
        }, 5000);
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden border-b border-[#e2e8f0]">
            {/* Sanfter Deko-Hintergrund */}
            <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#1e5adb]/3 blur-[110px] rounded-full pointer-events-none" />
            
            <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Linke Spalte: Informationen */}
                    <div>
                        <span className="text-[#1e5adb] font-extrabold text-xs uppercase tracking-widest block mb-3">Maximale Ersparnis</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a1930] tracking-tight mb-6 leading-tight">
                            Der digitale & kostenfreie <br />
                            <span className="bg-gradient-to-r from-[#1e5adb] to-[#4f46e5] bg-clip-text text-transparent">Versicherungsordner-Check</span>
                        </h2>
                        <p className="text-[#4a5568] text-base md:text-lg mb-8 leading-relaxed font-normal">
                            Zahlst du zu viel für alte Verträge? Lass deinen gesamten Versicherungsordner unkompliziert und vollkommen sicher von uns prüfen. Wir filtern veraltete Tarife heraus und zeigen dir schwarz auf weiß deine jährliche Ersparnis.
                        </p>

                        {/* Feature-Liste */}
                        <div className="space-y-4 mb-8">
                            {[
                                "100% DSGVO-konforme & sichere Datenübertragung",
                                "Persönlicher Vergleich durch Sven Kegler persönlich",
                                "Kein lästiges Abtippen – einfach Fotos oder PDFs hochladen",
                                "Ersparnis-Garantie: Wir finden Sparpotenziale oder bestätigen deinen guten Schutz"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3.5 text-[#2d3748] font-medium text-sm md:text-base">
                                    <div className="w-6 h-6 rounded-full bg-[#e8effd] flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-[#1e5adb] stroke-[3]" />
                                    </div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Datenschutz-Sicherheitshinweis */}
                        <div className="flex gap-4 p-5 bg-[#f8f9fc] border border-gray-100 rounded-2xl items-start max-w-xl">
                            <ShieldAlert className="w-6 h-6 text-[#1e5adb] flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-extrabold text-sm text-[#0a1930] mb-1">Deine Daten sind absolut sicher</h4>
                                <p className="text-xs text-[#718096] leading-relaxed font-normal">
                                    Wir verschlüsseln alle hochgeladenen Dokumente nach höchsten deutschen Sicherheitsstandards. Deine Verträge werden ausschließlich zur Tarifanalyse verwendet und niemals an unbefugte Dritte weitergegeben.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rechte Spalte: Der interaktive Drag & Drop Uploader */}
                    <div className="bg-[#f8f9fc] border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative">
                        <div className="absolute inset-0 bg-[#1e5adb]/3 blur-[100px] pointer-events-none rounded-[2.5rem]" />
                        
                        <AnimatePresence mode="wait">
                            {!wurdeGesendet ? (
                                <motion.form 
                                    key="formular"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    onSubmit={absendenFormular}
                                    className="relative z-10 flex flex-col h-full justify-between"
                                >
                                    <div>
                                        <h3 className="font-extrabold text-xl text-[#0a1930] mb-2 leading-snug">Policen hochladen</h3>
                                        <p className="text-xs text-[#718096] mb-6 font-normal">Lade hier Fotos (JPG/PNG) oder Dokumente (PDF) deiner Verträge hoch.</p>
                                        
                                        {/* Dropzone */}
                                        <div 
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={dateiKlick}
                                            className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                                                isDragging 
                                                    ? 'border-[#1e5adb] bg-[#1e5adb]/5 scale-[0.98]' 
                                                    : 'border-gray-200 bg-white hover:border-[#1e5adb] hover:bg-[#1e5adb]/[0.01]'
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
                                            <div className="w-12 h-12 rounded-full bg-[#e8effd] flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                                <Upload className="w-5 h-5 text-[#1e5adb]" />
                                            </div>
                                            <span className="font-extrabold text-sm text-[#0a1930] text-center mb-1">
                                                Dateien per Drag & Drop hierhin ziehen
                                            </span>
                                            <span className="text-xs text-[#718096] text-center font-normal">
                                                oder auf dem Computer suchen (PDF, PNG, JPG)
                                            </span>
                                        </div>

                                        {/* Dateiliste */}
                                        {dateien && dateien.length > 0 && (
                                            <div className="mt-6 space-y-3 max-h-[220px] overflow-y-auto pr-1">
                                                {dateien.map((datei) => (
                                                    <div 
                                                        key={datei.id} 
                                                        className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden"
                                                    >
                                                        {/* Ladebalken im Hintergrund */}
                                                        {datei.status === 'loading' && (
                                                            <div 
                                                                className="absolute left-0 top-0 bottom-0 bg-[#e8effd]/40 transition-all duration-300"
                                                                style={{ width: `${datei.progress}%` }}
                                                            />
                                                        )}
                                                        
                                                        <div className="flex items-center gap-3 relative z-10">
                                                            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                                                                <FileText className="w-4 h-4 text-[#718096]" />
                                                            </div>
                                                            <div>
                                                                <div className="font-extrabold text-xs text-[#0a1930] truncate max-w-[180px] md:max-w-[220px]">
                                                                    {datei.name}
                                                                </div>
                                                                <div className="text-[10px] text-[#718096] font-normal">
                                                                    {datei.size} KB
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3 relative z-10">
                                                            {datei.status === 'loading' ? (
                                                                <span className="font-bold text-[10px] text-[#1e5adb]">{datei.progress}%</span>
                                                            ) : (
                                                                <div className="w-5 h-5 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                                                                    <Check className="w-3 h-3 text-[#10b981] stroke-[3]" />
                                                                </div>
                                                            )}
                                                            <button 
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); dateiEntfernen(datei.id); }}
                                                                className="w-5 h-5 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#718096] hover:text-red-500 transition-colors"
                                                            >
                                                                <X className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Kontaktdaten & Absenden */}
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <div className="mb-4">
                                            <label className="block text-xs font-extrabold text-[#0a1930] mb-2 uppercase tracking-wider">
                                                Deine Telefonnummer oder E-Mail
                                            </label>
                                            <input 
                                                type="text" 
                                                required
                                                value={kontaktInfo}
                                                onChange={(e) => setKontaktInfo(e.target.value)}
                                                placeholder="z. B. 0176 1234567 oder name@mail.de"
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#1e5adb] focus:outline-none transition-all placeholder:text-gray-300 font-medium"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!kontaktInfo || !dateien || dateien.length === 0}
                                            className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                                                kontaktInfo && dateien && dateien.length > 0
                                                    ? 'bg-[#1e5adb] hover:bg-[#1546b3] text-white hover:-translate-y-0.5 cursor-pointer'
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            <Sparkles className="w-4 h-4" />
                                            <span>Kostenfreien Ordner-Check anfordern</span>
                                        </button>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.div 
                                    key="erfolg"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center py-16 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center mb-6 shadow-md border border-[#10b981]/20">
                                        <Check className="w-8 h-8 text-[#10b981] stroke-[3]" />
                                    </div>
                                    <h3 className="font-extrabold text-2xl text-[#0a1930] mb-3 tracking-tight">Dokumente erhalten!</h3>
                                    <p className="text-[#4a5568] text-sm max-w-sm mb-6 leading-relaxed font-normal">
                                        Vielen Dank! Deine Versicherungsunterlagen wurden erfolgreich und verschlüsselt an Sven Kegler übermittelt.
                                    </p>
                                    <div className="bg-white border border-gray-100 rounded-2xl p-4 max-w-sm text-xs text-[#718096] leading-relaxed shadow-sm font-normal">
                                        Wir führen nun eine gründliche Tarifanalyse durch und melden uns unter <span className="font-bold text-[#0a1930]">{kontaktInfo}</span> innerhalb der nächsten 24 Stunden persönlich bei dir mit den Ergebnissen!
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OrdnerCheck;
