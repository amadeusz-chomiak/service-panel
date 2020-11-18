import { useDefinitions } from "./useDefinitions"

describe("composable/useDefinitions.ts", () => {
  it("return render as a computed with render object as a value", () => {
    const { render } = useDefinitions()
    const value = render.value
    expect(typeof value.interface).toBe('object')
    expect(Array.isArray( value.categories)).toBe(true)
  })
})
