import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        graphite: {
          900: "#1A1A1A",
          800: "#353535",
          700: "#4A4A4A",
          600: "#5F5F5F",
        },
        // Accent Colors
        fire: {
          primary: "#FF6B35",
          secondary: "#FF8C42",
        },
        ember: "#D2001C",
        smoke: "#8B8680",
        // Support Colors
        steel: "#71797E",
        rust: "#B7410E",
        wood: "#8B4513",
        success: "#2F7D32",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        bebas: ["Bebas Neue", "cursive"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out",
        fireGlow: "fireGlow 2s ease-in-out infinite",
        smokeRise: "smokeRise 4s infinite",
        metalShine: "metalShine 0.8s ease",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fireGlow: {
          "0%, 100%": { filter: "brightness(1) drop-shadow(0 0 10px rgba(255, 107, 53, 0.5))" },
          "50%": { filter: "brightness(1.2) drop-shadow(0 0 20px rgba(255, 107, 53, 0.8))" },
        },
        smokeRise: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.7" },
          "100%": { transform: "translateY(-100px) scale(1.5)", opacity: "0" },
        },
        metalShine: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "fire-gradient": "linear-gradient(135deg, #FF6B35 0%, #D2001C 100%)",
        "smoke-gradient": "linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.8) 100%)",
        "metal-gradient": "linear-gradient(145deg, #71797E 0%, #353535 50%, #1A1A1A 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config; 