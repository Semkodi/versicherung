import { usePageMetadata } from '@/hooks/usePageMetadata';
import {
  Heldenbereich,
  VertrauensLeiste,
  Zielgruppen,
  WarumSimplySwitch,
  Bewertungen,
  SoArbeiteIch,
  OrdnerCheck,
  AppVorteile,
  ServiceVersprechen,
  BlogWissen,
  FAQ
} from '@/komponenten/home';
import { BedarfsRadar } from '@/komponenten/rechner';
import { KontaktBereich } from '@/komponenten/kontakt';
import { ScrollReveal, StructuredData } from '@/komponenten/layout';

const METADATA = {
    title: "Sven Kegler | Transparenter Versicherungsmakler & Online-Beratung",
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

            <ScrollReveal direction="up" delay={0.1}>
                <Zielgruppen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
                <WarumSimplySwitch />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
                <Bewertungen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
                <SoArbeiteIch />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
                <BedarfsRadar />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
                <BlogWissen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
                <OrdnerCheck />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
                <AppVorteile />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
                <FAQ />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
                <ServiceVersprechen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
                <KontaktBereich />
            </ScrollReveal>
        </main>
    );
};

export default Startseite;
