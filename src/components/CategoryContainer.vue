<template>
  <div>
    <CategoryContainerItem
      v-for="(category, index) in render"
      :key="index"
      :category="category"
      class="my-32"
    />
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import CategoryContainerItem from "./CategoryContainerItem.vue"
import { Render } from "@/composable/useDefinitions"
export default defineComponent({
  components: {
    CategoryContainerItem,
  },
  props: {
    render: {
      required: true,
      type: Array as () => Render,
    },
  },
  // setup() {
  //   return {}
  // },
})
</script>
