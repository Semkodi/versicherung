import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop-Komponente
 * Scrollt die Seite bei einem normalen Routenwechsel nach ganz oben (0, 0).
 * Falls ein Hash (Anker wie #hausrat) in der URL existiert, wird sanft (smooth)
 * zu der entsprechenden ID auf der Seite gescrollt.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wenn ein Hash vorhanden ist (z.B. #hausrat), extrahieren wir die ID
      const id = hash.replace('#', '');
      
      // Kurze Verzögerung, um sicherzustellen, dass die neue Seite bereits gerendert ist
      const scrollTimer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // Berechne einen kleinen Offset nach oben (z.B. wegen der fixierten Navigationsleiste)
          const yOffset = -120; // 120px Platz für den Header lassen
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 150);

      return () => clearTimeout(scrollTimer);
    } else {
      // Wenn kein Hash vorhanden ist, scrollen wir standardmäßig nach ganz oben
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
