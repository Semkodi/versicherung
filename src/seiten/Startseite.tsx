import Heldenbereich  from '../komponenten/home/Heldenbereich.tsx';
import VertrauensLeiste from '../komponenten/home/VertrauensLeiste.tsx';
import Zielgruppen    from '../komponenten/home/Zielgruppen.tsx';
import WarumSimplySwitch from '../komponenten/home/WarumSimplySwitch.tsx';
import Bewertungen    from '../komponenten/home/Bewertungen.tsx';
import UeberMich     from '../komponenten/home/UeberMich.tsx';
import SoArbeiteIch   from '../komponenten/home/SoArbeiteIch.tsx';
import BedarfsRadar from '../komponenten/rechner/BedarfsRadar.tsx';
import OrdnerCheck   from '../komponenten/home/OrdnerCheck.tsx';
import ServiceVersprechen from '../komponenten/home/ServiceVersprechen.tsx';
import BlogWissen     from '../komponenten/home/BlogWissen.tsx';
import FAQ            from '../komponenten/home/FAQ.tsx';
import KontaktBereich from '../komponenten/kontakt/KontaktBereich.tsx';
import { ScrollReveal } from '../komponenten/layout/ScrollReveal.tsx';

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
