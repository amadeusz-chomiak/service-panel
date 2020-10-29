import { useDefinitions } from "./useDefinitions"

describe("composable/useDefinitions.ts", () => {
  it("return render as a computed with array as a value", () => {
    const { render } = useDefinitions()
    const value = render.value
    expect(Array.isArray(value)).toBe(true)
  })
})
