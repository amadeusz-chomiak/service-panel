module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  experimental: {
    additionalBreakpoint: true,
  },
  purge: [],
  theme: {
    colors: {
      primary: {
        600: "#3e61a5", //45%
        700: "#0c43a5", //35%
        900: "#011332", //96%
      },
      gray: {
        100: "#f2f2f2", //95%
        200: "#e6e6e6", //90%
        300: "#b9b9b9", //73%
        400: "#a5a5a5", //65%
        500: "#919191", //57%
        600: "#676767", //40%
        700: "#434343", //26%
        800: "#262626", //15%
        900: "#1a1a1a", //10%
      },
      black: "#080808",
      white: "#f7f7f7",
    },
    extend: {
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
      },
    },
  },
  variants: {
    scale: ({ after }) => after(["active"]),
    boxShadow: ({ after }) => after(["active"]),
  },
  plugins: [],
}
