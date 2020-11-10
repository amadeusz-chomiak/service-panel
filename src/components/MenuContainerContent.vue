<template>
  <div v-for="(category, index) in render" :key="index">
    <a
      class="text-4xl text-primary-700 dark:text-primary-600 font-semibold"
      :href="`#${category.name}`"
      ><p class="first-letter:uppercase">{{ category.name }}</p></a
    >
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import { Render } from "@/composable/useDefinitions"

export default defineComponent({
  props: {
    render: {
      required: true,
      type: Array as () => Render,
    },
  },
  setup() {
    return {}
  },
})
</script>
