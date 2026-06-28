import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUp, Shield, MessageSquare } from 'lucide-react';
import { supabase, istOffline } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { botFlow } from './chatFlow';

type Nachricht = {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    type?: 'text' | 'options' | 'summary';
    options?: string[];
};

type BenutzerDaten = {
    category: string;
    subCategory: string;
    name: string;
    email: string;
    phone: string;
    channel: string;
};

const ChatStep = {
    Idle: 'idle',
    ChooseCategory: 'chooseCategory',
    ChooseCategoryDetail: 'chooseCategoryDetail',
    AskName: 'askName',
    AskEmail: 'askEmail',
    AskPhone: 'askPhone',
    ChooseContactMethod: 'chooseContactMethod',
    ConfirmSend: 'confirmSend',
    Completed: 'completed'
} as const;

type ChatStep = (typeof ChatStep)[keyof typeof ChatStep];

const initialUserData: BenutzerDaten = {
    category: '',
    subCategory: '',
    name: '',
    email: '',
    phone: '',
    channel: ''
};

const getId = () =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 11);

const Chatbot: React.FC = () => {
    const [istOffen, setIstOffen] = useState(false);
    const [zeigeTooltip, setZeigeTooltip] = useState(true);
    const [nachrichten, setNachrichten] = useState<Nachricht[]>([]);
    const [eingabeWert, setEingabeWert] = useState('');
    const [tipptGerade, setTipptGerade] = useState(false);
    const [schritt, setSchritt] = useState<ChatStep>(ChatStep.Idle);
    const [benutzerDaten, setBenutzerDaten] = useState<BenutzerDaten>(initialUserData);

    const nachrichtenEndeRef = useRef<HTMLDivElement>(null);
    const botTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (botTimeoutRef.current) {
                clearTimeout(botTimeoutRef.current);
            }
        };
    }, []);

    const scrollToBottom = useCallback(() => {
        nachrichtenEndeRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [nachrichten, tipptGerade, scrollToBottom]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (zeigeTooltip && !istOffen) {
            timer = setTimeout(() => setZeigeTooltip(false), 10000);
        }
        return () => clearTimeout(timer);
    }, [zeigeTooltip, istOffen]);

    const addMessage = useCallback((message: Nachricht) => {
        setNachrichten(prev => [...prev, message]);
    }, []);

    const sendBotMessage = useCallback(
        (text: string, options?: string[]) => {
            setTipptGerade(true);
            const delay = Math.min(Math.max(text.length * 15, 800), 2000);
            botTimeoutRef.current = setTimeout(() => {
                setTipptGerade(false);
                addMessage({
                    id: getId(),
                    text,
                    sender: 'bot',
                    timestamp: new Date(),
                    type: options ? 'options' : 'text',
                    options
                });
                botTimeoutRef.current = null;
            }, delay);
        },
        [addMessage]
    );

    useEffect(() => {
        if (istOffen && nachrichten.length === 0) {
            sendBotMessage(botFlow.welcome.text, [...botFlow.welcome.options]);
            setSchritt(ChatStep.ChooseCategory);
        }
    }, [istOffen, nachrichten.length, sendBotMessage]);

    const updateUserData = useCallback((updates: Partial<BenutzerDaten>) => {
        setBenutzerDaten(prev => ({ ...prev, ...updates }));
    }, []);

    const sendUserMessage = useCallback(
        (text: string) => {
            addMessage({
                id: getId(),
                text,
                sender: 'user',
                timestamp: new Date()
            });
        },
        [addMessage]
    );

    const handleChooseCategorySelection = useCallback(
        (option: string) => {
            updateUserData({ category: option });

            const response = botFlow.categoryResponses[option];
            if (response) {
                sendBotMessage(response.text, [...response.options]);
                setSchritt(response.nextStep);
                return;
            }

            sendBotMessage(botFlow.askName);
            setSchritt(ChatStep.AskName);
        },
        [sendBotMessage, updateUserData]
    );

    const handleChooseCategoryDetailSelection = useCallback(
        (option: string) => {
            const { category, subCategory } = benutzerDaten;

            if (category === 'Beamtenversicherung' && !subCategory) {
                updateUserData({ subCategory: option });
                sendBotMessage(botFlow.categoryAreaPrompt, [...botFlow.categoryAreaOptions]);
                return;
            }

            if (category === 'Beamtenversicherung' && subCategory && !subCategory.includes(' - ')) {
                updateUserData({ subCategory: `${subCategory} - ${option}` });
                sendBotMessage(botFlow.askNameAfterDetails);
                setSchritt(ChatStep.AskName);
                return;
            }

            if (['Existenzgründer / Selbstständig', 'Private Versicherung'].includes(category)) {
                updateUserData({ subCategory: option });
                sendBotMessage(botFlow.askNameAfterDetails);
                setSchritt(ChatStep.AskName);
                return;
            }

            sendBotMessage(botFlow.invalidSelection);
        },
        [benutzerDaten, sendBotMessage, updateUserData]
    );

    const handleChooseContactMethodSelection = useCallback(
        (option: string) => {
            const updatedUserData = { ...benutzerDaten, channel: option };
            updateUserData({ channel: option });
            sendBotMessage(botFlow.createSummary(updatedUserData, option), [...botFlow.confirmSendOptions]);
            setSchritt(ChatStep.ConfirmSend);
        },
        [benutzerDaten, sendBotMessage, updateUserData]
    );

    const handleConfirmSendSelection = useCallback(
        async (option: string) => {
            if (option !== botFlow.confirmSendOptions[0]) {
                sendBotMessage(botFlow.restartPrompt.text, [...botFlow.restartPrompt.options]);
                setBenutzerDaten(initialUserData);
                setSchritt(ChatStep.ChooseCategory);
                return;
            }

            try {
                if (istOffline) {
                    console.log('Lead empfangen (Offline-Modus):', {
                        name: benutzerDaten.name,
                        email: benutzerDaten.email,
                        phone: benutzerDaten.phone,
                        category: benutzerDaten.category,
                        sub_category: benutzerDaten.subCategory,
                        channel: benutzerDaten.channel
                    });
                } else {
                    const { error } = await supabase.from('leads').insert([
                        {
                            name: benutzerDaten.name,
                            email: benutzerDaten.email,
                            phone: benutzerDaten.phone,
                            category: benutzerDaten.category,
                            sub_category: benutzerDaten.subCategory,
                            channel: benutzerDaten.channel,
                            status: 'Neu',
                            priority: benutzerDaten.category === 'Beamtenversicherung' ? 'Hoch' : 'Normal'
                        }
                    ]);

                    if (error) throw error;
                }

                sendBotMessage(botFlow.requestSent);
                setSchritt(ChatStep.Completed);
            } catch (error) {
                console.error('Fehler beim Speichern:', error);
                sendBotMessage(botFlow.sendError);
            }
        },
        [benutzerDaten, sendBotMessage]
    );

    const handleAskName = useCallback(
        (text: string) => {
            updateUserData({ name: text });
            const firstName = text.split(' ')[0] || text;
            sendBotMessage(botFlow.createAskEmail(firstName));
            setSchritt(ChatStep.AskEmail);
        },
        [sendBotMessage, updateUserData]
    );

    const handleAskEmail = useCallback(
        (text: string) => {
            if (text.includes('@') && text.includes('.')) {
                updateUserData({ email: text });
                sendBotMessage(botFlow.askPhone);
                setSchritt(ChatStep.AskPhone);
                return;
            }

            sendBotMessage(botFlow.invalidEmail);
        },
        [sendBotMessage, updateUserData]
    );

    const handleAskPhone = useCallback(
        (text: string) => {
            updateUserData({ phone: text });
            sendBotMessage(botFlow.contactMethod.text, [...botFlow.contactMethod.options]);
            setSchritt(ChatStep.ChooseContactMethod);
        },
        [sendBotMessage, updateUserData]
    );

    const handleCompletedText = useCallback(() => {
        sendBotMessage(botFlow.completed);
    }, [sendBotMessage]);

    const handleUnexpectedText = useCallback(() => {
        sendBotMessage(botFlow.unexpectedText);
    }, [sendBotMessage]);

    const optionHandlerMap = useMemo(
        () => ({
            [ChatStep.ChooseCategory]: handleChooseCategorySelection,
            [ChatStep.ChooseCategoryDetail]: handleChooseCategoryDetailSelection,
            [ChatStep.ChooseContactMethod]: handleChooseContactMethodSelection,
            [ChatStep.ConfirmSend]: handleConfirmSendSelection
        }) as Partial<Record<ChatStep, (value: string) => void | Promise<void>>>,
        [handleChooseCategorySelection, handleChooseCategoryDetailSelection, handleChooseContactMethodSelection, handleConfirmSendSelection]
    );

    const handleOptionClick = useCallback(
        async (option: string) => {
            sendUserMessage(option);

            const handler = optionHandlerMap[schritt];
            if (handler) {
                await handler(option);
                return;
            }

            sendBotMessage(botFlow.invalidSelection);
        },
        [schritt, sendBotMessage, sendUserMessage, optionHandlerMap]
    );

    const textHandlerMap = useMemo(
        () => ({
            [ChatStep.AskName]: handleAskName,
            [ChatStep.AskEmail]: handleAskEmail,
            [ChatStep.AskPhone]: handleAskPhone,
            [ChatStep.Completed]: () => handleCompletedText()
        }) as Partial<Record<ChatStep, (value: string) => void>>,
        [handleAskName, handleAskEmail, handleAskPhone, handleCompletedText]
    );

    const handleTextSubmit = useCallback(
        (event?: React.FormEvent) => {
            event?.preventDefault();
            const text = eingabeWert.trim();
            if (!text) return;

            sendUserMessage(text);
            setEingabeWert('');

            const handler = textHandlerMap[schritt] ?? handleUnexpectedText;
            handler(text);
        },
        [eingabeWert, handleUnexpectedText, sendUserMessage, schritt, textHandlerMap]
    );

    return (
        <div className="fixed bottom-[12.5rem] right-6 z-[100] font-sans pointer-events-none">
            <AnimatePresence>
                {!istOffen && zeigeTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
                        transition={{ y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute bottom-[80px] right-2 w-[240px] bg-white text-marke-sekundaer border-2 border-marke-primaer/20 px-4 py-3 rounded-2xl rounded-br-none shadow-xl font-bold text-sm cursor-pointer pointer-events-auto"
                        onClick={() => setIstOffen(true)}
                    >
                        Fragen? Ich bin für dich da! 👋
                        <br />
                        <span className="font-normal text-xs text-text-neben">Jetzt Chat starten</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIstOffen(prev => !prev)}
                onMouseEnter={() => setZeigeTooltip(true)}
                className="w-16 h-16 bg-marke-primaer rounded-full shadow-lg flex items-center justify-center relative z-10 pointer-events-auto"
                aria-label={istOffen ? 'Chat schließen' : 'Chat öffnen'}
                type="button"
            >
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

            <AnimatePresence>
                {istOffen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'right bottom' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-48px)] h-[580px] bg-white rounded-[2rem] shadow-3xl border border-slate-100 flex flex-col overflow-hidden pointer-events-auto"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Chatbot"
                    >
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

                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50" aria-live="polite">
                            {nachrichten.map((msg, idx) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn('flex flex-col', msg.sender === 'user' ? 'items-end' : 'items-start')}
                                >
                                    <div className={cn(
                                        'p-4 rounded-2xl text-[13px] leading-relaxed max-w-[90%] shadow-sm',
                                        msg.sender === 'user'
                                            ? 'bg-marke-primaer text-white rounded-br-none'
                                            : 'bg-white border border-slate-100 text-text-haupt rounded-bl-none'
                                    )}>
                                        {msg.text.split('\n').map((zeile, index, array) => (
                                            <React.Fragment key={index}>
                                                {zeile}
                                                {index < array.length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    {msg.sender === 'bot' && msg.options && idx === nachrichten.length - 1 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {msg.options.map(option => (
                                                <button
                                                    key={option}
                                                    type="button"
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

                            {tipptGerade && (
                                <div className="flex gap-1 p-3 bg-white border border-slate-100 rounded-xl w-12 items-center justify-center">
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            )}
                            <div ref={nachrichtenEndeRef} />
                        </div>

                        <form onSubmit={handleTextSubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                            <input
                                type="text"
                                value={eingabeWert}
                                onChange={event => setEingabeWert(event.target.value)}
                                placeholder={botFlow.inputPlaceholder}
                                autoComplete="off"
                                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-marke-primaer/20"
                            />
                            <button
                                type="submit"
                                disabled={!eingabeWert.trim()}
                                className={cn(
                                    'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                                    eingabeWert.trim() ? 'bg-marke-primaer text-white' : 'bg-slate-100 text-slate-300'
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
