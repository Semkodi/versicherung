import Heldenbereich from '../komponenten/Heldenbereich.tsx';
import Zielgruppen from '../komponenten/Zielgruppen.tsx';
import BedarfsRechner from '../komponenten/BedarfsRechner.tsx';
import Bewertungen from '../komponenten/Bewertungen.tsx';
import KontaktBereich from '../komponenten/KontaktBereich.tsx';
import UeberMich from '../komponenten/UeberMich.tsx';
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
