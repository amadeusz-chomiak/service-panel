/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  lintOnSave: false,
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.PUBLIC_PATH : "/",
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-svg-inline-loader")
      .loader("vue-svg-inline-loader")
      .options({
        addAttributes: {
          role: "presentation",
          focusable: false,
          tabindex: -1,
          "aria-hidden": true,
        },
      })
  },
  pwa: {
    name: process.env.VUE_APP_NAME || "services panel",
    manifestPath: "site.webmanifest",
    themeColor: "#e6e6e6",
    iconPaths: {
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      msTileImage: "img/icons/mstile-144x144.png",
    },
    manifestOptions: {
      short_name: process.env.VUE_APP_SHORT_NAME || "services",
      background_color: "#e6e6e6",
    },
  },
}
