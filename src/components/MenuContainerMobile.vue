<template>
  <transition
    appear
    appear-active-class="transform transition-transform duration-200 ease-in"
    appear-from-class="translate-y-full"
    appear-to-class="translate-y-0"
    enter-active-class="transform transition-all duration-200 ease-in"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transform transition-all duration-200 ease-in"
    leave-from-class="translate-y-0"
    leave-to-class="translate-y-full"
  >
    <div
      v-show="mobileShowContent"
      class="transform transition-all duration-200 ease-in flex flex-col p-2 sm:p-4 fixed inset-x-0 bottom-0 shadow-center-lg bg-gray-200 dark:bg-gray-700 rounded-t-xl"
    >
      <MenuContainerContent class="mb-10" :render="render" />
    </div>
  </transition>
  <div class="flex-1 flex justify-between z-10">
    <button
      data-testid="toggle"
      @click="mobileShowContent = !mobileShowContent"
    >
      <base-icon class="h-6 text-black dark:text-white" icon="close" />
    </button>
    <a
      class="text-2xl text-primary-700 dark:text-primary-200 underline"
      href="https://amadeo.dev"
      >amadeo.dev</a
    >
    <button>
      <base-icon class="h-6 text-black dark:text-white" icon="sun" />
    </button>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"
import MenuContainerContent from "./MenuContainerContent.vue"
import { Render } from "@/composable/useDefinitions"

export default defineComponent({
  components: {
    MenuContainerContent,
  },
  props: {
    render: {
      required: true,
      type: Array as () => Render,
    },
  },
  setup() {
    const mobileShowContent = ref(true)

    return { mobileShowContent }
  },
})
</script>
