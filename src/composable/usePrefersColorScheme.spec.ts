import { usePrefersColorScheme } from "./usePrefersColorScheme"
import { isReactive, isReadonly} from 'vue'

//* You can find detailed test in tests/e2e/specs/darkMode.spec.ts
describe("composable/usePrefersColorScheme.ts", () => {
  it("return 'isLight' computed property", () => {
    const { isLight } = usePrefersColorScheme()

    expect(isReadonly(isLight)).toBe(true)
  }) 

  it("return 'setColorScheme' function", () => {
    const { setColorScheme } = usePrefersColorScheme()
    
    expect(setColorScheme).not.toBeUndefined()
  })

  it("return 'initializeFromPrefersColorScheme' function", () => {
    const { initializeFromPrefersColorScheme } = usePrefersColorScheme()
    
    expect(initializeFromPrefersColorScheme).not.toBeUndefined()
  })
})
