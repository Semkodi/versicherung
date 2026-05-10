import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigationsleiste from './komponenten/Navigationsleiste.tsx';
import Fusszeile from './komponenten/Fusszeile.tsx';
import Impressum from './komponenten/Impressum.tsx';
import Datenschutz from './komponenten/Datenschutz.tsx';
import Cookies from './komponenten/Cookies.tsx';
import Preloader from './komponenten/Preloader.tsx';
import FloatingShapes from './komponenten/FloatingShapes.tsx';
import Chatbot from './komponenten/Chatbot.tsx';
import ConsentBanner from './komponenten/ConsentBanner.tsx';
import Barrierefreiheit from './komponenten/Barrierefreiheit.tsx';
import ScrollToTop from './komponenten/ScrollToTop.tsx';

// Seiten
import Startseite from './seiten/Startseite.tsx';
import Privatkunden from './seiten/Privatkunden.tsx';
import Gewerbekunden from './seiten/Gewerbekunden.tsx';
import Beamte from './seiten/Beamte.tsx';
import Dashboard from './seiten/Dashboard.tsx';
import Login from './seiten/Login.tsx';

function AppContent() {
  const [loading] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isLogin = location.pathname === '/login';
  const isSimpleLayout = isDashboard || isLogin;

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      <div className="min-h-screen bg-hintergrund text-text-haupt font-sans selection:bg-marke-primaer selection:text-white relative grain overflow-x-hidden">
        <FloatingShapes />
        {!isSimpleLayout && <Navigationsleiste />}

        <Routes>
          <Route path="/" element={<Startseite />} />
          <Route path="/privatkunden" element={<Privatkunden />} />
          <Route path="/gewerbekunden" element={<Gewerbekunden />} />
          <Route path="/beamte" element={<Beamte />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {!isSimpleLayout && <Fusszeile />}
      </div>
      {!isSimpleLayout && <Chatbot />}
      <ConsentBanner />
      <Barrierefreiheit />
    </>
  );
}

function App() {
  return (
    <Router basename="/versicherung">
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
