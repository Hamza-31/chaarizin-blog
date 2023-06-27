/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        patrickHand: "PatrickHand",
        alegreya: "Alegreya",
        playfairDisplay: "PlayfairDisplay",
        pecita: "Pecita",
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 0 45px rgba(143, 110, 212, .5)",
          "0 0 45px rgba(143, 110, 212, .5)",
        ],
      },
      scale: {
        250: "2.5",
        200: "2",
        110: "1.1",
        101: "1.01",
        103: "1.03",
      },
      translate: {
        43: "10.5rem",
      },
      backgroundImage: {
        hero: "url('../public/hero.jpg')",
        "hero-chaarizin": "url('../public/hero_chaarizin.png')",
        blog: "url('../public/blog.jpg')",
        notebook: "url('../public/notebook.png')",
      },
      colors: {
        "neo-purple": "#8F6ED4",
        "neo-purple-light": "#F2ECF4",
		"light-purple":"#c4b5fd",
        "dark-purple": "#463F66",
        "darker-purple": "#463F66",
        red: "#DB5F5F",
        "light-red": "#FFBEBE",
        beige: "#E5E3D4",
      },
      animation: {
        "animate-svg-stroke":
          "animate-svg 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s both;",
      },
      keyframes: {
        "animate-svg": {
          "0%": {
            strokeDashoffset: "203.51535034179688px",
            strokeDasharray: "203.51535034179688px",
          },
          "100%": {
            strokeDashoffset: "407.03070068359375px",
            strokeDasharray: "203.51535034179688px",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
    },
  },
};
