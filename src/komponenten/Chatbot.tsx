import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const Chatbot = () => {
    const [istOffen, setIstOffen] = useState(false);
    const [zeigeTooltip, setZeigeTooltip] = useState(true);
    const [nachrichten, setNachrichten] = useState([
        { role: 'assistant', content: "Hi! Ich bin Sven AI, dein digitaler Versicherungsmakler. Wie kann ich dir heute weiterhelfen?" }
    ]);
    const [eingabe, setEingabe] = useState("");
    const [tippt, setTippt] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setZeigeTooltip(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [nachrichten, tippt]);

    const sendeAnfrage = async (nutzerText: string) => {
        setTippt(true);

        // Den Verlauf für die KI vorbereiten
        const verlauf = nachrichten.map(m => ({
            role: m.role,
            content: m.content
        }));
        verlauf.push({ role: 'user', content: nutzerText });

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: verlauf }),
            });

            const data = await response.json();
            const botAntwort = data.choices[0].message.content;

            setNachrichten(prev => [...prev, { role: 'assistant', content: botAntwort }]);
        } catch (error) {
            setNachrichten(prev => [...prev, {
                role: 'assistant',
                content: "Ups, da gab es ein Problem. Bitte versuche es später noch einmal oder schreib Sven direkt eine Mail!"
            }]);
        } finally {
            setTippt(false);
        }
    };

    const handleSenden = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!eingabe.trim()) return;

        const neueNachricht = { role: 'user', content: eingabe };
        setNachrichten(prev => [...prev, neueNachricht]);
        setEingabe("");
        sendeAnfrage(eingabe);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            <AnimatePresence>
                {istOffen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "right bottom" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-[#020A39]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-gradient-to-r from-marke-primaer to-marke-akzent flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-bold text-sm">Sven AI (Live)</h3>
                            </div>
                            <button onClick={() => setIstOffen(false)} className="text-white/60 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Nachrichten */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                            {nachrichten.map((n, i) => (
                                <div key={i} className={`flex ${n.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${n.role === 'assistant'
                                        ? 'bg-white/10 text-white border border-white/5 rounded-tl-none'
                                        : 'bg-marke-highlight text-marke-sekundaer font-bold rounded-tr-none shadow-lg'
                                        }`}>
                                        {n.content}
                                    </div>
                                </div>
                            ))}
                            {tippt && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSenden} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={eingabe}
                                onChange={(e) => setEingabe(e.target.value)}
                                placeholder="Stelle eine KI-Frage..."
                                className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                            />
                            <button type="submit" className="w-10 h-10 bg-marke-primaer hover:bg-marke-highlight text-white rounded-xl flex items-center justify-center transition-all">
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA Tooltip */}
            <AnimatePresence>
                {!istOffen && zeigeTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
                        transition={{ y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute bottom-[80px] right-2 w-[220px] bg-white text-marke-sekundaer border-2 border-marke-highlight px-4 py-3 rounded-2xl rounded-br-none shadow-[0_10px_30px_rgba(0,0,0,0.15)] font-bold text-sm cursor-pointer"
                        onClick={() => setIstOffen(true)}
                    >
                        Hi! 👋 Ich bin Sven AI.<br/>
                        <span className="font-normal text-xs text-marke-sekundaer/80">Hast du Fragen?</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIstOffen(!istOffen)}
                className="w-16 h-16 bg-marke-primaer rounded-full shadow-[0_10px_30px_rgba(2,83,238,0.5)] flex items-center justify-center relative z-10"
            >
                {istOffen ? <X className="w-8 h-8 text-white" /> : <MessageSquare className="w-8 h-8 text-white" />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
