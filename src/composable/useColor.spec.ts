import { useColor } from "./useColor"
//@ts-expect-error
import Tailwind from "../../tailwind.config.js"
const tailwindColors =  Tailwind.theme.colors
describe("composable/useColor.ts", () => {
  it("return tailwind black for black color", () => {
    const { color } = useColor('black')
    expect(color.value).toBe(tailwindColors.black)
  })

  it("return tailwind white for white color", () => {
    const { color } = useColor('white')
    expect(color.value).toBe(tailwindColors.white)
  })

  it("return color if it's in HEX format", () => {
    const { color } = useColor('#fff')
    expect(color.value).toBe('#fff')
  })

  it("throw on non specific and non HEX color", () => {
    const { color } = useColor('fff')
    expect(() => color.value).toThrow()
  })
})
