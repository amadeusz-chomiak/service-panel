<template>
  <div class="max-w-3xl">
    <CategoryContainer :render="render" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import CategoryContainer from "@/components/CategoryContainer.vue" // @ is an alias to /src
import { useDefinitions } from "@/composable/useDefinitions"

export default defineComponent({
  name: "Main",
  components: {
    CategoryContainer,
  },
  setup() {
    const { render } = useDefinitions()
    return {
      render,
    }
  },
})
</script>
