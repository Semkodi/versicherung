import { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// ─── Layout-Komponenten ────────────────────────────────────────
import {
  Navigationsleiste,
  Fusszeile,
  Preloader,
  FloatingShapes,
  ScrollToTop,
  ConsentBanner,
  Barrierefreiheit,
  SeitenUebergang
} from '@/komponenten/layout';

// ─── UI-Komponenten ────────────────────────────────────────────
import Chatbot from '@/komponenten/ui/Chatbot';

// ─── Rechtliches (als eigene Seiten-Routen - Lazy loaded) ──────
import { Impressum, Datenschutz, Cookies } from '@/komponenten/rechtliches';

// ─── Seiten (Lazy loaded für optimales Performance-Splitting) ─
import { Startseite, Privatkunden, Gewerbekunden, Beamte, SchadenMelden } from '@/seiten';

// Hauptinhalts-Komponente, die Routing und Layout verwaltet
function AppInhalt() {
  const [laedt] = useState(false);
  const aktuellerOrt = useLocation();

  return (
    <>
      <AnimatePresence>
        {laedt && <Preloader key="preloader" />}
      </AnimatePresence>

      <div className="min-h-screen bg-hintergrund text-text-haupt font-sans selection:bg-marke-primaer selection:text-white relative grain overflow-x-hidden">
        <FloatingShapes />
        <Navigationsleiste />

        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div className="min-h-screen bg-hintergrund flex items-center justify-center">
              <Preloader />
            </div>
          }>
            <Routes location={aktuellerOrt} key={aktuellerOrt.pathname}>
              <Route path="/"              element={<SeitenUebergang><Startseite /></SeitenUebergang>} />
              <Route path="/privatkunden"  element={<SeitenUebergang><Privatkunden /></SeitenUebergang>} />
              <Route path="/gewerbekunden" element={<SeitenUebergang><Gewerbekunden /></SeitenUebergang>} />
              <Route path="/beamte"        element={<SeitenUebergang><Beamte /></SeitenUebergang>} />
              <Route path="/impressum"     element={<SeitenUebergang><Impressum /></SeitenUebergang>} />
              <Route path="/datenschutz"   element={<SeitenUebergang><Datenschutz /></SeitenUebergang>} />
              <Route path="/cookies"       element={<SeitenUebergang><Cookies /></SeitenUebergang>} />
              <Route path="/schaden-melden" element={<SeitenUebergang><SchadenMelden /></SeitenUebergang>} />
              
              {/* Wunschgemäß stillgelegte Admin-Routen auf die Startseite umleiten */}
              <Route path="/dashboard"     element={<Navigate to="/" replace />} />
              <Route path="/login"         element={<Navigate to="/" replace />} />
              
              {/* Fallback für alle unbekannten Pfade */}
              <Route path="*"              element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>

        <Fusszeile />
      </div>

      <Chatbot />
      <ConsentBanner />
      <Barrierefreiheit />
    </>
  );
}

// Einstiegskomponente der Anwendung
function App() {
  return (
    <Router basename="/versicherung">
      <ScrollToTop />
      <AppInhalt />
    </Router>
  );
}

export default App;
