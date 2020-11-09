<template>
  <div class="flex justify-between">
    <MenuContainer
      class="flex-shrink-0 w-1/3 p-2 md:p-4 lg:p-8 xl:p-10 2xl:p-12"
      :render="render"
    />

    <CategoryContainer
      class="max-w-3xl max-h-screen flex-1 flex flex-col overflow-auto p-2 md:p-4 lg:p-8 xl:p-10 2xl:p-12"
      :render="render"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import CategoryContainer from "@/components/CategoryContainer.vue" // @ is an alias to /src
import MenuContainer from "@/components/MenuContainer.vue"
import { useDefinitions } from "@/composable/useDefinitions"

export default defineComponent({
  name: "Main",
  components: {
    CategoryContainer,
    MenuContainer,
  },
  setup() {
    const { render } = useDefinitions()
    return {
      render,
    }
  },
})
</script>
