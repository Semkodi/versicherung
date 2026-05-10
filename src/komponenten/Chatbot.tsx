import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUp, Shield, MessageSquare } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '../lib/supabase';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Message = {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    type?: 'text' | 'options' | 'summary';
    options?: string[];
};

type UserData = {
    category: string;
    subCategory: string;
    name: string;
    email: string;
    phone: string;
    channel: string;
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState<UserData>({
        category: '',
        subCategory: '',
        name: '',
        email: '',
        phone: '',
        channel: ''
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            sendBotMessage("Hallo! Ich bin dein Simply Switch Assistent. 👋 Wie kann ich dir heute helfen?", ['Beamtenversicherung', 'Existenzgründer / Selbstständig', 'Private Versicherung', 'Allgemeine Frage']);
        }
    }, [isOpen]);

    const sendBotMessage = (text: string, options?: string[]) => {
        setIsTyping(true);
        const delay = Math.min(Math.max(text.length * 15, 800), 2000);

        setTimeout(() => {
            setIsTyping(false);
            const newMessage: Message = {
                id: Math.random().toString(36).substring(7),
                text,
                sender: 'bot',
                timestamp: new Date(),
                type: options ? 'options' : 'text',
                options
            };
            setMessages(prev => [...prev, newMessage]);
        }, delay);
    };

    const handleOptionClick = async (option: string) => {
        const userMsg: Message = {
            id: Math.random().toString(36).substring(7),
            text: option,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);

        if (step === 0) {
            setUserData(prev => ({ ...prev, category: option }));
            if (option === 'Beamtenversicherung') {
                sendBotMessage("Hervorragend! In welchem Status befindest du dich aktuell?", ['Anwärter / Referendar', 'Beamter auf Probe', 'Beamter auf Lebenszeit']);
                setStep(1);
            } else if (option === 'Existenzgründer / Selbstständig') {
                sendBotMessage("Klasse! Startest du gerade erst durch oder bist du bereits länger selbstständig?", ['Gerade in Gründung', 'Bereits selbstständig']);
                setStep(1);
            } else {
                sendBotMessage("Verstanden. Wie dürfen wir dich nennen? (Vor- und Nachname)");
                setStep(2);
            }
        } else if (step === 1) {
            setUserData(prev => ({ ...prev, subCategory: option }));
            sendBotMessage("Perfekt. Um den Termin optimal vorzubereiten: Wie dürfen wir dich nennen? (Vor- und Nachname)");
            setStep(2);
        } else if (step === 4) {
            setUserData(prev => ({ ...prev, channel: option }));
            const summaryText = `Danke! Hier ist eine Zusammenfassung deiner Anfrage:\n\n📍 Bereich: ${userData.category}\n👤 Name: ${userData.name}\n📧 E-Mail: ${userData.email}\n📱 Tel: ${userData.phone}\n💬 Kanal: ${option}\n\nSoll ich diese Anfrage so an Sven Kegler senden?`;
            sendBotMessage(summaryText, ['Ja, Anfrage senden', 'Daten korrigieren']);
            setStep(5);
        } else if (step === 5) {
            if (option === 'Ja, Anfrage senden') {
                try {
                    const { error } = await supabase
                        .from('leads')
                        .insert([
                            {
                                name: userData.name,
                                email: userData.email,
                                phone: userData.phone,
                                category: userData.category,
                                sub_category: userData.subCategory,
                                channel: userData.channel,
                                status: 'Neu',
                                priority: userData.category === 'Beamtenversicherung' ? 'Hoch' : 'Normal'
                            }
                        ]);

                    if (error) throw error;
                    sendBotMessage("✅ Deine Anfrage wurde erfolgreich gesendet! Sven Kegler wird sich zeitnah bei dir melden. Vielen Dank für dein Vertrauen!");
                    setStep(6);
                } catch (error: any) {
                    console.error('Fehler beim Speichern:', error);
                    sendBotMessage("Leider gab es ein technisches Problem beim Senden deiner Anfrage. Bitte versuche es später noch einmal oder rufe uns direkt an!");
                }
            } else {
                sendBotMessage("Kein Problem. Starten wir noch einmal kurz von vorn. Was ist dein Anliegen?", ['Beamtenversicherung', 'Existenzgründer / Selbstständig', 'Private Versicherung', 'Allgemeine Frage']);
                setStep(0);
            }
        }
    };

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Math.random().toString(36).substring(7),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        const value = inputValue;
        setInputValue('');

        if (step === 2) {
            setUserData(prev => ({ ...prev, name: value }));
            sendBotMessage(`Freut mich, ${value.split(' ')[0]}! Unter welcher E-Mail-Adresse können wir dich erreichen?`);
            setStep(3);
        } else if (step === 3) {
            if (value.includes('@') && value.includes('.')) {
                setUserData(prev => ({ ...prev, email: value }));
                sendBotMessage("Und für Rückfragen oder WhatsApp: Wie lautet deine Telefonnummer?");
                setStep(3.5);
            } else {
                sendBotMessage("Das sieht nicht wie eine gültige E-Mail aus. Magst du sie nochmal kurz prüfen?");
            }
        } else if (step === 3.5) {
            setUserData(prev => ({ ...prev, phone: value }));
            sendBotMessage("Wie möchtest du das Beratungsgespräch am liebsten führen?", ['WhatsApp', 'Video-Call', 'Telefonisch', 'Persönlich']);
            setStep(4);
        } else if (step >= 6) {
            sendBotMessage("Vielen Dank! Deine Nachricht wurde gespeichert. Sven meldet sich bei dir.");
        } else {
            sendBotMessage("Ich bin ein Assistent und folge einem festen Ablauf. Bitte wähle eine der Optionen oder beantworte die Fragen oben.");
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans pointer-events-none">
            {/* Tooltip */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
                        transition={{ y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute bottom-[80px] right-2 w-[220px] bg-white text-marke-sekundaer border-2 border-marke-primaer/20 px-4 py-3 rounded-2xl rounded-br-none shadow-xl font-bold text-sm cursor-pointer pointer-events-auto"
                        onClick={() => setIsOpen(true)}
                    >
                        Hi! 👋 Hilfe nötig?<br/>
                        <span className="font-normal text-xs text-text-neben">Einfach hier klicken.</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-marke-primaer rounded-full shadow-lg flex items-center justify-center relative z-10 pointer-events-auto"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
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

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "right bottom" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-48px)] h-[580px] bg-white rounded-[2rem] shadow-3xl border border-slate-100 flex flex-col overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-marke-sekundaer to-marke-akzent p-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-marke-primaer flex items-center justify-center shadow-lg">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Simply Switch Bot</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-white/60 text-[10px] font-medium uppercase tracking-wider">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn("flex flex-col", msg.sender === 'user' ? "items-end" : "items-start")}
                                >
                                    <div className={cn(
                                        "p-4 rounded-2xl text-[13px] leading-relaxed max-w-[90%] shadow-sm",
                                        msg.sender === 'user' 
                                            ? "bg-marke-primaer text-white rounded-br-none" 
                                            : "bg-white border border-slate-100 text-text-haupt rounded-bl-none"
                                    )}>
                                        {msg.text.split('\n').map((line, i) => (
                                            <React.Fragment key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</React.Fragment>
                                        ))}
                                    </div>

                                    {msg.sender === 'bot' && msg.options && idx === messages.length - 1 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {msg.options.map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => handleOptionClick(option)}
                                                    className="px-4 py-2 rounded-xl border border-marke-primaer/30 text-marke-primaer text-xs font-bold transition-all bg-white hover:bg-marke-primaer hover:text-white hover:border-marke-primaer shadow-sm"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-1 p-3 bg-white border border-slate-100 rounded-xl w-12 items-center justify-center">
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Nachricht schreiben..."
                                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-marke-primaer/20"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                    inputValue.trim() ? "bg-marke-primaer text-white" : "bg-slate-100 text-slate-300"
                                )}
                            >
                                <ArrowUp className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;
