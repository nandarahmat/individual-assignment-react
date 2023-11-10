/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
      raleway: ["Raleway"],
    },
    extend: {
      backgroundImage: {
        gradientBg: "linear-gradient(117deg, #FF8A00 0%, #6A33B0 100%)",
      },
    },
    keyframes: {
      shake: {
        "0%": {
          transform: "translate(3px, 0)",
        },
        "50%": {
          transform: "translate(-3px, 0)",
        },
        "100%": {
          transform: "translate(0, 0)",
        },
      },
      spin: {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
    animation: {
      shake: "shake 150ms 2 linear",
      spin: "spin 1s linear infinite",
    },
  },
  plugins: [],
};
