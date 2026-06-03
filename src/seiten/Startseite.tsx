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
import { ScrollReveal } from '@/komponenten/layout';

const Startseite = () => {
    return (
        <main className="relative z-10 bg-white">
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
