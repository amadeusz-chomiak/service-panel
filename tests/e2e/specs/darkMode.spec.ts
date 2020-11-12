
describe('dark mode', () => {
  beforeAll(() => {
    page.goto('http://localhost:8080/')  
  })

  test('set dark mode by default if prefers-color-scheme is set to dark', async () => {
    await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: 'dark'}])
  })
})