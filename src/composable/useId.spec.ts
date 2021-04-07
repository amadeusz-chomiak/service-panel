import { useId, idPrefix } from "./useId"

describe("composable/useId.ts", () => {
  it("returns static unique id", () => {
    const { id: firstId } = useId()
    const { id: secondId } = useId()
    expect(firstId !== secondId).toBe(true)
  })

  it("returns prefixed id", () => {
    const { id } = useId()
    expect(id.startsWith(idPrefix)).toBe(true)
  })

  it("has a unique integer number after the prefix", () => {
    const { id } = useId()
    const uniqueNumber = Number(id.substring(id.length - 1))
    expect(Number.isInteger(uniqueNumber)).toBe(true)
  })
})
