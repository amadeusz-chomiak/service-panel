<template>
  <div>
    <base-text
      tag="a"
      size="lg"
      :href="link.href"
      :style="{
        background: styleBrandColor,
        color: styleBrandOnColor,
      }"
      class="rounded-full px-4 py-2 flex items-baseline shadow transform duration-75 ease-in hover:scale-105 hover:shadow-md active:scale-95 active:shadow-xs"
      target="_blank"
      rel="noreferrer"
      ><span class="first-letter:uppercase">{{ link.name }}</span
      ><base-icon
        icon="link"
        class="inline ml-2 h-3"
        :style="{ color: styleBrandOnColor }"
    /></base-text>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, computed } from "vue"
import { Service } from "@/composable/useDefinitions"
import { useColor } from "@/composable/useColor"

export default defineComponent({
  props: {
    link: {
      required: true,
      type: Object as () => Service["links"][number],
    },
    brand: {
      required: true,
      type: Object as () => Service["brand"],
    },
  },
  setup(props) {
    const { color: styleBrandOnColor } = useColor(props.brand.onColor)
    const { color: styleBrandColor } = useColor(props.brand.color)

    return {
      styleBrandOnColor,
      styleBrandColor,
    }
  },
})
</script>
