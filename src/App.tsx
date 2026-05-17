// Importiere useState Hook von React
import { useState } from 'react';
// Importiere Router-Komponenten von react-router-dom
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// Importiere AnimatePresence für Animationen beim Entfernen von Komponenten
import { AnimatePresence } from 'framer-motion';
// Importiere die Navigationsleisten-Komponente
import Navigationsleiste from './komponenten/Navigationsleiste.tsx';
// Importiere die Fusszeilen-Komponente
import Fusszeile from './komponenten/Fusszeile.tsx';
// Importiere die Impressum-Komponente
import Impressum from './komponenten/Impressum.tsx';
// Importiere die Datenschutz-Komponente
import Datenschutz from './komponenten/Datenschutz.tsx';
// Importiere die Cookies-Komponente
import Cookies from './komponenten/Cookies.tsx';
// Importiere den Preloader für Ladebildschirme
import Preloader from './komponenten/Preloader.tsx';
// Importiere fliegende Formen für den Hintergrund
import FloatingShapes from './komponenten/FloatingShapes.tsx';
// Importiere den Chatbot
import Chatbot from './komponenten/Chatbot.tsx';
// Importiere das Cookie-Consent-Banner
import ConsentBanner from './komponenten/ConsentBanner.tsx';
// Importiere das Widget für Barrierefreiheit
import Barrierefreiheit from './komponenten/Barrierefreiheit.tsx';
// Importiere Komponente zum automatischen Hochscrollen
import ScrollToTop from './komponenten/ScrollToTop.tsx';

// Importiere Seiten-Komponenten
// Startseite
import Startseite from './seiten/Startseite.tsx';
// Seite für Privatkunden
import Privatkunden from './seiten/Privatkunden.tsx';
// Seite für Gewerbekunden
import Gewerbekunden from './seiten/Gewerbekunden.tsx';
// Seite für Beamte
import Beamte from './seiten/Beamte.tsx';
// Dashboard-Seite
import Dashboard from './seiten/Dashboard.tsx';
// Login-Seite
import Login from './seiten/Login.tsx';

// Hauptinhalts-Komponente, die Routing und Layout verwaltet
function AppInhalt() {
  // Zustand für den Ladebildschirm (aktuell immer false)
  const [laedt] = useState(false);
  // Hole die aktuelle URL/Route
  const aktuellerOrt = useLocation();
  // Prüfe, ob wir auf dem Dashboard sind
  const istDashboard = aktuellerOrt.pathname === '/dashboard';
  // Prüfe, ob wir auf der Login-Seite sind
  const istLogin = aktuellerOrt.pathname === '/login';
  // Prüfe, ob ein einfaches Layout ohne Navigation/Footer genutzt werden soll
  const istEinfachesLayout = istDashboard || istLogin;

  // Gib das Layout und die Routen zurück
  return (
    <>
      {/* Wrapper für Animationen beim Mount/Unmount */}
      <AnimatePresence>
        {/* Zeige den Preloader, wenn geladen wird */}
        {laedt && <Preloader key="preloader" />}
      </AnimatePresence>

      {/* Hauptcontainer mit Hintergrundfarbe, Schriftart und globalen Stilen */}
      <div className="min-h-screen bg-hintergrund text-text-haupt font-sans selection:bg-marke-primaer selection:text-white relative grain overflow-x-hidden">
        {/* Füge animierte Hintergrundformen hinzu */}
        <FloatingShapes />
        {/* Zeige die Navigation, wenn wir nicht im einfachen Layout sind */}
        {!istEinfachesLayout && <Navigationsleiste />}

        {/* Definiere die Routen der Anwendung */}
        <Routes>
          {/* Route für die Startseite */}
          <Route path="/" element={<Startseite />} />
          {/* Route für Privatkunden */}
          <Route path="/privatkunden" element={<Privatkunden />} />
          {/* Route für Gewerbekunden */}
          <Route path="/gewerbekunden" element={<Gewerbekunden />} />
          {/* Route für Beamte */}
          <Route path="/beamte" element={<Beamte />} />
          {/* Route für das Impressum */}
          <Route path="/impressum" element={<Impressum />} />
          {/* Route für den Datenschutz */}
          <Route path="/datenschutz" element={<Datenschutz />} />
          {/* Route für die Cookies */}
          <Route path="/cookies" element={<Cookies />} />
          {/* Route für das Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Route für den Login */}
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Zeige die Fusszeile, wenn wir nicht im einfachen Layout sind */}
        {!istEinfachesLayout && <Fusszeile />}
      </div>
      {/* Zeige den Chatbot, wenn wir nicht im einfachen Layout sind */}
      {!istEinfachesLayout && <Chatbot />}
      {/* Zeige immer das Cookie-Banner */}
      <ConsentBanner />
      {/* Zeige immer das Barrierefreiheits-Widget */}
      <Barrierefreiheit />
    </>
  );
}

// Einstiegskomponente der Anwendung
function App() {
  // Gib den Router mit dem Basis-Pfad zurück
  return (
    // Nutze den HashRouter oder BrowserRouter mit Basis-Pfad
    <Router basename="/versicherung">
      {/* Komponente zum automatischen Scrollen nach oben beim Seitenwechsel */}
      <ScrollToTop />
      {/* Rendere den Hauptinhalt der Anwendung */}
      <AppInhalt />
    </Router>
  );
}

// Exportiere die App als Standard
export default App;
