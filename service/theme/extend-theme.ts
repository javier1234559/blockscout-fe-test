export const extendTheme = {
  colors: {
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
    background: {
      DEFAULT: "#11141d",
      "bg/2": "rgba(24, 30, 44, 1)",
    },
    foreground: "hsl(var(--foreground))",
    borderColor: "#181E2C",
    primary: {
      DEFAULT: "#FF2CA8",
      foreground: "hsl(var(--primary-foreground))",
      text: "hsl(var(--primary-text))",
      light: "rgba(241, 244, 251, 1)",
      dark: "#151924",
    },
    secondary: {
      DEFAULT: "hsl(var(--secondary))",
      foreground: "hsl(var(--secondary-foreground))",
      text: "rgba(160, 166, 180, 1)",
      light: "rgba(241, 244, 251, 1)",
    },
    destructive: {
      DEFAULT: "hsl(var(--destructive))",
      foreground: "hsl(var(--destructive-foreground))",
    },
    muted: {
      DEFAULT: "hsl(var(--muted))",
      foreground: "hsl(var(--muted-foreground))",
    },
    accent: {
      DEFAULT: "hsl(var(--accent))",
      foreground: "hsl(var(--accent-foreground))",
    },
    popover: {
      DEFAULT: "hsl(var(--popover))",
      foreground: "hsl(var(--popover-foreground))",
    },
    card: {
      DEFAULT: "hsl(var(--card))",
      foreground: "hsl(var(--card-foreground))",
    },
    gray: {
      DEFAULT: "rgba(151, 151, 151, 1)",
      icon: "#9D9D9D",
      outline: "#232939",
      placeholder: "#70747F",
    },
    neutral: {
      1: "rgba(249, 249, 249, 1)",
    },
    green: {
      default: "#6BC10E14",
      light: "#00D971",
    },
    pink: {
      DEFAULT: "rgba(255, 44, 168, 1)",
      opacity: "rgba(137, 42, 69, 0.2)",
    },
    blue: {
      light: "rgba(46, 192, 255, 1)",
      dark: "rgba(53, 0, 203, 1)",
    },
    "stroke-line": {
      DEFAULT: "rgba(24, 30, 44, 1)",
    },
    black: {
      DEFAULT: "#000",
      footer: "#151924",
    },
  },

  zIndex: {
    dropdown: "100",
    sticky: "120",
    fixed: "130",
    "modal-backdrop": "140",
    modal: "150",
    popover: "160",
    tooltip: "170",
  },

  keyframes: {
    "accordion-down": {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" },
    },
  },

  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
  },

  fontSize: {
    h1: ["2.25rem", { lineHeight: "2.9925rem", fontWeight: 600 }],
    h3: ["2rem", { lineHeight: "2.5rem", fontWeight: 600 }],
    h6: ["1.25rem", { lineHeight: "1.5625rem", fontWeight: 600 }],
    sm: [".875rem", { lineHeight: "1.25rem", fontWeight: 400 }],
    body: ["1rem", { lineHeight: "1.625rem", fontWeight: 400 }],
    "h1/regular": ["2.5rem", { lineHeight: "2.5rem", fontWeight: 400 }],
    "h2/regular": ["2.25rem", { lineHeight: "2.5rem", fontWeight: 400 }],
    "h3/regular": ["2rem", { lineHeight: "2rem", fontWeight: 400 }],
    "h4/regular": ["1.75rem", { lineHeight: "1.75rem", fontWeight: 500 }],
    "h5/regular": ["1.5rem", { lineHeight: "1.5rem", fontWeight: 500 }],
    "h6/regular": ["1.25rem", { lineHeight: "1.5rem", fontWeight: 500 }],
    "h2/medium": ["1.125rem", { lineHeight: "1.75rem", fontWeight: 600 }],
    "h3/medium": ["2rem", { lineHeight: "2.5rem", fontWeight: 600 }],
    "h4/medium": ["1rem", { lineHeight: "1.25rem", fontWeight: 700 }],
    "h6/lg": ["1.125rem", { lineHeight: "1.4063rem", fontWeight: 600 }],
    "body/regular": ["1rem", { lineHeight: "1.375rem", fontWeight: 400 }],
    "body/medium": ["1.25rem", { lineHeight: "1.625rem", fontWeight: 600 }],
    xxs: ["0.5rem", { lineHeight: "0.55rem", fontWeight: 400 }],
  },

  fontFamily: {
    text: "var(--font-text)",
    heading: "var(--font-heading)",
  },

  container: {
    center: true,
    padding: "1rem",
    screens: {
      sm: "672px",
      md: "800px",
      lg: "1200px",
      xl: "1328px",
      "2xl": "1568px",
    },
  },
};
