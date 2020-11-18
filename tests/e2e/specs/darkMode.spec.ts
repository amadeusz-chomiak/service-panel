import waitFor from "wait-for-expect"

describe("dark mode", () => {
  beforeAll(async () => {
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ])
    await page.goto("http://localhost:8080/")
  })

  it("set dark mode by default if prefers-color-scheme is set to dark", async () => {
    await page.waitForSelector(".dark")
    const classes = await page.evaluate(() =>
      Array.from(document.documentElement.classList.values())
    )
    expect(classes).toContain("dark")

    const themeColor = await page.$eval(
      "head > meta[name='theme-color']",
      //@ts-expect-error
      element => element.content
    )
    expect(themeColor).toBe("#011332")
  })

  it("press setColorScheme toggle button", async () => {
    await page.click('[data-testid="toggle-color-scheme"]')

    const classes = await page.evaluate(() =>
      Array.from(document.documentElement.classList.values())
    )
    expect(classes).not.toContain("dark")

    const themeColor = await page.$eval(
      "head > meta[name='theme-color']",
      //@ts-expect-error
      element => element.content
    )
    expect(themeColor).toBe("#b8cdea")
  })

  it("keeps light mode preference, after reload", async () => {
    await page.reload()
    await page.waitForSelector("main")

    const classes = await page.evaluate(() =>
      Array.from(document.documentElement.classList.values())
    )
    expect(classes).not.toContain("dark")

    const themeColor = await page.$eval(
      "head > meta[name='theme-color']",
      //@ts-expect-error
      element => element.content
    )
    expect(themeColor).toBe("#b8cdea")
  })
})
