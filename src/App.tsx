import { Suspense } from 'react';
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
  SeitenUebergang,
  SidebarActions,
  StickyBottomBanner
} from '@/komponenten/layout';

// ─── UI-Komponenten ────────────────────────────────────────────
import Chatbot from '@/komponenten/ui/Chatbot';

// ─── Rechtliches (als eigene Seiten-Routen - Lazy loaded) ──────
import { Impressum, Datenschutz, Cookies } from '@/komponenten/rechtliches';

// ─── Seiten (Lazy loaded für optimales Performance-Splitting) ─
import { Startseite, Privatkunden, Gewerbekunden, Beamte, SchadenMelden, TerminVereinbaren, RueckrufAnfordern, AenderungenMitteilen, UeberUns } from '@/seiten';

interface RouteDefinition {
  readonly path: string;
  readonly element: React.ReactNode;
  readonly hideLayout?: boolean;
}

const routeDefinitions: readonly RouteDefinition[] = [
  { path: '/', element: <Startseite /> },
  { path: '/privatkunden', element: <Privatkunden /> },
  { path: '/gewerbekunden', element: <Gewerbekunden /> },
  { path: '/beamte', element: <Beamte /> },
  { path: '/schaden-melden', element: <SchadenMelden /> },
  { path: '/termin-vereinbaren', element: <TerminVereinbaren /> },
  { path: '/rueckruf-anfordern', element: <RueckrufAnfordern /> },
  { path: '/aenderungen-mitteilen', element: <AenderungenMitteilen /> },
  { path: '/ueber-uns', element: <UeberUns /> },
  { path: '/impressum', element: <Impressum /> },
  { path: '/datenschutz', element: <Datenschutz /> },
  { path: '/cookies', element: <Cookies /> }
];

const redirectRoutes = [
  { path: '/dashboard', to: '/' },
  { path: '/login', to: '/' }
] as const;

// Hauptinhalts-Komponente, die Routing und Layout verwaltet
function AppInhalt() {
  const aktuellerOrt = useLocation();

  return (
    <>
      <div className="min-h-screen bg-hintergrund text-text-haupt font-sans selection:bg-marke-primaer selection:text-white relative grain overflow-x-hidden">
        <FloatingShapes />
        <Navigationsleiste />

        <AnimatePresence mode="wait">
          <Suspense
            fallback={
              <div className="min-h-screen bg-hintergrund flex items-center justify-center">
                <Preloader />
              </div>
            }
          >
            <Routes location={aktuellerOrt} key={aktuellerOrt.pathname}>
              {routeDefinitions
                .filter(route => !route.hideLayout)
                .map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<SeitenUebergang>{route.element}</SeitenUebergang>}
                  />
                ))}
              {redirectRoutes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Navigate to={route.to} replace />}
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>

        <Fusszeile />
      </div>

      <Chatbot />
      <ConsentBanner />
      <Barrierefreiheit />
      <SidebarActions />
      <StickyBottomBanner />
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
