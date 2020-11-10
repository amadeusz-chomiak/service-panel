<template>
  <div>
    <div>
      <h1
        class="font-semibold text-5xl text-black dark:text-white first-letter:uppercase"
      >
        services
      </h1>
      <a
        class="text-2xl text-primary-700 dark:text-primary-600"
        href="https://amadeo.dev"
        >amadeo.dev</a
      >
    </div>
    <div class="space-y-6">
      <MenuContainerContent :render="render" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import MenuContainerContent from "./MenuContainerContent.vue"
import { Render } from "@/composable/useDefinitions"
export default defineComponent({
  props: {
    render: {
      required: true,
      type: Array as () => Render,
    },
  },
  components: {
    MenuContainerContent,
  },
  setup() {
    return {}
  },
})
</script>
