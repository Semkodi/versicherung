import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/bilder/logo_simply.png';
import vemaLogo from '@/assets/bilder/vema_logo.png';

const Fusszeile = () => {
    return (
        <footer className="bg-white border-t border-gray-100 relative overflow-hidden">
            {/* Footer Navigation */}
            <div className="bg-[#0a1930] text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                        {/* Logo Column */}
                        <div className="lg:col-span-2">
                            <Link to="/" className="block mb-6 w-fit">
                                <img src={logo} alt="simply switch Logo" className="h-16 md:h-20 w-auto object-contain brightness-0 invert" loading="lazy" />
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                Dein transparenter Versicherungsmakler für Beamte und Privatkunden. Persönlich. Digital. Einfach.
                            </p>
                            <div className="flex gap-4 mt-6">
                                <a
                                    href="https://www.instagram.com/simply_switch_sven_kegler/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-marke-highlight/10 border border-marke-highlight/20 flex items-center justify-center text-marke-highlight hover:bg-marke-highlight hover:text-[#0a1930] hover:scale-110 transition-all duration-300"
                                    aria-label="Instagram von Simply Switch"
                                >
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://www.facebook.com/SvenKegler86/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-marke-highlight/10 border border-marke-highlight/20 flex items-center justify-center text-marke-highlight hover:bg-marke-highlight hover:text-[#0a1930] hover:scale-110 transition-all duration-300"
                                    aria-label="Facebook von Sven Kegler"
                                >
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/sven-kegler-5b3883272/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-marke-highlight/10 border border-marke-highlight/20 flex items-center justify-center text-marke-highlight hover:bg-marke-highlight hover:text-[#0a1930] hover:scale-110 transition-all duration-300"
                                    aria-label="LinkedIn von Sven Kegler"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div>
                            <h4 className="text-base font-bold mb-5 text-white">Für Privatkunden</h4>
                            <ul className="space-y-3.5 text-gray-400 text-sm">
                                <li><Link to="/privatkunden#haftpflicht" className="hover:text-white transition-colors">Privathaftpflicht</Link></li>
                                <li><Link to="/privatkunden#hausrat" className="hover:text-white transition-colors">Hausratversicherung</Link></li>
                                <li><Link to="/privatkunden" className="hover:text-white transition-colors">Wohngebäudeversicherung</Link></li>
                                <li><Link to="/privatkunden" className="hover:text-white transition-colors">Unfallversicherung</Link></li>
                                <li><Link to="/privatkunden" className="hover:text-white transition-colors">Alle Versicherungen</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base font-bold mb-5 text-white">Für Beamte</h4>
                            <ul className="space-y-3.5 text-gray-400 text-sm">
                                <li><Link to="/beamte#krankenversicherung" className="hover:text-white transition-colors">Private Krankenversicherung</Link></li>
                                <li><Link to="/beamte#beihilfe" className="hover:text-white transition-colors">Beihilfe & Heilfürsorge</Link></li>
                                <li><Link to="/beamte#dienstunfaehigkeit" className="hover:text-white transition-colors">Dienstunfähigkeit</Link></li>
                                <li><Link to="/beamte#referendariat" className="hover:text-white transition-colors">Referendariat</Link></li>
                                <li><Link to="/beamte" className="hover:text-white transition-colors">Alle Versicherungen</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base font-bold mb-5 text-white">Unternehmen</h4>
                            <ul className="space-y-3.5 text-gray-400 text-sm">
                                <li><Link to="/ueber-uns" className="hover:text-white transition-colors">Über uns</Link></li>
                                <li><Link to="/termin-vereinbaren" className="hover:text-white transition-colors">Kontakt</Link></li>
                                <li><Link to="/schaden-melden" className="text-marke-highlight hover:text-white hover:underline transition-all duration-300 font-semibold">⚠️ Schaden melden</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-sm">
                        <p>&copy; {new Date().getFullYear()} simply switch Versicherungsmakler</p>

                        <div className="flex gap-6">
                            <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
                            <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
                            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-gray-400">Mitglied der</span>
                            <a
                                href="https://www.vema-eg.de/?coib_submitted=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="VEMA Maklergenossenschaft (öffnet in neuem Tab)"
                            >
                                <img
                                    src={vemaLogo}
                                    alt="VEMA Maklergenossenschaft"
                                    className="h-9 md:h-10 w-auto object-contain bg-white rounded-md px-3 py-2 hover:opacity-90 transition-opacity"
                                    loading="lazy"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Fusszeile;
