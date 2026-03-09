import { Smartphone, BellRing, FileCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import handyImg from '../assets/handy_img.png';

const AppVorteile = () => {
    const vorteile = [
        {
            titel: "Alles an einem Ort",
            text: "Versicherungsschein, Beitragsrechnungen oder Leistungsabrechnungen – dokumentiere und verwalte alles digital und papierlos auf deinem Smartphone.",
            icon: <FileCheck className="w-6 h-6 text-marke-primaer" />
        },
        {
            titel: "Schadensmeldung per Klick",
            text: "Ein Schaden ist passiert? Melde ihn direkt aus der App heraus, lade Fotos hoch und verfolge den Bearbeitungsstatus in Echtzeit.",
            icon: <Smartphone className="w-6 h-6 text-marke-primaer" />
        },
        {
            titel: "Automatische Erinnerungen",
            text: "Nie wieder Fristen verpassen. Die App erinnert dich an Wechselmöglichkeiten, Kündigungsfristen und regelmäßige Überprüfungen.",
            icon: <BellRing className="w-6 h-6 text-marke-primaer" />
        },
        {
            titel: "100% DSGVO-Konform",
            text: "Deine sensiblen Daten sind bei uns sicher. Höchste Verschlüsselungsstandards garantieren den Schutz deiner Informationen.",
            icon: <ShieldCheck className="w-6 h-6 text-marke-primaer" />
        }
    ];

    return (
        <section className="py-24 bg-hintergrund relative overflow-hidden">
            {/* Hintergrund */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-marke-primaer/[0.04] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Linke Seite – Handy-Mockup */}
                    <div className="order-2 lg:order-1 flex justify-center">
                        <div className="relative">
                            {/* Äußerer Glow */}
                            <div className="absolute inset-0 bg-marke-primaer/20 rounded-[3rem] blur-2xl -z-10 scale-95" />

                            {/* Handy-Rahmen */}
                            <div className="relative w-[240px] mx-auto aspect-[9/19] bg-marke-sekundaer rounded-[2.5rem] p-1.5 shadow-[0_30px_80px_rgba(2,10,57,0.4)]">
                                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                                    <img src={handyImg} alt="Kunden App Vorschau" className="w-full h-full object-cover object-top" />
                                </div>
                                {/* Lautsprecher-Kerbe */}
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-black/20 rounded-full" />
                            </div>

                            {/* Schwebendes Notification-Badge */}
                            <div className="absolute -right-12 top-1/3 bg-white border border-gray-100 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3.5s' }}>
                                <div className="w-9 h-9 bg-marke-sekundaer/10 rounded-xl flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-marke-sekundaer" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-haupt">Dokument gespeichert</p>
                                    <p className="text-[10px] text-text-neben">Gerade eben</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rechte Seite – Vorteile */}
                    <div className="order-1 lg:order-2">
                        <span className="text-marke-primaer text-sm font-bold tracking-widest uppercase mb-3 block">100% Digital</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-text-haupt leading-tight">
                            Dein Versicherungsordner<br />
                            <span className="text-marke-primaer">für die Hosentasche</span>
                        </h2>
                        <p className="text-text-neben text-lg font-light mb-10 leading-relaxed">
                            Lästige Papierstapel waren gestern. Wir rüsten dich mit modernster Technologie aus, damit du Dokumente niemals suchen musst.
                        </p>

                        {/* Feature-Grid */}
                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                            {vorteile.map((vorteil, idx) => (
                                <div key={idx} className="group flex gap-4 p-5 rounded-xl border border-gray-100 bg-hintergrund-alt hover:border-marke-primaer/20 hover:bg-marke-primaer/5 transition-all duration-300">
                                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-marke-primaer/10 flex items-center justify-center group-hover:bg-marke-primaer/20 transition-colors">
                                        {vorteil.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-text-haupt mb-1">{vorteil.titel}</h4>
                                        <p className="text-text-neben text-xs font-light leading-relaxed">{vorteil.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a
                            href="https://login.simplr.de/#/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-marke-sekundaer text-white rounded-xl font-bold hover:bg-marke-akzent transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Kunden-App ansehen
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AppVorteile;
