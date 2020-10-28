import { computed } from "vue"
//@ts-expect-error
import Tailwind from "../../tailwind.config.js"
export type Color = LiteralUnion<'black' | 'white'>
export const useColor = (color: Color) => {
  const tailwindColors =  Tailwind.theme.colors
  return {
    color: computed(() => {
      if(color === 'black') return tailwindColors.black
      if (color === 'white') return tailwindColors.white
      if(color[0] !== '#') throw new Error('color name has to be in HEX format starting from "#" symbol')
      return color
    })
  }
}
