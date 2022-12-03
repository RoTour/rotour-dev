/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,html}"],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        "primary": "var(--color-primary)",
        "secondary": "var(--color-secondary)",
        "primary-text": "var(--color-text-primary)",
        "secondary-text": "var(--color-text-secondary)"
      },
      height: {
        "screen-minus-topbar": "calc(100vh - 3rem)"
      },
      fontFamily: {
        "ubuntu": ["ubuntu"],
        "ubuntu-bold": ["ubuntu-bold"],
        "poppins-bold": ["poppins-bold"],
        "poppins-medium": ["poppins-medium"],
        "poppins-regular": ["poppins-regular"],
        "poppins-light": ["poppins-light"],
        "poppins-thin": ["poppins-thin"]
      },
      animation: {
        "arrow": "arrow-anim 1s cubic-bezier(.1,0,.19,1) infinite",
        "arrow-fixed": "arrow-fixed-anim 1s cubic-bezier(.1,0,.19,1) infinite",
        "boop-left": "boop-left 0.4s cubic-bezier(.1,0,.19,1)",
        "project-card-selected-hover": "project-card-selected-hover .4s linear forwards",
        "project-card-hover": "project-card-hover .1s linear forwards",
        "moving-bg": "moving-bg 3s linear infinite"
      },
      keyframes: {
        "arrow-anim": {
          "0%": {
            opacity: "1",
            transform: "translateX(0)"
          },
          "5%": {
            transform: "translateX(-10%)",
            opacity: "1"
          },
          "100%": {
            transform: "translateX(40%)",
            opacity: "0"
          }
        },
        "arrow-fixed-anim": {
          "0%": {
            opacity: "0",
            transform: "translateX(0)"
          },
          "100%": {
            opacity: "1"
          }
        },
        "boop-left": {
          "50%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(0)" }
        },
        "project-card-selected-hover": {
          "0%": { transform: "translateX(1rem) scale(1.1)" },
          "20%": { transform: "translateX(1rem) scale(1.2) rotate(-5deg)" },
          "40%": { transform: "translateX(1rem) scale(1.1875) rotate(0)" },
          "100%": { transform: "translateX(1rem) scale(1.15) rotate(0)" }
        },
        "project-card-hover": {
          "0%": { transform: "translateX(-1rem) scale(1)" },
          "100%": { transform: "translateX(0rem) scale(1.05)" }
        },
        "moving-bg": {
          "from": { backgroundPosition: "0% center" },
          "to": { backgroundPosition: "-200% center" }
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide")
  ]
};
