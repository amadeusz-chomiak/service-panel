<template>
  <div class="flex justify-between">
    <MenuContainer :render="render" />
    <main class="max-h-screen flex-1 pr-2">
      <CategoryContainer :render="render.categories" />
    </main>
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
