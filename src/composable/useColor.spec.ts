import { useColor } from "./useColor"
//@ts-expect-error
import Tailwind from "../../tailwind.config.js"
const tailwindColors = Tailwind.theme.colors
describe("composable/useColor.ts", () => {
  describe("color string to hex transformer", () => {
    it("return tailwind black for black color", () => {
      const { color } = useColor("black")
      expect(color.value).toBe(tailwindColors.black)
    })

    it("return tailwind white for white color", () => {
      const { color } = useColor("white")
      expect(color.value).toBe(tailwindColors.white)
    })

    it("return color if it's in HEX format", () => {
      const { color } = useColor("#fff")
      expect(color.value).toBe("#fff")
    })

    it("should throw on non specific and non HEX color", () => {
      expect(() => useColor("fff")).toThrow()
    })
  })

  describe("hex to rgb with tailwind vars transformer", () => {
    describe("colors", () => {
      it("convert hex to rgba background color style", () => {
        const { backgroundStyle } = useColor("#000")
        expect(backgroundStyle.value).toStrictEqual({
          backgroundColor: [
            "rgb(0%,0%,0%)",
            "rgba(0%,0%,0%, var(--bg-opacity))",
          ],
        })
      })

      it("convert hex to rgba content color style", () => {
        const { contentStyle } = useColor("#000")
        expect(contentStyle.value).toStrictEqual({
          color: ["rgb(0%,0%,0%)", "rgba(0%,0%,0%, var(--text-opacity))"],
        })
      })

      it("convert named color to rgba content color style", () => {
        const { contentStyle } = useColor("white")
        expect(contentStyle.value).toStrictEqual({
          color: [
            "rgb(96.9%,96.9%,96.9%)",
            "rgba(96.9%,96.9%,96.9%, var(--text-opacity))",
          ],
        })
      })
    })

    describe("opacity", () => {
      it("add --bg-opacity css var if it's explicitly set to a number", () => {
        const { backgroundStyle } = useColor("#000", 1)
        expect(backgroundStyle.value).toStrictEqual({
          "--bg-opacity": 1,
          backgroundColor: [
            "rgb(0%,0%,0%)",
            "rgba(0%,0%,0%, var(--bg-opacity))",
          ],
        })
      })

      it("add --text-opacity css var if it's explicitly set to a number", () => {
        const { contentStyle } = useColor("#000", 1)
        expect(contentStyle.value).toStrictEqual({
          "--text-opacity": 1,
          color: ["rgb(0%,0%,0%)", "rgba(0%,0%,0%, var(--text-opacity))"],
        })
      })

      it("should throw if opacity is larger than 1", () => {
        expect(() => useColor("#000", 1.1)).toThrow()
      })

      it("should throw if opacity is smaller than 0", () => {
        expect(() => useColor("#000", -0.1)).toThrow()
      })
    })
  })
})
