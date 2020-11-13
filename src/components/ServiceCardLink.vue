<template>
  <div
    class="flex flex-col sm:flex-row flex-wrap sm:items-center bg-opacity-25 rounded-3xl"
    :style="brandBackgroundStyle"
  >
    <a
      :href="link.href"
      :style="brandBackgroundStyle"
      class="button text-black dark:text-gray-100 text-lg w-40 bg-opacity-60 flex-shrink-0 px-5 py-2 flex items-baseline justify-between"
      target="_blank"
      rel="noreferrer"
      ><span class="first-letter:uppercase">{{ link.name }}</span
      ><base-icon icon="link" class="ml-2 h-3 text-black dark:text-gray-100"
    /></a>
    <p
      class="mx-5 mt-2 mb-4 sm:my-2 sm:mx-3 text-black dark:text-gray-200"
      data-testid="description"
    >
      {{ link.description }}
    </p>
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
    const { color: brandOnColor, contentStyle: brandOnClorStyle } = useColor(
      props.brand.onColor,
    )
    const {
      color: brandColor,
      backgroundStyle: brandBackgroundStyle,
    } = useColor(props.brand.color)

    return {
      brandOnColor,
      brandColor,
      brandBackgroundStyle,
      brandOnClorStyle,
    }
  },
})
</script>
