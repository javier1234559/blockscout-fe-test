import { theme } from "@chakra-ui/react";

export const BODY_TYPEFACE = "Inter";
export const HEADING_TYPEFACE = "Audiowide";

const typography = {
  fonts: {
    body: `${BODY_TYPEFACE}, ${theme.fonts.body}`,
    autowide: `${HEADING_TYPEFACE}, ${theme.fonts.heading}`,
  },
  // fonts: {
  //   body: tailwindThemeConfig.fontFamily.text,
  //   heading: tailwindThemeConfig.fontFamily.heading,
  // },
  textStyles: {
    h2: {
      fontSize: ["32px"],
      fontWeight: "500",
      lineHeight: "40px",
      fontFamily: "heading",
    },
    h3: {
      fontSize: "24px",
      fontWeight: "500",
      lineHeight: "32px",
      fontFamily: "heading",
    },
    h4: {
      fontSize: "md",
      fontWeight: "500",
      lineHeight: "24px",
      fontFamily: "heading",
    },
  },
};

export default typography;
