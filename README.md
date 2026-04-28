# 🛡️ Versicherung - Modernes React Web-Projekt

Willkommen im Repository des **Versicherung** Web-Projekts. Dies ist eine moderne, responsive und performante Single-Page-Application (SPA) für Versicherungs- und Finanzdienstleistungen, entwickelt mit modernsten Webtechnologien.

## 🚀 Tech-Stack

Dieses Projekt nutzt den standardisierten Fullstack Enterprise Stack gemäß den Projektrichtlinien:

- **Frontend-Framework:** React 19 (mit Vite für blitzschnelles HMR)
- **Sprache:** TypeScript (Strenges Typing, kein `any`)
- **Styling:** Tailwind CSS (inkl. Plugins wie `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwindcss-animate`)
- **Animationen & Effekte:** Framer Motion für flüssige Micro-Animationen
- **Icons:** Lucide React
- **Code Qualität:** ESLint & TypeScript-Compiler

## ✨ Features

- **Modernes One-Pager-Design:** Hochwertige, zielgruppenorientierte Benutzerführung.
- **Responsives Layout:** Perfekte Darstellung auf allen Geräten (Mobile, Tablet, Desktop).
- **Semantisches HTML & Barrierefreiheit:** Strenges "Living Doc"-Design mit klaren ARIA-Labels.
- **Leistungen & Module (Auswahl):**
  - *Heldenbereich (Hero)*
  - *Zielgruppen-Analyse*
  - *Häufige Fehler (Fehlerbereich)*
  - *Mein Arbeitsprozess (So arbeite ich)*
  - *App-Vorteile*
  - *Kundenbewertungen*
  - *Interaktiver Kontaktbereich*
  - *Über Mich*
  - *Rechtliches (Impressum & Datenschutz)*

## 🛠️ Setup & Installation

Folge diesen Schritten, um das Projekt lokal auszuführen:

1. **Repository klonen**
   ```bash
   git clone <REPOSITORY_URL>
   cd versicherung
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```
   Die Anwendung sollte nun unter `http://localhost:5173` erreichbar sein.

4. **Für Produktion kompilieren**
   ```bash
   npm run build
   ```
   Die fertigen Dateien befinden sich im `dist/`-Verzeichnis.

## 🔒 Sicherheit & Datenschutzrichtlinien

- Keine API-Keys oder Secrets dürfen in den Quellcode eingecheckt werden (Nutzung von `.env` Pflicht).
- Es werden keine externen Font-CDNs genutzt (alle Schriften wie Inter sind lokal bzw. über NPM gehostet).
- Es dürfen im Code keine sensiblen Benutzerdaten protokolliert oder weitergegeben werden.

## 🎨 Design & UI-Prinzipien

- Das Design folgt einem **Premium-Gedanken**: Wir nutzen feine Gradients, Glassmorphismus und subtile Hover-States.
- Alle UI-Eingriffe erfolgen ohne die API-Calls, State-Management oder Logik-Funktionen zu zerstören.
- Die Farbgebung und Typographie ist durchgängig und konsequent in den Tailwind-Configs hinterlegt.

## 👩‍💻 Projekt-Codex & Workflow

- **Sprache:** Gesamter Code, Variablen, Logs und Commits (Conventional Commits) erfolgen **auf Deutsch**.
- **Dokumentation:** Die `.agent/workflows/projekt.md` fungiert als primäre "Living Doc" (Planung, Struktur, Erledigt, Offen).
- **Änderungen:** Features werden immer sicher via festgelegtem Workflow hinzugefügt, sodass bestehende Logik intakt bleibt.
