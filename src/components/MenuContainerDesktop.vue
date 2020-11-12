<template>
  <div class="mb-8">
    <h1
      class="font-semibold text-5xl text-black dark:text-white first-letter:uppercase"
    >
      services
    </h1>
    <a
      class="text-2xl text-primary-700 dark:text-primary-200 underline"
      href="https://amadeo.dev"
      >amadeo.dev</a
    >
  </div>
  <MenuContainerContent :render="render" />
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import MenuContainerContent from "./MenuContainerContent.vue"
import { Render } from "@/composable/useDefinitions"

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
    return {}
  },
})
</script>
