import { Phone, Calendar } from 'lucide-react';

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] fill-current">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.062 5.248 5.303 0 11.771 0c3.14 0 6.088 1.22 8.306 3.441 2.218 2.221 3.435 5.17 3.431 8.309-.01 6.55-5.252 11.797-11.72 11.797h-.005c-2.004-.001-3.974-.516-5.719-1.498L0 24zm6.49-4.22c1.685.999 3.518 1.527 5.271 1.528h.004c5.441 0 9.87-4.428 9.878-9.873.004-2.637-1.019-5.117-2.881-6.981A9.8 9.8 0 0 0 11.77 2.083c-5.451 0-9.88 4.43-9.888 9.875-.001 1.83.479 3.618 1.39 5.197L2.27 21.73l4.277-1.121zM17.43 14.18c-.31-.155-1.833-.904-2.112-1.006-.279-.101-.482-.153-.684.152-.202.306-.782 1.006-.959 1.21-.177.202-.354.228-.664.073-.31-.155-1.309-.48-2.493-1.536-.922-.82-1.543-1.834-1.724-2.144-.18-.31-.02-.477.136-.631.14-.139.31-.362.465-.544.155-.181.207-.31.31-.517.103-.207.051-.388-.026-.543-.077-.155-.684-1.65-.937-2.257-.247-.597-.497-.516-.684-.526-.177-.009-.38-.01-.583-.01-.202 0-.532.077-.81.38-.279.303-1.064 1.04-1.064 2.537 0 1.497 1.09 2.946 1.241 3.15.152.202 2.144 3.273 5.193 4.59.724.314 1.29.502 1.731.642.727.231 1.39.198 1.912.12.582-.087 1.833-.75 2.088-1.472.253-.723.253-1.343.177-1.472-.076-.129-.279-.207-.589-.362z" />
    </svg>
);

const SidebarActions = () => {
    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 120; // Entspricht dem fixed Header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="fixed right-0 top-[60%] -translate-y-1/2 z-50 flex flex-col gap-1 items-end select-none">
            
            {/* WhatsApp */}
            <a
                href="https://wa.me/4915127042547"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-end bg-[#0082d5] text-white h-[55px] rounded-l-lg shadow-md transition-all duration-300 ease-in-out w-[55px] hover:w-[340px] overflow-hidden relative group border-b border-l border-white/20"
            >
                <span className="absolute right-[65px] text-[13px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Schreib mir per WhatsApp: 0151 27042547
                </span>
                <div className="w-[55px] h-[55px] flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon />
                </div>
            </a>

            {/* Telefon */}
            <a
                href="tel:+4915127042547"
                className="flex items-center justify-end bg-[#0082d5] text-white h-[55px] rounded-l-lg shadow-md transition-all duration-300 ease-in-out w-[55px] hover:w-[340px] overflow-hidden relative group border-b border-l border-white/20"
            >
                <span className="absolute right-[65px] text-[13px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Ruf mich direkt an: 0151 27042547
                </span>
                <div className="w-[55px] h-[55px] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                </div>
            </a>

            {/* Termin */}
            <button
                onClick={() => handleScrollTo('bedarfsradar')}
                className="flex items-center justify-end bg-[#0082d5] text-white h-[55px] rounded-l-lg shadow-md transition-all duration-300 ease-in-out w-[55px] hover:w-[340px] overflow-hidden relative group border-l border-white/20"
            >
                <span className="absolute right-[65px] text-[13px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Termin online vereinbaren
                </span>
                <div className="w-[55px] h-[55px] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                </div>
            </button>

        </div>
    );
};

export default SidebarActions;
