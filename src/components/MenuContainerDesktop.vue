<template>
  <div>
    <div class="mb-8">
      <h1
        class="font-semibold text-5xl text-black dark:text-gray-200 first-letter:uppercase"
      >
        services
      </h1>
      <a
        class="text-2xl text-primary-700 dark:text-primary-200 underline font-small-caps"
        href="https://amadeo.dev"
        >amadeo.dev</a
      >
    </div>
    <MenuContainerContent :render="render" />
  </div>
  <button
    class="button button-primary p-3 self-start"
    data-testid="toggle-color-scheme"
    @click="setColorScheme(!isLight)"
  >
    <base-icon class="h-6 text-white" :icon="isLight ? 'sun' : 'moon'" />
  </button>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import MenuContainerContent from "./MenuContainerContent.vue"
import { Render } from "@/composable/useDefinitions"
import { usePrefersColorScheme } from "@/composable/usePrefersColorScheme"

export default defineComponent({
  components: {
    MenuContainerContent,
  },
  props: {
    render: {
      required: true,
      type: Array as () => Render,
    },
  },
  setup() {
    const { isLight, setColorScheme } = usePrefersColorScheme()
    return { isLight, setColorScheme }
  },
})
</script>
