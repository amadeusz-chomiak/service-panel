import { devices } from "puppeteer"
import waitFor from "wait-for-expect"

describe("esc close mobile menu", () => {
  beforeAll(async () => {
    await page.emulate(devices["Galaxy Note 3"])
    await page.goto("http://localhost:8080/")
  })

  it("shows mobile menu by default and close it on esc key press", async () => {
    const MobileMenu = await page.waitForSelector(
      '[data-testid="mobile-menu-content"]'
    )

    expect(await MobileMenu.isIntersectingViewport()).toBe(true)

    await page.keyboard.press("Escape")
    await waitFor(async () =>
      expect(await MobileMenu.isIntersectingViewport()).toBe(false)
    )
  })
})
