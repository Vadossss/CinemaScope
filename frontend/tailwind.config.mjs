/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'like-hover': 'rgba(60, 206, 123, .15)',
        'like-arrow-hover': '#3cce7b',
        'dislike-hover': 'rgba(244, 67, 54, .15)',
        'dislike-arrow-hover': '#f44336',
      },
    },
  },
  plugins: [heroui()],
};

