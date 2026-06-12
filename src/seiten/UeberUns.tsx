import { usePageMetadata } from '@/hooks/usePageMetadata';
import { UeberMich } from '@/komponenten/home';

const METADATA = {
    title: "Über uns | Sven Kegler Versicherungsmakler",
    description: "Lerne Sven Kegler kennen – freier Versicherungsmakler und Inhaber von simply switch. Seit über 17 Jahren ehrliche & digitale Beratung.",
};

const UeberUns = () => {
    usePageMetadata(METADATA);
    return (
        <main className="relative z-10 overflow-hidden bg-transparent text-[#2d3748] pt-24">
            <UeberMich />
        </main>
    );
};

export default UeberUns;
