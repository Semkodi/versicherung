import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/bilder/logo_simply.png';

const FaqElement = ({ frage, antwort }: { frage: string, antwort: string }) => {
    const [offen, setOffen] = useState(false);

    return (
        <div className={`border-b border-gray-100 transition-colors ${offen ? 'border-[#1e5adb]/20' : ''}`}>
            <button
                className="w-full text-left flex justify-between items-start py-5 gap-4 focus:outline-none group"
                onClick={() => setOffen(!offen)}
            >
                <span className={`font-semibold text-base pr-4 leading-snug transition-colors ${offen ? 'text-[#0a1930]' : 'text-[#2d3748] group-hover:text-[#0a1930]'}`}>
                    {frage}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${offen ? 'bg-[#0a1930] text-white' : 'bg-[#f8f9fc] text-[#718096] group-hover:bg-[#0a1930]/10'}`}>
                    {offen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${offen ? 'max-h-64 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                <p className="text-[#4a5568] font-light text-sm leading-relaxed pl-4 border-l-2 border-[#1e5adb]">
                    {antwort}
                </p>
            </div>
        </div>
    );
};

const Fusszeile = () => {
    const faqDaten = [
        {
            frage: "Wie viel kostet die Beratung?",
            antwort: "Als unabhängiger Berater werde ich von den Versicherungsgesellschaften bezahlt. Für dich ist mein Service vollkommen kostenlos. Ich berate dich umfassend dazu, was für dich sinnvoll ist und dir wirklich etwas bringt."
        },
        {
            frage: "Was passiert mit meiner Dienstunfähigkeitsversicherung, wenn ich nicht weiter verbeamtet werde?",
            antwort: "Solltest du wieder zurück in ein Angestelltenverhältnis gehen, wandle ich die Dienstunfähigkeitsversicherung für dich einfach in eine Berufsunfähigkeitsversicherung um. So bist du immer optimal abgesichert."
        },
        {
            frage: "Kann ich mich auch später noch gegen Dienstunfähigkeit versichern?",
            antwort: "Grundsätzlich ja, sofern es dein Gesundheitszustand zulässt. Solltest du aber während deiner Anwärterzeit oder der Verbeamtung auf Probe dienstunfähig werden, bekommst du ohne Versicherung keine Leistungen vom Dienstherren oder vom Staat."
        }
    ];

    return (
        <footer className="bg-white border-t border-gray-100 relative overflow-hidden">
            {/* CTA Banner Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
                <div className="bg-[#0a1930] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1e5adb] rounded-full blur-[150px] opacity-20 pointer-events-none" />
                    
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-[#1e5adb]/20 border border-[#1e5adb]/30 items-center justify-center flex-shrink-0">
                            <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-white">
                                Bereit für die richtige Absicherung?
                            </h2>
                            <p className="text-gray-400 font-light text-sm md:text-base max-w-lg">
                                Lass uns gemeinsam herausfinden, welche Versicherungen wirklich zu dir passen. Kostenlos & unverbindlich.
                            </p>
                        </div>
                    </div>

                    <a
                        href="#kontakt"
                        className="flex-shrink-0 w-full md:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 bg-white text-[#0a1930] rounded-xl font-bold text-base hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 relative z-10"
                    >
                        Jetzt Beratung anfragen
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="bg-[#0a1930] text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
                        {/* Logo Column */}
                        <div className="lg:col-span-2">
                            <a href="#" className="block mb-6 w-fit">
                                <img src={logo} alt="simply switch Logo" className="h-12 w-auto object-contain brightness-0 invert" />
                            </a>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
                                Dein unabhängiger Versicherungsmakler für Beamte, Privatkunden und Selbstständige. Persönlich. Digital. Einfach.
                            </p>
                            <div className="flex gap-4 mt-6">
                                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1e5adb] transition-colors"><span className="text-xs">IG</span></a>
                                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1e5adb] transition-colors"><span className="text-xs">FB</span></a>
                                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1e5adb] transition-colors"><span className="text-xs">LI</span></a>
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div>
                            <h4 className="text-sm font-bold mb-5 text-white">Für Privatkunden</h4>
                            <ul className="space-y-3 text-gray-400 text-xs">
                                <li><a href="#" className="hover:text-white transition-colors">Privathaftpflicht</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Hausratversicherung</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Wohngebäudeversicherung</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Unfallversicherung</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Alle Versicherungen</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold mb-5 text-white">Für Beamte</h4>
                            <ul className="space-y-3 text-gray-400 text-xs">
                                <li><a href="#" className="hover:text-white transition-colors">Private Krankenversicherung</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Beihilfe & Heilfürsorge</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Dienstunfähigkeit</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Referendariat</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Alle Versicherungen</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold mb-5 text-white">Für Selbstständige</h4>
                            <ul className="space-y-3 text-gray-400 text-xs">
                                <li><a href="#" className="hover:text-white transition-colors">Berufsunfähigkeit</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Betriebliche Altersvorsorge</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Haftpflichtversicherung</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Rechtsschutzversicherung</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Alle Versicherungen</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold mb-5 text-white">Unternehmen</h4>
                            <ul className="space-y-3 text-gray-400 text-xs">
                                <li><a href="/#ueber-mich" className="hover:text-white transition-colors">Über uns</a></li>
                                <li><a href="/#kontakt" className="hover:text-white transition-colors">Kontakt</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Karriere</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-xs">
                        <p>&copy; {new Date().getFullYear()} simply switch Versicherungsmakler</p>
                        
                        <div className="flex gap-6">
                            <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
                            <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
                            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                        </div>
                        
                        <div className="flex gap-4 items-center">
                            {/* Dummy Trust Badges for visual */}
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-[8px] text-white">TÜV</div>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-[8px] text-white">SSL</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Fusszeile;
