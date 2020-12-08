describe("composable/useVersionControl.ts", () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it("serviceWorkerWaiting is true after setting skip waiting", async () => {
    const { useVersionControl } = await import("./useVersionControl")
    const { setSkipWaiting, serviceWorkerWaiting } = useVersionControl()
    setSkipWaiting(async () => {})
    expect(serviceWorkerWaiting.value).toBe(true)
  })

  it("call skipWaiting set by setSkipWaiting", async () => {
    const { useVersionControl } = await import("./useVersionControl")
    const { setSkipWaiting, skipWaiting } = useVersionControl()
    const fn = jest.fn()
    setSkipWaiting(fn)
    skipWaiting()
    expect(fn).toBeCalledTimes(1)
  })

  it("set skipping to true after calling skipWaiting", async () => {
    const { useVersionControl } = await import("./useVersionControl")
    const { skipWaiting, skipping } = useVersionControl()
    expect(skipping.value).toBe(false)
    skipWaiting()
    expect(skipping.value).toBe(true)
  })
})
