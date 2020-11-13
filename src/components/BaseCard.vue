<template>
  <div class="p-4 md:p-8 rounded-3xl shadow-xl bg-gray-200 dark:bg-gray-800">
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
