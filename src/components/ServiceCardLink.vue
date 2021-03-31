<template>
  <div
    class="flex flex-col sm:flex-row flex-wrap sm:items-center bg-opacity-25 rounded-3xl shadow-inner dark:shadow-light-inner"
    :style="brandBackgroundStyle"
  >
    <a
      :href="link.href"
      class="button ring-current dark:ring-current text-opacity-100 text-lg bg-opacity-100 dark:bg-opacity-60 flex-shrink-0 px-5 py-2 flex items-baseline justify-between"
      target="_blank"
      rel="noreferrer"
      :style="{ ...brandBackgroundStyle, ...brandColorStyle }"
      ><span class="first-letter:uppercase" :style="brandOnColorStyle">{{
        link.title
      }}</span
      ><base-icon icon="link" class="ml-2 h-3" :style="brandOnColorStyle"
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
import { defineComponent } from "vue"
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
    const { contentStyle: brandOnColorStyle } = useColor(props.brand.onColor, 1)
    const {
      backgroundStyle: brandBackgroundStyle,
      contentStyle: brandColorStyle,
    } = useColor(props.brand.color)

    return {
      brandBackgroundStyle,
      brandOnColorStyle,
      brandColorStyle,
    }
  },
})
</script>
