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
        "boop-left": "boop-left 0.4s cubic-bezier(.1,0,.19,1)"
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
          "50%": {
            transform: "translateX(-10%)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
