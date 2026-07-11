import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#e8edf5",
          100: "#c6d0e5",
          200: "#9baece",
          300: "#6f8cb7",
          400: "#4d72a6",
          500: "#2b5894",
          600: "#1e4278",
          700: "#142e5a",
          800: "#0d2146",
          900: "#0B1F3A",
          950: "#060f1d",
        },
        gold: {
          50: "#fdf9ec",
          100: "#faf1cc",
          200: "#f5e49a",
          300: "#efd15e",
          400: "#D4AF37",
          500: "#c49a1e",
          600: "#a97c16",
          700: "#875e16",
          800: "#6d4a18",
          900: "#5a3d18",
        },
        brand: {
          navy: "#0B1F3A",
          gold: "#D4AF37",
          white: "#FFFFFF",
          "gray-50": "#F9FAFB",
          "gray-100": "#F3F4F6",
          "gray-200": "#E5E7EB",
          "gray-400": "#9CA3AF",
          "gray-600": "#4B5563",
          "gray-900": "#111827",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", fontWeight: "700" }],
        "section": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.2", fontWeight: "600" }],
      },
      boxShadow: {
        card: "0 2px 20px rgba(11,31,58,0.08)",
        "card-hover": "0 8px 40px rgba(11,31,58,0.16)",
        gold: "0 4px 20px rgba(212,175,55,0.3)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0B1F3A 0%, #142e5a 100%)",
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #c49a1e 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.9) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.4)" },
          "50%": { boxShadow: "0 0 0 10px rgba(212,175,55,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
