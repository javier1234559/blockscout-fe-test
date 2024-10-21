/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import { CustomThemeConfig } from "tailwindcss/types/config";
import type { Config } from "tailwindcss";
import { extendTheme } from "./service/theme/extend-theme";

const config: Config = {
  // important: true,
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    extend: extendTheme as unknown as Partial<CustomThemeConfig>,
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
