<template>
  <img
    v-if="icon === 'link'"
    svg-inline
    src="@/assets/icons/link.svg"
    class="fill-current fill-inherit pointer-events-none"
  />
  <img
    v-else-if="icon === 'close'"
    svg-inline
    src="@/assets/icons/close.svg"
    class="fill-current fill-inherit pointer-events-none"
  />
  <img
    v-else-if="icon === 'moon'"
    svg-inline
    src="@/assets/icons/moon.svg"
    class="fill-current fill-inherit pointer-events-none"
  />
  <img
    v-else-if="icon === 'sun'"
    svg-inline
    src="@/assets/icons/sun.svg"
    class="fill-current fill-inherit pointer-events-none"
  />
  <img
    v-else-if="icon === 'menu'"
    svg-inline
    src="@/assets/icons/menu.svg"
    class="fill-current fill-inherit pointer-events-none"
  />
  <img
    v-else-if="icon === 'download'"
    svg-inline
    src="@/assets/icons/download.svg"
    class="fill-current fill-inherit pointer-events-none"
  />
  <img
    v-else-if="icon === 'downloading'"
    svg-inline
    src="@/assets/icons/downloading.svg"
    class="fill-current fill-inherit pointer-events-none"
  />
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"

export default defineComponent({
  props: {
    icon: {
      type: String as () =>
        | "link"
        | "close"
        | "moon"
        | "sun"
        | "menu"
        | "download"
        | "downloading",
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
