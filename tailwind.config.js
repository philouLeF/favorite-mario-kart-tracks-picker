/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "inset-yellow": "inset 0 0 0 2px #f59e0b",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover"],
    },
  },

  plugins: [],
};
