import Heldenbereich from '../komponenten/Heldenbereich.tsx';
import Zielgruppen from '../komponenten/Zielgruppen.tsx';
import FehlerBereich from '../komponenten/FehlerBereich.tsx';
import BedarfsRechner from '../komponenten/BedarfsRechner.tsx';
import SoArbeiteIch from '../komponenten/SoArbeiteIch.tsx';
import AppVorteile from '../komponenten/AppVorteile.tsx';
import Bewertungen from '../komponenten/Bewertungen.tsx';
import FAQ from '../komponenten/FAQ.tsx';
import KontaktBereich from '../komponenten/KontaktBereich.tsx';
import UeberMich from '../komponenten/UeberMich.tsx';
import PhysikSektion from '../komponenten/PhysikSektion.tsx';
import { ScrollReveal } from '../komponenten/ScrollReveal.tsx';

const Startseite = () => {
    return (
        <main className="relative z-10">
            <Heldenbereich />

            <ScrollReveal direction="up" delay={0.2}>
                <Zielgruppen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <BedarfsRechner />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <Bewertungen />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <KontaktBereich />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
                <UeberMich />
            </ScrollReveal>
        </main>
    );
};

export default Startseite;
