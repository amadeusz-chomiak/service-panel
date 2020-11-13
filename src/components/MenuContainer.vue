<template>
  <div
    v-if="mobileMode"
    class="flex flex-col p-2 sm:p-4 fixed z-30 inset-x-0 bottom-0 shadow-center-lg bg-gray-200 dark:bg-gray-700 rounded-t-xl"
  >
    <menu-container-mobile :render="render" />
  </div>
  <div
    v-else
    class="flex-shrink-0 flex flex-col h-screen justify-between w-1/3 md:p-4 lg:p-8 xl:p-10 2xl:p-12"
  >
    <menu-container-desktop :render="render" />
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  defineAsyncComponent,
} from "vue"
import { Render } from "@/composable/useDefinitions"
const MenuContainerMobile = defineAsyncComponent(() =>
  import("./MenuContainerMobile.vue"),
)
const MenuContainerDesktop = defineAsyncComponent(() =>
  import("./MenuContainerDesktop.vue"),
)
//TODO maybe add global page loader based on state of this async component

export default defineComponent({
  components: {
    MenuContainerMobile,
    MenuContainerDesktop,
  },
  props: {
    render: {
      required: true,
      type: Array as () => Render,
    },
  },
  setup() {
    const mobileMode = ref(true)
    const setMode = () => {
      const width = window.innerWidth
      mobileMode.value = width < 768
    }
    setMode()
    onBeforeMount(() => {
      window.addEventListener("resize", setMode)
    })
    onBeforeUnmount(() => {
      window.removeEventListener("resize", setMode)
    })

    return { mobileMode }
  },
})
</script>
