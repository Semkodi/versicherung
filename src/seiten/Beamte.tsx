import { type ComponentType } from 'react';
import { usePageMetadata } from '@/hooks/usePageMetadata';
import { motion } from 'framer-motion';
import { 
    Shield, 
    ShieldAlert, 
    FileText, 
    GraduationCap, 
    Check, 
    ArrowRight
} from 'lucide-react';
import {
  FehlerBereich,
  FAQ,
  SoArbeiteIch,
} from '@/komponenten/home';
import { KontaktBereich } from '@/komponenten/kontakt';
import { ScrollReveal, UnterseitenHero } from '@/komponenten/layout';
import { BedarfsRechner } from '@/komponenten/rechner';

// Importiere die neu generierten Bilder fuer die Beamtenkarten
import duImg       from '@/assets/bilder/beamte_du.webp';
import pkvImg      from '@/assets/bilder/beamte_pkv.webp';
import beihilfeImg from '@/assets/bilder/beamte_beihilfe.webp';
import refImg      from '@/assets/bilder/beamte_ref.webp';
import beamteHeroImg from '@/assets/bilder/hero_beamte_anwaerter.webp';

const METADATA = {
    title: "Dienstunfähigkeitsversicherung & PKV für Beamte | Online-Beratung",
    description: "Exklusive Tarife für Beamte & Anwärter. Echte DU-Klausel, Beihilfe-Kompensation & Anwärtertarife deutschlandweit online vergleichen.",
};

// Typdefinition fuer ein detailliertes Beamten-Produkt
type DetailliertesBeamtenProdukt = {
    id: string;
    icon: ComponentType<{ className?: string }>;
    titel: string;
    untertitel: string;
    einleitung: string;
    image: string;
    punkte: { titel: string; text: string }[];
};

const Beamte = () => {
    usePageMetadata(METADATA);
    // Die vier Hauptthemen fuer Beamte, passend zum Untermenue in der Navigationsleiste
    const produkte: DetailliertesBeamtenProdukt[] = [
        {
            id: "dienstunfaehigkeit",
            icon: ShieldAlert,
            titel: "Dienstunfähigkeitsversicherung (DU)",
            untertitel: "Existenzsicherung bei Dienstunfähigkeit",
            einleitung: "Als Beamter schützt dich eine gewöhnliche Berufsunfähigkeitsversicherung nicht. Du benötigst zwingend eine echte Dienstunfähigkeitsklausel, die auf deine Beamtenlaufbahn abgestimmt ist.",
            image: duImg,
            punkte: [
                {
                    titel: "Echte Dienstunfähigkeitsklausel",
                    text: "Der Versicherer leistet monatlich allein auf Basis der Entlassung oder Versetzung in den Ruhestand durch deinen Dienstherrn – ohne eigene medizinische Nachprüfung."
                },
                {
                    titel: "Spezifischer Dienstanfänger-Schutz",
                    text: "Besonders kritisch in den ersten 5 Dienstjahren (Widerruf/Probe). Bei Dienstunfähigkeit wirst du ohne jegliche staatliche Pension entlassen. Eine DU fängt dich voll ab."
                },
                {
                    titel: "Absicherung bei Teildienstunfähigkeit",
                    text: "Solltest du aus gesundheitlichen Gründen nur noch eingeschränkt (z. B. halbtags) arbeiten können, zahlt die Versicherung den Einkommensverlust anteilig aus."
                },
                {
                    titel: "Beamten-Ruhegehalt-Ausgleich",
                    text: "Schließt die beträchtliche Lücke zwischen deinen aktiven Dienstbezügen und dem Mindest-Ruhegehalt im späteren Dienstverhältnis auf Lebenszeit."
                }
            ]
        },
        {
            id: "krankenversicherung",
            icon: Shield,
            titel: "Private Krankenversicherung (PKV)",
            untertitel: "Erstklassiger Gesundheitsschutz für Beamte",
            einleitung: "Dein Dienstherr übernimmt über die Beihilfe 50% bis 80% deiner Krankheitskosten. Eine beihilfekonforme PKV schließt die verbleibende Restkostenlücke erstklassig und preiswert.",
            image: pkvImg,
            punkte: [
                {
                    titel: "Beihilfekonforme Restkosten",
                    text: "Spezielle Tarife, die exakt auf den Beihilfesatz deines Bundeslandes (bzw. des Bundes) abgestimmt sind und verbleibende 20% bis 50% der Kosten decken."
                },
                {
                    titel: "Einbettzimmer & Chefarztbehandlung",
                    text: "Freie Krankenhauswahl und Chefarztbehandlung im Ernstfall. Du genießt im Krankenhaus den absoluten Privatpatienten-Status."
                },
                {
                    titel: "Kostenerstattung über den Höchstsätzen",
                    text: "Volle Deckung von Spezialbehandlungen durch Fachärzte, selbst wenn die Abrechnung die Regelsätze der Gebührenordnung (GOÄ/GOZ) übersteigt."
                },
                {
                    titel: "Heilpraktiker & Naturheilverfahren",
                    text: "Umfangreiche Erstattung für naturheilkundliche Behandlungen und alternative Heilmethoden ohne lästige Zuzahlungen."
                }
            ]
        },
        {
            id: "beihilfe",
            icon: FileText,
            titel: "Beihilfe & Heilfürsorge",
            untertitel: "Deine staatlichen Ansprüche optimal ausschöpfen",
            einleitung: "Die Beihilfe-Regelungen sind komplex und variieren je nach Dienstherr und Bundesland. Heilfürsorge-Empfänger (z. B. Polizei) benötigen zudem eine Anwartschaft.",
            image: beihilfeImg,
            punkte: [
                {
                    titel: "Sicherung des Gesundheitszustands",
                    text: "Über eine Anwartschaftsversicherung frierst du deinen Gesundheitszustand und dein Alter ein, um später ohne erneute Prüfung günstig in die PKV zu wechseln."
                },
                {
                    titel: "Diensthaftpflicht & Regress-Schutz",
                    text: "Schützt dich vor extremen finanziellen Rückforderungen (Regress) deines Dienstherrn bei Sach- oder Personenschäden im täglichen Dienst."
                },
                {
                    titel: "Bundesland-Spezifischer Check",
                    text: "Individuelle Analyse der Beihilfeverordnung deines Bundeslandes (z. B. Besonderheiten in Hessen oder Bayern) zur Vermeidung von Lücken."
                },
                {
                    titel: "Berücksichtigungsfähige Familienangehörige",
                    text: "Ehepartner und Kinder erhalten oft einen erhöhten Beihilfesatz (bis zu 80%). Wir binden deine Familie optimal und kostengünstig in das Konzept ein."
                }
            ]
        },
        {
            id: "referendariat",
            icon: GraduationCap,
            titel: "Schutz im Referendariat & Vorbereitungsdienst",
            untertitel: "Sorgloser und bezahlbarer Karrierestart",
            einleitung: "Im Referendariat profitierst du von extrem günstigen Anwärtertarifen der privaten Krankenversicherung. Wir vergleichen transparent alle Anbieter, um den besten Start zu sichern.",
            image: refImg,
            punkte: [
                {
                    titel: "Extrem reduzierte Anwärter-Beiträge",
                    text: "Die Versicherer bieten im Vorbereitungsdienst stark rabattierte Spezialtarife bei vollem, uneingeschränktem Leistungsumfang der PKV."
                },
                {
                    titel: "DU-Garantie für die Zukunft",
                    text: "Sichere dir schon im Referendariat den passenden Dienstunfähigkeits-Schutz mit der Garantie, diesen bei Verbeamtung auf Lebenszeit ohne Prüfung auszubauen."
                },
                {
                    titel: "Laufbahnspezifische Beratung",
                    text: "Egal ob Lehramt, Verwaltung, Justiz oder Polizei – wir stimmen dein Vorsorgekonzept exakt auf die spezifischen Risiken deines Dienstzweigs ab."
                },
                {
                    titel: "Transparenter Tarifvergleich",
                    text: "Wir analysieren alle beihilfefähigen Tarife am Markt neutral und transparent, um das stärkste Preis-Leistungs-Verhältnis für deinen Einstieg zu finden."
                }
            ]
        }
    ];

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
            <UnterseitenHero
                label="Beamtenversorgung & Beihilfe"
                titel="Sichere Karriere für"
                hervorhebung="Beamte & Anwärter"
                beschreibung="Beihilfe, Dienstunfähigkeit und Pension: Wir kennen die Besonderheiten deiner Laufbahn und begleiten dich transparent in deine sichere Zukunft."
                punkte={[
                    "Echte Dienstunfähigkeitsklausel",
                    "Beihilfekonforme PKV-Restkosten",
                    "Neutraler Tarifvergleich am Markt",
                ]}
                bild={beamteHeroImg}
                bildAlt="Beamte und Anwärter in einer modernen Verwaltung"
                bildKlasse="unterseiten-hero__bild--beamte"
                primaer={{ text: "Erstgespräch vereinbaren", href: "#kontakt" }}
                sekundaer={{ text: "Leistungen ansehen", href: "#dienstunfaehigkeit" }}
            />

            {/* ─── ORIENTIERUNGS- & EINSTIEGSSEKTION ─── */}
            <section className="py-24 bg-white border-b border-[#e2e8f0]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#1e5adb] font-extrabold text-xs uppercase tracking-widest block mb-3">Wegweiser & Orientierung</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a1930] tracking-tight mb-6">
                            Der Beihilfe-Kompass: Was wirklich wichtig ist
                        </h2>
                        <p className="text-[#4a5568] text-lg font-normal">
                            Bevor du dir die einzelnen Absicherungen im Detail anschaust, hilft dir unser 3-Säulen-Modell und unsere goldenen Regeln, um die richtige Reihenfolge und Struktur für deine Laufbahn zu verstehen.
                        </p>
                    </div>

                    {/* Das 3-Säulen-Modell */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
                            <span className="text-[#1e5adb] font-extrabold text-2xl mb-4 block">01</span>
                            <h3 className="text-xl font-extrabold text-[#0a1930] mb-3">Beihilfe ergänzen</h3>
                            <p className="text-xs text-[#4a5568] font-normal leading-relaxed">
                                Die Basis deiner Gesundheit. Da dein Dienstherr 50% bis 80% deiner Krankheitskosten trägt, ist eine beihilfekonforme private Krankenversicherung (PKV) deine wichtigste Säule. Sie deckt die Restkosten und garantiert dir Spitzenmedizin im Ernstfall.
                            </p>
                        </div>
                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
                            <span className="text-[#1e5adb] font-extrabold text-2xl mb-4 block">02</span>
                            <h3 className="text-xl font-extrabold text-[#0a1930] mb-3">Dienstzeit garantieren</h3>
                            <p className="text-xs text-[#4a5568] font-normal leading-relaxed">
                                Deine finanzielle Existenzsicherung. Besonders als Dienstanfänger oder während des Referendariats wirst du bei Dienstunfähigkeit oft ohne Pensionsansprüche entlassen. Eine echte Dienstunfähigkeitsversicherung (DU) ist daher existenziell.
                            </p>
                        </div>
                        <div className="bg-[#f8f9fc] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
                            <span className="text-[#1e5adb] font-extrabold text-2xl mb-4 block">03</span>
                            <h3 className="text-xl font-extrabold text-[#0a1930] mb-3">Laufbahn absichern</h3>
                            <p className="text-xs text-[#4a5568] font-normal leading-relaxed">
                                Der Schutz im täglichen Dienst. Ein kleiner Fehler im Dienstalltag kann zu massiven Regressforderungen deines Dienstherrn führen. Eine Diensthaftpflichtversicherung schützt dich vor existenziellen finanziellen Risiken.
                            </p>
                        </div>
                    </div>

                    {/* Die 3 Goldenen Regeln der Absicherung für Beamte */}
                    <div className="bg-[#0a1930] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute inset-0 bg-[#1e5adb]/10 blur-[100px] pointer-events-none" />
                        <h3 className="text-2xl font-extrabold mb-8 relative z-10">Die 3 goldenen Regeln für Beamte & Anwärter</h3>
                        <div className="grid md:grid-cols-3 gap-8 relative z-10">
                            <div>
                                <h4 className="font-extrabold text-base text-white mb-2">Rule #1: Beihilfe-Ergänzung ist Pflicht</h4>
                                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                                    Vertraue nicht blind darauf, dass dein Dienstherr alle Krankheitskosten übernimmt. Lücken bei Zahnersatz oder Spezialkliniken können extrem teuer werden. Schließe eine beihilfekonforme Restkosten-PKV ab.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-base text-white mb-2">Rule #2: Echte Dienstunfähigkeitsklausel</h4>
                                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                                    Eine normale Berufsunfähigkeitsversicherung (BU) nützt dir im Beamtenstatus oft nichts. Achte zwingend darauf, dass der Versicherungsschutz eine echte, unkonditionierte Dienstunfähigkeitsklausel (DU) enthält.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-base text-white mb-2">Rule #3: Anwartschaft frühzeitig sichern</h4>
                                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                                    Sichere dir als Referendar oder Anwärter über eine kostengünstige Anwartschaftsversicherung deinen Gesundheitszustand. Dadurch kannst du später ohne erneute Gesundheitsprüfung in den optimalen Tarif wechseln.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── INTERAKTIVER LÜCKEN-CHECK ─── */}
            <ScrollReveal direction="up">
                <BedarfsRechner modus="beamte" />
            </ScrollReveal>

            {/* ─── DETALLIERTE PRODUKT-SEKTIONEN (Abwechselndes Apple-Style Layout) ─── */}
            <section className="bg-white">
                {produkte.map((p, idx) => {
                    const istGerade = idx % 2 === 0;
                    return (
                        <div 
                            key={p.id} 
                            id={p.id} // Anker-ID für das direkte Scrollen!
                            className={`py-28 border-b border-[#e2e8f0] scroll-mt-28 relative ${
                                istGerade ? 'bg-white' : 'bg-hintergrund-alt'
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
                                                    alt={`${p.titel} für Beamte - Sven Kegler Online-Makler`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                />
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
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-marke-primaer text-white text-sm font-semibold rounded-xl hover:bg-marke-primaer-hover transition-all shadow-md hover:shadow-lg"
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

            {/* ─── NATIVE MODULE IM SPEZIFISCHEN DESIGN ─── */}
            <ScrollReveal direction="up">
                <FehlerBereich />
            </ScrollReveal>

            <ScrollReveal direction="up">
                <SoArbeiteIch hintergrund="weiss" />
            </ScrollReveal>

         

            <ScrollReveal direction="up">
                <FAQ />
            </ScrollReveal>

            <ScrollReveal direction="up">
                <KontaktBereich hintergrund="hellblau" />
            </ScrollReveal>
        </main>
    );
};

export default Beamte;
