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
      class="transform transition-all duration-200 ease-in flex flex-col p-2 sm:p-4 fixed inset-x-0 bottom-0 shadow-center-lg bg-gray-200 dark:bg-gray-800 rounded-t-xl"
    >
      <MenuContainerContent
        class="mb-14 sm:mb-20 mt-4 ml-5 sm:ml-8 sm:pl-1"
        :render="render.categories"
      />
    </div>
  </transition>
  <div class="flex-1 flex justify-between z-10 items-center">
    <button
      class="button button-primary p-3 sm:p-4 mr-1 sm:ml-3"
      data-testid="toggle"
      @click="mobileShowContent = !mobileShowContent"
    >
      <base-icon
        class="h-5 w-5 text-white"
        :icon="mobileShowContent ? 'close' : 'menu'"
      />
    </button>
    <a
      class="text-2xl sm:text-3xl text-primary-700 dark:text-primary-200 underline font-small-caps"
      :href="header.link.href"
      target="_blank"
      rel="noreferrer"
      >{{ header.link.title }}</a
    >
    <button
      class="button button-primary p-3 sm:p-4 mr-1 sm:mr-3"
      data-testid="toggle-color-scheme"
      @click="setColorScheme(!isLight)"
    >
      <base-icon class="h-5 text-white" :icon="isLight ? 'sun' : 'moon'" />
    </button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue"
import MenuContainerContent from "./MenuContainerContent.vue"
import { Render } from "@/composable/useDefinitions"
import { usePrefersColorScheme } from "@/composable/usePrefersColorScheme"
import { onBeforeRouteUpdate } from "vue-router"

export default defineComponent({
  components: {
    MenuContainerContent,
  },
  props: {
    render: {
      required: true,
      type: Object as () => Render,
    },
  },
  setup(props) {
    const mobileShowContent = ref(true)
    onBeforeRouteUpdate(() => {
      mobileShowContent.value = false
    })

    const { isLight, setColorScheme } = usePrefersColorScheme()

    const header = computed(() => props.render.interface.header)

    return { mobileShowContent, isLight, setColorScheme, header }
  },
})
</script>
