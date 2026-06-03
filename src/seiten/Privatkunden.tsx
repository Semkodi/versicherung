import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShieldCheck, 
    Home, 
    Car, 
    HeartPulse, 
    ArrowRight, 
    HelpCircle, 
    Check,
    ChevronDown,
    AlertTriangle,
    Info,
    CheckCircle2,
    Star
} from 'lucide-react';
import { ScrollReveal } from '@/komponenten/layout';

// Importiere die neu generierten Bilder fuer die Karten
import haftpflichtImg from '@/assets/bilder/haftpflicht_card.png';
import einkommenImg    from '@/assets/bilder/einkommen_card.png';
import hausratImg      from '@/assets/bilder/hausrat_card.png';
import kfzImg          from '@/assets/bilder/kfz_card.png';
import heroCoupleImg   from '@/assets/bilder/hero_couple.png';

// Typdefinitionen
type FAQItem = {
    frage: string;
    antwort: string;
};

type DetailliertesProdukt = {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    titel: string;
    untertitel: string;
    einleitung: string;
    prioritaet: 'Essenziell' | 'Sehr wichtig' | 'Empfohlen';
    image: string;
    punkte: { titel: string; text: string }[];
};

const Privatkunden = () => {
    const [offenesFAQ, setOffenesFAQ] = useState<number | null>(null);

    // Hochprofessionelle Produktdaten inklusive fachlich fundierten Info-Punkten
    const produkte: DetailliertesProdukt[] = [
        {
            id: "haftpflicht",
            icon: ShieldCheck,
            titel: "Privathaftpflichtversicherung",
            untertitel: "Der wichtigste Schutz für dich & deine Familie",
            einleitung: "Wer anderen einen Schaden zufügt, haftet laut BGB unbegrenzt mit seinem gesamten gegenwärtigen und zukünftigen Vermögen. Die Privathaftpflicht schützt dich vor diesem existenzbedrohenden Risiko.",
            prioritaet: 'Essenziell',
            image: haftpflichtImg,
            punkte: [
                {
                    titel: "Forderungsausfalldeckung",
                    text: "Fügt dir jemand einen Schaden zu, der selbst keine Haftpflicht besitzt und zahlungsunfähig ist, springt deine eigene Versicherung ein und übernimmt die Kosten."
                },
                {
                    titel: "Schlüsselverlust-Schutz",
                    text: "Verlierst du private Schlüssel oder den Generalschlüssel einer beruflichen Schließanlage (z. B. deines Arbeitgebers), sind die extremen Austauschkosten voll abgedeckt."
                },
                {
                    titel: "Schäden bei Gefälligkeiten",
                    text: "Hilfst du Freunden beim Umzug oder renovieren und beschädigst dabei versehentlich einen teuren Fernseher, reguliert deine Haftpflicht den Schaden anstandslos."
                },
                {
                    titel: "Beitragsfreie Mitversicherung",
                    text: "Ehepartner, Lebenspartner und deine Kinder (während der Erstausbildung) sind in deinem Tarif ohne zusätzliche Kosten vollumfänglich mitversichert."
                }
            ]
        },
        {
            id: "vorsorge",
            icon: HeartPulse,
            titel: "Einkommensschutz & Vorsorge",
            untertitel: "Deine Arbeitskraft ist dein größtes Kapital",
            einleitung: "Wenn du aus gesundheitlichen Gründen (Krankheit oder Unfall) deinen Beruf nicht mehr ausüben kannst, bricht dein Einkommen weg. Eine Berufsunfähigkeitsversicherung sichert deinen Lebensstandard.",
            prioritaet: 'Essenziell',
            image: einkommenImg,
            punkte: [
                {
                    titel: "Zahlung ab 50% Berufsunfähigkeit",
                    text: "Sobald ein Arzt bestätigt, dass du deinen aktuellen Beruf zu mindestens 50% für voraussichtlich sechs Monate nicht mehr ausüben kannst, fließt die vereinbarte Rente."
                },
                {
                    titel: "Verzicht auf abstrakte Verweisung",
                    text: "Der Versicherer kann dich im Ernstfall nicht zwingen, eine andere theoretische Tätigkeit auszuüben, die zwar deinem Zustand entspricht, aber nicht deiner Lebensstellung."
                },
                {
                    titel: "Flexibilität durch Nachversicherungsgarantien",
                    text: "Bei wichtigen Lebensereignissen (Heirat, Geburt eines Kindes, Immobilienkauf oder Gehaltssprung) kannst du deinen Schutz ohne erneute Gesundheitsprüfung anheben."
                },
                {
                    titel: "Sicherheitsnetz bei schweren Krankheiten",
                    text: "Finanzielle Unabhängigkeit sichert dir die beste medizinische Behandlung und sorgt dafür, dass laufende Kosten wie Miete oder Kredite gedeckt bleiben."
                }
            ]
        },
        {
            id: "hausrat",
            icon: Home,
            titel: "Hausratversicherung",
            untertitel: "Sicherheit für deine eigenen vier Wände",
            einleitung: "Egal ob Mietwohnung oder Eigenheim – dein Hausrat repräsentiert einen hohen finanziellen Wert. Bei Schäden durch Feuer, Leitungswasser, Sturm oder Einbruch sorgt diese Versicherung für Ersatz.",
            prioritaet: 'Empfohlen',
            image: hausratImg,
            punkte: [
                {
                    titel: "Neuwertentschädigung",
                    text: "Im Schadensfall erhältst du immer den aktuellen Wiederbeschaffungswert deines Inventars zur Neuanschaffung erstattet, nicht nur den verringerten Zeitwert."
                },
                {
                    titel: "Schutz bei grober Fahrlässigkeit",
                    text: "Lässt du die Waschmaschine laufen, gehst einkaufen und es kommt zum Wasserschaden, reguliert die Versicherung den Schaden dennoch zu 100% ohne Kürzungen."
                },
                {
                    titel: "Fahrraddiebstahl weltweit",
                    text: "Dein Fahrrad oder E-Bike ist nicht nur in der Wohnung oder im Keller geschützt, sondern auch unterwegs beim einfachen Diebstahl (z. B. am Bahnhof)."
                },
                {
                    titel: "Elementarschaden-Zusatzschutz",
                    text: "Erweiterung für extreme Naturereignisse wie Überschwemmungen durch Starkregen, Rückstau in der Kanalisation, Erdbeben oder Schneedruck."
                }
            ]
        },
        {
            id: "kfz-versicherung",
            icon: Car,
            titel: "Kfz-Versicherung",
            untertitel: "Deine smarte Absicherung auf der Straße",
            einleitung: "Eine Kfz-Haftpflicht ist gesetzliche Pflicht – doch auf die Kaskodetails kommt es an. Wir vergleichen unabhängig Tarife, die dich bei Diebstahl, Unfällen und Pannen optimal begleiten.",
            prioritaet: 'Sehr wichtig',
            image: kfzImg,
            punkte: [
                {
                    titel: "Freie Werkstattwahl",
                    text: "Entscheide im Schadensfall völlig frei, in welcher Marken-Fachwerkstatt dein Auto repariert werden soll, um den Wert und Garantien deines Fahrzeugs zu erhalten."
                },
                {
                    titel: "Mallorca-Police inklusive",
                    text: "Erhöht die oft viel zu geringen gesetzlichen Haftpflicht-Deckungssummen von Mietwagen im europäischen Ausland auf deutsches Sicherheitsniveau."
                },
                {
                    titel: "Erweiterte Wildschaden-Klausel",
                    text: "Schutz bei Zusammenstößen mit Tieren aller Art (z. B. auch Kühen, Hunden oder Vögeln) und nicht nur bei Unfällen mit klassischem 'Haarwild'."
                },
                {
                    titel: "Kaufpreis- & Neupreisschutz",
                    text: "Bei einem Totalschaden oder Diebstahl erstattet dir der Versicherer bis zu 24 Monate den vollen Neupreis (bei Neuwagen) bzw. Kaufpreis (bei Gebrauchtwagen)."
                }
            ]
        }
    ];

    const faqs: FAQItem[] = [
        {
            frage: "Welche Versicherungen brauche ich als Privatperson wirklich?",
            antwort: "Absolut unverzichtbar ist die Privathaftpflichtversicherung, da du laut Gesetz für alle verursachten Schäden unbegrenzt mit deinem gesamten Vermögen haftest. Ebenfalls essenziell ist eine Berufsunfähigkeitsversicherung (Einkommensschutz), um deine Arbeitskraft abzusichern. Alle weiteren Versicherungen hängen von deinen persönlichen Lebensumständen ab."
        },
        {
            frage: "Warum sollte ich meine Versicherungen über einen Makler abschließen?",
            antwort: "Als unabhängiger Versicherungsmakler bin ich nicht an eine bestimmte Gesellschaft gebunden, sondern vertrete ausschließlich deine Interessen. Ich habe Zugriff auf fast den gesamten deutschen Versicherungsmarkt und filtere die besten Tarife für dich heraus."
        },
        {
            frage: "Wie läuft eine Bedarfsanalyse bei Sven Kegler ab?",
            antwort: "Völlig stressfrei! Im ersten Schritt analysieren wir per Video-Call, Telefon oder persönlich deine aktuelle Lebenssituation und deine bestehenden Verträge. Wir decken Deckungslücken auf und sortieren unnötige Policen aus."
        },
        {
            frage: "Kann ich meine bestehenden Versicherungen einfach optimieren?",
            antwort: "Ja, absolut! Ältere Verträge sind oft teurer und bieten schlechtere Leistungen als moderne Tarife. Ich prüfe deine bestehenden Policen kostenfrei. Oft sparen wir bei gleicher Leistung mehrere hundert Euro pro Jahr."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOffenesFAQ(offenesFAQ === index ? null : index);
    };

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <main className="relative z-10 overflow-hidden bg-white text-[#2d3748]">
            {/* ─── PREMIUM HERO SEKTION (Zweispaltig mit Bild & schwebenden Kacheln) ─── */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-[#f8f9fc] to-[#eef2f9] overflow-hidden border-b border-[#e2e8f0]">
                {/* Sanfte dekorative Kreise im Hintergrund */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#1e5adb]/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e5adb]/3 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        {/* Linke Spalte: Text & CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-2xl"
                        >
                            <span className="inline-flex items-center gap-2 bg-[#e8effd] text-[#1e5adb] px-4 py-2 rounded-full mb-6 font-semibold text-xs shadow-sm border border-[#d1e0f9] uppercase tracking-wider">
                                Unabhängige Beratung für dein Leben
                            </span>
                            
                            <h1 className="text-[2.5rem] md:text-5xl lg:text-[4rem] font-extrabold text-[#0a1930] leading-[1.1] mb-6 tracking-tight">
                                Sicherheit, die zu <br />
                                <span className="bg-gradient-to-r from-[#1e5adb] to-[#4f46e5] bg-clip-text text-transparent">deinem Alltag</span> passt
                            </h1>
                            
                            <p className="text-base md:text-lg text-[#4a5568] mb-10 max-w-xl font-normal leading-relaxed">
                                Kein Kauderwelsch, kein Verkaufsdruck. Wir filtern unabhängig die stärksten Tarife am Markt heraus und bauen dir ein Schutzschild auf, das perfekt auf deine Lebensphase abgestimmt ist.
                            </p>

                            {/* Checkmarks */}
                            <ul className="space-y-4 mb-10">
                                {[
                                    "Existenzielle Risiken zuerst sichern",
                                    "100% unabhängiger Marktvergleich",
                                    "Schnelle & digitale Hilfe im Schadensfall"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-[#2d3748] font-medium">
                                        <div className="w-6 h-6 rounded-full bg-[#1e5adb] flex items-center justify-center flex-shrink-0 shadow-md">
                                            <Check className="w-4 h-4 text-white stroke-[3]" />
                                        </div>
                                        <span className="text-sm md:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <a
                                    href="#kontakt"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0a1930] text-white font-semibold rounded-xl hover:bg-[#152a4f] transition-all shadow-xl hover:-translate-y-1"
                                >
                                    <span>Erstgespräch vereinbaren</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                                <a
                                    href="#haftpflicht"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#0a1930] border-2 border-white shadow-md font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    <span>Schutzschild prüfen</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>

                            {/* Social Proof / Stars */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-[#fbbf24] fill-[#fbbf24]" />
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-xs md:text-sm text-[#0a1930]">4,9/5 aus 230+ Bewertungen</span>
                                    <div className="flex -space-x-3">
                                        <img src="https://i.pravatar.cc/100?img=1" alt="avatar" className="w-8 h-8 rounded-full border-2 border-[#f8f9fc]" />
                                        <img src="https://i.pravatar.cc/100?img=2" alt="avatar" className="w-8 h-8 rounded-full border-2 border-[#f8f9fc]" />
                                        <img src="https://i.pravatar.cc/100?img=3" alt="avatar" className="w-8 h-8 rounded-full border-2 border-[#f8f9fc]" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Rechte Spalte: Bild & schwebende Trust-Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:flex items-end justify-center"
                        >
                            {/* Main Image mit sanftem Verlauf nach links */}
                            <div className="relative z-10 w-full flex justify-end">
                                <img 
                                    src={heroCoupleImg} 
                                    alt="Familie und Absicherung" 
                                    className="w-full h-auto max-h-[500px] object-cover rounded-[2rem] [mask-image:linear-gradient(to_right,transparent_0%,black_35%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_35%)] shadow-md"
                                />
                            </div>

                            {/* Floating Trust Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="absolute -bottom-8 -left-12 bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-20 w-max border border-white/40"
                            >
                                <div className="flex gap-6">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="w-10 h-10 rounded-full bg-[#e8effd] flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-[#1e5adb]" />
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-sm text-[#0a1930] mb-0.5">Existenz sichern</div>
                                            <div className="text-[10px] text-[#718096] leading-snug">Haftpflicht &<br/>Arbeitskraft zuerst.</div>
                                        </div>
                                    </div>
                                    <div className="w-px bg-gray-100" />
                                    <div className="flex flex-col gap-1.5">
                                        <div className="w-10 h-10 rounded-full bg-[#e8effd] flex items-center justify-center">
                                            <Home className="w-5 h-5 text-[#1e5adb]" />
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-sm text-[#0a1930] mb-0.5">Werte schützen</div>
                                            <div className="text-[10px] text-[#718096] leading-snug">Hausrat, Auto &<br/>Wohngebäude.</div>
                                        </div>
                                    </div>
                                    <div className="w-px bg-gray-100" />
                                    <div className="flex flex-col gap-1.5">
                                        <div className="w-10 h-10 rounded-full bg-[#e8effd] flex items-center justify-center">
                                            <HeartPulse className="w-5 h-5 text-[#1e5adb]" />
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-sm text-[#0a1930] mb-0.5">Zukunft planen</div>
                                            <div className="text-[10px] text-[#718096] leading-snug">Smarte Vorsorge &<br/>Vorsorgewege.</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ─── ORIENTIERUNGS- & EINSTIEGSSEKTION ─── */}
            <section className="py-24 bg-white border-b border-[#e2e8f0]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#1e5adb] font-extrabold text-xs uppercase tracking-widest block mb-3">Wegweiser & Orientierung</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a1930] tracking-tight mb-6">
                            Das private Schutzschild: Was wirklich wichtig ist
                        </h2>
                        <p className="text-[#4a5568] text-lg font-normal">
                            Bevor du dir die einzelnen Absicherungen im Detail anschaust, hilft dir unser 3-Säulen-Modell und unsere goldenen Regeln, um die richtige Reihenfolge und Struktur zu verstehen.
                        </p>
                    </div>

                    {/* Das 3-Säulen-Modell */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
                            <span className="text-[#1e5adb] font-extrabold text-2xl mb-4 block">01</span>
                            <h3 className="text-xl font-extrabold text-[#0a1930] mb-3">Existenz sichern</h3>
                            <p className="text-xs text-[#4a5568] font-normal leading-relaxed">
                                Absolut unersetzbar. Hierzu gehören alle Gefahren, die dich im schlimmsten Fall finanziell ruinieren können. Eine Privathaftpflicht und die Absicherung deiner Arbeitskraft (Einkommensschutz) haben oberste Priorität.
                            </p>
                        </div>
                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
                            <span className="text-[#1e5adb] font-extrabold text-2xl mb-4 block">02</span>
                            <h3 className="text-xl font-extrabold text-[#0a1930] mb-3">Werte schützen</h3>
                            <p className="text-xs text-[#4a5568] font-normal leading-relaxed">
                                Dein Hab und Gut absichern. Hier schützen wir Sachwerte wie dein Zuhause, deine Möbel oder dein Auto (Hausrat, Kfz-Kasko). Versichert wird nur das, was du nicht ohne Weiteres selbst ersetzen kannst.
                            </p>
                        </div>
                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
                            <span className="text-[#1e5adb] font-extrabold text-2xl mb-4 block">03</span>
                            <h3 className="text-xl font-extrabold text-[#0a1930] mb-3">Zukunft planen</h3>
                            <p className="text-xs text-[#4a5568] font-normal leading-relaxed">
                                Vermögen aufbauen und Vorsorge treffen. Von der privaten Altersvorsorge über smarte Investments bis hin zu Krankenzusatzversicherungen, um im Alter die beste Versorgung zu genießen.
                            </p>
                        </div>
                    </div>

                    {/* Die 3 Goldenen Regeln der Absicherung */}
                    <div className="bg-[#0a1930] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute inset-0 bg-[#1e5adb]/10 blur-[100px] pointer-events-none" />
                        <h3 className="text-2xl font-extrabold mb-8 relative z-10">Die 3 goldenen Regeln der Absicherung</h3>
                        <div className="grid md:grid-cols-3 gap-8 relative z-10">
                            <div>
                                <h4 className="font-extrabold text-base text-white mb-2">Rule #1: Existenzrisiken zuerst</h4>
                                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                                    Stelle dir immer die Frage: "Kann mich dieser Schaden ruinieren?" Wenn ja (wie z. B. schwere Krankheit oder ein verursachter Großbrand), muss dieses Risiko als Erstes abgesichert sein.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-base text-white mb-2">Rule #2: Nur Unersetzbares versichern</h4>
                                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                                    Vermeide Kleinstversicherungen (wie Handy- oder Brillenversicherungen). Spare dir diese Beiträge lieber und investiere sie in die wirklich existentiellen Bausteine deines Schutzschilds.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-base text-white mb-2">Rule #3: Verträge dynamisch anpassen</h4>
                                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                                    Versicherungen sind kein 'Starr-und-Vergessen'-Produkt. Bei Heirat, Nachwuchs, Immobilienkauf oder Gehaltserhöhungen müssen deine Verträge sofort angepasst und modernisiert werden.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── DETALLIERTE PRODUKT-SEKTIONEN (Abwechselndes Apple-Style Layout) ─── */}
            <section className="bg-white">
                {produkte.map((p, idx) => {
                    const istGerade = idx % 2 === 0;
                    return (
                        <div 
                            key={p.id} 
                            id={p.id} // Anker-ID für das direkte Scrollen!
                            className={`py-28 border-b border-[#e2e8f0] scroll-mt-28 relative ${
                                istGerade ? 'bg-white' : 'bg-[#f8f9fc]'
                            }`}
                        >
                            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                                <div className="grid lg:grid-cols-2 gap-16 items-center">
                                    
                                    {/* Bild-Container (Links bei gerade, rechts bei ungerade) */}
                                    <div className={`w-full ${istGerade ? 'lg:order-1' : 'lg:order-2'}`}>
                                        <ScrollReveal direction={istGerade ? "left" : "right"}>
                                            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 aspect-[4/3] lg:aspect-square">
                                                <img 
                                                    src={p.image} 
                                                    alt={p.titel} 
                                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                />
                                                <div className="absolute top-6 right-6 bg-[#0a1930]/60 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-md">
                                                    {p.prioritaet}
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    </div>

                                    {/* Text- & Info-Container */}
                                    <div className={`w-full ${istGerade ? 'lg:order-2' : 'lg:order-1'}`}>
                                        <ScrollReveal direction="up">
                                            {/* Badge */}
                                            <div className="inline-flex items-center gap-2 bg-[#e8effd] text-[#1e5adb] px-4 py-2 rounded-full mb-6 font-semibold text-xs border border-[#d1e0f9] uppercase tracking-wider">
                                                <p.icon className="w-4 h-4" />
                                                <span>{p.untertitel}</span>
                                            </div>

                                            {/* Headline */}
                                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1930] mb-6 leading-tight">
                                                {p.titel}
                                            </h2>

                                            {/* Einleitung */}
                                            <p className="text-[#4a5568] text-base mb-10 leading-relaxed font-normal">
                                                {p.einleitung}
                                            </p>

                                            {/* Strukturierte Info-Punkte */}
                                            <motion.ul 
                                                variants={listVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: "-100px" }}
                                                className="space-y-6 mb-10"
                                            >
                                                {p.punkte.map((punkt, pIdx) => (
                                                    <motion.li 
                                                        key={pIdx} 
                                                        variants={itemVariants}
                                                        className="flex items-start gap-4 pb-5 border-b border-gray-100 last:border-b-0 last:pb-0 group cursor-default"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-[#1e5adb]/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1e5adb]/20">
                                                            <Check className="w-4 h-4 text-[#1e5adb] stroke-[3] transition-colors duration-300" />
                                                        </div>
                                                        <div className="transition-all duration-300 transform group-hover:translate-x-1">
                                                            <h4 className="font-extrabold text-base text-[#0a1930] mb-1.5 transition-colors duration-300 group-hover:text-[#1e5adb]">{punkt.titel}</h4>
                                                            <p className="text-sm text-[#4a5568] leading-relaxed font-normal">{punkt.text}</p>
                                                        </div>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>

                                            {/* CTA Button */}
                                            <a 
                                                href="#kontakt"
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0a1930] text-white text-sm font-semibold rounded-xl hover:bg-[#152a4f] transition-all shadow-md hover:shadow-lg"
                                            >
                                                <span>Erstgespräch vereinbaren</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </a>
                                        </ScrollReveal>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* ─── BEDARFS-AMPEL SEKTION ─── */}
            <section className="py-24 bg-[#f8f9fc] relative border-b border-[#e2e8f0]">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#1e5adb] font-semibold text-xs uppercase tracking-widest block mb-2">Wie viel Absicherung ist klug?</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0a1930]">Die Bedarfs-Ampel</h2>
                        <p className="text-[#4a5568] font-normal mt-3 max-w-xl mx-auto">Vermeide Überversicherung und schließe gefährliche Lücken. Ein ehrlicher Wegweiser.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Rot - Essenziell */}
                        <ScrollReveal direction="left" delay={0.1}>
                            <div className="p-8 bg-white border border-[#e2e8f0] rounded-3xl relative h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                                <div className="absolute top-4 right-4 text-red-400/20">
                                    <AlertTriangle className="w-8 h-8" />
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                                    <h3 className="text-xl font-bold text-red-600">Essenziell</h3>
                                </div>
                                <p className="text-xs text-[#718096] font-normal mb-6 flex-grow">Diese Versicherungen sollte absolut JEDER besitzen. Sie schützen vor dem finanziellen Ruin bei Extremschäden.</p>
                                <div className="space-y-3 border-t border-[#e2e8f0] pt-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-[#2d3748]">Privathaftpflicht</span>
                                        <span className="bg-red-50 text-red-600 border border-red-150 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Muss</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-[#2d3748]">Krankenversicherung</span>
                                        <span className="bg-red-50 text-red-600 border border-red-150 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Pflicht</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-[#2d3748]">Berufsunfähigkeit (BU)</span>
                                        <span className="bg-red-50 text-red-600 border border-red-150 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Dringend</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Gelb - Wichtig */}
                        <ScrollReveal direction="up" delay={0.2}>
                            <div className="p-8 bg-white border border-[#e2e8f0] rounded-3xl relative h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                                <div className="absolute top-4 right-4 text-orange-400/20">
                                    <Info className="w-8 h-8" />
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.4)]" />
                                    <h3 className="text-xl font-bold text-orange-600">Sehr wichtig</h3>
                                </div>
                                <p className="text-xs text-[#718096] font-normal mb-6 flex-grow">Je nach Besitz oder Lebensumständen hochgradig empfohlen. Fehlender Schutz kann teure Folgen haben.</p>
                                <div className="space-y-3 border-t border-[#e2e8f0] pt-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-[#2d3748]">Kfz-Haftpflicht</span>
                                        <span className="bg-orange-50 text-orange-600 border border-orange-150 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Bei Auto</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-[#2d3748]">Altersvorsorge</span>
                                        <span className="bg-orange-50 text-orange-600 border border-orange-150 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Vorsorge</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-[#2d3748]">Auslands-Kranken</span>
                                        <span className="bg-orange-50 text-orange-600 border border-orange-150 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Reisen</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Grün - Ergänzung */}
                        <ScrollReveal direction="right" delay={0.3}>
                            <div className="p-8 bg-white border border-[#e2e8f0] rounded-3xl relative h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                                <div className="absolute top-4 right-4 text-green-400/20">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                    <h3 className="text-xl font-bold text-green-600">Ergänzend</h3>
                                </div>
                                <p className="text-xs text-[#718096] font-normal mb-6 flex-grow">Sinnvoller Schutz für Eigentum und spezielle Streitfälle. Individuelle Absicherung nach persönlichem Bedarf.</p>
                                <div className="space-y-3 border-t border-[#e2e8f0] pt-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-[#2d3748]">Hausratversicherung</span>
                                        <span className="bg-green-50 text-green-600 border border-green-150 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Inventar</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-[#2d3748]">Rechtsschutz</span>
                                        <span className="bg-green-50 text-green-600 border border-green-150 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Streit</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-[#2d3748]">Zahnzusatzschutz</span>
                                        <span className="bg-green-50 text-green-600 border border-green-150 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Zähne</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ─── FAQ AKKORDEON SEKTION ─── */}
            <section className="py-28 bg-white relative border-b border-[#e2e8f0]">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="w-12 h-12 bg-[#e8effd] rounded-xl flex items-center justify-center mb-4 mx-auto border border-[#d1e0f9]">
                            <HelpCircle className="w-6 h-6 text-[#1e5adb]" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#0a1930]">Häufige Fragen (FAQs)</h2>
                        <p className="text-[#4a5568] font-normal">Alles, was du zur privaten Absicherung wissen musst.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const istOffen = offenesFAQ === index;
                            return (
                                <ScrollReveal key={index} direction="up" delay={index * 0.05}>
                                    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden hover:border-gray-300 transition-colors shadow-sm">
                                        <button
                                            onClick={() => toggleFAQ(index)}
                                            className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-bold text-[#0a1930] hover:text-[#1e5adb] transition-colors"
                                            aria-expanded={istOffen}
                                        >
                                            <span className="text-sm md:text-base font-semibold">{faq.frage}</span>
                                            <motion.div
                                                animate={{ rotate: istOffen ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-[#718096] flex-shrink-0"
                                            >
                                                <ChevronDown className="w-5 h-5" />
                                            </motion.div>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {istOffen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="px-6 pb-6 text-xs md:text-sm text-[#4a5568] font-normal leading-relaxed border-t border-[#e2e8f0] pt-4 bg-[#f8f9fc]">
                                                        {faq.antwort}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── DUNKELBLAUER CTA ─── */}
            <section className="py-24 bg-white relative">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="bg-[#0a1930] rounded-[3rem] p-12 md:p-16 relative overflow-hidden shadow-2xl text-white">
                        <div className="absolute inset-0 bg-[#1e5adb]/10 blur-[120px] pointer-events-none" />
                        
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Bereit für den optimalen Schutz?</h2>
                        <p className="text-slate-300 font-normal mb-10 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            Keine Lust mehr auf unklare Verträge und teure Zusatzpakete? Lass uns gemeinsam aufräumen. Transparent, digital und vollkommen unabhängig.
                        </p>
                        
                        <motion.a 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://svenkegler.de/privatkunden"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-[#1e5adb] text-white font-bold rounded-2xl hover:bg-[#1546b3] transition-all shadow-xl relative z-10 border border-[#1e5adb]/20"
                        >
                            Jetzt kostenfreie Erstberatung sichern
                            <ArrowRight className="w-5 h-5" />
                        </motion.a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Privatkunden;
