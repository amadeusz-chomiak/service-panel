<template>
  <component :is="tag" :class="classes" class="text-black dark:text-white"
    ><slot
  /></component>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, computed } from "vue"

export default defineComponent({
  props: {
    tag: {
      type: String as () => "p" | "h1" | "h2" | "h3" | "h4",
      default: "p",
    },
    size: {
      type: String as () => "sm" | "base" | "lg" | "xl" | "2xl" | "3xl",
      default: "base",
    },
  },
  setup(props) {
    const classes = computed(() => {
      switch (props.size) {
        case "sm":
          return ["text-sm"]
        case "base":
          return ["text-base"]
        case "lg":
          return ["text-lg"]
        case "xl":
          return ["text-xl"]
        case "2xl":
          return ["text-2xl"]
        case "3xl":
          return ["text-3xl"]
      }
    })

    return { classes }
  },
})
</script>
