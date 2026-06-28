import { Link } from 'react-router-dom';
import { usePageMetadata } from '@/hooks/usePageMetadata';
import { Home, ArrowRight, PhoneCall } from 'lucide-react';

const METADATA = {
    title: "404 – Seite nicht gefunden | simply switch",
    description: "Diese Seite existiert nicht. Zurück zur Startseite von simply switch Versicherungsmakler Sven Kegler.",
};

const NotFound = () => {
    usePageMetadata(METADATA);

    return (
        <main className="min-h-[80vh] bg-[#f8f9fc] flex items-center justify-center px-6 py-24">
            <div className="text-center max-w-lg">
                <div className="text-[9rem] font-extrabold text-[#0253ee]/8 leading-none select-none mb-0">
                    404
                </div>

                <div className="w-16 h-1 bg-marke-primaer rounded-full mx-auto mb-8 -mt-4" />

                <h1 className="text-3xl md:text-4xl font-extrabold text-[#020A39] mb-4 tracking-tight">
                    Seite nicht gefunden
                </h1>
                <p className="text-[#4b5a8a] text-base md:text-lg mb-10 leading-relaxed">
                    Die gesuchte Seite existiert leider nicht. Sie wurde möglicherweise verschoben oder gelöscht.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-marke-primaer text-white font-semibold rounded-xl hover:bg-marke-primaer-hover transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Home className="w-4 h-4" />
                        Zur Startseite
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        to="/termin-vereinbaren"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#020A39] font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm hover:-translate-y-0.5"
                    >
                        <PhoneCall className="w-4 h-4" />
                        Kontakt aufnehmen
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
