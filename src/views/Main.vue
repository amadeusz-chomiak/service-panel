<template>
  <div class="flex justify-between">
    <a
      href="#main-content"
      class="link focus:py-1 md:focus:py-2 sr-only focus:not-sr-only focus:absolute bg-gray-200 dark:bg-gray-800 text-primary-700 dark:text-primary-200 font-semibold z-50 text-xl md:text-2xl lg:text-3xl text-center focus:w-full first-letter:uppercase"
      >{{ render.interface.header.skipToMain.title }}</a
    >
    <MenuContainer :render="render" />
    <main id="main-content" class="max-h-screen flex-1 pr-2">
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
