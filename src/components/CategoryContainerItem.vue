<template>
  <div>
    <base-text :id="category.name" tag="h2" size="3xl" capitalize class="mb-4">
      <span>{{ category.name }}&nbsp;</span>
      <span class="text-2xl">{{ category.description }}</span>
    </base-text>
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
