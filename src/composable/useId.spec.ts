import { useId } from "./useId"

describe("composable/useId.ts", () => {
  it("return static unique id", () => {
    const { id: firstId } = useId()
    const { id: secondId } = useId()
    expect(firstId !== secondId).toBe(true)
  })
})
