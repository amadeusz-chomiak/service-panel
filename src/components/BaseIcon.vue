<template>
  <img
    v-if="icon === 'link'"
    svg-inline
    src="@/assets/icons/link.svg"
    class="fill-current fill-inherit"
    alt="outside link icon"
  />
  <img
    v-else-if="icon === 'close'"
    svg-inline
    src="@/assets/icons/close.svg"
    class="fill-current fill-inherit"
    alt="close icon of cross"
  />
  <img
    v-else-if="icon === 'moon'"
    svg-inline
    src="@/assets/icons/moon.svg"
    class="fill-current fill-inherit"
    alt="moon icon"
  />
  <img
    v-else-if="icon === 'sun'"
    svg-inline
    src="@/assets/icons/sun.svg"
    class="fill-current fill-inherit"
    alt="sun icon"
  />
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"

export default defineComponent({
  props: {
    icon: {
      type: String as () => "link" | "close" | "moon" | "sun",
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
