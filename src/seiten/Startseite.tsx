import { usePageMetadata } from '@/hooks/usePageMetadata';
import {
  Heldenbereich,
  VertrauensLeiste,
  Zielgruppen,
  WarumSimplySwitch,
  Bewertungen,
  UeberMich,
  SoArbeiteIch,
  OrdnerCheck,
  ServiceVersprechen,
  BlogWissen,
  FAQ
} from '@/komponenten/home';
import { BedarfsRadar } from '@/komponenten/rechner';
import { KontaktBereich } from '@/komponenten/kontakt';
import { ScrollReveal, StructuredData } from '@/komponenten/layout';

const METADATA = {
    title: "Sven Kegler | Unabhängiger Versicherungsmakler & Online-Beratung",
    description: "Dein freier Versicherungsmakler. 100% digitale & persönliche Online-Beratung deutschlandweit sowie vor Ort in Elbtal. Jetzt Bedarfs-Radar testen!",
};

const SCHEMA_DATA = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "simply switch Versicherungsmakler Sven Kegler",
    "image": "https://simply-switch.de/versicherung/assets/logo_simply.png",
    "url": "https://simply-switch.de/versicherung/",
    "telephone": "+496436921334",
    "email": "kegler@simply-switch.de",
    "priceRange": "$$",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kirchstraße 10",
        "addressLocality": "Elbtal",
        "postalCode": "65627",
        "addressCountry": "DE"
    },
    "areaServed": {
        "@type": "Country",
        "name": "DE"
    }
};

const Startseite = () => {
    usePageMetadata(METADATA);
    return (
        <main className="relative z-10 bg-white">
            <StructuredData data={SCHEMA_DATA as unknown as Record<string, unknown>} />
            <Heldenbereich />
            <VertrauensLeiste />

            <ScrollReveal direction="up" delay={0.2}>
                <Zielgruppen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <WarumSimplySwitch />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <Bewertungen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <UeberMich />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <SoArbeiteIch />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <BedarfsRadar />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <BlogWissen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <OrdnerCheck />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <FAQ />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <ServiceVersprechen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <KontaktBereich />
            </ScrollReveal>
        </main>
    );
};

export default Startseite;
