import { ArrowLeft } from 'lucide-react';

const Impressum = () => {
    return (
        <div className="min-h-screen bg-hintergrund text-text-haupt font-sans pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href="/" className="inline-flex items-center gap-2 text-marke-primaer hover:text-marke-sekundaer font-medium mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Zurück zur Startseite
                </a>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-text-haupt">Impressum</h1>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 prose prose-lg max-w-none text-text-neben">
                    <h2 className="text-2xl font-bold text-text-haupt mb-4">Angaben gemäß § 5 TMG sowie Informationspflichten gemäß § 15 VersVermV und § 18 Abs. 2 MStV</h2>
                    <p className="mb-6 leading-relaxed">
                        simply switch Sven Kegler Versicherungsmakler<br />
                        Kirchstraße 10<br />
                        65627 Elbtal
                    </p>

                    <p className="mb-8">
                        <strong>Telefon:</strong> 064362869917<br />
                        <strong>E-Mail:</strong> <a href="mailto:info@simply-switch.de" className="text-marke-primaer hover:underline">info@simply-switch.de</a>
                    </p>

                    <h3 className="text-xl font-bold text-text-haupt mt-8 mb-4">Registereintrag</h3>
                    <p className="mb-6">
                        Registriert beim Amtsgericht in: Amtsgericht Limburg an der Lahn<br />
                        Steuernummer: 030/834/31485
                    </p>

                    <h3 className="text-xl font-bold text-text-haupt mt-8 mb-4">Berufsbezeichnung und Aufsichtsbehörden</h3>
                    <p className="mb-6">
                        <strong>Branche / Tätigkeit:</strong> Versicherungsmakler<br />
                        <strong>Staat, der die Berufsbezeichnung verliehen hat:</strong> Deutschland<br />
                        <strong>Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV:</strong> simply switch Sven Kegler Versicherungsmakler
                    </p>

                    <p className="mb-6">
                        <strong>Zuständiges Finanzamt:</strong><br />
                        Finanzamt Limburg<br />
                        Walderdorffstraße 11<br />
                        65549 Limburg an der Lahn<br />
                        Telefon (Zentrale): 06431-2080<br />
                        Internetseite: <a href="https://finanzamt.hessen.de/limburg-weilburg" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">finanzamt.hessen.de/limburg-weilburg</a>
                    </p>

                    <p className="mb-6">
                        <strong>Behörde für die Erlaubnis nach § 34d Abs. 1 Z. 2 GewO:</strong><br />
                        IHK Limburg<br />
                        Walderdorffstraße 7<br />
                        65549 Limburg an der Lahn<br />
                        Telefon (Zentrale): 06431-2100<br />
                        Internetseite: <a href="https://www.ihk.de/limburg" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">www.ihk.de/limburg</a>
                    </p>

                    <p className="mb-6">
                        <strong>Behörde für die Aufsicht nach § 34d Abs. 1 Z. 2 GewO:</strong><br />
                        IHK Limburg<br />
                        Walderdorffstraße 7<br />
                        65549 Limburg an der Lahn<br />
                        Telefon (Zentrale): 06431-2100<br />
                        Internetseite: <a href="https://www.ihk.de/limburg" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">www.ihk.de/limburg</a>
                    </p>

                    <p className="mb-6">
                        <strong>Status:</strong><br />
                        Zugelassener Versicherungsmakler mit Erlaubnis nach § 34d Abs. 1 Z. 2 GewO mit der Registernummer D-YKID-VFNYI-97
                    </p>

                    <p className="mb-6">
                        <strong>Behörde für die Erlaubnis und Aufsicht nach § 34c Abs. 1 GewO:</strong><br />
                        Kreisverwaltung Limburg – Weilburg<br />
                        Schiede 43<br />
                        65549 Limburg an der Lahn<br />
                        Telefon (Zentrale): 06431-2960<br />
                        Internetseite: <a href="https://www.landkreis-limburg-weilburg.de" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">www.landkreis-limburg-weilburg.de</a>
                    </p>

                    <h3 className="text-xl font-bold text-text-haupt mt-8 mb-4">Vermittlerregister</h3>
                    <p className="mb-6">
                        Die Eintragung im Vermittlerregister kann wie folgt überprüft werden:<br />
                        DIHK | Deutsche Industrie- und Handelskammer<br />
                        Breite Straße 29<br />
                        D-10178 Berlin<br />
                        Telefon +49 30 20308 0<br />
                        E-Mail: <a href="mailto:info@dihk.de" className="text-marke-primaer hover:underline">info@dihk.de</a><br />
                        <a href="https://www.dihk.de/" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">www.dihk.de</a><br />
                        Registerabruf unter <a href="https://www.vermittlerregister.info/" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">www.vermittlerregister.info</a> oder telefonisch unter 0180-6005850 (0,20 €/Anruf)
                    </p>

                    <h3 className="text-xl font-bold text-text-haupt mt-8 mb-4">Schlichtungsstellen</h3>
                    <p className="mb-6">
                        <strong>Beschwerdemanagement:</strong><br />
                        Bei Beschwerden können Sie sich immer direkt wenden an:<br />
                        simply switch Sven Kegler Versicherungsmakler<br />
                        Kirchstraße 10<br />
                        65627 Elbtal<br />
                        Telefon: 064362869917<br />
                        E-Mail: <a href="mailto:info@simply-switch.de" className="text-marke-primaer hover:underline">info@simply-switch.de</a>
                    </p>
                    <p className="mb-6">
                        Wir sind gemäß § 17 Abs. 4 der Versicherungsvermittlungsverordnung verpflichtet am Streitbeilegungsverfahren vor folgenden Verbraucherschlichtungsstellen teilzunehmen:<br /><br />
                        Versicherungsombudsmann e.V., Postfach 08 06 32, 10006 Berlin<br />
                        Weitere Informationen: <a href="https://www.versicherungsombudsmann.de" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">www.versicherungsombudsmann.de</a><br /><br />
                        Ombudsmann Private Kranken- und Pflegeversicherung, Postfach 06 02 22, 10052 Berlin<br />
                        Weitere Informationen: <a href="https://www.pkv-ombudsmann.de" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">www.pkv-ombudsmann.de</a><br /><br />
                        Schlichtungsstelle für gewerbliche Versicherungs- und Anlage- und Kreditvermittlung<br />
                        Glockengießerwall 2, 20095 Hamburg
                    </p>

                    <h3 className="text-xl font-bold text-text-haupt mt-8 mb-4">Haftung für Inhalte und Links</h3>
                    <p className="mb-6">
                        <strong>1. Inhalt des Onlineangebotes</strong><br />
                        Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche, die durch die Nutzung der dargebotenen Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
                    </p>
                    <p className="mb-6">
                        <strong>2. Verweise und Links</strong><br />
                        Bei direkten oder indirekten Verweisen auf fremde Webseiten haftet der Autor nur, wenn er von den Inhalten gesetzwidriger Natur Kenntnis hat und es technisch möglich und zumutbar wäre, die Nutzung zu verhindern.
                    </p>

                    <h3 className="text-xl font-bold text-text-haupt mt-8 mb-4">Urheber- und Kennzeichenrecht</h3>
                    <p className="mb-6">
                        Das Copyright für veröffentlichte, vom Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten. Eine Vervielfältigung oder Verwendung solcher Elemente in anderen Publikationen ist ohne ausdrückliche Zustimmung nicht gestattet.
                    </p>

                    <h3 className="text-xl font-bold text-text-haupt mt-8 mb-4">Nachhaltigkeitsrisiken (ESG)</h3>
                    <p className="mb-6">
                        Der Versicherungsmakler verfolgt keine gezielte Nachhaltigkeitsstrategie, angebotene Produkte können aber nachhaltig sein. Im Rahmen der Auswahl von Gesellschaften und Produkten berücksichtigen wir die etwaigen Nachhaltigkeitsaspekte nicht gezielt. Die Vergütung für die Vermittlung von Produkten wird grundsätzlich nicht von den Nachhaltigkeitsrisiken beeinflusst.
                    </p>

                    <p className="mb-6 mt-12 text-sm text-gray-500">
                        Online-Streitbeilegung (Art. 14 Abs. 1 ODR-Verordnung): Die Europäische Kommission stellt unter <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">ec.europa.eu/consumers/odr/</a> eine Plattform zur Online-Streitbeilegung bereit.<br />
                        Konzeption | Entwicklung | Redaktion: <a href="https://www.maklerhomepage.net" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">www.maklerhomepage.net</a> (Mit rechtlicher Unterstützung durch die Kanzlei Jöhnke & Reichow Rechtsanwälte)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Impressum;
