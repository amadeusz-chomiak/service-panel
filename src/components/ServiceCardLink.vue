<template>
  <div
    class="flex flex-col sm:flex-row flex-wrap sm:items-center bg-opacity-25 rounded-3xl"
    :style="brandBackgroundStyle"
  >
    <base-text
      tag="a"
      size="lg"
      :href="link.href"
      :style="{
        background: brandColor,
        color: brandOnColor,
      }"
      class="rounded-full w-40 flex-shrink-0 px-5 py-2 flex items-baseline justify-between shadow transform duration-75 ease-in hover:scale-105 hover:shadow-md active:scale-95 active:shadow-xs"
      target="_blank"
      rel="noreferrer"
      ><span class="first-letter:uppercase">{{ link.name }}</span
      ><base-icon icon="link" class="ml-2 h-3" :style="{ color: brandOnColor }"
    /></base-text>
    <base-text
      class="mx-5 mt-2 mb-4 sm:my-2 sm:mx-3"
      data-testid="description"
      >{{ link.description }}</base-text
    >
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
    const { color: brandOnColor } = useColor(props.brand.onColor)
    const {
      color: brandColor,
      backgroundStyle: brandBackgroundStyle,
    } = useColor(props.brand.color)

    return {
      brandOnColor,
      brandColor,
      brandBackgroundStyle,
    }
  },
})
</script>
