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
        // Primäre Markenfarbe – für Buttons, Hover, aktive Elemente
        'marke-primaer': '#0253ee',
        // Tiefes Navy – für dunkle Sektionen, Footer, Premium-Hintergründe
        'marke-sekundaer': '#020A39',
        // Mittleres Navy – für Karten auf dunkleem Hintergrund
        'marke-akzent': '#0B154D',
        // Gold/Gelb – nur für einzelne Premium-Badges im dunklen Bereich
        'marke-highlight': '#FFBE36',
        // Hintergründe
        'hintergrund': '#ffffff',
        'hintergrund-alt': '#F0F4FF',  // sehr sanftes Blau-Weiß statt neutralem Grau
        // Text
        'text-haupt': '#020A39',        // gleich wie Navy für totale Konsistenz
        'text-neben': '#4B5A8A',        // blaustichiges Grau statt neutralem Slate
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
