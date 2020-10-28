import { computed } from "vue"
//@ts-expect-error
import Tailwind from "../../tailwind.config.js"
export type Color = LiteralUnion<"black" | "white">

const hexToRGB = (color: string) => {
  let r: string | number = 0,
    g: string | number = 0,
    b: string | number = 0

  // 3 digits
  if (color.length == 4) {
    r = "0x" + color[1] + color[1]
    g = "0x" + color[2] + color[2]
    b = "0x" + color[3] + color[3]

    // 6 digits
  } else if (color.length == 7) {
    r = "0x" + color[1] + color[2]
    g = "0x" + color[3] + color[4]
    b = "0x" + color[5] + color[6]
  }

  r = +(((r as number) / 255) * 100).toFixed(1)
  g = +(((g as number) / 255) * 100).toFixed(1)
  b = +(((b as number) / 255) * 100).toFixed(1)

  return `${r}%,${g}%,${b}%`
}

export const useColor = (color: Color) => {
  const tailwindColors = Tailwind.theme.colors
  return {
    color: computed(() => {
      if (color === "black") return tailwindColors.black
      if (color === "white") return tailwindColors.white
      if (color[0] !== "#")
        throw new Error(
          'color name has to be in HEX format starting from "#" symbol'
        )
      return color
    }),
    backgroundStyle: computed(() => {
      const rgb = hexToRGB(color)
      return `background-color: rgb(${rgb});background-color: rgba(${rgb}, var(--bg-opacity));`
    }),
    contentStyle: computed(() => {
      const rgb = hexToRGB(color)
      return `color: rgb(${rgb});color: rgba(${rgb}, var(--text-opacity));`
    }),
  }
}
