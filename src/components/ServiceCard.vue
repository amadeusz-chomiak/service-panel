<template>
  <base-card class="flex max-w-3xl">
    <div
      class="w-10 h-10 mr-4 rounded-full flex-shrink-0 dark:bg-opacity-75 shadow-inner dark:shadow-light-inner"
      :style="brandBackgroundStyle"
    ></div>
    <section class="flex-1">
      <div class="grid lg:grid-cols-3 gap-1">
        <h3
          class="text-3xl lg:col-span-2 first-letter:uppercase text-black dark:text-gray-200"
          data-testid="title"
        >
          {{ service.brand.name }}
        </h3>
        <p
          class="text-lg row-span-2 lg:pt-1 lg:text-right leading-none text-gray-800 dark:text-gray-300 font-small-caps"
          data-testid="price"
        >
          {{ service.price }}
        </p>
        <p
          class="mb-4 lg:col-span-2 text-black dark:text-gray-200 max-w-md"
          data-testid="description"
        >
          {{ service.brand.description }}
        </p>
      </div>

      <div class="flex flex-col space-y-2">
        <ServiceCardLink
          v-for="(link, index) in service.links"
          :key="index"
          :link="link"
          :brand="service.brand"
        />
      </div>
    </section>
  </base-card>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import { Service } from "@/composable/useDefinitions"
import ServiceCardLink from "./ServiceCardLink.vue"
import { useColor } from "@/composable/useColor"

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
  setup(props) {
    const { backgroundStyle: brandBackgroundStyle } = useColor(
      props.service.brand.color
    )
    return { brandBackgroundStyle }
  },
})
</script>
