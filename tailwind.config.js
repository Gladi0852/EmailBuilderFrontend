/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-light": "0px 4px 10px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0px 8px 20px rgba(0, 0, 0, 0.2)", 
      },
    },
  },
  plugins: [],
};
