import waitFor from "wait-for-expect"

describe("dark mode", () => {
  beforeAll(async () => {
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ])
    await page.goto("http://localhost:8080/")
  })

  test("set dark mode by default if prefers-color-scheme is set to dark", async () => {
    await page.waitForSelector('main')
    await page.evaluate(()=> expect(document.documentElement).toHaveClass('dark'))
  })
})
