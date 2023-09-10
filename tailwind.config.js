import prelinePlugin from "preline/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    container: {
      center: true,
      // screens: {
      //   "2xl": "1240px",
      // },
    },
    extend: {},
  },
  plugins: [prelinePlugin],
};
