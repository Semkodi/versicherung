import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/bilder/logo_simply.png';

const Fusszeile = () => {
    return (
        <footer className="bg-white border-t border-gray-100 relative overflow-hidden">
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
                                <a 
                                    href="https://www.instagram.com/simply_switch_sven_kegler/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-10 h-10 rounded-full bg-marke-highlight/10 border border-marke-highlight/20 flex items-center justify-center text-marke-highlight hover:bg-marke-highlight hover:text-[#0a1930] hover:scale-110 transition-all duration-300"
                                    aria-label="Instagram von Simply Switch"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a 
                                    href="https://www.facebook.com/SvenKegler86/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-10 h-10 rounded-full bg-marke-highlight/10 border border-marke-highlight/20 flex items-center justify-center text-marke-highlight hover:bg-marke-highlight hover:text-[#0a1930] hover:scale-110 transition-all duration-300"
                                    aria-label="Facebook von Sven Kegler"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a 
                                    href="https://www.linkedin.com/in/sven-kegler-5b3883272/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-10 h-10 rounded-full bg-marke-highlight/10 border border-marke-highlight/20 flex items-center justify-center text-marke-highlight hover:bg-marke-highlight hover:text-[#0a1930] hover:scale-110 transition-all duration-300"
                                    aria-label="LinkedIn von Sven Kegler"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
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
                                <li><Link to="/schaden-melden" className="text-marke-highlight hover:text-white hover:underline transition-all duration-300 font-semibold">⚠️ Schaden melden</Link></li>
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
                        
                        
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Fusszeile;
