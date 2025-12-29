/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  animation: {
  reflect: "reflect 3s ease-in-out infinite",
},
keyframes: {
  reflect: {
    "0%": { transform: "translateX(-100%)" },
    "50%": { transform: "translateX(150%)" },
    "100%": { transform: "translateX(150%)" },
  },
},  
};

