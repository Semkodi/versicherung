import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const SidebarActions = () => {
    return (
        <div className="fixed right-0 top-[60%] -translate-y-1/2 z-50 flex flex-col gap-1 items-end select-none">

            {/* Termin */}
            <Link
                to="/termin-vereinbaren"
                className="flex items-center justify-end bg-[#0082d5] text-white h-[55px] rounded-l-lg shadow-md transition-all duration-300 ease-in-out w-[55px] hover:w-[340px] overflow-hidden relative group border-l border-white/20"
            >
                <span className="absolute right-[65px] text-[13px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Termin online vereinbaren
                </span>
                <div className="w-[55px] h-[55px] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                </div>
            </Link>

        </div>
    );
};

export default SidebarActions;
