<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue"
import { usePrefersColorScheme } from "@/composable/usePrefersColorScheme"
export default defineComponent({
  setup() {
    const { initializeFromPrefersColorScheme } = usePrefersColorScheme()
    onBeforeMount(() => {
      initializeFromPrefersColorScheme()
    })
  },
})
</script>
