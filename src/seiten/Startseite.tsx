import Heldenbereich  from '../komponenten/home/Heldenbereich.tsx';
import VertrauensLeiste from '../komponenten/home/VertrauensLeiste.tsx';
import Zielgruppen    from '../komponenten/home/Zielgruppen.tsx';
import WarumSimplySwitch from '../komponenten/home/WarumSimplySwitch.tsx';
import Bewertungen    from '../komponenten/home/Bewertungen.tsx';
import SoArbeiteIch   from '../komponenten/home/SoArbeiteIch.tsx';
import BedarfsRechner from '../komponenten/rechner/BedarfsRechner.tsx';
import BlogWissen     from '../komponenten/home/BlogWissen.tsx';
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
                <SoArbeiteIch />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <BedarfsRechner />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <BlogWissen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <KontaktBereich />
            </ScrollReveal>
        </main>
    );
};

export default Startseite;
