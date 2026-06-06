import { Link, useLocation } from 'react-router-dom';
import { Calendar, PhoneCall, AlertTriangle, Upload } from 'lucide-react';

const FormularNav = () => {
    const location = useLocation();
    const pfad = location.pathname;

    const navItems = [
        {
            title: "Termin vereinbaren",
            link: "/termin-vereinbaren",
            btnText: "Termin vereinbaren",
            icon: Calendar
        },
        {
            title: "Rückruf anfordern",
            link: "/rueckruf-anfordern",
            btnText: "Rückruf anfordern",
            icon: PhoneCall
        },
        {
            title: "Schadenmeldung",
            link: "/schaden-melden",
            btnText: "Schadenmeldung",
            icon: AlertTriangle
        },
        {
            title: "Änderungen mitteilen",
            link: "/aenderungen-mitteilen",
            btnText: "Änderungen mitteilen",
            icon: Upload
        }
    ];

    // Filtere das Element für das aktuelle Formular heraus
    const gefilterteItems = navItems.filter(item => item.link !== pfad);

    return (
        <section className="py-20 bg-white border-t border-gray-150">
            <div className="max-w-[1650px] mx-auto px-6 lg:px-12 text-center">
                <h3 className="text-2xl md:text-3xl font-normal text-[#020A39] mb-12 tracking-tight">
                    Sie suchen etwas anderes?
                </h3>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {gefilterteItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={index}
                                to={item.link}
                                className="bg-[#f8f9fc] hover:bg-[#f0f4fc] transition-all duration-300 rounded-lg p-10 flex flex-col items-center justify-center min-h-[200px] group cursor-pointer"
                            >
                                <div className="mb-4 text-[#0253ee] group-hover:scale-105 transition-transform duration-200">
                                    <Icon className="w-9 h-9 stroke-[1.2]" />
                                </div>
                                <h4 className="font-bold text-sm text-[#020A39] mb-2 uppercase tracking-wide group-hover:text-[#0253ee] transition-colors">
                                    {item.title}
                                </h4>
                                <span className="text-xs font-semibold text-[#0253ee] group-hover:underline mt-1">
                                    {item.btnText}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FormularNav;
