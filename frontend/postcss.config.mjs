import {heroui} from "@heroui/react";
const config = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: ["@tailwindcss/postcss", heroui()],
};

export default config;
