<template>
  <transition
    appear
    :enter-active-class="'transition-opacity ease-in ' + duration"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    :leave-active-class="'transition-opacity ease-in ' + duration"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    ><slot v-if="true"
  /></transition>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue"

export default defineComponent({
  props: {
    duration: {
      type: String,
      default: "duration-200",
      validator: duration =>
        typeof duration === "string" && duration.startsWith("duration-"),
    },
  },
  setup() {
    return {}
  },
})
</script>
