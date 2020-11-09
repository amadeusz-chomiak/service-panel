<template>
  <div>
    <div>
      <base-text tag="h1" size="3xl">Services</base-text>
    </div>
    <div class="space-y-4">
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
