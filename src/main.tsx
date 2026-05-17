// Importiere die React-Bibliothek
import React from 'react'
// Importiere die ReactDOM-Bibliothek für das Rendern im Browser
import ReactDOM from 'react-dom/client'
// Importiere die Hauptkomponente der Anwendung
import App from './App.tsx'
// Importiere die globalen CSS-Stile
import './index.css'
// Importiere die Inter-Schriftart
import '@fontsource/inter/index.css';

// Finde das HTML-Element mit der ID 'root' und erstelle einen React-Root
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Aktiviere den StrictMode für zusätzliche Prüfungen während der Entwicklung
  <React.StrictMode>
    {/* Rendere die App-Komponente */}
    <App />
  </React.StrictMode>,
)
