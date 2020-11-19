<template>
  <div class="space-y-2 sm:space-y-4 md:space-y-5">
    <div v-for="(category, index) in render" :key="index">
      <a
        class="text-2xl sm:text-3xl md:text-4xl block text-primary-700 dark:text-primary-200 font-semibold transform transition-transform duration-75 ease-in hover:translate-x-1"
        :href="`#${category.name}`"
        ><p class="first-letter:uppercase">{{ category.name }}</p></a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import { Category } from "@/composable/useDefinitions"

export default defineComponent({
  props: {
    render: {
      required: true,
      type: Array as () => Category[],
    },
  },
  setup() {
    return {}
  },
})
</script>
