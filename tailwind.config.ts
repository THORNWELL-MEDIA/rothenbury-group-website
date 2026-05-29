import type { Config } from "tailwindcss";

/**
 * Rothenbury Group - Heritage Burgundy palette.
 *
 * Visual signature: deep heritage burgundy + ivory cream + warm wood-tone bronze.
 * Editorial serif display, restrained operator typography.
 * Reference: Rothschild & Co institutional editorial heritage.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Heritage burgundy - deep, slightly warm oxblood.
        burgundy: {
          DEFAULT: "#5A1A2B",
          50: "#F5ECEE",
          100: "#E5C9D0",
          200: "#CC929E",
          300: "#A85A6C",
          400: "#7E2E45",
          500: "#5A1A2B",
          600: "#481522",
          700: "#36101A",
          800: "#240B11",
          900: "#120508",
        },
        // Wood-tone bronze - warm metallic accent (replaces "gold").
        bronze: {
          DEFAULT: "#8C6A3F",
          50: "#F6F0E5",
          100: "#E9DBC2",
          200: "#D4BC93",
          300: "#B89968",
          400: "#A07F50",
          500: "#8C6A3F",
          600: "#705432",
          700: "#553F26",
          800: "#3A2A19",
          900: "#1F160D",
        },
        walnut: {
          DEFAULT: "#3B2418",
          50: "#EFE7E1",
          100: "#D4C0B3",
          200: "#A88774",
          300: "#7C5A45",
          400: "#553828",
          500: "#3B2418",
          600: "#2E1B12",
          700: "#21130C",
          800: "#150B07",
          900: "#080403",
        },
        // Backwards-compatibility token aliases mapped to heritage colors.
        // These keep existing component code working while remapping to the
        // burgundy palette - no two brand configs share these colors.
        navy: {
          DEFAULT: "#5A1A2B",
          50: "#F5ECEE",
          100: "#E5C9D0",
          200: "#CC929E",
          300: "#A85A6C",
          400: "#7E2E45",
          500: "#5A1A2B",
          600: "#481522",
          700: "#36101A",
          800: "#240B11",
          900: "#120508",
        },
        gold: {
          DEFAULT: "#8C6A3F",
          50: "#F6F0E5",
          100: "#E9DBC2",
          200: "#D4BC93",
          300: "#B89968",
          400: "#A07F50",
          500: "#8C6A3F",
          600: "#705432",
          700: "#553F26",
          800: "#3A2A19",
          900: "#1F160D",
        },
        // Surface neutrals - warm ivory/cream/parchment.
        // Charcoal-deeper body text (Berkshire annual letter contrast)
        ink: "#15100C",
        "ink-soft": "#2E251D",
        "ink-mute": "#5C4F45",
        charcoal: {
          DEFAULT: "#15100C",
          50: "#F4F0EB",
          500: "#2E251D",
          700: "#15100C",
        },
        ivory: "#FBF7F0",
        bone: "#FBF7F0",         // alias
        cream: "#F2EBDD",
        // Parchment cream - paper-texture surfaces (Berkshire/Apollo)
        "parchment-cream": "#F8F4EC",
        parchment: "#E8DFCC",
        mist: "#E8DFCC",         // alias
        line: "#D4C9B5",
      },
      fontFamily: {
        // Display: Cormorant Garamond. Body: Source Serif 4 (Tiempos-adjacent).
        // Berkshire / Apollo / Loews — serif-dominant editorial voice. Distinct
        // from sans-serif sibling brands.
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-body)", "Source Serif 4", "Source Serif Pro", "Iowan Old Style", "Georgia", "serif"],
        sans: [
          "var(--font-sans)",
          "Inter Tight",
          "-apple-system",
          "BlinkMacSystemFont",
          "Arial",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "JetBrains Mono", "Menlo", "monospace"],
      },
      maxWidth: {
        prose: "62ch",
      },
      letterSpacing: {
        tightest: "-0.035em",
        editorial: "-0.025em",
      },
      boxShadow: {
        heritage:
          "0 1px 0 0 rgba(58, 42, 25, 0.06), 0 24px 48px -28px rgba(58, 19, 26, 0.45)",
        "heritage-sm":
          "0 1px 0 0 rgba(58, 42, 25, 0.04), 0 8px 24px -16px rgba(58, 19, 26, 0.25)",
        seal: "inset 0 0 0 1px rgba(140, 106, 63, 0.35)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
