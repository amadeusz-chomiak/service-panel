<template>
  <div>
    <base-text
      tag="a"
      size="lg"
      :href="link.href"
      :style="{
        color: brand.onColor,
        background: brand.color,
      }"
      class="rounded-full px-4 py-2 flex shadow transform duration-75 ease-in hover:scale-105 hover:shadow-md active:scale-95 active:shadow-xs"
      target="_blank"
      rel="noreferrer"
      >{{ link.name }}</base-text
    >
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import { Service } from "@/composable/useDefinitions"

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
  setup() {
    return {}
  },
})
</script>
