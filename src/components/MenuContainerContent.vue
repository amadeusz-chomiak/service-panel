<template>
  <div v-for="(category, index) in render" :key="index">
    <base-text
      tag="a"
      size="3xl"
      class="text-primary-700"
      capitalize
      :href="`#${category.name}`"
      >{{ category.name }}</base-text
    >
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import { Render } from "@/composable/useDefinitions"

export default defineComponent({
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
