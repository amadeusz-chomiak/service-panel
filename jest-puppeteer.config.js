module.exports = {
  launch: {
    headless: process.env.HEADLESS !== "false",
    // slowMo: 500,
  },
  browserContext: "incognito",
}
