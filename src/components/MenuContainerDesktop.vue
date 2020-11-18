<template>
  <div>
    <div class="mb-8">
      <h1
        class="font-semibold text-5xl text-black dark:text-gray-200 first-letter:uppercase"
      >
        {{ header.title }}
      </h1>
      <a
        class="text-2xl text-primary-700 dark:text-primary-200 underline font-small-caps"
        :href="header.link.href"
        target="_blank"
        rel="noreferrer"
        >{{ header.link.title }}</a
      >
    </div>
    <MenuContainerContent :render="render.categories" />
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
import { ref, reactive, defineComponent, computed } from "vue"
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
      type: Object as () => Render,
    },
  },
  setup(props) {
    const { isLight, setColorScheme } = usePrefersColorScheme()

    const header = computed(() => props.render.interface.header)

    return { isLight, setColorScheme, header }
  },
})
</script>
