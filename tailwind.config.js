/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Earthy editorial palette — Majelis Sayur
        "moss":          "#4A5E3A",   // Moss green — primary accent
        "moss-dark":     "#2D3A22",   // Deep moss — headings, dark text
        "moss-light":    "#6B7F58",   // Light moss — secondary text
        "soil":          "#5C3D2E",   // Soil brown — warm accent
        "soil-light":    "#8B6355",   // Light soil — secondary
        "cream":         "#F5F0E8",   // Warm cream — main background
        "cream-dark":    "#EDE5D4",   // Darker cream — section alternating
        "cream-paper":   "#F9F5EE",   // Aged paper — card backgrounds
        "terracotta":    "#C4714A",   // Muted terracotta — accent
        "terracotta-light": "#D4956E", // Light terracotta
        "olive":         "#3D4A2A",   // Dark olive — deep backgrounds
        "olive-mid":     "#5A6B45",   // Mid olive
        "parchment":     "#E8DFC8",   // Parchment — borders, dividers
        "ink":           "#1C1C18",   // Near-black ink — body text
        "ink-light":     "#3A3A32",   // Light ink — secondary text
        "grain":         "#D4C9B0",   // Grain texture color
      },
      fontFamily: {
        serif:  ["'Playfair Display'", "Georgia", "serif"],
        sans:   ["'DM Sans'", "Inter", "system-ui", "sans-serif"],
        mono:   ["'DM Mono'", "monospace"],
      },
      boxShadow: {
        "editorial": "0 1px 0 rgba(28,28,24,0.12)",
        "card":      "0 2px 20px rgba(28,28,24,0.08)",
        "lift":      "0 8px 40px rgba(28,28,24,0.14)",
        "panel":     "4px 0 40px rgba(28,28,24,0.18)",
      },
      backgroundImage: {
        "paper-texture": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-up":    "fadeUp 0.7s ease forwards",
        "fade-in":    "fadeIn 0.5s ease forwards",
        "slide-in":   "slideIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        "grain":      "grain 8s steps(10) infinite",
      },
      keyframes: {
        fadeUp:  { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideIn: { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        grain:   { '0%, 100%': { transform: 'translate(0,0)' }, '10%': { transform: 'translate(-2%,-3%)' }, '20%': { transform: 'translate(3%,2%)' }, '30%': { transform: 'translate(-1%,4%)' }, '40%': { transform: 'translate(2%,-1%)' }, '50%': { transform: 'translate(-3%,3%)' }, '60%': { transform: 'translate(1%,-2%)' }, '70%': { transform: 'translate(-2%,1%)' }, '80%': { transform: 'translate(3%,-3%)' }, '90%': { transform: 'translate(-1%,2%)' } },
      },
    },
  },
  plugins: [],
}
