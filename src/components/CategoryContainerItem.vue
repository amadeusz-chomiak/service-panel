<template>
  <div>
    <base-text tag="h2" size="2xl">
      <span>{{ category.name }}&nbsp;</span>
      <span class="text-xl">{{ category.description }}</span>
    </base-text>
    <div>
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
