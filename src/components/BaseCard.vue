<template>
  <div class="p-4 md:p-8 rounded-3xl shadow-2xl bg-gray-200 dark:bg-gray-700">
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"

export default defineComponent({
  // props: {},
  setup() {
    return {}
  },
})
</script>
