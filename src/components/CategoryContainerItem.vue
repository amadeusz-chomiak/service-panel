<template>
  <div class="mb-32">
    <h2
      :id="category.name"
      class="text-4xl leading-none text-black dark:text-gray-200 pt-16 md:pt-32 lg:pt-36 xl:pt-38 2xl:pt-40 mb-4 "
    >
      <span class="first-letter:uppercase font-semibold inline-block">{{
        category.name
      }}</span>
      <span class="text-2xl pl-1 md:pl-2 inline-block">{{
        category.description
      }}</span>
    </h2>
    <div
      class="flex flex-col space-y-8 2xl:space-y-0 2xl:grid grid-cols-2 gap-8"
    >
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
