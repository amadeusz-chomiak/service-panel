/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-svg-inline-loader")
      .loader("vue-svg-inline-loader")
      .options({
        /* ... */
      })
  },
  pwa: {
    name: "services panel",
    manifestPath: "site.webmanifest",
    themeColor: "#e6e6e6",
    iconPaths: {
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      msTileImage: "img/icons/mstile-144x144.png",
    },
    manifestOptions: {
      short_name: "services",
      background_color: "#e6e6e6",
    },
  },
}
