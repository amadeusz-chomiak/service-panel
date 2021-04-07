<template>
  <div>
    <div class="mb-8">
      <h1
        class="font-semibold text-5xl text-black dark:text-gray-200 first-letter:uppercase"
      >
        {{ header.title }}
      </h1>
      <a
        class="link text-2xl text-primary-700 dark:text-primary-200 underline font-small-caps"
        :href="header.link.href"
        target="_blank"
        rel="noreferrer"
        >{{ header.link.title }}</a
      >
    </div>
    <MenuContainerContent :render="render.categories" />
  </div>
  <div class="flex space-x-2">
    <button-toggle-color-scheme :render="render" />
    <transition-fade duration="duration-600">
      <button-new-version v-if="serviceWorkerWaiting" :render="render" />
    </transition-fade>
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  defineComponent,
  defineAsyncComponent,
  computed,
} from "vue"
import MenuContainerContent from "./MenuContainerContent.vue"
import ButtonToggleColorScheme from "./ButtonToggleColorScheme.vue"
const ButtonNewVersion = defineAsyncComponent(() =>
  import("./ButtonNewVersion.vue")
)
import { Render } from "@/composable/useDefinitions"
import { useVersionControl } from "@/composable/useVersionControl"
import TransitionFade from "./TransitionFade.vue"

export default defineComponent({
  components: {
    MenuContainerContent,
    ButtonToggleColorScheme,
    ButtonNewVersion,
    TransitionFade,
  },
  props: {
    render: {
      required: true,
      type: Object as () => Render,
    },
  },
  setup(props) {
    const header = computed(() => props.render.interface.header)
    const { serviceWorkerWaiting } = useVersionControl()
    return { header, serviceWorkerWaiting }
  },
})
</script>
