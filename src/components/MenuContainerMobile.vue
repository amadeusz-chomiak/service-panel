<template>
  <div class="flex-1 order-1 flex justify-between z-10 items-center">
    <header>
      <h1 class="sr-only">
        {{ header.title }}
      </h1>
      <a
        class="link text-2xl sm:text-3xl text-primary-700 dark:text-primary-200 underline font-small-caps"
        :href="header.link.href"
        target="_blank"
        rel="noreferrer"
        >{{ header.link.title }}</a
      >
    </header>
    <section
      class="flex justify-end space-x-2"
      :aria-labelledby="controlsHeadingId"
    >
      <h2 :id="controlsHeadingId" class="sr-only">{{ controls.title }}</h2>
      <transition-fade duration="duration-600">
        <button-new-version
          v-if="serviceWorkerWaiting"
          tooltip-right
          :render="render"
        />
      </transition-fade>
      <button-toggle-color-scheme :render="render" />
      <div :role="mobileShowContent ? '' : 'navigation'">
        <button
          :id="navigationIds.toggleButton"
          v-focus-target:back="{
            query: '#' + navigationIds.lastLink,
            enable: mobileShowContent,
          }"
          :aria-expanded="mobileShowContent"
          :aria-label="controls.navigation.buttonLabel"
          class="button button-primary p-3 sm:p-4 mr-1 sm:ml-3"
          data-testid="toggle"
          @click="mobileShowContent = !mobileShowContent"
        >
          <base-icon
            class="h-5 w-5 text-white"
            :icon="mobileShowContent ? 'close' : 'menu'"
          />
        </button>
      </div>
    </section>
  </div>
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
        class="mb-14 sm:mb-20 mt-4 mr-5 sm:mr-7 text-right"
        :render="render.categories"
        :focus-targets-id="navigationIds"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  computed,
  defineAsyncComponent,
  reactive,
} from "vue"
import MenuContainerContent from "./MenuContainerContent.vue"
import ButtonToggleColorScheme from "./ButtonToggleColorScheme.vue"
const ButtonNewVersion = defineAsyncComponent(() =>
  import("./ButtonNewVersion.vue"),
)
import { Render } from "@/composable/useDefinitions"
import { onBeforeRouteUpdate } from "vue-router"
import { useVersionControl } from "@/composable/useVersionControl"
import { useId } from "@/composable/useId"

export default defineComponent({
  components: {
    MenuContainerContent,
    ButtonToggleColorScheme,
    ButtonNewVersion,
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

    const header = computed(() => props.render.interface.header)
    const controls = computed(() => props.render.interface.controls)

    const { serviceWorkerWaiting } = useVersionControl()

    const navigationIds = reactive({
      lastLink: useId().id,
      toggleButton: useId().id,
    })

    const controlsHeadingId = useId().id
    return {
      mobileShowContent,
      header,
      navigationIds,
      controls,
      serviceWorkerWaiting,
      controlsHeadingId,
    }
  },
})
</script>
