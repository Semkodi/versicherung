import { ArrowLeft, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const Cookies = () => {
    usePageMetadata({
        title: "Cookie-Richtlinie | simply switch Versicherungsmakler Sven Kegler",
        description: "Cookie-Richtlinie für simply switch Sven Kegler Versicherungsmakler. Erfahren Sie, welche Cookies wir verwenden und wie Sie diese verwalten."
    });

    return (
        <div className="min-h-screen bg-hintergrund-alt text-text-haupt font-sans pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center gap-2 text-marke-primaer hover:text-marke-sekundaer font-medium mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Zurück zur Startseite
                </Link>

                <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-marke-primaer/10 rounded-2xl flex items-center justify-center">
                        <Cookie className="w-7 h-7 text-marke-primaer" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-haupt">Cookie-Richtlinie</h1>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 prose prose-lg max-w-none text-text-neben space-y-8">
                    
                    <section>
                        <h2 className="text-2xl font-bold text-text-haupt mb-4 border-b pb-2">Was sind Cookies?</h2>
                        <p className="leading-relaxed">
                            Cookies sind kleine Textdateien, die von Websites verwendet werden, um die Benutzererfahrung effizienter zu gestalten. Das Gesetz besagt, dass wir Cookies auf Ihrem Gerät speichern können, wenn diese für den Betrieb dieser Seite unbedingt notwendig sind. Für alle anderen Arten von Cookies benötigen wir Ihre Erlaubnis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text-haupt mb-4 border-b pb-2">Wie wir Cookies verwenden</h2>
                        <p className="leading-relaxed">
                            Diese Seite verwendet unterschiedliche Arten von Cookies. Einige Cookies werden von Drittparteien platziert, die auf unseren Seiten erscheinen.
                        </p>
                        
                        <div className="grid gap-6 mt-6">
                            <div className="p-6 bg-hintergrund-alt rounded-2xl border border-gray-100">
                                <h3 className="text-lg font-bold text-text-haupt mb-2">Notwendige Cookies</h3>
                                <p className="text-sm">
                                    Notwendige Cookies helfen dabei, eine Website nutzbar zu machen, indem sie Grundfunktionen wie Seitennavigation und Zugriff auf sichere Bereiche der Website ermöglichen. Die Website kann ohne diese Cookies nicht richtig funktionieren.
                                </p>
                            </div>
                            
                            <div className="p-6 bg-hintergrund-alt rounded-2xl border border-gray-100">
                                <h3 className="text-lg font-bold text-text-haupt mb-2">Statistik-Cookies</h3>
                                <p className="text-sm">
                                    Statistik-Cookies helfen Website-Besitzern zu verstehen, wie Besucher mit Webseiten interagieren, indem Informationen anonym gesammelt und gemeldet werden.
                                </p>
                            </div>
                            
                            <div className="p-6 bg-hintergrund-alt rounded-2xl border border-gray-100">
                                <h3 className="text-lg font-bold text-text-haupt mb-2">Marketing-Cookies</h3>
                                <p className="text-sm">
                                    Marketing-Cookies werden verwendet, um Besuchern auf Webseiten zu folgen. Die Absicht ist, Anzeigen zu zeigen, die relevant und ansprechend für den einzelnen Benutzer sind und daher wertvoller für Publisher und werbetreibende Drittparteien sind.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text-haupt mb-4 border-b pb-2">Ihre Einstellungen ändern</h2>
                        <p className="leading-relaxed">
                            Sie können Ihre Cookie-Einstellungen jederzeit über den Button in der unteren Ecke unserer Website ändern oder widerrufen. Alternativ können Sie Cookies in den Einstellungen Ihres Webbrowsers deaktivieren oder löschen.
                        </p>
                    </section>

                    <section className="bg-marke-primaer/5 p-8 rounded-3xl border border-marke-primaer/10">
                        <h2 className="text-xl font-bold text-text-haupt mb-4">Rechtliche Grundlage</h2>
                        <p className="text-sm italic">
                            Die Verarbeitung von Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse bei notwendigen Cookies) oder Art. 6 Abs. 1 lit. a DSGVO (Einwilligung bei allen anderen Cookies).
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Cookies;
