import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, X, Clock, CheckCircle2 } from 'lucide-react';

type Sektion = {
    titel: string;
    text: string;
};

type Article = {
    kategorie: string;
    titel: string;
    bild: string;
    lesezeit: string;
    einleitung: string;
    sektionen: Sektion[];
    fazit: string;
};

const BlogWissen = () => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const articles: Article[] = [
        {
            kategorie: "Beamte",
            titel: "Die perfekte PKV für Beamte: Worauf du bei der Wahl achten musst",
            bild: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
            lesezeit: "4 Min. Lesezeit",
            einleitung: "Die Private Krankenversicherung (PKV) ist für Beamte und Beamtenanwärter in Deutschland die mit Abstand attraktivste Form der Krankheitskostenabsicherung. Durch das Beihilfesystem des Dienstherrn müssen Beamte nur einen Teil der Kosten privat absichern. Doch Vorsicht: Tarif ist nicht gleich Tarif.",
            sektionen: [
                {
                    titel: "1. Das Beihilfesystem verstehen",
                    text: "Dein Dienstherr übernimmt je nach Bundesland und Familienstand 50% bis 80% deiner Krankheitskosten im Rahmen der Beihilfe. Die verbleibende Restkostenlücke von 20% bis 50% musst du über eine private Krankenversicherung absichern. Es ist essenziell, dass der gewählte Tarif exakt auf die Beihilfeverordnung deines Bundeslandes bzw. des Bundes abgestimmt ist."
                },
                {
                    titel: "2. Unverzichtbare Leistungsbausteine",
                    text: "Achte beim Tarifvergleich auf folgende Leistungen, die keinesfalls fehlen sollten:\n\n• Beihilfe-Ergänzungstarif: Schließt Lücken bei zahnärztlichen Behandlungen, Zahnersatz, Sehhilfen und Heilpraktikern.\n• Wahlleistungen im Krankenhaus: Sichert dir die Chefarztbehandlung und das Zweibettzimmer.\n• Kur- und Sanatoriumsbehandlungen: Sollten vollumfänglich mitversichert sein, da die Beihilfe hier oft strenge Kürzungen vornimmt."
                },
                {
                    titel: "3. Einstieg als Referendar oder Anwärter",
                    text: "Während deines Vorbereitungsdienstes profitierst du von extrem günstigen Anwärtertarifen, bei denen du nur den reinen Risikoanteil ohne Alterungsrückstellungen zahlst. Wichtig ist jedoch, jetzt schon einen Versicherer zu wählen, der langfristig beitragsstabil ist und hervorragende Volltarife für die spätere Verbeamtung auf Lebenszeit anbietet."
                }
            ],
            fazit: "Die Wahl der richtigen PKV ist eine Entscheidung fürs Leben. Ein voreiliger Abschluss kann später teuer werden. Lass dich transparent und neutral beraten, um den Tarif zu finden, der perfekt zu deiner Beamtenlaufbahn passt."
        },
        {
            kategorie: "Selbstständige",
            titel: "Berufsunfähigkeit als Selbstständiger: So sicherst du deine Existenz",
            bild: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
            lesezeit: "5 Min. Lesezeit",
            einleitung: "Wer nicht arbeitet, verdient nichts. Für Selbstständige und Freiberufler gilt diese Regel ganz besonders. Fällt die eigene Arbeitskraft durch Krankheit oder Unfall aus, steht oft die gesamte Existenz auf dem Spiel. Eine Berufsunfähigkeitsversicherung (BU) ist daher kein Luxus, sondern absolute Pflicht.",
            sektionen: [
                {
                    titel: "1. Die eklatante staatliche Lücke",
                    text: "Selbstständige, die nicht in der gesetzlichen Rentenversicherung pflichtversichert sind, haben keinerlei Anspruch auf die staatliche Erwerbsminderungsrente. Selbst im Falle eines Anspruchs liegt die durchschnittliche staatliche Rente bei voller Erwerbsminderung bei weit unter 1.000 Euro im Monat. Ohne private Vorsorge droht der sofortige soziale Abstieg."
                },
                {
                    titel: "2. Die richtige Rentenhöhe ermitteln",
                    text: "Wie viel BU-Rente brauchst du wirklich? Die Rente sollte ausreichen, um deine laufenden privaten Fixkosten (Miete, Kredite, Lebenshaltung) und zusätzlich deine privaten Altersvorsorgebeiträge sowie Krankenversicherungsbeiträge weiterzuzahlen. Als Faustregel gelten 75% bis 80% des aktuellen Nettoeinkommens."
                },
                {
                    titel: "3. Wichtige Spezialklauseln für Unternehmer",
                    text: "Bei Selbstständigen prüft der Versicherer standardmäßig, ob der Betrieb durch 'Umorganisation' so angepasst werden kann, dass der Inhaber trotz Einschränkung weiterarbeiten kann. Achte auf verbraucherfreundliche Klauseln, wie den Verzicht auf Umorganisation bei kleinen Betrieben (unter 5 Mitarbeitern) oder bei akademischen Berufen."
                }
            ],
            fazit: "Eine BU ist komplex und erfordert eine präzise Aufbereitung der Gesundheitshistorie. Eine professionelle Beratung schützt dich vor Fehlern bei den Gesundheitsfragen, die im Ernstfall zur Leistungsverweigerung führen könnten."
        },
        {
            kategorie: "Privatkunden",
            titel: "Familie absichern: Diese 3 Versicherungen sind ein absolutes Muss",
            bild: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200",
            lesezeit: "4 Min. Lesezeit",
            einleitung: "Die Geburt eines Kindes oder der Kauf des gemeinsamen Eigenheims verändert alles. Plötzlich trägt man nicht mehr nur für sich selbst die Verantwortung, sondern auch für seine Liebsten. Um die Familie im Ernstfall vor dem finanziellen Ruin zu schützen, gibt es drei essentielle Versicherungen.",
            sektionen: [
                {
                    titel: "1. Privathaftpflichtversicherung (Das Fundament)",
                    text: "Sie ist die wichtigste Versicherung überhaupt. Wenn dein Kind beim Spielen die Straße überquert und einen schweren Verkehrsunfall verursacht, haftest du unbegrenzt mit deinem gesamten Vermögen. Eine Familienhaftpflicht deckt alle Familienmitglieder ab – inklusive deliktunfähiger Kinder."
                },
                {
                    titel: "2. Risikolebensversicherung (Der Hinterbliebenenschutz)",
                    text: "Sollte einem Elternteil etwas zustoßen, bricht nicht nur eine tragende emotionale Säule weg, sondern oft auch das Haupteinkommen. Eine Risikolebensversicherung stellt sicher, dass das Haus abbezahlt werden kann und die Ausbildung der Kinder finanziell gesichert bleibt. Sie ist extrem günstig und unverzichtbar für Hauptverdiener."
                },
                {
                    titel: "3. Berufsunfähigkeitsversicherung (Der Einkommensschutz)",
                    text: "Das größte Risiko im Laufe eines Arbeitslebens ist der Verlust der eigenen Arbeitskraft. Wenn das Einkommen eines Elternteils wegen einer langwierigen Krankheit oder eines Unfalls wegbricht, kann das Ersparte schnell aufgebraucht sein. Die Absicherung der Arbeitskraft sichert den Lebensstandard deiner Familie nachhaltig."
                }
            ],
            fazit: "Ein solides Sicherheitsnetz für die Familie muss nicht teuer sein. Durch einen transparenten Vergleich lassen sich hervorragende Tarife finden, die maximale Leistung bei bezahlbaren Beiträgen garantieren."
        }
    ];

    const openArticle = (article: Article) => {
        setSelectedArticle(article);
        document.body.style.overflow = 'hidden';
    };

    const closeArticle = () => {
        setSelectedArticle(null);
        document.body.style.overflow = 'unset';
    };

    const handleCTAClick = () => {
        closeArticle();
        setTimeout(() => {
            const kontaktSektion = document.getElementById('kontakt');
            if (kontaktSektion) {
                kontaktSektion.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };

    return (
        <section id="wissen" className="py-24 bg-hintergrund-alt relative overflow-hidden">
            {/* Sanfte Hintergrund-Highlights */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#1e5adb]/3 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e5adb]/2 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-[#e8effd] text-[#1e5adb] px-4 py-1.5 rounded-full mb-4 font-semibold text-xs uppercase tracking-wide">
                            Blog & Ratgeber
                        </div>
                        <h2 className="text-3xl md:text-[2.5rem] font-extrabold text-[#0a1930] leading-tight mb-4">
                            Wissen für deine Sicherheit
                        </h2>
                        <p className="text-[#4a5568] text-lg font-normal">
                            Die wichtigsten Antworten rund um Versicherungen, Vorsorge und Finanzen – einfach und verständlich erklärt.
                        </p>
                    </div>
                    <button
                        onClick={() => openArticle(articles[0])}
                        className="inline-flex items-center gap-2 text-[#1e5adb] font-bold hover:text-[#0a1930] transition-colors group cursor-pointer"
                    >
                        Ratgeber öffnen
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            onClick={() => openArticle(article)}
                            className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={article.bild}
                                    alt={article.titel}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0a1930] shadow-sm">
                                    {article.kategorie}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#0a1930] mb-6 leading-snug group-hover:text-[#1e5adb] transition-colors">
                                    {article.titel}
                                </h3>
                                <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#4a5568] group-hover:text-[#1e5adb] transition-colors">
                                        <BookOpen className="w-4 h-4" />
                                        Artikel lesen
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs text-[#718096]">
                                        <Clock className="w-3.5 h-3.5" />
                                        {article.lesezeit}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── EDLES HIGH-END BLOG MODAL OVERLAY (Portal in document.body) ─── */}
            {createPortal(
                <AnimatePresence>
                    {selectedArticle && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                            {/* Backdrop mit weichem Blur */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeArticle}
                                className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
                            />

                            {/* Modal Box */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="bg-white rounded-[2.5rem] shadow-2xl max-w-3xl w-full max-h-[85vh] border border-gray-100 relative z-[10000] flex flex-col overflow-hidden"
                            >
                                {/* Fester, schwebender Schließen-Button (Immer sichtbar & erreichbar) */}
                                <button
                                    onClick={closeArticle}
                                    className="absolute top-4 right-4 z-[10010] w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#0a1930] hover:bg-[#1e5adb] hover:text-white transition-all shadow-md cursor-pointer border border-gray-200/50"
                                    aria-label="Schließen"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Scrollbarer Inhaltsbereich */}
                                <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                    {/* Header Bild Banner */}
                                    <div className="relative h-48 md:h-64 w-full overflow-hidden flex-shrink-0">
                                        <img
                                            src={selectedArticle.bild}
                                            alt={selectedArticle.titel}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                                        {/* Kategorie & Lesezeit über dem Bild */}
                                        <div className="absolute bottom-4 left-6 flex items-center gap-3">
                                            <span className="bg-[#1e5adb] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                                {selectedArticle.kategorie}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-white/90 text-xs font-semibold">
                                                <Clock className="w-3.5 h-3.5" />
                                                {selectedArticle.lesezeit}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Text-Inhalt */}
                                    <div className="p-6 md:p-10">
                                        <h2 className="text-xl md:text-3xl font-extrabold text-[#0a1930] mb-4 leading-tight">
                                            {selectedArticle.titel}
                                        </h2>

                                        <p className="text-sm md:text-base text-[#4a5568] leading-relaxed font-semibold mb-6 border-l-4 border-[#1e5adb] pl-4">
                                            {selectedArticle.einleitung}
                                        </p>

                                        <div className="space-y-6">
                                            {selectedArticle.sektionen.map((sek, sIdx) => (
                                                <div key={sIdx} className="space-y-2">
                                                    <h3 className="text-lg font-extrabold text-[#0a1930]">
                                                        {sek.titel}
                                                    </h3>
                                                    <p className="text-xs md:text-sm text-[#4a5568] leading-relaxed whitespace-pre-line font-normal">
                                                        {sek.text}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Fazit Box */}
                                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-xl p-5 md:p-6 mt-8 space-y-2">
                                            <h4 className="font-extrabold text-sm text-[#0a1930] flex items-center gap-2">
                                                <CheckCircle2 className="w-4.5 h-4.5 text-[#1e5adb]" />
                                                Fazit & Handlungsempfehlung
                                            </h4>
                                            <p className="text-[11px] md:text-xs text-[#4a5568] leading-relaxed font-normal">
                                                {selectedArticle.fazit}
                                            </p>
                                        </div>

                                        {/* Action-CTA Box */}
                                        <div className="bg-[#0a1930] rounded-2xl p-6 text-white mt-10 relative overflow-hidden shadow-xl text-center">
                                            <div className="absolute inset-0 bg-[#1e5adb]/10 blur-[80px] pointer-events-none" />
                                            <h3 className="text-lg md:text-xl font-extrabold mb-2 relative z-10">
                                                Möchtest du deine Absicherung individuell prüfen lassen?
                                            </h3>
                                            <p className="text-slate-300 text-[11px] md:text-xs leading-relaxed mb-4 max-w-md mx-auto font-normal relative z-10">
                                                Lass uns in einem kurzen, kostenfreien Erstgespräch prüfen, welche Tarife am besten zu deiner persönlichen Situation passen. Völlig unverbindlich und verständlich.
                                            </p>
                                            <button
                                                onClick={handleCTAClick}
                                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-marke-primaer text-white text-xs font-bold rounded-lg hover:bg-marke-primaer-hover transition-all shadow-md hover:shadow-lg cursor-pointer relative z-10"
                                            >
                                                <span>Kostenfreies Erstgespräch vereinbaren</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default BlogWissen;
