<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue"
export default defineComponent({
  setup() {
    onBeforeMount(() => {
      let prefersColorScheme: "light" | "dark" = "light"
      if ("matchMedia" in window)
        prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light"

      const root = document.documentElement
      if (prefersColorScheme === "dark") {
        root.classList.add("dark")
      }
    })
  },
})
</script>
