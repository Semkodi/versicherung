import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigationsleiste from './komponenten/Navigationsleiste.tsx';
import Heldenbereich from './komponenten/Heldenbereich.tsx';
import Zielgruppen from './komponenten/Zielgruppen.tsx';
import FehlerBereich from './komponenten/FehlerBereich.tsx';
import SoArbeiteIch from './komponenten/SoArbeiteIch.tsx';
import AppVorteile from './komponenten/AppVorteile.tsx';
import Bewertungen from './komponenten/Bewertungen.tsx';
import KontaktBereich from './komponenten/KontaktBereich.tsx';
import UeberMich from './komponenten/UeberMich.tsx';
import PhysikSektion from './komponenten/PhysikSektion.tsx';
import Fusszeile from './komponenten/Fusszeile.tsx';
import Impressum from './komponenten/Impressum.tsx';
import Datenschutz from './komponenten/Datenschutz.tsx';
import Preloader from './komponenten/Preloader.tsx';
import FloatingShapes from './komponenten/FloatingShapes.tsx';
import { ScrollReveal } from './komponenten/ScrollReveal.tsx';
import Chatbot from './komponenten/Chatbot.tsx';

function App() {
  const [loading, setLoading] = useState(true);
  const path = window.location.pathname;

  useEffect(() => {
    // Simuliere Ladezeit für den Wow-Effekt
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (path === '/impressum') {
    return (
      <div className="min-h-screen bg-hintergrund font-sans selection:bg-marke-primaer selection:text-white">
        <Impressum />
        <Fusszeile />
      </div>
    );
  }

  if (path === '/datenschutz') {
    return (
      <div className="min-h-screen bg-hintergrund font-sans selection:bg-marke-primaer selection:text-white">
        <Datenschutz />
        <Fusszeile />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      <div className="min-h-screen bg-hintergrund text-text-haupt font-sans selection:bg-marke-primaer selection:text-white relative grain overflow-x-hidden">
        <FloatingShapes />
        <Navigationsleiste />

        <main className="relative z-10">
          <Heldenbereich />

          <ScrollReveal direction="up" delay={0.2}>
            <Zielgruppen />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <FehlerBereich />
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <SoArbeiteIch />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <AppVorteile />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <PhysikSektion />
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

        <Fusszeile />
      </div>
      <Chatbot />
    </>
  );
}

export default App;
