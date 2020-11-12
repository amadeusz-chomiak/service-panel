module.exports = {
  preset: "jest-puppeteer",
  testMatch: ["**/e2e/**/?(*.)+(spec).ts"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
}
