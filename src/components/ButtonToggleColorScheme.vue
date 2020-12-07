<template>
  <button
    class="button button-primary p-3 sm:p-4 mr-1 sm:mr-3"
    data-testid="toggle-color-scheme"
    @click="setColorScheme(!isLight)"
  >
    <base-icon class="h-5 text-white" :icon="isLight ? 'sun' : 'moon'" />
  </button>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import { usePrefersColorScheme } from "@/composable/usePrefersColorScheme"

export default defineComponent({
  // props: {},
  setup() {
    const { isLight, setColorScheme } = usePrefersColorScheme()
    return { isLight, setColorScheme }
  },
})
</script>
