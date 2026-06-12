/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primäre Markenfarbe – Buttons, Hover, aktive Elemente
        'marke-primaer':    'rgb(var(--marke-primaer) / <alpha-value>)',
        'marke-primaer-hover': 'rgb(var(--marke-primaer-hover) / <alpha-value>)',
        // Tiefes Navy – Nav, Footer, dunkle Sektionen
        'marke-sekundaer':  '#020A39',
        // Mittleres Navy – Karten auf dunklem Hintergrund
        'marke-akzent':     '#0B154D',
        // Blaugrau – Nav-Hintergrund oben (ungescrollt)
        'marke-nav':        '#68838B',
        // Gold – Premium-Badges, Highlights
        'marke-highlight':  '#FFBE36',

        // ─── Hintergründe ──────────────────────────────────────────
        // Seitenhintergrund (leichtes Grau-Weiß)
        'hintergrund':      '#F5F6F8',
        // Alternativer Hintergrund für Sektionswechsel
        'hintergrund-alt':  '#F0F4FF',
        // Dashboard & Login Hintergrund
        'hintergrund-hell': '#F8FAFC',

        // ─── Text ──────────────────────────────────────────────────
        'text-haupt':       '#020A39',
        'text-neben':       '#4B5A8A',

        // ─── Sterne & Bewertungen ───────────────────────────────────
        // Google-Sterne Gelb
        'stern-gelb':       '#FABB05',
        // Google-Bewertungs-Gelb (leicht anders als Highlight)
        'google-gelb':      '#FBBC05',

        // ─── Google-Logo Farben (SVG) ───────────────────────────────
        'google-blau':      '#4285F4',
        'google-gruen':     '#34A853',
        'google-rot':       '#EA4335',

        // ─── Barrierefreiheit ───────────────────────────────────────
        // Outline-Farbe für kognitives Profil
        'barriere-outline': '#ffbe36',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    typography,
    forms,
    tailwindcssAnimate,
  ],
}
