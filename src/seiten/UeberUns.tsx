import { usePageMetadata } from '@/hooks/usePageMetadata';
import { UeberMich } from '@/komponenten/home';
import { UnterseitenHero } from '@/komponenten/layout';
import ueberUnsHeroImg from '@/assets/bilder/premium_hero_sven.webp';

const METADATA = {
    title: "Über uns | Sven Kegler Versicherungsmakler",
    description: "Lerne Sven Kegler kennen – freier Versicherungsmakler und Inhaber von simply switch. Seit fast 20 Jahren ehrliche & digitale Beratung.",
};

const UeberUns = () => {
    usePageMetadata(METADATA);
    return (
        <main className="relative z-10 overflow-hidden bg-transparent text-[#2d3748]">
            <UnterseitenHero
                label="Über simply switch"
                titel="Versicherungen persönlich"
                hervorhebung="und verständlich"
                beschreibung="Sven Kegler verbindet persönliche Beratung mit einfachen digitalen Wegen. Transparent, unabhängig und mit einem festen Ansprechpartner."
                punkte={[
                    "Fast 20 Jahre Erfahrung",
                    "Freier Versicherungsmakler",
                    "Persönlich und digital erreichbar",
                ]}
                bild={ueberUnsHeroImg}
                bildAlt="Sven Kegler, Versicherungsmakler und Inhaber von simply switch"
                bildKlasse="unterseiten-hero__bild--ueber-uns"
                primaer={{ text: "Sven kennenlernen", href: "#ueber-mich" }}
            />
            <UeberMich />
        </main>
    );
};

export default UeberUns;
