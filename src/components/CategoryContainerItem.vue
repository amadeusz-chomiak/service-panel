<template>
  <div class="mb-32">
    <h2
      :id="category.name"
      class="text-3xl text-black dark:text-white pt-16 md:pt-32 lg:pt-36 xl:pt-38 2xl:pt-40 mb-4 first-letter:uppercase"
    >
      <span>{{ category.name }}&nbsp;</span>
      <span class="text-2xl">{{ category.description }}</span>
    </h2>
    <div class="flex flex-col space-y-8">
      <service-card
        v-for="(service, index) in category.services"
        :key="index"
        :service="service"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import { Category } from "@/composable/useDefinitions"
import ServiceCard from "./ServiceCard.vue"
export default defineComponent({
  components: {
    ServiceCard,
  },
  props: {
    category: {
      required: true,
      type: Object as () => Category,
    },
  },
  setup() {
    return {}
  },
})
</script>
