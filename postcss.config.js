/* eslint-disable @typescript-eslint/no-var-requires */
const postcssPresetEnv = require("postcss-preset-env")
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    postcssPresetEnv({
      stage: 1,
    }),
  ],
}
