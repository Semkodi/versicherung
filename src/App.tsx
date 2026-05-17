import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// ─── Layout-Komponenten ────────────────────────────────────────
import Navigationsleiste from './komponenten/layout/Navigationsleiste.tsx';
import Fusszeile         from './komponenten/layout/Fusszeile.tsx';
import Preloader         from './komponenten/layout/Preloader.tsx';
import FloatingShapes    from './komponenten/layout/FloatingShapes.tsx';
import ScrollToTop       from './komponenten/layout/ScrollToTop.tsx';
import ConsentBanner     from './komponenten/layout/ConsentBanner.tsx';
import Barrierefreiheit  from './komponenten/layout/Barrierefreiheit.tsx';

// ─── UI-Komponenten ────────────────────────────────────────────
import Chatbot from './komponenten/ui/Chatbot.tsx';

// ─── Rechtliches (als eigene Seiten-Routen) ────────────────────
import Impressum   from './komponenten/rechtliches/Impressum.tsx';
import Datenschutz from './komponenten/rechtliches/Datenschutz.tsx';
import Cookies     from './komponenten/rechtliches/Cookies.tsx';

// ─── Seiten ───────────────────────────────────────────────────
import Startseite    from './seiten/Startseite.tsx';
import Privatkunden  from './seiten/Privatkunden.tsx';
import Gewerbekunden from './seiten/Gewerbekunden.tsx';
import Beamte        from './seiten/Beamte.tsx';
import Dashboard     from './seiten/Dashboard.tsx';
import Login         from './seiten/Login.tsx';

// Hauptinhalts-Komponente, die Routing und Layout verwaltet
function AppInhalt() {
  const [laedt] = useState(false);
  const aktuellerOrt = useLocation();
  const istDashboard = aktuellerOrt.pathname === '/dashboard';
  const istLogin = aktuellerOrt.pathname === '/login';
  const istEinfachesLayout = istDashboard || istLogin;

  return (
    <>
      <AnimatePresence>
        {laedt && <Preloader key="preloader" />}
      </AnimatePresence>

      <div className="min-h-screen bg-hintergrund text-text-haupt font-sans selection:bg-marke-primaer selection:text-white relative grain overflow-x-hidden">
        <FloatingShapes />
        {!istEinfachesLayout && <Navigationsleiste />}

        <Routes>
          <Route path="/"              element={<Startseite />} />
          <Route path="/privatkunden"  element={<Privatkunden />} />
          <Route path="/gewerbekunden" element={<Gewerbekunden />} />
          <Route path="/beamte"        element={<Beamte />} />
          <Route path="/impressum"     element={<Impressum />} />
          <Route path="/datenschutz"   element={<Datenschutz />} />
          <Route path="/cookies"       element={<Cookies />} />
          <Route path="/dashboard"     element={<Dashboard />} />
          <Route path="/login"         element={<Login />} />
        </Routes>

        {!istEinfachesLayout && <Fusszeile />}
      </div>

      {!istEinfachesLayout && <Chatbot />}
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
