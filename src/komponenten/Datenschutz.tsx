import { ArrowLeft } from 'lucide-react';

const Datenschutz = () => {
    return (
        <div className="min-h-screen bg-hintergrund text-text-haupt font-sans pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href="/" className="inline-flex items-center gap-2 text-marke-primaer hover:text-marke-sekundaer font-medium mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Zurück zur Startseite
                </a>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-text-haupt">Datenschutzerklärung</h1>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 prose prose-lg max-w-none text-text-neben space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-text-haupt mb-4 border-b pb-2">1. Datenschutz auf einen Blick</h2>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Allgemeine Hinweise</h3>
                        <p className="leading-relaxed">
                            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                        </p>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Datenerfassung auf unserer Website</h3>
                        <p className="leading-relaxed">
                            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                        </p>
                        <p className="leading-relaxed mt-4">
                            <strong>Wie erfassen wir Ihre Daten?</strong><br />
                            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                        </p>
                        <p className="leading-relaxed mt-4">
                            <strong>Wofür nutzen wir Ihre Daten?</strong><br />
                            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                        </p>
                        <p className="leading-relaxed mt-4">
                            <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
                            Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                        </p>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Analyse-Tools und Tools von Drittanbietern</h3>
                        <p className="leading-relaxed">
                            Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym. Sie können dieser Analyse widersprechen.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-2xl font-bold text-text-haupt mb-4 border-b pb-2">2. Allgemeine Hinweise und Pflichtinformationen</h2>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Datenschutz</h3>
                        <p className="leading-relaxed">
                            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Wir weisen darauf hin, dass die Datenübertragung im Internet Sicherheitslücken aufweisen kann.
                        </p>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                        <p className="leading-relaxed">
                            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns.
                        </p>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Widerspruchsrecht gegen die Datenerhebung (Art. 21 DSGVO)</h3>
                        <p className="leading-relaxed">
                            Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen. Dies gilt auch für Direktwerbung und Profiling.
                        </p>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
                        <p className="leading-relaxed">
                            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu.
                        </p>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Recht auf Datenübertragbarkeit</h3>
                        <p className="leading-relaxed">
                            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
                        </p>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">SSL- bzw. TLS-Verschlüsselung</h3>
                        <p className="leading-relaxed">
                            Diese Seite nutzt aus Sicherheitsgründen eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von “http://” auf “https://” wechselt.
                        </p>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Auskunft, Einschränkung, Sperrung und Löschung</h3>
                        <p className="leading-relaxed">
                            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten Daten. Zudem haben Sie unter bestimmten Umständen (z.B. Bestreitung der Richtigkeit) das Recht, die Einschränkung der Datenverarbeitung zu verlangen.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-2xl font-bold text-text-haupt mb-4 border-b pb-2">3. Datenerfassung auf unserer Website</h2>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Cookies</h3>
                        <p className="leading-relaxed">
                            Die Internetseiten verwenden teilweise so genannte Cookies. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert. Sie richten keinen Schaden an. Die meisten sind “Session-Cookies”, die nach dem Ende des Besuchs gelöscht werden. Cookies, die technisch notwendig sind (berechtigtes Interesse), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert.
                        </p>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Kontaktformular</h3>
                        <p className="leading-relaxed">
                            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben inklusive der Kontaktdaten zwecks Bearbeitung bei uns gespeichert (Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO). Wir geben diese nicht ohne Ihre Einwilligung weiter.
                        </p>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Anfrage per E-Mail oder Telefon</h3>
                        <p className="leading-relaxed">
                            Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage bei uns gespeichert und verarbeitet. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO zur Erfüllung vertraglicher/vorvertraglicher Maßnahmen oder aufgrund berechtigten Interesses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text-haupt mb-4 border-b pb-2">4. Plugins und Tools</h2>

                        <h3 className="text-xl font-bold text-text-haupt mt-6 mb-3">Vimeo</h3>
                        <p className="leading-relaxed">
                            Unsere Website nutzt Plugins des Videoportals Vimeo. Anbieter ist die Vimeo Inc., 555 West 18th Street, New York, New York 10011, USA. Beim Besuch unserer mit Vimeo ausgestatteten Seiten wird eine Verbindung zu Vimeo-Servern hergestellt. Dies stellt ein berechtigtes Interesse i.S.d. Art. 6 Abs. 1 lit. f DSGVO dar. Weitere Informationen finden Sie in der <a href="https://vimeo.com/privacy" target="_blank" rel="noopener noreferrer" className="text-marke-primaer hover:underline">Datenschutzerklärung von Vimeo</a>.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Datenschutz;
