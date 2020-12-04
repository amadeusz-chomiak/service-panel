import { useVersionControl } from "./useVersionControl"

describe("composable/useVersionControl.ts", () => {
  it("serviceWorkerWaiting is true after setting skip waiting", () => {
    const { setSkipWaiting, serviceWorkerWaiting } = useVersionControl()
    setSkipWaiting(async () => { })
    expect(serviceWorkerWaiting.value).toBe(true)
  })

  it("call skipWaiting set by setSkipWaiting", () => {
    const { setSkipWaiting, skipWaiting } = useVersionControl()
    const fn = jest.fn()
    setSkipWaiting(fn)
    skipWaiting.value?.()
    expect(fn).toBeCalledTimes(1)
  })
})
