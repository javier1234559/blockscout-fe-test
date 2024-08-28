import { extendTheme as tailwindThemeConfig } from "service/theme/extend-theme";

const colors = {
  pink: {
    "500": "#a31f68",
    "600": "#4a00c4",
  },
  green: {
    "100": "#C6F6D5",
    "400": "#48BB78",
    "500": "#38A169",
    "600": "#25855A",
  },
  blue: {
    "50": "#EBF8FF",
    "100": "#BEE3F8",
    "200": "#90CDF4",
    "300": "#63B3ED",
    "400": "#4299E1",
    "500": "#3182CE",
    "600": "#2B6CB0",
    "700": "#2C5282",
    "800": "#2A4365",
    "900": "#1A365D",
  },
  red: {
    "500": "#E53E3E",
    "100": "#FED7D7",
  },
  orange: {
    "100": "#FEEBCB",
  },
  // gray: {
  //   "50": "#F7FAFC", // <-
  //   "100": "#EDF2F7",
  //   "200": "#E2E8F0",
  //   "300": "#CBD5E0",
  //   "400": "#A0AEC0",
  //   "500": "#718096",
  //   "600": "#4A5568",
  //   "700": "#2D3748",
  //   "800": "#1A202C",
  //   "900": "#171923",
  // },
  // black: "#101112",
  white: "#ffffff",
  blackAlpha: {
    "50": "RGBA(16, 17, 18, 0.04)",
    "100": "RGBA(16, 17, 18, 0.06)",
    "200": "RGBA(16, 17, 18, 0.08)",
    "300": "RGBA(16, 17, 18, 0.16)",
    "400": "RGBA(16, 17, 18, 0.24)",
    "500": "RGBA(16, 17, 18, 0.36)",
    "600": "RGBA(16, 17, 18, 0.48)",
    "700": "RGBA(16, 17, 18, 0.64)",
    "800": "RGBA(16, 17, 18, 0.80)",
    "900": "RGBA(16, 17, 18, 0.92)",
  },
  github: "#171923",
  telegram: "#2775CA",
  linkedin: "#1564BA",
  discord: "#9747FF",
  slack: "#1BA27A",
  twitter: "#000000",
  opensea: "#2081E2",
  facebook: "#4460A0",
  medium: "#231F20",
  reddit: "#FF4500",
  ...tailwindThemeConfig.colors,
};

export default colors;
