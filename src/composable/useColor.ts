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

export const useColor = (
  colorDefinition: Color,
  opacityDefinition?: number
) => {
  const tailwindColors = Tailwind.theme.colors
  const color = computed(() => {
    if (colorDefinition === "black") return tailwindColors.black
    if (colorDefinition === "white") return tailwindColors.white
    if (colorDefinition[0] !== "#")
      throw new Error(
        'color name has to be in HEX format starting from "#" symbol'
      )
    return colorDefinition
  })

  //* throw on wrong data format
  color.value
  if (opacityDefinition) {
    if (opacityDefinition > 1)
      throw new Error("opacity has to be smaller than or equal 1")
    if (opacityDefinition < 0)
      throw new Error("opacity has to be larger than or equal 0")
  }

  return {
    color,
    backgroundStyle: computed(() => {
      const rgb = hexToRGB(color.value)
      const opacity = opacityDefinition
        ? { "--tw-bg-opacity": opacityDefinition }
        : {}

      return {
        backgroundColor: [`rgb(${rgb})`, `rgba(${rgb}, var(--tw-bg-opacity))`],
        ...opacity,
      }
    }),
    contentStyle: computed(() => {
      const rgb = hexToRGB(color.value)
      const opacity = opacityDefinition
        ? { "--tw-text-opacity": opacityDefinition }
        : {}

      return {
        color: [`rgb(${rgb})`, `rgba(${rgb}, var(--tw-text-opacity))`],
        ...opacity,
      }
    }),
  }
}
