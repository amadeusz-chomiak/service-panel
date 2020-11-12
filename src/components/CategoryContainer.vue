<template>
  <div
    class="max-w-3xl relative scroll-page-padding scroll-black dark:scroll-white scroll-smooth scroll-thin scroll-rounded-full max-h-full flex-1 flex flex-col overflow-auto pt-1 pl-4 md:pl-8 pr-2 md:pr-4 lg:pr-8 xl:pr-10 2xl:pr-12 pb-32"
  >
    <CategoryContainerItem
      v-for="(category, index) in render"
      :key="index"
      :category="category"
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
