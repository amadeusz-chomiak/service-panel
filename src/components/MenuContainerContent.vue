<template>
  <nav class="space-y-2 sm:space-y-4 md:space-y-5">
    <div v-for="(category, index) in render" :key="index">
      <a
        :id="index + 1 === render.length ? focusTargetsId.lastLink : ''"
        v-focus-target="{
          query: '#' + focusTargetsId.toggleButton,
          enable: focusTargetsId.toggleButton && index + 1 === render.length,
        }"
        class="link text-2xl sm:text-3xl md:text-4xl block text-primary-700 dark:text-primary-200 font-semibold transform transition-transform duration-75 ease-in hover:translate-x-1"
        :href="`#${category.name}`"
        ><p class="first-letter:uppercase">{{ category.name }}</p></a
      >
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import { Category } from "@/composable/useDefinitions"

interface NavigationFocusTargetsId {
  lastLink: string
  toggleButton: string
}

export default defineComponent({
  props: {
    render: {
      required: true,
      type: Array as () => Category[],
    },
    focusTargetsId: {
      default: () => ({
        lastLink: "",
        toggleButton: "",
      }),
      type: Object as () => NavigationFocusTargetsId,
    },
  },
  setup() {
    return {}
  },
})
</script>
