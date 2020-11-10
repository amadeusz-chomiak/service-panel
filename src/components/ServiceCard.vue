<template>
  <base-card class="flex">
    <div
      class="w-10 h-10 mr-4 rounded-full flex-shrink-0"
      :style="{ background: service.brand.color }"
    ></div>
    <div class="flex-1 first-letter:uppercase">
      <h3 class="text-2xl text-black dark:text-white" data-testid="title">
        {{ service.brand.name }}
      </h3>
      <p class="mb-4 text-black dark:text-white" data-testid="description">
        {{ service.brand.description }}
      </p>
      <div class="flex flex-col space-y-2">
        <ServiceCardLink
          v-for="(link, index) in service.links"
          :key="index"
          :link="link"
          :brand="service.brand"
        />
      </div>
    </div>
  </base-card>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import { Service } from "@/composable/useDefinitions"
import ServiceCardLink from "./ServiceCardLink.vue"

export default defineComponent({
  components: {
    ServiceCardLink,
  },
  props: {
    service: {
      required: true,
      type: Object as () => Service,
    },
  },
  setup() {
    return {}
  },
})
</script>
