import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";
import scrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  safelist: ["dark"],
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,html}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Your original colors are preserved and merged with shadcn's
      colors: {
        "primary-text": "var(--color-text-primary)",
        "secondary-text": "var(--color-text-secondary)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        sidebar: {
            DEFAULT: "hsl(var(--sidebar-background))",
            foreground: "hsl(var(--sidebar-foreground))",
            primary: "hsl(var(--sidebar-primary))",
            "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
            accent: "hsl(var(--sidebar-accent))",
            "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
            border: "hsl(var(--sidebar-border))",
            ring: "hsl(var(--sidebar-ring))",
        },
      },
      // Your custom height is preserved
      height: {
        "screen-minus-topbar": "calc(100vh - 3rem)",
      },
      // Your custom fonts and shadcn's default are merged
      fontFamily: {
        sans: [...fontFamily.sans],
        ubuntu: ["ubuntu"],
        "ubuntu-bold": ["ubuntu-bold"],
        "poppins-bold": ["poppins-bold"],
        "poppins-medium": ["poppins-medium"],
        "poppins-regular": ["poppins-regular"],
        "poppins-light": ["poppins-light"],
        "poppins-thin": ["poppins-thin"],
      },
      // Shadcn's border radius is added
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
				full: "50%",
      },
      // Keyframes from both files are merged
      keyframes: {
        // Your original keyframes
        "arrow-anim": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "5%": { transform: "translateX(-10%)", opacity: "1" },
          "100%": { transform: "translateX(40%)", opacity: "0" },
        },
        "arrow-fixed-anim": {
          "0%": { opacity: "0", transform: "translateX(0)" },
          "100%": { opacity: "1" },
        },
        "boop-left": {
          "50%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(0)" },
        },
        "project-card-selected-hover": {
          "0%": { transform: "translateX(1rem) scale(1.1)" },
          "20%": { transform: "translateX(1rem) scale(1.2) rotate(-5deg)" },
          "40%": { transform: "translateX(1rem) scale(1.1875) rotate(0)" },
          "100%": { transform: "translateX(1rem) scale(1.15) rotate(0)" },
        },
        "project-card-hover": {
          "0%": { transform: "translateX(-1rem) scale(1)" },
          "100%": { transform: "translateX(0rem) scale(1.05)" },
        },
        "moving-bg": {
          from: { backgroundPosition: "0% center" },
          to: { backgroundPosition: "-200% center" },
        },
        scaleZeroToOne: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        scaleOneToZero: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        dotFadeOut: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(24px, 0)" },
        },
        // Shadcn's keyframes
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--bits-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--bits-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      // Animations from both files are merged
      animation: {
        // Your original animations
        arrow: "arrow-anim 1s cubic-bezier(.1,0,.19,1) infinite",
        "arrow-fixed": "arrow-fixed-anim 1s cubic-bezier(.1,0,.19,1) infinite",
        "boop-left": "boop-left 0.4s cubic-bezier(.1,0,.19,1)",
        "project-card-selected-hover": "project-card-selected-hover .4s linear forwards",
        "project-card-hover": "project-card-hover .1s linear forwards",
        "moving-bg": "moving-bg 3s linear infinite",
        scaleZeroToOne: "scaleZeroToOne 0.6s infinite",
        scaleOneToZero: "scaleOneToZero 0.6s infinite",
        dotFadeOut: "dotFadeOut 0.6s infinite",
        // Shadcn's animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [
    typography,
    scrollbarHide,
    tailwindcssAnimate
  ],
};

export default config;