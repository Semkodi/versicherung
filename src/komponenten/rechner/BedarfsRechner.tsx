import { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';

interface BedarfsRechnerProps {
    modus?: 'beamte' | 'privatkunden';
}

const BedarfsRechner = ({ modus = 'beamte' }: BedarfsRechnerProps) => {
    const [gehalt, setGehalt] = useState(3000);
    const [dienstjahre, setDienstjahre] = useState(5);

    // Berechnungslogik je nach Modus
    const istBeamte = modus === 'beamte';
    
    // Beamte: Pensionsanspruch (max 71.75% nach 40 Dienstjahren)
    // Privatkunden: Rentenanspruch (max 48% nach 45 Beitragsjahren)
    const anspruchProzentMax = istBeamte ? 0.7175 : 0.48;
    const maxJahre = istBeamte ? 40 : 45;
    
    const anspruch = Math.min(gehalt * anspruchProzentMax * (dienstjahre / maxJahre), gehalt * anspruchProzentMax);
    const luecke = gehalt - anspruch;
    const lueckeProzent = (luecke / gehalt) * 100;

    return (
        <section id="rechner" className="py-24 bg-hintergrund-alt relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Linke Seite: Erklärung */}
                    <div>
                        <span className="text-marke-primaer text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Interaktives Tool</span>
                        <h2 className="text-3xl md:text-5xl font-black mb-8 text-text-haupt leading-tight">
                            Dein persönlicher <br />
                            <span className="text-marke-primaer">Lücken-Check</span>
                        </h2>
                        <p className="text-text-neben text-lg font-light mb-10 leading-relaxed">
                            {istBeamte 
                                ? "Viele Beamte wiegen sich in falscher Sicherheit. Doch im Falle einer Dienstunfähigkeit oder im Alter drohen massive Einbußen. Rechne hier aus, wie groß deine Lücke wirklich ist."
                                : "Viele Angestellte wiegen sich in falscher Sicherheit. Doch im Alter droht eine erhebliche Rentenlücke. Berechne hier, wie groß deine Lücke wirklich ist."
                            }
                        </p>
                        
                        <div className="space-y-6">
                            {[
                                { 
                                    icon: AlertCircle, 
                                    text: istBeamte ? 'Pensionslücke oft unterschätzt' : 'Rentenlücke oft unterschätzt' 
                                },
                                { 
                                    icon: TrendingUp, 
                                    text: 'Inflation reduziert Kaufkraft' 
                                },
                                { 
                                    icon: Info, 
                                    text: istBeamte ? 'Dienstunfähigkeit ist das größte Risiko' : 'Altersvorsorge rechtzeitig sichern' 
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-text-haupt font-medium">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-200 shadow-sm">
                                        <item.icon className="w-5 h-5 text-marke-highlight" />
                                    </div>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rechte Seite: Der Rechner */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-marke-primaer/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative bg-marke-sekundaer border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                            
                            <div className="space-y-10">
                                {/* Input Gehalt */}
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-white font-bold uppercase tracking-widest text-xs">Aktuelles Netto-Gehalt</label>
                                        <span className="text-marke-highlight font-black">{gehalt.toLocaleString()} €</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1500" 
                                        max="8000" 
                                        step="100" 
                                        value={gehalt}
                                        onChange={(e) => setGehalt(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-marke-primaer"
                                    />
                                </div>

                                {/* Input Dienstjahre / Beitragsjahre */}
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-white font-bold uppercase tracking-widest text-xs">
                                            {istBeamte ? "Geplante Dienstjahre" : "Geplante Beitragsjahre"}
                                        </label>
                                        <span className="text-marke-highlight font-black">{dienstjahre} Jahre</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max={maxJahre} 
                                        step="1" 
                                        value={dienstjahre}
                                        onChange={(e) => setDienstjahre(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-marke-primaer"
                                    />
                                </div>

                                {/* Ergebnis Visualisierung */}
                                <div className="pt-10 border-t border-white/10">
                                    <div className="flex items-end gap-1 h-32 mb-6">
                                        {/* Gehalt Säule */}
                                        <div className="flex-1 bg-white/5 rounded-t-xl h-full relative group">
                                            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-white/40 uppercase font-bold">Gehalt</div>
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: '100%' }}
                                                className="absolute bottom-0 left-0 w-full bg-white/10 rounded-t-xl"
                                            />
                                        </div>
                                        
                                        {/* Pension / Rente Säule */}
                                        <div className="flex-1 bg-white/5 rounded-t-xl h-full relative">
                                            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-white/40 uppercase font-bold">
                                                {istBeamte ? "Pension" : "Rente"}
                                            </div>
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${100 - lueckeProzent}%` }}
                                                className="absolute bottom-0 left-0 w-full bg-marke-primaer rounded-t-xl"
                                            />
                                        </div>
                                        
                                        {/* Lücke Säule */}
                                        <div className="flex-1 bg-white/5 rounded-t-xl h-full relative">
                                            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-marke-highlight uppercase font-bold">Lücke</div>
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${lueckeProzent}%` }}
                                                className="absolute bottom-0 left-0 w-full bg-marke-highlight rounded-t-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-white/60 text-sm mb-2">Deine geschätzte monatliche Lücke:</div>
                                        <div className="text-4xl font-black text-white mb-8">~ {Math.round(luecke).toLocaleString()} €</div>
                                        
                                        <a 
                                            href="#kontakt"
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-marke-sekundaer rounded-2xl font-black hover:bg-marke-highlight transition-all group"
                                        >
                                            Lücke jetzt schließen
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BedarfsRechner;
